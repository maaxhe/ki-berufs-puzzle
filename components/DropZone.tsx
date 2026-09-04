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
      className={`flex flex-col border transition-colors ${
        isOver ? "border-ink" : "border-rule"
      }`}
    >
      <div
        className={`flex items-center justify-between px-4 py-2.5 ${BAND[id]}`}
      >
        <h3 className="text-[0.95rem] font-semibold">{title}</h3>
        <span className="tnum text-sm">{count}</span>
      </div>
      <p className="px-4 pt-3 font-prose text-xs italic text-ink-2">{hint}</p>
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
