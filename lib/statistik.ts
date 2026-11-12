/**
 * Anonyme Gesamtstatistik: Wie haben alle anderen eine Aufgabe sortiert – und
 * mit welcher vorgegebenen Begründung? Freitext gibt es bewusst nicht (die
 * Zielgruppe ist minderjährig, es soll nichts moderiert werden müssen).
 * Server: raumdienst/server.mjs (/statistik/<b|s>.<slug>).
 */
import { clientId } from "./raumApi";
import type { UserZuordnung, Zuordnung } from "@/types";

const BASE = process.env.NEXT_PUBLIC_RAUM_API ?? (process.env.NEXT_PUBLIC_BASE_PATH ? "/jobs-api" : "/raum-api"); // gleiche Herkunft, nginx reicht an den Raumdienst weiter

export interface Grund {
  id: string;
  label: string;
}

/** IDs müssen zu GRUENDE in raumdienst/server.mjs passen. */
export const GRUENDE: Record<Zuordnung, Grund[]> = {
  ki: [
    { id: "k-routine", label: "Immer gleicher Ablauf" },
    { id: "k-daten", label: "Viele Daten auswerten" },
    { id: "k-schneller", label: "Geht schneller & billiger" },
    { id: "k-gibts-schon", label: "Gibt es schon als Tool" },
  ],
  mensch: [
    { id: "m-gefuehl", label: "Braucht Gefühl & Vertrauen" },
    { id: "m-risiko", label: "Fehler wären zu riskant" },
    { id: "m-haftung", label: "Jemand muss verantworten" },
    { id: "m-haende", label: "Braucht Hände & Fingerspitzengefühl" },
    { id: "m-einzelfall", label: "Jeder Fall ist anders" },
  ],
};

export interface TaskStatistik {
  ki: number;
  mensch: number;
  gruende: Record<string, number>;
}

export interface Statistik {
  /** Anzahl Browser, die diese Einheit sortiert haben (inkl. dir). */
  n: number;
  tasks: Record<string, TaskStatistik>;
}

/** Ab so vielen Stimmen pro Aufgabe zeigen wir Prozentwerte statt „noch zu wenige“. */
export const MIN_STIMMEN = 5;

export type GrundWahl = Record<string, string>;

export function einheitKey(art: "beruf" | "studium", slug: string): string {
  return `${art === "beruf" ? "b" : "s"}.${slug}`;
}

export async function ladeStatistik(key: string): Promise<Statistik> {
  const res = await fetch(`${BASE}/statistik/${encodeURIComponent(key)}`);
  if (!res.ok) throw new Error(`Fehler ${res.status}`);
  return res.json();
}

/** Sendet die eigene Zuordnung (+ Begründungen). Erneutes Senden ersetzt die alte Einsendung. */
export async function sendeStatistik(
  key: string,
  zuordnung: UserZuordnung,
  gruende: GrundWahl,
): Promise<Statistik> {
  const z: Record<string, "k" | "m"> = {};
  for (const [tid, wert] of Object.entries(zuordnung)) {
    if (wert === "ki" || wert === "mensch") z[tid] = wert === "ki" ? "k" : "m";
  }
  const res = await fetch(`${BASE}/statistik/${encodeURIComponent(key)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ clientId: clientId(), z, g: gruende }),
  });
  if (!res.ok) throw new Error(`Fehler ${res.status}`);
  return res.json();
}

/** Gewählte Begründungen pro Einheit im Browser merken, damit sie nach Neuladen noch markiert sind. */
export function gemerkteGruende(key: string): GrundWahl {
  try {
    return JSON.parse(localStorage.getItem(`gruende:${key}`) ?? "{}");
  } catch {
    return {};
  }
}

export function merkeGruende(key: string, wahl: GrundWahl): void {
  try {
    localStorage.setItem(`gruende:${key}`, JSON.stringify(wahl));
  } catch {
    /* privates Fenster o. Ä. – dann eben nicht */
  }
}
