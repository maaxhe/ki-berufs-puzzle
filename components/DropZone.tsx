"use client";

import type { ReactNode } from "react";
import { useDroppable } from "@dnd-kit/core";

export type ZoneId = "offen" | "ki" | "mensch";

interface DropZoneProps {
  id: ZoneId;
  title: string;
  hint: string;
  count: number;
  /** Wird beim Einsortieren per Tippen (Fallback) aufgerufen. */
  onZoneClick: () => void;
  children: ReactNode;
}

// Zusätzlich zur Farbe trägt jede Spalte eine Form (Farbfehlsichtigkeit): offen = Ring, KI = Quadrat, Mensch = Kreis.
const FORM: Record<ZoneId, string> = {
  offen: "rounded-full border-2 border-current",
  ki: "rounded-[3px] bg-current",
  mensch: "rounded-full bg-current",
};

const BAND: Record<ZoneId, string> = {
  offen: "bg-ink text-paper",
  ki: "bg-ki text-paper",
  mensch: "bg-mensch text-paper",
};

const OVER_BODY: Record<ZoneId, string> = {
  offen: "bg-paper-2",
  ki: "bg-ki-wash",
  mensch: "bg-mensch-wash",
};

export default function DropZone({
  id,
  title,
  hint,
  count,
  onZoneClick,
  children,
}: DropZoneProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <section
      ref={setNodeRef}
      onClick={onZoneClick}
      className={`flex flex-col overflow-hidden rounded-2xl border-2 transition-colors ${
        isOver ? "border-ink" : "border-rule"
      }`}
    >
      <div
        className={`flex items-center justify-between px-4 py-2.5 ${BAND[id]}`}
      >
        <h3 className="flex items-center gap-2 text-base font-bold">
          <span aria-hidden="true" className={`inline-block h-3 w-3 shrink-0 ${FORM[id]}`} />
          {title}
        </h3>
        <span className="tnum text-sm">{count}</span>
      </div>
      <p className="px-4 pt-3 text-sm text-ink-2">{hint}</p>
      <div
        className={`flex flex-1 flex-col gap-2.5 p-4 pb-5 transition-colors ${
          isOver ? OVER_BODY[id] : ""
        }`}
      >
        {children}
      </div>
    </section>
  );
}
