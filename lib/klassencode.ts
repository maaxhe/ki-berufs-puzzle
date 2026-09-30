import type { PuzzleEinheit, UserZuordnung } from "@/types";

/**
 * Klassenmodus ohne Server: Jede:r Schüler:in bekommt nach dem Sortieren einen
 * kurzen Code, der nur die Zuordnung enthält (keine Namen, keine Daten). Die
 * Lehrkraft fügt die Codes der Klasse auf /klasse ein und sieht die
 * gemeinsame Auswertung – alles passiert im Browser.
 *
 * Format: `<b|s>.<slug>.<anzahl>.<bits-base36>` – "b" für Berufe, "s" für
 * Studiengänge; die Bits stehen für die Aufgaben in Reihenfolge (1 = KI).
 */
export type EinheitArt = "beruf" | "studium";

export interface DekodierterCode {
  art: EinheitArt;
  slug: string;
  /** Pro Aufgabe (in Datenreihenfolge): true = KI, false = Mensch. */
  ki: boolean[];
}

export function erzeugeCode(
  art: EinheitArt,
  einheit: PuzzleEinheit,
  zuordnung: UserZuordnung,
): string {
  const bits = einheit.tasks
    .map((t) => (zuordnung[t.id] === "ki" ? "1" : "0"))
    .join("");
  // Führende "1" als Marker, damit führende Nullen nicht verloren gehen.
  const wert = BigInt(`0b1${bits}`).toString(36);
  return `${art === "beruf" ? "b" : "s"}.${einheit.slug}.${einheit.tasks.length}.${wert}`;
}

export function dekodiereCode(roh: string): DekodierterCode | null {
  const teile = roh.trim().split(".");
  if (teile.length !== 4) return null;
  const [artKurz, slug, anzahlText, wert] = teile;
  if (artKurz !== "b" && artKurz !== "s") return null;
  const anzahl = Number(anzahlText);
  if (!Number.isInteger(anzahl) || anzahl < 1 || anzahl > 40) return null;
  if (!/^[0-9a-z]+$/.test(wert)) return null;

  let zahl = BigInt(0);
  for (const zeichen of wert) {
    zahl = zahl * BigInt(36) + BigInt(parseInt(zeichen, 36));
  }
  const binaer = zahl.toString(2);
  if (binaer.length !== anzahl + 1 || binaer[0] !== "1") return null;

  return {
    art: artKurz === "b" ? "beruf" : "studium",
    slug,
    ki: binaer
      .slice(1)
      .split("")
      .map((b) => b === "1"),
  };
}

/** Codes aus Freitext lesen (Zeilenumbrüche, Leerzeichen, Kommas). */
export function leseCodes(text: string): {
  gueltig: DekodierterCode[];
  ungueltig: string[];
} {
  const stuecke = text
    .split(/[\s,;]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const gueltig: DekodierterCode[] = [];
  const ungueltig: string[] = [];
  for (const stueck of stuecke) {
    const dek = dekodiereCode(stueck);
    if (dek) gueltig.push(dek);
    else ungueltig.push(stueck);
  }
  return { gueltig, ungueltig };
}
