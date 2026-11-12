"use client";

import { useEffect, useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { getBeruf } from "@/data/berufe";
import { getStudiengang } from "@/data/studiengaenge";
import { leseCodes } from "@/lib/klassencode";
import { raumApi } from "@/lib/raumApi";
import { istGrenzfall, modellZuordnung } from "@/lib/scoring";
import { diskussionsfragen } from "@/lib/diskussion";
import type { PuzzleEinheit } from "@/types";
import { SITE_URL } from "@/lib/site";
import Streitfaelle from "./Streitfaelle";

interface Zeile {
  id: string;
  title: string;
  kiAnzahl: number;
  menschAnzahl: number;
  kiAnteil: number;
  modell: "ki" | "mensch";
  grenzfall: boolean;
  ueberraschend: boolean;
}

function einheitFuer(art: "beruf" | "studium", slug: string) {
  return art === "beruf" ? getBeruf(slug) : getStudiengang(slug);
}

export default function KlasseAuswertung() {
  const [sortierung, setSortierung] = useState<"uneinig" | "reihenfolge">(
    "uneinig",
  );
  const [aktiv, setAktiv] = useState<string | null>(null);
  const [praesentiert, setPraesentiert] = useState(false);

  // Vollbild für den Beamer: Knopf im Live-Raum oder Taste F, Esc beendet.
  const [vollbild, setVollbild] = useState(false);
  const [kannVollbild, setKannVollbild] = useState(false);
  useEffect(() => {
    type Doc = Document & { webkitFullscreenElement?: Element; webkitExitFullscreen?: () => void };
    type El = HTMLElement & { webkitRequestFullscreen?: () => void };
    const doc = document as Doc;
    const wurzel = document.documentElement as El;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- erst im Browser bekannt
    setKannVollbild(Boolean(wurzel.requestFullscreen || wurzel.webkitRequestFullscreen));
    const an = () => Boolean(doc.fullscreenElement || doc.webkitFullscreenElement);
    const stand = () => setVollbild(an());
    const schalten = () => {
      try {
        if (an()) (doc.exitFullscreen || doc.webkitExitFullscreen)?.call(doc);
        else if (wurzel.requestFullscreen) wurzel.requestFullscreen().catch(() => {});
        else wurzel.webkitRequestFullscreen?.();
      } catch {}
    };
    const taste = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== "f" || e.metaKey || e.ctrlKey || e.altKey) return;
      if ((e.target as HTMLElement | null)?.closest?.("input,textarea,select")) return;
      schalten();
    };
    window.addEventListener("klasse-vollbild", schalten);
    document.addEventListener("keydown", taste);
    document.addEventListener("fullscreenchange", stand);
    document.addEventListener("webkitfullscreenchange", stand);
    return () => {
      window.removeEventListener("klasse-vollbild", schalten);
      document.removeEventListener("keydown", taste);
      document.removeEventListener("fullscreenchange", stand);
      document.removeEventListener("webkitfullscreenchange", stand);
    };
  }, []);

  // Live-Raum: Schüler:innen schicken ihr Ergebnis direkt.
  const [raum, setRaum] = useState<{ code: string; hostKey: string } | null>(null);
  const [raumCodes, setRaumCodes] = useState<string[]>([]);
  const [raumFehler, setRaumFehler] = useState<string | null>(null);
  const [gesperrt, setGesperrt] = useState<string | null>(null);

  useEffect(() => {
    try {
      const s = sessionStorage.getItem("klassen-raum");
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sessionStorage gibt es erst im Browser
      if (s) setRaum(JSON.parse(s));
    } catch {
      /* ohne Speicher: einfach neu erstellen */
    }
  }, []);

  useEffect(() => {
    if (!raum) return;
    let aktiv = true;
    const holen = async () => {
      try {
        const r = await raumApi.codes(raum.code, raum.hostKey);
        if (aktiv) {
          setRaumCodes(r.codes);
          setRaumFehler(null);
        }
      } catch (e) {
        if (aktiv) setRaumFehler(e instanceof Error ? e.message : "Raum nicht erreichbar");
      }
    };
    holen();
    const id = window.setInterval(holen, 4000);
    return () => {
      aktiv = false;
      window.clearInterval(id);
    };
  }, [raum]);

  const raumMerken = (r: { code: string; hostKey: string } | null) => {
    setRaum(r);
    try {
      if (r) sessionStorage.setItem("klassen-raum", JSON.stringify(r));
      else sessionStorage.removeItem("klassen-raum");
    } catch {
      /* egal */
    }
  };

  const raumErstellen = async () => {
    try {
      raumMerken(await raumApi.erstellen());
      setRaumFehler(null);
    } catch (e) {
      setRaumFehler(e instanceof Error ? e.message : "Raum konnte nicht erstellt werden");
    }
  };

  // Mit dem Lehrkraft-Passwort einen vorhandenen Raum übernehmen, z. B. wenn ein anderes Tool ihn samt QR-Code angelegt hat.
  const [uebernahme, setUebernahme] = useState({ code: "", passwort: "" });
  const [uebernimmt, setUebernimmt] = useState(false);
  const raumUebernehmen = async (e: React.FormEvent) => {
    e.preventDefault();
    setUebernimmt(true);
    try {
      const r = await raumApi.leiten(uebernahme.code, uebernahme.passwort);
      raumMerken({ code: r.code, hostKey: r.hostKey });
      setUebernahme({ code: "", passwort: "" });
      setRaumFehler(null);
    } catch (err) {
      setRaumFehler(err instanceof Error ? err.message : "Raum konnte nicht übernommen werden");
    } finally {
      setUebernimmt(false);
    }
  };

  const raumWechseln = () => {
    raumMerken(null);
    setRaumCodes([]);
    setGesperrt(null);
    setRaumFehler(null);
  };

  // Lehrkraft legt alle Schüler:innen auf den gerade gezeigten Beruf fest (oder hebt es wieder auf).
  const sperren = async (fokus: string | null) => {
    if (!raum) return;
    try {
      await raumApi.fokus(raum.code, raum.hostKey, fokus);
      setGesperrt(fokus);
      setRaumFehler(null);
    } catch (e) {
      setRaumFehler(e instanceof Error ? e.message : "Sperren nicht möglich");
    }
  };

  useEffect(() => {
    if (!raum) return;
    raumApi
      .info(raum.code)
      .then((r) => setGesperrt(r.fokus))
      .catch(() => {});
  }, [raum]);

  const gesamtText = useMemo(() => raumCodes.join("\n"), [raumCodes]);
  const { gueltig } = useMemo(() => leseCodes(gesamtText), [gesamtText]);

  // Codes nach Einheit gruppieren; Codes mit unpassender Aufgabenzahl fallen raus.
  const gruppen = useMemo(() => {
    const map = new Map<
      string,
      { einheit: PuzzleEinheit; art: "beruf" | "studium"; codes: boolean[][] }
    >();
    let veraltet = 0;
    for (const c of gueltig) {
      const einheit = einheitFuer(c.art, c.slug);
      if (!einheit || einheit.tasks.length !== c.ki.length) {
        veraltet += 1;
        continue;
      }
      const key = `${c.art}:${c.slug}`;
      const g = map.get(key) ?? { einheit, art: c.art, codes: [] };
      g.codes.push(c.ki);
      map.set(key, g);
    }
    return { liste: [...map.entries()], veraltet };
  }, [gueltig]);

  const aktivKey =
    aktiv && gruppen.liste.some(([k]) => k === aktiv)
      ? aktiv
      : (gruppen.liste[0]?.[0] ?? null);
  const aktuelle = gruppen.liste.find(([k]) => k === aktivKey)?.[1];
  const aktivIndex = gruppen.liste.findIndex(([k]) => k === aktivKey);
  const springe = (d: number) => {
    const n = gruppen.liste.length;
    if (n > 0) setAktiv(gruppen.liste[(aktivIndex + d + n) % n][0]);
  };
  const aktuellerFokus = aktuelle ? `${aktuelle.art === "beruf" ? "b" : "s"}.${aktuelle.einheit.slug}` : null;

  const zeilen: Zeile[] = useMemo(() => {
    if (!aktuelle) return [];
    const n = aktuelle.codes.length;
    const roh = aktuelle.einheit.tasks.map((task, i) => {
      const ki = aktuelle.codes.filter((c) => c[i]).length;
      return {
        id: task.id,
        title: task.title,
        kiAnzahl: ki,
        menschAnzahl: n - ki,
        kiAnteil: n === 0 ? 0 : ki / n,
        modell: modellZuordnung(task),
        grenzfall: istGrenzfall(task.kiEignung),
        ueberraschend: Boolean(task.ueberraschend),
      };
    });
    if (sortierung === "uneinig") {
      roh.sort(
        (a, b) => Math.abs(a.kiAnteil - 0.5) - Math.abs(b.kiAnteil - 0.5),
      );
    }
    return roh;
  }, [aktuelle, sortierung]);


  return (
    <div className="space-y-8">
      <section className="max-w-[46rem] rounded-2xl border-2 border-rule bg-paper-2 p-4">
        <h2 className="font-display text-base font-semibold text-ink">Live-Raum</h2>
        {raum ? (
          <div className="mt-1 flex flex-wrap items-start gap-5">
            <div className="bg-white p-2" aria-label={`QR-Code für Raum ${raum.code}`}>
              <QRCodeSVG value={`${SITE_URL}/?raum=${raum.code}`} size={144} />
            </div>
            <p className="min-w-[16rem] flex-1 font-prose text-[0.95rem] text-ink-2">
              Raumcode für die Klasse:{" "}
              <b className="font-mono text-2xl tracking-widest text-ink">{raum.code}</b> · {raumCodes.length} Ergebnis(se)
              eingegangen. Schüler:innen scannen den QR-Code, ihr Ergebnis wird danach automatisch gesendet.
              Räume verfallen nach 24 Stunden, die anonyme Gesamtstatistik bleibt.
              <span className="mt-3 flex flex-wrap gap-2">
                {kannVollbild && (
                  <button
                    type="button"
                    onClick={() => window.dispatchEvent(new Event("klasse-vollbild"))}
                    aria-pressed={vollbild}
                    title="Vollbild an oder aus (Taste F)"
                    className="min-h-11 rounded-full border-2 border-ink px-3 py-2 text-sm font-semibold text-ink hover:bg-ink hover:text-paper"
                  >
                    {vollbild ? "Vollbild beenden" : "Vollbild"}
                  </button>
                )}
                <button
                  type="button"
                  onClick={raumWechseln}
                  className="min-h-11 rounded-full border-2 border-ink px-3 py-2 text-sm font-semibold text-ink hover:bg-ink hover:text-paper"
                >
                  Raum schließen und neu beginnen
                </button>
              </span>
            </p>
          </div>
        ) : (
          <>
            <p className="mt-1 font-prose text-[0.95rem] text-ink-2">
              Erstelle einen Raum: Die Klasse scannt den QR-Code, schickt ihre Ergebnisse automatisch und du siehst sie live.
              Gespeichert werden die Zuordnung und eine zufällige Geräte-ID, keine Namen.
            </p>
            <button
              type="button"
              onClick={raumErstellen}
              className="mt-3 inline-flex min-h-12 items-center rounded-full border-[3px] border-ink bg-ink px-5 py-2 text-base font-bold text-paper transition-colors hover:bg-paper hover:text-ink"
            >
              Raum erstellen
            </button>
            <form onSubmit={raumUebernehmen} className="mt-5 border-t-2 border-rule pt-4">
              <h3 className="font-display text-sm font-semibold text-ink">Raum gibt es schon?</h3>
              <p className="mt-1 font-prose text-[0.95rem] text-ink-2">
                Mit deinem Lehrkraft-Passwort übernimmst du die Leitung eines Raums, der schon einen Code hat.
              </p>
              <div className="mt-3 flex flex-wrap items-end gap-3">
                <label className="text-sm text-ink">
                  <span className="block">Raumcode</span>
                  <input
                    value={uebernahme.code}
                    onChange={(e) => setUebernahme((u) => ({ ...u, code: e.target.value.toUpperCase().trim() }))}
                    required
                    minLength={4}
                    maxLength={4}
                    autoComplete="off"
                    autoCapitalize="characters"
                    spellCheck={false}
                    className="mt-1 min-h-11 w-28 rounded-full border-2 border-ink bg-paper px-3 py-2 font-mono text-lg tracking-widest text-ink"
                  />
                </label>
                <label className="text-sm text-ink">
                  <span className="block">Lehrkraft-Passwort</span>
                  <input
                    type="password"
                    value={uebernahme.passwort}
                    onChange={(e) => setUebernahme((u) => ({ ...u, passwort: e.target.value }))}
                    required
                    autoComplete="current-password"
                    className="mt-1 min-h-11 w-56 rounded-full border-2 border-ink bg-paper px-3 py-2 text-ink"
                  />
                </label>
                <button
                  type="submit"
                  disabled={uebernimmt}
                  className="inline-flex min-h-11 items-center rounded-full border-2 border-ink px-3 py-2 text-base font-semibold text-ink transition-colors hover:bg-ink hover:text-paper disabled:opacity-50"
                >
                  {uebernimmt ? "Prüfe …" : "Raum übernehmen"}
                </button>
              </div>
            </form>
          </>
        )}
        {raumFehler && <p className="mt-2 text-sm text-miss" role="status">{raumFehler}</p>}
      </section>
      <div>
        {gruppen.veraltet > 0 && (
          <p className="mt-2 text-sm text-miss" role="status">
            {gruppen.veraltet} Ergebnis(se) passen nicht mehr zur aktuellen
            Aufgabenliste (Beruf unbekannt oder Aufgaben geändert) und werden
            nicht mitgezählt.
          </p>
        )}
      </div>

      {gruppen.liste.length === 0 ? (
        <p className="prose-text text-ink-2">
          Noch keine Ergebnisse. Erstelle einen Raum und lass die Klasse den QR-Code scannen.
        </p>
      ) : (
        <>
          <div className="flex flex-wrap items-center gap-2">
            {gruppen.liste.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => springe(-1)}
                  className="min-h-11 rounded-full border-2 border-ink px-3 py-2 text-base font-semibold text-ink hover:bg-ink hover:text-paper"
                >
                  ← Voriger
                </button>
                <span className="tnum text-sm text-ink-2">
                  {aktivIndex + 1} / {gruppen.liste.length}
                </span>
                <button
                  type="button"
                  onClick={() => springe(1)}
                  className="min-h-11 rounded-full border-2 border-ink px-3 py-2 text-base font-semibold text-ink hover:bg-ink hover:text-paper"
                >
                  Nächster →
                </button>
              </>
            )}
            {raum && aktuellerFokus && (
              <>
                <button
                  type="button"
                  onClick={() => sperren(aktuellerFokus)}
                  aria-pressed={gesperrt === aktuellerFokus}
                  className={`min-h-11 rounded-full border-2 border-ink px-3 py-2 text-sm font-semibold ${
                    gesperrt === aktuellerFokus ? "bg-ink text-paper" : "text-ink hover:bg-ink hover:text-paper"
                  }`}
                >
                  {gesperrt === aktuellerFokus ? "Für alle gesperrt ✓" : "Für alle auf diesen Beruf sperren"}
                </button>
                {gesperrt && (
                  <button
                    type="button"
                    onClick={() => sperren(null)}
                    className="min-h-11 rounded-xl border-2 border-rule px-3 py-2 text-sm text-ink hover:border-ink"
                  >
                    Sperre aufheben
                  </button>
                )}
              </>
            )}
          </div>
          {gruppen.liste.length > 1 && (
            <div
              role="group"
              aria-label="Beruf oder Studiengang wählen"
              className="flex flex-wrap gap-2"
            >
              {gruppen.liste.map(([key, g]) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={key === aktivKey}
                  onClick={() => setAktiv(key)}
                  className={`min-h-11 rounded-xl border-2 px-3 py-2 text-sm ${
                    key === aktivKey
                      ? "border-ink bg-ink text-paper"
                      : "border-rule text-ink hover:border-ink"
                  }`}
                >
                  {g.einheit.title} ({g.codes.length})
                </button>
              ))}
            </div>
          )}

          {aktuelle && (
            <section>
              <h2 className="font-display text-[1.4rem] font-semibold text-ink">
                {aktuelle.einheit.title}:{" "}
                <span className="tnum">{aktuelle.codes.length}</span>{" "}
                {aktuelle.codes.length === 1 ? "Person" : "Personen"}
              </h2>
              {aktuelle.codes.length >= 2 && (
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => setPraesentiert(true)}
                    className="min-h-12 rounded-full border-[3px] border-ink bg-ink px-5 py-2.5 text-base font-semibold text-paper transition-colors hover:bg-paper hover:text-ink"
                  >
                    Streitfälle präsentieren →
                  </button>
                  <p className="mt-1.5 text-sm text-ink-2">
                    Vollbild für den Beamer: Die Klasse rät erst, dann wird
                    die Verteilung und zuletzt die Einschätzung des Modells
                    aufgedeckt.
                  </p>
                </div>
              )}
              <div className="mt-3 flex flex-wrap gap-2 text-sm">
                <button
                  type="button"
                  aria-pressed={sortierung === "uneinig"}
                  onClick={() => setSortierung("uneinig")}
                  className={`min-h-11 rounded-xl border-2 px-3 py-2 ${
                    sortierung === "uneinig"
                      ? "border-ink bg-ink text-paper"
                      : "border-rule text-ink"
                  }`}
                >
                  Am meisten Uneinigkeit zuerst
                </button>
                <button
                  type="button"
                  aria-pressed={sortierung === "reihenfolge"}
                  onClick={() => setSortierung("reihenfolge")}
                  className={`min-h-11 rounded-xl border-2 px-3 py-2 ${
                    sortierung === "reihenfolge"
                      ? "border-ink bg-ink text-paper"
                      : "border-rule text-ink"
                  }`}
                >
                  Original-Reihenfolge
                </button>
              </div>

              <ul className="mt-5 space-y-3">
                {zeilen.map((z) => {
                  const kiPct = Math.round(z.kiAnteil * 100);
                  const klasseSagt = kiPct >= 50 ? "ki" : "mensch";
                  const weichtAb = !z.grenzfall && klasseSagt !== z.modell;
                  return (
                    <li key={z.id} className="border-b-2 border-rule pb-3">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                        <span className="text-[0.95rem] font-semibold text-ink">
                          {z.title}
                          {z.ueberraschend && (
                            <span className="ml-2 rounded-xl bg-paper-2 px-1.5 py-0.5 text-sm font-normal text-ink-2">
                              Überraschend
                            </span>
                          )}
                        </span>
                        <span className="text-sm text-ink-2">
                          Modell:{" "}
                          {z.grenzfall
                            ? "Grenzfall"
                            : z.modell === "ki"
                              ? "KI"
                              : "Mensch"}
                          {weichtAb && " · Klasse liegt anders"}
                        </span>
                      </div>
                      <div
                        className="mt-2 flex h-3.5 w-full overflow-hidden rounded-full bg-paper-2"
                        role="img"
                        aria-label={`${z.menschAnzahl} Mensch, ${z.kiAnzahl} KI`}
                      >
                        <span
                          className="border-r-2 border-paper bg-mensch"
                          style={{ width: `${100 - kiPct}%` }}
                        />
                        <span className="bg-ki" style={{ width: `${kiPct}%` }} />
                      </div>
                      <p className="mt-1 text-sm text-ink-2">
                        <span className="tnum">{z.menschAnzahl}</span> Mensch ·{" "}
                        <span className="tnum">{z.kiAnzahl}</span> KI
                      </p>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8 max-w-[46rem]">
                <h3 className="font-display text-lg font-semibold text-ink">
                  Fragen für die Diskussion
                </h3>
                <ul className="prose-text mt-2 list-disc space-y-2 pl-5 text-ink">
                  {diskussionsfragen(aktuelle.einheit)
                    .slice(0, 4)
                    .map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                </ul>
              </div>
            </section>
          )}
          {praesentiert && aktuelle && (
            <Streitfaelle
              einheit={aktuelle.einheit}
              codes={aktuelle.codes}
              onClose={() => setPraesentiert(false)}
            />
          )}
        </>
      )}
    </div>
  );
}
