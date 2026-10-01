"use client";

import { useMemo, useState } from "react";
import { getBeruf } from "@/data/berufe";
import { getStudiengang } from "@/data/studiengaenge";
import { leseCodes } from "@/lib/klassencode";
import { istGrenzfall, modellZuordnung } from "@/lib/scoring";
import { diskussionsfragen } from "@/lib/diskussion";
import type { PuzzleEinheit } from "@/types";
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
  const [text, setText] = useState("");
  const [sortierung, setSortierung] = useState<"uneinig" | "reihenfolge">(
    "uneinig",
  );
  const [aktiv, setAktiv] = useState<string | null>(null);
  const [praesentiert, setPraesentiert] = useState(false);

  const { gueltig, ungueltig } = useMemo(() => leseCodes(text), [text]);

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
      <div>
        <label
          htmlFor="codes"
          className="block font-display text-sm font-semibold text-ink"
        >
          Klassencodes einfügen
        </label>
        <p className="mt-1 font-prose text-sm italic text-ink-2">
          Ein Code pro Schüler:in, getrennt durch Zeilenumbruch, Leerzeichen
          oder Komma. Alles bleibt in deinem Browser. Tipp: Lass die Klasse
          ihre Codes in einen gemeinsamen Chat oder ein Padlet schreiben und
          kopiere alles auf einmal hierher.
        </p>
        <textarea
          id="codes"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          spellCheck={false}
          placeholder={"b.pflegefachkraft.11.9ab3\nb.pflegefachkraft.11.7f21"}
          className="mt-2 w-full rounded-[2px] border border-rule bg-paper p-3 font-mono text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mensch"
        />
        {ungueltig.length > 0 && (
          <p className="mt-2 text-sm text-miss" role="status">
            {ungueltig.length === 1
              ? "1 Eintrag konnte nicht gelesen werden."
              : `${ungueltig.length} Einträge konnten nicht gelesen werden.`}{" "}
            Erste Zeichen: „{ungueltig[0].slice(0, 24)}“
          </p>
        )}
        {gruppen.veraltet > 0 && (
          <p className="mt-2 text-sm text-miss" role="status">
            {gruppen.veraltet} Code(s) passen nicht mehr zur aktuellen
            Aufgabenliste (Beruf unbekannt oder Aufgaben geändert) und werden
            nicht mitgezählt.
          </p>
        )}
      </div>

      {gruppen.liste.length === 0 ? (
        <p className="prose-text text-ink-2">
          Noch keine Codes. Den Code sehen Schüler:innen unten auf der
          Ergebnis-Seite des Puzzles.
        </p>
      ) : (
        <>
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
                  className={`min-h-11 rounded-[2px] border px-3 py-2 text-sm ${
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
                    className="min-h-12 rounded-[2px] bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-mensch"
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
                  className={`min-h-11 rounded-[2px] border px-3 py-2 ${
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
                  className={`min-h-11 rounded-[2px] border px-3 py-2 ${
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
                    <li key={z.id} className="border-b border-rule pb-3">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                        <span className="text-[0.95rem] font-semibold text-ink">
                          {z.title}
                          {z.ueberraschend && (
                            <span className="ml-2 rounded-[2px] bg-paper-2 px-1.5 py-0.5 text-xs font-normal text-ink-2">
                              Überraschend
                            </span>
                          )}
                        </span>
                        <span className="text-xs text-ink-2">
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
                        className="mt-2 flex h-3 w-full overflow-hidden bg-paper-2"
                        role="img"
                        aria-label={`${z.menschAnzahl} Mensch, ${z.kiAnzahl} KI`}
                      >
                        <span
                          className="bg-mensch"
                          style={{ width: `${100 - kiPct}%` }}
                        />
                        <span className="bg-ki" style={{ width: `${kiPct}%` }} />
                      </div>
                      <p className="mt-1 text-xs text-ink-2">
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
