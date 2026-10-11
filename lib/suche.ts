import type { PuzzleEinheit } from "@/types";

/** Kleinschreibung, Umlaute und Genderzusätze vereinheitlichen („Ärzt:in“ → „arzt“). */
function normalisiere(s: string): string {
  return s
    .toLowerCase()
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/ü/g, "u")
    .replace(/ß/g, "ss")
    .replace(/[:*/]-?(in|innen|frau|r)\b/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const woerter = (s: string) => normalisiere(s).split(" ").filter(Boolean);

/** Levenshtein mit Buchstabendrehern („artz“ → „arzt“ = 1). */
function distanz(a: string, b: string): number {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      d[i][j] = Math.min(
        d[i - 1][j] + 1,
        d[i][j - 1] + 1,
        d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1])
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
  }
  return d[a.length][b.length];
}

/** Wie gut passt ein Suchwort auf eine Wortliste? 0 = gar nicht. */
function wortScore(q: string, ws: string[]): number {
  let best = 0;
  const erlaubt = q.length >= 8 ? 2 : q.length >= 4 ? 1 : 0;
  for (const w of ws) {
    if (w === q) return 10;
    if (q.length >= 3 && (w.startsWith(q) || (q.length >= 4 && w.includes(q))))
      best = Math.max(best, 8);
    else if (q.length >= 4 && q.startsWith(w) && w.length >= 4) best = Math.max(best, 7);
    else if (erlaubt) {
      // Tippfehler: gegen das ganze Wort und gegen den gleich langen Wortanfang prüfen
      const d = Math.min(distanz(q, w), distanz(q, w.slice(0, q.length)));
      if (d <= erlaubt) best = Math.max(best, 6);
    }
  }
  return best;
}

interface Index {
  stark: string[];
  beschreibung: string[];
  aufgaben: string[];
}

const cache = new WeakMap<PuzzleEinheit, Index>();

function index(e: PuzzleEinheit): Index {
  let i = cache.get(e);
  if (!i) {
    i = {
      stark: woerter([e.title, ...(e.suchbegriffe ?? [])].join(" ")),
      beschreibung: woerter(e.shortDescription),
      aufgaben: woerter(e.tasks.map((t) => `${t.title} ${t.description}`).join(" ")),
    };
    cache.set(e, i);
  }
  return i;
}

/** Jedes Suchwort muss irgendwo passen; Titel/Suchbegriffe zählen mehr als Beschreibung und Aufgaben. */
function bewerte(e: PuzzleEinheit, qs: string[]): { score: number; stark: boolean } {
  const i = index(e);
  let summe = 0;
  let stark = true;
  for (const q of qs) {
    const s = wortScore(q, i.stark);
    if (s > 0) {
      summe += s;
      continue;
    }
    stark = false;
    const b = Math.min(wortScore(q, i.beschreibung), 5);
    const a = Math.min(wortScore(q, i.aufgaben), 4);
    if (b === 0 && a === 0) return { score: 0, stark: false };
    summe += Math.max(b, a);
  }
  return { score: summe, stark };
}

export interface Suchergebnis<T extends PuzzleEinheit> {
  /** Titel oder Alltagsbegriff passt (auch mit Tippfehler). */
  treffer: T[];
  /** Nur über Beschreibung oder Aufgaben gefunden – verwandte Berufe/Studiengänge. */
  verwandt: T[];
}

export function suche<T extends PuzzleEinheit>(einheiten: T[], query: string): Suchergebnis<T> {
  const qs = woerter(query);
  if (qs.length === 0) return { treffer: einheiten, verwandt: [] };
  const bewertet = einheiten
    .map((e) => ({ e, ...bewerte(e, qs) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  return {
    treffer: bewertet.filter((x) => x.stark).map((x) => x.e),
    verwandt: bewertet.filter((x) => !x.stark).map((x) => x.e),
  };
}
