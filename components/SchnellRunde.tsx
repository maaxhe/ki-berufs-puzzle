"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import type { PuzzleEinheit, Task, Zuordnung } from "@/types";
import { CATEGORY_ICONS, CATEGORY_LABELS } from "@/types";
import { istGrenzfall, konfidenzLabel, modellZuordnung } from "@/lib/scoring";
import type { ZoneId } from "./DropZone";

const ZONE_TEXT: Record<Zuordnung, string> = { ki: "KI", mensch: "Mensch" };

/** Ab dieser Wischstrecke (px) gilt die Karte als beantwortet. */
const SWIPE_SCHWELLE = 80;

interface Reveal {
  taskId: string;
  antwort: Zuordnung;
}

/**
 * Schnellrunde: eine Karte nach der anderen, sofortiges Aufdecken nach jeder
 * Antwort. Der Zustand (welche Aufgabe wie einsortiert ist) liegt im
 * Elternteil (`slots`), damit Reload, Ergebnis und Klassencode unverändert
 * funktionieren – hier steckt nur die Präsentation.
 */
export default function SchnellRunde({
  beruf,
  slots,
  onAnswer,
  onFinish,
}: {
  beruf: PuzzleEinheit;
  slots: Record<string, ZoneId>;
  onAnswer: (taskId: string, zone: Zuordnung) => void;
  onFinish: () => void;
}) {
  const [reveal, setReveal] = useState<Reveal | null>(null);
  const [dx, setDx] = useState(0);
  const dragStart = useRef<number | null>(null);
  const weiterRef = useRef<HTMLButtonElement>(null);

  const total = beruf.tasks.length;
  const offen = beruf.tasks.filter((t) => slots[t.id] === "offen");
  const beantwortet = total - offen.length;
  const aktuell: Task | undefined = reveal
    ? beruf.tasks.find((t) => t.id === reveal.taskId)
    : offen[0];

  // Serie und Trefferzahl in Aufgabenreihenfolge. Grenzfälle sind neutral:
  // sie brechen keine Serie und zählen weder als richtig noch als falsch.
  let serie = 0;
  let richtig = 0;
  let eindeutigBisher = 0;
  for (const t of beruf.tasks) {
    const s = slots[t.id];
    if (s === "offen" || istGrenzfall(t.kiEignung)) continue;
    eindeutigBisher++;
    if (s === modellZuordnung(t)) {
      richtig++;
      serie++;
    } else {
      serie = 0;
    }
  }

  const antworten = (zone: Zuordnung) => {
    if (!aktuell || reveal) return;
    setDx(0);
    setReveal({ taskId: aktuell.id, antwort: zone });
    onAnswer(aktuell.id, zone);
  };

  const weiter = () => {
    setReveal(null);
    if (offen.length === 0) onFinish();
  };

  // Fokus auf "Weiter", damit Enter sofort die nächste Karte öffnet.
  useEffect(() => {
    if (reveal) weiterRef.current?.focus();
  }, [reveal]);

  // Pfeiltasten: links = Mensch, rechts = KI; im Aufdecken weiter.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const ziel = e.target as HTMLElement | null;
      if (ziel?.closest("a, input, textarea, select")) return;
      if (reveal) {
        if (e.key === "Enter" || e.key === "ArrowRight") {
          e.preventDefault();
          weiter();
        }
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        antworten("mensch");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        antworten("ki");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (reveal) return;
    dragStart.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStart.current === null) return;
    setDx(e.clientX - dragStart.current);
  };
  const onPointerEnde = () => {
    if (dragStart.current === null) return;
    dragStart.current = null;
    if (dx <= -SWIPE_SCHWELLE) antworten("mensch");
    else if (dx >= SWIPE_SCHWELLE) antworten("ki");
    else setDx(0);
  };

  if (!aktuell) {
    return (
      <div className="mt-8 max-w-[46rem] border border-rule bg-paper-2 p-6">
        <p className="font-display text-xl font-semibold text-ink">
          Alles sortiert.
        </p>
        <button
          type="button"
          onClick={onFinish}
          className="mt-4 rounded-[2px] bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-mensch"
        >
          Ergebnis ansehen
        </button>
      </div>
    );
  }

  const modell = modellZuordnung(aktuell);
  const grenz = istGrenzfall(aktuell.kiEignung);
  const stimmt = reveal ? reveal.antwort === modell : false;
  const status = !reveal ? null : grenz ? "grenzfall" : stimmt ? "ok" : "miss";
  const letzte = offen.length === 0;

  const neigung = Math.max(-1, Math.min(1, dx / 160));
  const tint =
    !reveal && Math.abs(dx) > 20
      ? dx > 0
        ? "border-ki bg-ki-wash"
        : "border-mensch bg-mensch-wash"
      : "border-ink bg-paper";

  return (
    <div className="mt-8 max-w-[34rem]">
      <div className="flex items-center justify-between gap-4 text-sm text-ink-2">
        <span className="tnum">
          Aufgabe {Math.min(beantwortet + (reveal ? 0 : 1), total)} von {total}
        </span>
        <span className="flex items-center gap-4">
          {serie >= 2 && (
            <span className="font-semibold text-ok" aria-live="polite">
              <span aria-hidden="true">🔥</span> {serie} in Folge
            </span>
          )}
          {eindeutigBisher > 0 && (
            <span className="tnum">
              ✓ {richtig} von {eindeutigBisher}
            </span>
          )}
        </span>
      </div>
      <div className="mt-2 flex gap-1" aria-hidden="true">
        {beruf.tasks.map((t) => {
          const s = slots[t.id];
          const fertig = s !== "offen";
          const farbe = !fertig
            ? "bg-rule"
            : istGrenzfall(t.kiEignung)
              ? "bg-ink-2"
              : s === modellZuordnung(t)
                ? "bg-ok"
                : "bg-miss";
          return <span key={t.id} className={`h-1.5 flex-1 ${farbe}`} />;
        })}
      </div>

      <div key={aktuell.id} className="slip-in mt-5">
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerEnde}
          onPointerCancel={onPointerEnde}
          style={{
            transform: `translateX(${dx}px) rotate(${neigung * 6}deg)`,
            touchAction: "pan-y",
          }}
          className={`select-none border-2 p-6 sm:p-7 ${tint} ${
            dx === 0 ? "transition-transform" : ""
          } ${reveal ? "" : "cursor-grab active:cursor-grabbing"}`}
        >
          <p className="text-xs text-ink-2">
            <span aria-hidden="true">{CATEGORY_ICONS[aktuell.category]}</span>{" "}
            {CATEGORY_LABELS[aktuell.category]}
            {aktuell.kontext &&
              ` · ${aktuell.kontext === "studium" ? "im Studium" : "im Beruf danach"}`}
          </p>
          <h2 className="mt-2 font-display text-[1.5rem] font-semibold leading-tight text-ink sm:text-[1.75rem]">
            {aktuell.title}
          </h2>
          <p className="prose-text mt-2 text-ink-2">{aktuell.description}</p>
        </div>
      </div>

      {!reveal ? (
        <>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => antworten("mensch")}
              className="min-h-14 rounded-[2px] bg-mensch px-4 py-3 text-base font-semibold text-paper transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              <span aria-hidden="true">← </span>Mensch
            </button>
            <button
              type="button"
              onClick={() => antworten("ki")}
              className="min-h-14 rounded-[2px] bg-ki px-4 py-3 text-base font-semibold text-paper transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              KI<span aria-hidden="true"> →</span>
            </button>
          </div>
          <p className="mt-3 text-center text-sm text-ink-2">
            Wer macht das in Zukunft? Wisch die Karte oder nutze die
            Pfeiltasten.
          </p>
        </>
      ) : (
        <div
          role="status"
          aria-live="polite"
          className={`mt-5 border-l-4 p-4 ${
            status === "ok"
              ? "border-ok bg-ok-wash"
              : status === "miss"
                ? "border-miss bg-miss-wash"
                : "border-rule bg-paper-2"
          }`}
        >
          <p
            className={`font-display text-lg font-semibold ${
              status === "ok"
                ? "text-ok"
                : status === "miss"
                  ? "text-miss"
                  : "text-ink"
            }`}
          >
            {status === "ok" && "Passt!"}
            {status === "miss" && "Das Modell sieht es anders."}
            {status === "grenzfall" && "Echter Grenzfall – beides vertretbar."}
          </p>
          <p className="mt-1 text-sm text-ink">
            Du: <span className="font-semibold">{ZONE_TEXT[reveal.antwort]}</span>
            {" · "}
            Modell: <span className="font-semibold">{ZONE_TEXT[modell]}</span>
          </p>

          <div className="mt-3" aria-hidden="true">
            <div className="relative h-2 bg-gradient-to-r from-mensch to-ki">
              <span
                className="absolute top-1/2 h-4 w-1 -translate-x-1/2 -translate-y-1/2 bg-ink ring-2 ring-paper"
                style={{ left: `${aktuell.kiEignung}%` }}
              />
            </div>
            <div className="mt-1 flex justify-between text-xs text-ink-2">
              <span>Mensch</span>
              <span>KI</span>
            </div>
          </div>
          <p className="mt-2 font-prose text-[0.95rem] italic text-ink-2">
            {konfidenzLabel(aktuell.kiEignung)}
          </p>
          <p className="mt-1.5 font-prose text-[0.95rem] leading-relaxed text-ink">
            {aktuell.warum}
          </p>
          {aktuell.ueberraschend && (
            <p className="mt-3 text-sm font-semibold text-ink">
              <span className="rounded-[2px] bg-paper px-1.5 py-0.5 ring-1 ring-rule">
                Überraschung
              </span>{" "}
              Hier führt „Verwaltung = KI, Beziehung = Mensch“ in die Irre.
            </p>
          )}
          <button
            ref={weiterRef}
            type="button"
            onClick={weiter}
            className="mt-4 w-full rounded-[2px] bg-ink px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-mensch sm:w-auto"
          >
            {letzte ? "Ergebnis ansehen" : "Weiter"}{" "}
            <span aria-hidden="true">→</span>
          </button>
        </div>
      )}
    </div>
  );
}
