"use client";

import Link from "next/link";
import { useState } from "react";
import type { PuzzleEinheit, UserZuordnung } from "@/types";
import {
  grenzfaelleAnzahl,
  istGrenzfall,
  kiRisikoGesamt,
  konfidenzLabel,
  modellZuordnung,
  naechsterBerufSlug,
  richtigeAnzahl,
  risikoStufeInListe,
  treffergenauigkeit,
} from "@/lib/scoring";
import { CATEGORY_LABELS, STUFE_TEXT } from "@/types";
import RiskGauge from "./RiskGauge";
import Disclaimer from "./Disclaimer";
import Quellen from "./Quellen";

const ZONE_TEXT: Record<"ki" | "mensch", string> = {
  ki: "KI",
  mensch: "Mensch",
};

export default function ErgebnisView({
  beruf,
  userZuordnung,
  alleBerufe,
  onRetry,
  alleHref = "/",
  alleLabel = "Alle Berufe",
  vergleichHref = "/vergleich",
  vergleichLabel = "Berufe im Vergleich",
  appTitel = "KI-Berufs-Puzzle",
}: {
  beruf: PuzzleEinheit;
  userZuordnung: UserZuordnung;
  alleBerufe: PuzzleEinheit[];
  onRetry: () => void;
  alleHref?: string;
  alleLabel?: string;
  vergleichHref?: string;
  vergleichLabel?: string;
  appTitel?: string;
}) {
  const total = beruf.tasks.length;
  const grenzfaelle = grenzfaelleAnzahl(beruf.tasks);
  const eindeutig = total - grenzfaelle;
  const richtig = richtigeAnzahl(userZuordnung, beruf.tasks);
  const genauigkeit = treffergenauigkeit(userZuordnung, beruf.tasks);
  const risiko = kiRisikoGesamt(beruf.tasks);
  const alleWerte = alleBerufe.map((b) => kiRisikoGesamt(b.tasks));
  const stufe = risikoStufeInListe(risiko, alleWerte);
  const nextSlug = naechsterBerufSlug(beruf.slug, alleBerufe);
  const abweichungen = eindeutig - richtig;
  const userMaschine = beruf.tasks.filter(
    (t) => userZuordnung[t.id] === "ki",
  ).length;
  const userPct = total === 0 ? 0 : Math.round((userMaschine / total) * 100);

  const [exportStatus, setExportStatus] = useState<"idle" | "kopiert" | "fehler">(
    "idle",
  );

  const zusammenfassungText = () => {
    const zeilen = beruf.tasks.map((task) => {
      const deine = userZuordnung[task.id];
      const modell = modellZuordnung(task);
      const grenz = istGrenzfall(task.kiEignung);
      const ok = deine === modell;
      const marker = grenz ? "•" : ok ? "✓" : "✗";
      return `${marker} ${task.title}: du „${deine ? ZONE_TEXT[deine] : "—"}“, Modell „${ZONE_TEXT[modell]}“ – ${konfidenzLabel(task.kiEignung)}`;
    });
    return [
      `${appTitel} – ${beruf.title}`,
      `${richtig} von ${eindeutig} eindeutigen Aufgaben stimmten mit dem Modell überein (${genauigkeit}%).` +
        (grenzfaelle > 0
          ? ` ${
              grenzfaelle === 1
                ? "1 weitere Aufgabe war ein echter Grenzfall"
                : `${grenzfaelle} weitere Aufgaben waren echte Grenzfälle`
            } – die zählen nicht als richtig oder falsch.`
          : ""),
      `Eigene Einschätzung: ${userMaschine} von ${total} Aufgaben bei der KI. Modell insgesamt: ${STUFE_TEXT[stufe]}.`,
      "",
      ...zeilen,
      "",
      typeof window !== "undefined"
        ? `${window.location.origin}/puzzle/${beruf.slug}`
        : `/puzzle/${beruf.slug}`,
    ].join("\n");
  };

  const handleExport = async () => {
    const text = zusammenfassungText();
    try {
      if (navigator.share) {
        await navigator.share({ title: `${appTitel} – ${beruf.title}`, text });
        return;
      }
    } catch {
      // Nutzer:in hat Teilen abgebrochen – dann Zwischenablage versuchen.
    }
    try {
      await navigator.clipboard.writeText(text);
      setExportStatus("kopiert");
      window.setTimeout(() => setExportStatus("idle"), 2500);
    } catch {
      setExportStatus("fehler");
      window.setTimeout(() => setExportStatus("idle"), 2500);
    }
  };

  return (
    <div className="space-y-14">
      <header>
        <p className="font-prose text-sm italic text-ink-2">
          Ergebnis: {beruf.title}
        </p>
        <p className="mt-3 font-display text-[clamp(1.8rem,4.5vw,2.7rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-ink">
          <span className="tnum">{richtig}</span> von{" "}
          <span className="tnum">{eindeutig}</span> eindeutigen Aufgaben hast
          du wie das Modell sortiert.
        </p>
        <p className="prose-text mt-3 text-ink">
          {abweichungen === 0
            ? "Bei allen eindeutigen Aufgaben deckungsgleich mit der Forschungseinschätzung."
            : `Bei ${abweichungen} ${
                abweichungen === 1 ? "eindeutigen Aufgabe" : "eindeutigen Aufgaben"
              } lagst du anders.`}{" "}
          Übereinstimmung: <span className="tnum">{genauigkeit}%</span>.
          {grenzfaelle > 0 && (
            <>
              {" "}
              {grenzfaelle === 1
                ? "1 weitere Aufgabe war ein echter Grenzfall"
                : `${grenzfaelle} weitere Aufgaben waren echte Grenzfälle`}{" "}
              – die zählen wir gar nicht erst als richtig oder falsch, denn da
              wäre auch die Forschung uneins.
            </>
          )}
        </p>
      </header>

      <section>
        <RiskGauge value={risiko} compareValue={userPct} size="lg" />
        <p className="prose-text mt-3 text-ink">
          Du hast <span className="tnum">{userMaschine}</span> von{" "}
          <span className="tnum">{total}</span> Aufgaben der KI zugeordnet.
          Über alle Aufgaben gemittelt schätzt das Modell{" "}
          <span className="font-semibold">{beruf.title}</span> als{" "}
          <span className="font-semibold">{STUFE_TEXT[stufe]}</span>{" "}
          ein.
        </p>
        <p className="mt-4 border-l-2 border-mensch pl-4 font-prose text-[0.95rem] italic leading-relaxed text-ink-2">
          „KI kann das“ heißt nicht „KI macht das“. Ob eine Aufgabe wirklich
          automatisiert wird, hängt an Kosten, Recht, Verantwortung – und daran,
          ob Menschen das überhaupt wollen. Meist verschwindet nicht der Beruf,
          sondern der Aufgabenmix verschiebt sich.
        </p>
      </section>

      <section>
        <h2 className="border-b-2 border-ink pb-2 font-display text-[1.4rem] font-semibold text-ink">
          Aufgabe für Aufgabe
        </h2>

        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm">
          <span className="inline-flex items-center gap-1.5 font-semibold text-ok">
            <span aria-hidden="true">✓</span>
            <span className="tnum">{richtig}</span> übereinstimmend
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold text-miss">
            <span aria-hidden="true">✗</span>
            <span className="tnum">{abweichungen}</span> anders eingeschätzt
          </span>
          {grenzfaelle > 0 && (
            <span className="inline-flex items-center gap-1.5 font-semibold text-ink-2">
              <span aria-hidden="true">•</span>
              <span className="tnum">{grenzfaelle}</span> Grenzfall
              {grenzfaelle === 1 ? "" : "e"} (zählt nicht)
            </span>
          )}
        </div>

        <ul className="mt-4 space-y-2.5">
          {beruf.tasks.map((task) => {
            const deine = userZuordnung[task.id];
            const modell = modellZuordnung(task);
            const grenz = istGrenzfall(task.kiEignung);
            const ok = deine === modell;
            // Grenzfälle sind bewusst neutral (grau) statt rot/grün – hier
            // gibt es keine "richtige" Antwort, die man verfehlen könnte.
            const status: "ok" | "miss" | "grenzfall" = grenz
              ? "grenzfall"
              : ok
                ? "ok"
                : "miss";
            const STATUS_STYLE = {
              ok: "border-ok bg-ok-wash",
              miss: "border-miss bg-miss-wash",
              grenzfall: "border-rule bg-paper-2",
            } as const;
            const STATUS_TEXT_COLOR = {
              ok: "text-ok",
              miss: "text-miss",
              grenzfall: "text-ink-2",
            } as const;
            const STATUS_ICON = { ok: "✓", miss: "✗", grenzfall: "•" } as const;
            const STATUS_LABEL = {
              ok: "stimmt überein",
              miss: "anders",
              grenzfall: "Grenzfall",
            } as const;
            return (
              <li
                key={task.id}
                className={`border-l-4 p-3.5 ${STATUS_STYLE[status]}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="text-[0.95rem] font-semibold leading-snug text-ink">
                    {task.title}
                    <span className="ml-2 text-xs font-normal text-ink-2">
                      {CATEGORY_LABELS[task.category]}
                    </span>
                  </span>
                  <span
                    className={`inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold ${STATUS_TEXT_COLOR[status]}`}
                  >
                    <span aria-hidden="true">{STATUS_ICON[status]}</span>
                    <span className="hidden sm:inline">
                      {STATUS_LABEL[status]}
                    </span>
                  </span>
                </div>

                <div className="mt-2.5 grid grid-cols-2 gap-3 text-sm">
                  <span>
                    <span className="block text-xs text-ink-2">Deine Wahl</span>
                    <span
                      className={
                        status === "miss"
                          ? "font-semibold text-miss"
                          : "text-ink"
                      }
                    >
                      {deine ? ZONE_TEXT[deine] : "—"}
                    </span>
                  </span>
                  <span>
                    <span className="block text-xs text-ink-2">Modell</span>
                    <span className="text-ink">{ZONE_TEXT[modell]}</span>
                  </span>
                </div>

                <p className="mt-2.5 border-t border-ink/10 pt-2.5 font-prose text-[0.95rem] italic text-ink-2">
                  {konfidenzLabel(task.kiEignung)}
                </p>
                <p className="mt-1.5 font-prose text-[0.95rem] leading-relaxed text-ink-2">
                  {task.warum}
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="max-w-[46rem]">
        <h2 className="font-display text-[1.4rem] font-semibold text-ink">
          Wie es weitergeht
        </h2>
        <p className="prose-text mt-2 text-ink">{beruf.zukunftsausblick}</p>
      </section>

      <section className="max-w-[46rem]">
        <h2 className="font-display text-[1.4rem] font-semibold text-ink">
          Was menschlich wichtig bleibt
        </h2>
        <ul className="prose-text mt-2 space-y-1.5 text-ink">
          {beruf.tippsMenschlich.map((tipp) => (
            <li key={tipp} className="flex gap-2.5">
              <span className="relative top-[0.55em] h-1.5 w-1.5 shrink-0 bg-mensch" />
              <span>{tipp}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="max-w-[46rem] space-y-8">
        <Quellen quellen={beruf.quellen} />
        <Disclaimer />
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-rule pt-6 text-sm">
        <button
          type="button"
          onClick={onRetry}
          className="font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:text-mensch hover:decoration-mensch"
        >
          Nochmal sortieren
        </button>
        <Link
          href={alleHref}
          className="font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:text-mensch hover:decoration-mensch"
        >
          {alleLabel}
        </Link>
        <Link
          href={vergleichHref}
          className="font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:text-mensch hover:decoration-mensch"
        >
          {vergleichLabel}
        </Link>
        {nextSlug && (
          <Link
            href={`/puzzle/${nextSlug}`}
            className="font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:text-mensch hover:decoration-mensch"
          >
            Nächster Beruf
          </Link>
        )}
        <button
          type="button"
          onClick={handleExport}
          className="ml-auto rounded-[2px] border border-ink px-4 py-2 font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
        >
          {exportStatus === "kopiert"
            ? "In Zwischenablage kopiert ✓"
            : exportStatus === "fehler"
              ? "Kopieren fehlgeschlagen"
              : "Ergebnis teilen"}
        </button>
      </div>
    </div>
  );
}
