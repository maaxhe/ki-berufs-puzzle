"use client";

import { useEffect, useMemo, useState } from "react";
import type { PuzzleEinheit } from "@/types";
import { CATEGORY_LABELS } from "@/types";
import { konfidenzLabel, modellZuordnung } from "@/lib/scoring";

/** Höchstens so viele Streitfälle werden nacheinander gezeigt. */
const MAX_FAELLE = 5;

/**
 * Beamer-Ansicht für den Unterricht: Die Aufgaben, bei denen die Klasse am
 * meisten gespalten ist, nacheinander in drei Schritten –
 * 1) Aufgabe zeigen und raten lassen, 2) Verteilung der Klasse aufdecken,
 * 3) Einschätzung des Modells samt Begründung aufdecken.
 * Steuerung per Pfeiltasten/Enter oder Buttons, Esc beendet.
 */
export default function Streitfaelle({
  einheit,
  codes,
  onClose,
}: {
  einheit: PuzzleEinheit;
  codes: boolean[][];
  onClose: () => void;
}) {
  const n = codes.length;

  const faelle = useMemo(() => {
    const roh = einheit.tasks.map((task, i) => {
      const ki = codes.filter((c) => c[i]).length;
      return { task, ki, mensch: n - ki, anteil: n === 0 ? 0 : ki / n };
    });
    roh.sort((a, b) => Math.abs(a.anteil - 0.5) - Math.abs(b.anteil - 0.5));
    return roh.slice(0, MAX_FAELLE);
  }, [einheit, codes, n]);

  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<0 | 1 | 2>(0);

  const letzterSchritt = index === faelle.length - 1 && phase === 2;

  const vor = () => {
    if (phase < 2) setPhase((p) => (p + 1) as 1 | 2);
    else if (index < faelle.length - 1) {
      setIndex((i) => i + 1);
      setPhase(0);
    } else onClose();
  };
  const zurueck = () => {
    if (phase > 0) setPhase((p) => (p - 1) as 0 | 1);
    else if (index > 0) {
      setIndex((i) => i - 1);
      setPhase(2);
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight" || e.key === "Enter") {
        e.preventDefault();
        vor();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        zurueck();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // Hintergrund nicht mitscrollen lassen, solange die Ansicht offen ist.
  useEffect(() => {
    const alt = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = alt;
    };
  }, []);

  const fall = faelle[index];
  if (!fall) return null;
  const { task } = fall;
  const kiPct = Math.round(fall.anteil * 100);
  const modell = modellZuordnung(task);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Streitfälle: ${einheit.title}`}
      className="fixed inset-0 z-50 overflow-y-auto bg-paper"
    >
      <div className="mx-auto flex min-h-full max-w-[64rem] flex-col px-5 py-6 sm:px-10 sm:py-8">
        <div className="flex items-center justify-between gap-4 text-sm text-ink-2">
          <span>
            {einheit.title} · Streitfall{" "}
            <span className="tnum">
              {index + 1} von {faelle.length}
            </span>{" "}
            · {n} {n === 1 ? "Person" : "Personen"}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 rounded-[2px] border border-rule px-3 py-2 font-semibold text-ink hover:border-ink"
          >
            Beenden (Esc)
          </button>
        </div>

        <div className="flex flex-1 flex-col justify-center py-8">
          <p className="text-sm text-ink-2">
            {CATEGORY_LABELS[task.category]}
            {task.kontext &&
              ` · ${task.kontext === "studium" ? "im Studium" : "im Beruf danach"}`}
          </p>
          <h2 className="mt-2 font-display text-[clamp(2rem,5.5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-ink">
            {task.title}
          </h2>
          <p className="prose-text mt-3 max-w-[40rem] text-ink-2">
            {task.description}
          </p>

          {phase === 0 && (
            <p className="mt-10 font-display text-[clamp(1.4rem,3vw,2rem)] font-semibold text-mensch">
              Wie hat sich die Klasse entschieden?
              <span className="mt-1 block text-[1rem] font-normal text-ink-2">
                Schätzt, bevor ihr weiterklickt: Mensch oder KI – und wie
                knapp?
              </span>
            </p>
          )}

          {phase >= 1 && (
            <div className="mt-10">
              <div
                className="flex h-14 w-full overflow-hidden bg-paper-2 sm:h-20"
                role="img"
                aria-label={`${fall.mensch} Mensch, ${fall.ki} KI`}
              >
                <span
                  className="flex items-center justify-start bg-mensch pl-3 font-display text-lg font-semibold text-paper transition-all duration-500 sm:text-2xl"
                  style={{ width: `${100 - kiPct}%` }}
                >
                  {fall.mensch > 0 && (
                    <span className="tnum">{fall.mensch}</span>
                  )}
                </span>
                <span
                  className="flex items-center justify-end bg-ki pr-3 font-display text-lg font-semibold text-paper transition-all duration-500 sm:text-2xl"
                  style={{ width: `${kiPct}%` }}
                >
                  {fall.ki > 0 && <span className="tnum">{fall.ki}</span>}
                </span>
              </div>
              <div className="mt-2 flex justify-between text-sm font-semibold text-ink-2">
                <span>Mensch</span>
                <span>KI</span>
              </div>
              {phase === 1 && (
                <p className="prose-text mt-6 text-ink">
                  Eine Person von jeder Seite: Warum habt ihr so entschieden?
                  Was würde euch umstimmen?
                </p>
              )}
            </div>
          )}

          {phase === 2 && (
            <div className="mt-8 max-w-[44rem] border-l-4 border-ink bg-paper-2 p-5">
              <p className="font-display text-xl font-semibold text-ink">
                Das Modell:{" "}
                {modell === "ki" ? "eher KI" : "eher Mensch"}
              </p>
              <p className="mt-1 font-prose italic text-ink-2">
                {konfidenzLabel(task.kiEignung)}
              </p>
              <p className="prose-text mt-2 text-ink">{task.warum}</p>
              {task.ueberraschend && (
                <p className="mt-3 text-sm font-semibold text-ink">
                  Überraschend: Hier führt „Verwaltung = KI, Beziehung =
                  Mensch“ in die Irre.
                </p>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-rule pt-4">
          <button
            type="button"
            onClick={zurueck}
            disabled={index === 0 && phase === 0}
            className="min-h-12 rounded-[2px] border border-ink px-5 py-2.5 text-sm font-semibold text-ink hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:border-rule disabled:text-ink-2 disabled:hover:bg-transparent"
          >
            ← Zurück
          </button>
          <button
            type="button"
            onClick={vor}
            className="min-h-12 rounded-[2px] bg-ink px-6 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-mensch"
          >
            {letzterSchritt
              ? "Fertig"
              : phase === 0
                ? "Verteilung zeigen"
                : phase === 1
                  ? "Einschätzung des Modells zeigen"
                  : "Nächster Streitfall"}{" "}
            →
          </button>
        </div>
      </div>
    </div>
  );
}
