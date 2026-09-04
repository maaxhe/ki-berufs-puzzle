"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useDraggable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import type { Beruf, UserZuordnung } from "@/types";
import DropZone, { type ZoneId } from "./DropZone";
import TaskCard from "./TaskCard";
import ErgebnisView from "./ErgebnisView";
import Disclaimer from "./Disclaimer";
import Quellen from "./Quellen";
import Legend from "./Legend";

type SlotMap = Record<string, ZoneId>;

function DraggableTask({
  taskId,
  beruf,
  selected,
  onTap,
  animate,
  index,
}: {
  taskId: string;
  beruf: Beruf;
  selected: boolean;
  onTap: () => void;
  animate: boolean;
  index: number;
}) {
  const task = beruf.tasks.find((t) => t.id === taskId)!;
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: taskId,
  });

  return (
    <div
      className={animate ? "slip-in" : undefined}
      style={animate ? { animationDelay: `${index * 45}ms` } : undefined}
    >
      <TaskCard
        ref={setNodeRef}
        task={task}
        selected={selected}
        dragging={isDragging}
        onClick={(e) => {
          e.stopPropagation();
          onTap();
        }}
        {...attributes}
        {...listeners}
      />
    </div>
  );
}

export default function TaskPuzzle({
  beruf,
  alleBerufe,
}: {
  beruf: Beruf;
  alleBerufe: Beruf[];
}) {
  const storageKey = `puzzle:${beruf.slug}`;

  const [slots, setSlots] = useState<SlotMap>(() => {
    const initial: SlotMap = {};
    beruf.tasks.forEach((t) => {
      initial[t.id] = "offen";
    });
    return initial;
  });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [view, setView] = useState<"puzzle" | "ergebnis">("puzzle");
  const [restored, setRestored] = useState(false);
  const [justMounted, setJustMounted] = useState(true);

  // Zuordnung aus sessionStorage wiederherstellen (überlebt Reload). Bewusst
  // im Effect, damit Server- und Client-Render identisch mit "offen" starten.
  useEffect(() => {
    let restoredSlots: SlotMap | null = null;
    try {
      const raw = sessionStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, unknown>;
        const next: SlotMap = {};
        beruf.tasks.forEach((t) => {
          const v = parsed[t.id];
          next[t.id] = v === "ki" || v === "mensch" ? v : "offen";
        });
        restoredSlots = next;
      }
    } catch {
      // sessionStorage nicht verfügbar – ignorieren
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (restoredSlots) setSlots(restoredSlots);
    setRestored(true);
  }, [storageKey, beruf.tasks]);

  useEffect(() => {
    if (!restored) return;
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(slots));
    } catch {
      // ignorieren
    }
  }, [slots, restored, storageKey]);

  // Der einmalige Ladeeffekt der Zettel läuft nur kurz nach dem Mounten.
  useEffect(() => {
    const t = window.setTimeout(() => setJustMounted(false), 700);
    return () => window.clearTimeout(t);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 8 },
    }),
    useSensor(KeyboardSensor),
  );

  const total = beruf.tasks.length;
  const zugeordnet = beruf.tasks.filter((t) => slots[t.id] !== "offen").length;
  const alleZugeordnet = zugeordnet === total;

  const tasksIn = (zone: ZoneId) =>
    beruf.tasks.filter((t) => slots[t.id] === zone);

  const handleDragStart = (event: DragStartEvent) =>
    setActiveId(String(event.active.id));

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;
    setSlots((prev) => ({ ...prev, [String(active.id)]: over.id as ZoneId }));
    setSelectedId(null);
  };

  const handleTaskTap = (taskId: string) => {
    const current = slots[taskId];
    if (current !== "offen") {
      setSlots((prev) => ({ ...prev, [taskId]: "offen" }));
      setSelectedId(null);
      return;
    }
    setSelectedId((cur) => (cur === taskId ? null : taskId));
  };

  const handleZoneClick = (zone: ZoneId) => {
    if (!selectedId) return;
    setSlots((prev) => ({ ...prev, [selectedId]: zone }));
    setSelectedId(null);
  };

  const resetPuzzle = () => {
    const cleared: SlotMap = {};
    beruf.tasks.forEach((t) => {
      cleared[t.id] = "offen";
    });
    setSlots(cleared);
    setSelectedId(null);
    setView("puzzle");
  };

  const userZuordnung: UserZuordnung = useMemo(() => {
    const result: UserZuordnung = {};
    beruf.tasks.forEach((t) => {
      const slot = slots[t.id];
      if (slot === "ki" || slot === "mensch") result[t.id] = slot;
    });
    return result;
  }, [slots, beruf.tasks]);

  const activeTask = activeId
    ? beruf.tasks.find((t) => t.id === activeId)
    : undefined;

  if (view === "ergebnis") {
    return (
      <div className="mx-auto max-w-[68rem] px-5 py-14 sm:px-8 sm:py-16">
        <ErgebnisView
          beruf={beruf}
          userZuordnung={userZuordnung}
          alleBerufe={alleBerufe}
          onRetry={resetPuzzle}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[68rem] px-5 pt-14 pb-10 sm:px-8 sm:pt-16">
      <Link
        href="/"
        className="font-prose text-sm italic text-ink-2 underline decoration-ink/20 underline-offset-2 hover:text-mensch hover:decoration-mensch"
      >
        Alle Berufe
      </Link>

      <h1 className="mt-4 font-display text-[clamp(1.9rem,4.5vw,2.8rem)] font-semibold leading-[1.05] tracking-[-0.015em] text-ink">
        {beruf.title}
      </h1>
      <p className="prose-text mt-3 text-ink">
        Zieh jede Aufgabe in die Spalte, die besser passt – oder tipp auf dem
        Handy erst die Aufgabe an, dann die Spalte.
      </p>

      <div className="mt-6">
        <Legend />
      </div>

      <div className="mt-8 max-w-[46rem] space-y-4">
        <Disclaimer />
        <Quellen quellen={beruf.quellen} compact />
      </div>

      {selectedId && (
        <p
          role="status"
          className="mt-6 border-l-2 border-ink bg-paper-2 py-2 pl-3 text-sm text-ink"
        >
          Aufgabe ausgewählt – tipp jetzt auf „Maschine“ oder „Mensch“.
        </p>
      )}

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="mt-8 space-y-4">
          <DropZone
            id="offen"
            title="Noch nicht sortiert"
            hint="Alle Aufgaben starten hier."
            count={tasksIn("offen").length}
            onZoneClick={() => handleZoneClick("offen")}
          >
            {tasksIn("offen").length === 0 ? (
              <p className="py-1 font-prose text-sm italic text-ink-2">
                Alles sortiert.
              </p>
            ) : (
              <div className="grid gap-2 sm:grid-cols-2">
                {tasksIn("offen").map((task, i) => (
                  <DraggableTask
                    key={task.id}
                    taskId={task.id}
                    beruf={beruf}
                    selected={selectedId === task.id}
                    onTap={() => handleTaskTap(task.id)}
                    animate={justMounted}
                    index={i}
                  />
                ))}
              </div>
            )}
          </DropZone>

          <div className="grid gap-4 md:grid-cols-2">
            <DropZone
              id="mensch"
              title="Mensch macht"
              hint="Bleibt auf absehbare Zeit menschliche Arbeit."
              count={tasksIn("mensch").length}
              onZoneClick={() => handleZoneClick("mensch")}
            >
              {tasksIn("mensch").map((task, i) => (
                <DraggableTask
                  key={task.id}
                  taskId={task.id}
                  beruf={beruf}
                  selected={selectedId === task.id}
                  onTap={() => handleTaskTap(task.id)}
                  animate={false}
                  index={i}
                />
              ))}
            </DropZone>

            <DropZone
              id="ki"
              title="Maschine übernimmt"
              hint="Kann Software heute weitgehend erledigen."
              count={tasksIn("ki").length}
              onZoneClick={() => handleZoneClick("ki")}
            >
              {tasksIn("ki").map((task, i) => (
                <DraggableTask
                  key={task.id}
                  taskId={task.id}
                  beruf={beruf}
                  selected={selectedId === task.id}
                  onTap={() => handleTaskTap(task.id)}
                  animate={false}
                  index={i}
                />
              ))}
            </DropZone>
          </div>
        </div>

        <DragOverlay>
          {activeTask ? (
            <TaskCard task={activeTask} className="rotate-[-2deg] shadow-none" />
          ) : null}
        </DragOverlay>
      </DndContext>

      <div className="sticky bottom-0 z-10 mt-12 -mx-5 border-t border-rule bg-paper px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-4 sm:-mx-8 sm:px-8">
        <div className="flex items-center gap-4">
          <div className="relative hidden h-px flex-1 bg-rule sm:block">
            <span
              className="absolute inset-y-0 left-0 bg-ink transition-all"
              style={{ width: `${(zugeordnet / total) * 100}%` }}
            />
          </div>
          <span className="tnum shrink-0 text-sm text-ink-2">
            {zugeordnet} / {total} sortiert
          </span>
          <button
            type="button"
            disabled={!alleZugeordnet}
            onClick={() => setView("ergebnis")}
            className="ml-auto shrink-0 rounded-[2px] bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-mensch disabled:cursor-not-allowed disabled:border disabled:border-rule disabled:bg-transparent disabled:text-ink-2 sm:ml-0"
          >
            Ergebnis ansehen
          </button>
        </div>
      </div>
    </div>
  );
}
