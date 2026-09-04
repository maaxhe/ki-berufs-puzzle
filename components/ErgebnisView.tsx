"use client";

import Link from "next/link";
import type { Beruf, UserZuordnung } from "@/types";
import {
  kiRisikoGesamt,
  modellZuordnung,
  naechsterBerufSlug,
  richtigeAnzahl,
  treffergenauigkeit,
} from "@/lib/scoring";
import { CATEGORY_LABELS } from "@/types";
import RiskGauge from "./RiskGauge";
import Disclaimer from "./Disclaimer";
import Quellen from "./Quellen";

const ZONE_TEXT: Record<"ki" | "mensch", string> = {
  ki: "Maschine",
  mensch: "Mensch",
};

export default function ErgebnisView({
  beruf,
  userZuordnung,
  alleBerufe,
  onRetry,
}: {
  beruf: Beruf;
  userZuordnung: UserZuordnung;
  alleBerufe: Beruf[];
  onRetry: () => void;
}) {
  const total = beruf.tasks.length;
  const richtig = richtigeAnzahl(userZuordnung, beruf.tasks);
  const genauigkeit = treffergenauigkeit(userZuordnung, beruf.tasks);
  const risiko = kiRisikoGesamt(beruf.tasks);
  const nextSlug = naechsterBerufSlug(beruf.slug, alleBerufe);
  const abweichungen = total - richtig;
  const userMaschine = beruf.tasks.filter(
    (t) => userZuordnung[t.id] === "ki",
  ).length;
  const userPct = total === 0 ? 0 : Math.round((userMaschine / total) * 100);

  return (
    <div className="space-y-14">
      <header>
        <p className="font-prose text-sm italic text-ink-2">
          Ergebnis: {beruf.title}
        </p>
        <p className="mt-3 font-display text-[clamp(1.8rem,4.5vw,2.7rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-ink">
          <span className="tnum">{richtig}</span> von{" "}
          <span className="tnum">{total}</span> Aufgaben hast du wie das Modell
          sortiert.
        </p>
        <p className="prose-text mt-3 text-ink">
          {abweichungen === 0
            ? "Deckungsgleich mit der Forschungseinschätzung."
            : `Bei ${abweichungen} ${
                abweichungen === 1 ? "Aufgabe" : "Aufgaben"
              } lagst du anders – das sind meist die spannenden Grenzfälle.`}{" "}
          Übereinstimmung: <span className="tnum">{genauigkeit}%</span>.
        </p>
      </header>

      <section>
        <RiskGauge value={risiko} compareValue={userPct} size="lg" />
        <p className="prose-text mt-3 text-ink">
          Du hast <span className="tnum">{userPct}%</span> der Aufgaben der
          Maschine zugeordnet. Über alle Aufgaben gemittelt verortet das Modell{" "}
          <span className="font-semibold">{beruf.title}</span> bei{" "}
          <span className="tnum">{risiko}%</span> Maschine.
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
        </div>

        <ul className="mt-4 space-y-2.5">
          {beruf.tasks.map((task) => {
            const deine = userZuordnung[task.id];
            const modell = modellZuordnung(task);
            const ok = deine === modell;
            return (
              <li
                key={task.id}
                className={`border-l-4 p-3.5 ${
                  ok ? "border-ok bg-ok-wash" : "border-miss bg-miss-wash"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="text-[0.95rem] font-semibold leading-snug text-ink">
                    {task.title}
                    <span className="ml-2 text-xs font-normal text-ink-2">
                      {CATEGORY_LABELS[task.category]}
                    </span>
                  </span>
                  <span
                    className={`inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold ${
                      ok ? "text-ok" : "text-miss"
                    }`}
                  >
                    <span aria-hidden="true">{ok ? "✓" : "✗"}</span>
                    <span className="hidden sm:inline">
                      {ok ? "stimmt überein" : "anders"}
                    </span>
                  </span>
                </div>

                <div className="mt-2.5 grid grid-cols-2 gap-3 text-sm">
                  <span>
                    <span className="block text-xs text-ink-2">Deine Wahl</span>
                    <span className={ok ? "text-ink" : "font-semibold text-miss"}>
                      {deine ? ZONE_TEXT[deine] : "—"}
                    </span>
                  </span>
                  <span>
                    <span className="block text-xs text-ink-2">
                      Modell{" "}
                      <span className="tnum">({task.kiEignung}% Maschine)</span>
                    </span>
                    <span className="text-ink">{ZONE_TEXT[modell]}</span>
                  </span>
                </div>
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

      <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-rule pt-6 text-sm">
        <button
          type="button"
          onClick={onRetry}
          className="font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:text-mensch hover:decoration-mensch"
        >
          Nochmal sortieren
        </button>
        <Link
          href="/"
          className="font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:text-mensch hover:decoration-mensch"
        >
          Alle Berufe
        </Link>
        {nextSlug && (
          <Link
            href={`/puzzle/${nextSlug}`}
            className="font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:text-mensch hover:decoration-mensch"
          >
            Nächster Beruf
          </Link>
        )}
      </div>
    </div>
  );
}
