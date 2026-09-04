export type TaskCategory =
  | "routine"
  | "kreativ"
  | "sozial"
  | "analytisch"
  | "physisch";

/** Wo eine Aufgabe einsortiert wurde bzw. wird. */
export type Zuordnung = "ki" | "mensch";

export interface Task {
  id: string;
  title: string;
  description: string;
  /** 0–100: wie gut KI diese Aufgabe heute übernehmen kann (didaktischer Schätzwert). */
  kiEignung: number;
  category: TaskCategory;
  /** Ein Satz, warum der Wert so hoch oder niedrig ist – wird im Ergebnis gezeigt. */
  warum: string;
}

/** Verweis auf eine reale Datenquelle zur Automatisierbarkeit eines Berufs. */
export interface Quelle {
  label: string;
  url: string;
  /** Optionaler konkreter Vergleichswert aus dieser Quelle, z. B. "94 %". */
  wert?: string;
}

export type BerufKategorie =
  | "gesundheit-soziales"
  | "technik-handwerk"
  | "buero-verwaltung"
  | "it-medien"
  | "handel-dienstleistung";

export interface Beruf {
  slug: string;
  title: string;
  shortDescription: string;
  kategorie: BerufKategorie;
  /** 8–12 Tasks, Anzahl innerhalb eines Berufs einheitlich. */
  tasks: Task[];
  zukunftsausblick: string;
  /** Genau 3 kurze Tipps, was in diesem Beruf menschlich wichtig bleibt. */
  tippsMenschlich: [string, string, string];
  /** Reale Studien/Tools, an denen das Modell für diesen Beruf kalibriert ist. */
  quellen: Quelle[];
}

export type RisikoStufe = "niedrig" | "mittel" | "hoch";

/** Zuordnung der Nutzer:innen: Task-ID -> Spalte. */
export type UserZuordnung = Record<string, Zuordnung>;

export const CATEGORY_ICONS: Record<TaskCategory, string> = {
  routine: "⚙️",
  kreativ: "🎨",
  sozial: "💚",
  analytisch: "📊",
  physisch: "🛠️",
};

export const CATEGORY_LABELS: Record<TaskCategory, string> = {
  routine: "Routine",
  kreativ: "Kreativ",
  sozial: "Sozial",
  analytisch: "Analytisch",
  physisch: "Körperlich",
};

export const KATEGORIE_LABELS: Record<BerufKategorie, string> = {
  "gesundheit-soziales": "Gesundheit & Soziales",
  "technik-handwerk": "Technik & Handwerk",
  "buero-verwaltung": "Büro & Verwaltung",
  "it-medien": "IT & Medien",
  "handel-dienstleistung": "Handel & Dienstleistung",
};

/** Anzeige-Reihenfolge der Kategorien auf der Startseite. */
export const KATEGORIE_REIHENFOLGE: BerufKategorie[] = [
  "gesundheit-soziales",
  "technik-handwerk",
  "buero-verwaltung",
  "it-medien",
  "handel-dienstleistung",
];

/** Wiederverwendbare Verweise auf die zugrunde liegenden Studien. */
export const STANDARD_QUELLEN: Record<
  "jobFuturomat" | "iabKurzbericht" | "freyOsborne" | "ilo",
  Quelle
> = {
  jobFuturomat: {
    label: "IAB Job-Futuromat – Substituierbarkeitspotenzial je Beruf",
    url: "https://job-futuromat.iab.de/",
  },
  iabKurzbericht: {
    label:
      "IAB-Kurzbericht 5|2024: Substituierbarkeitspotenziale von Berufen (Dengler / Matthes)",
    url: "https://job-futuromat.iab.de/content/text/kb2024-05.pdf",
  },
  freyOsborne: {
    label:
      "Frey & Osborne (2013): The Future of Employment – Wahrscheinlichkeit der Computerisierung, Oxford Martin School",
    url: "https://www.oxfordmartin.ox.ac.uk/publications/the-future-of-employment-how-susceptible-are-jobs-to-computerisation",
  },
  ilo: {
    label:
      "ILO Working Paper 96 (Gmyrek et al. 2023): Generative AI and Jobs – Aufgaben-Exposition",
    url: "https://www.ilo.org/sites/default/files/2024-07/WP96_web.pdf",
  },
};
