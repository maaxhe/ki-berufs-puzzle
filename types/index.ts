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

/**
 * Gemeinsame Form von Beruf und Studiengang: alles, was das Puzzle, die
 * Ergebnisauswertung und die Kartenliste brauchen, unabhängig davon, ob es
 * sich um einen Beruf oder einen Studiengang handelt.
 */
export interface PuzzleEinheit {
  slug: string;
  title: string;
  shortDescription: string;
  /** 6–12 Tasks, Anzahl innerhalb einer Einheit einheitlich. */
  tasks: Task[];
  zukunftsausblick: string;
  /** Genau 3 kurze Tipps, was hier menschlich wichtig bleibt. */
  tippsMenschlich: [string, string, string];
  /** Reale Studien/Tools, an denen das Modell hier kalibriert ist. */
  quellen: Quelle[];
}

export interface Beruf extends PuzzleEinheit {
  kategorie: BerufKategorie;
}

export type StudiengangKategorie =
  | "technik-informatik"
  | "naturwissenschaft-medizin"
  | "wirtschaft-recht"
  | "geistes-sozialwissenschaft"
  | "interdisziplinaer";

export interface Studiengang extends PuzzleEinheit {
  kategorie: StudiengangKategorie;
}

export const STUDIENGANG_KATEGORIE_LABELS: Record<StudiengangKategorie, string> = {
  "technik-informatik": "Technik & Informatik",
  "naturwissenschaft-medizin": "Naturwissenschaft & Medizin",
  "wirtschaft-recht": "Wirtschaft & Recht",
  "geistes-sozialwissenschaft": "Geistes- & Sozialwissenschaft",
  interdisziplinaer: "Interdisziplinär",
};

/** Anzeige-Reihenfolge der Kategorien auf der Studiengänge-Startseite. */
export const STUDIENGANG_KATEGORIE_REIHENFOLGE: StudiengangKategorie[] = [
  "technik-informatik",
  "naturwissenschaft-medizin",
  "wirtschaft-recht",
  "geistes-sozialwissenschaft",
  "interdisziplinaer",
];

/**
 * Fünf statt drei Stufen: Mit nur drei Stufen (niedrig/mittel/hoch) landete
 * fast jeder Beruf/Studiengang im breiten Mittelband und zeigte überall
 * "Gemischtes Bild" an, obwohl sich die Durchschnittswerte sichtbar
 * unterschieden – zu wenig Differenzierung für eine Vergleichsliste.
 */
export type RisikoStufe =
  | "eindeutig-mensch"
  | "eher-mensch"
  | "gemischt"
  | "eher-ki"
  | "eindeutig-ki";

/**
 * Sprechende Labels statt Prozentzahlen: Wie stark eine ganze
 * Einheit (Beruf/Studiengang) im Schnitt Richtung KI oder Mensch tendiert.
 * Ersetzt die früher direkt angezeigte Durchschnitts-Prozentzahl, die eine
 * Präzision vortäuschte, die die zugrunde liegenden Schätzwerte nicht haben.
 */
export const STUFE_TEXT: Record<RisikoStufe, string> = {
  "eindeutig-mensch": "Eindeutig menschlich geprägt",
  "eher-mensch": "Eher menschlich geprägt",
  gemischt: "Gemischtes Bild",
  "eher-ki": "Eher KI-nah",
  "eindeutig-ki": "Stark KI-nah",
};

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
  | "jobFuturomat"
  | "iabKurzbericht"
  | "freyOsborne"
  | "ilo"
  | "wef"
  | "iabBetriebe"
  | "eloundou"
  | "clioLegal",
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
  wef: {
    label:
      "World Economic Forum: Future of Jobs Report 2025 – Arbeitgeber-Erwartungen bis 2030",
    url: "https://www.weforum.org/publications/the-future-of-jobs-report-2025/",
  },
  iabBetriebe: {
    label:
      "IAB (2025): Jeder vierte Betrieb in Deutschland nutzt generative KI – IAB-Betriebspanel",
    url: "https://iab.de/presseinfo/jeder-vierte-betrieb-in-deutschland-nutzt-generative-ki/",
  },
  eloundou: {
    label:
      "Eloundou, Manning, Mishkin & Rock (2023/24): GPTs are GPTs – Aufgaben-Exposition akademischer Berufsgruppen, Science 384",
    url: "https://arxiv.org/abs/2303.10130",
  },
  clioLegal: {
    label:
      "Clio Legal Trends Report 2024/2025: Anteil automatisierbarer Aufgaben bei Anwält:innen, Paralegals und Kanzleifachangestellten",
    url: "https://www.clio.com/resources/legal-trends/",
  },
};
