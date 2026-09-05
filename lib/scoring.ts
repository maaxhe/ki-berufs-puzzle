import type {
  PuzzleEinheit,
  RisikoStufe,
  Task,
  UserZuordnung,
  Zuordnung,
} from "@/types";

/** Schwelle, ab der das Modell eine Aufgabe der KI-Spalte zuordnet. */
export const KI_SCHWELLE = 50;

/** Modell-Zuordnung einer einzelnen Aufgabe. */
export function modellZuordnung(task: Task): Zuordnung {
  return task.kiEignung >= KI_SCHWELLE ? "ki" : "mensch";
}

/** Anzahl Aufgaben, bei denen Nutzer:in und Modell übereinstimmen. */
export function richtigeAnzahl(
  userZuordnung: UserZuordnung,
  tasks: Task[],
): number {
  return tasks.reduce((summe, task) => {
    return summe + (userZuordnung[task.id] === modellZuordnung(task) ? 1 : 0);
  }, 0);
}

/** Durchschnittlicher KI-Wert eines Berufs in ganzen Prozent. */
export function kiRisikoGesamt(tasks: Task[]): number {
  if (tasks.length === 0) return 0;
  const summe = tasks.reduce((acc, task) => acc + task.kiEignung, 0);
  return Math.round(summe / tasks.length);
}

export function risikoStufe(wert: number): RisikoStufe {
  if (wert < 40) return "niedrig";
  if (wert <= 60) return "mittel";
  return "hoch";
}

/**
 * Sprechendes Label statt Prozentzahl für eine einzelne Aufgabe. Der
 * interne kiEignung-Wert bleibt für Sortierung und Schwelle bestehen, wird
 * aber nirgends mehr als scheinbar präzise Zahl angezeigt – niemand kann
 * "62% KI" seriös von "58%" unterscheiden, ein Grenzfall dagegen schon.
 */
export function konfidenzLabel(kiEignung: number): string {
  if (kiEignung <= 20) return "Eindeutig beim Menschen";
  if (kiEignung <= 40) return "Eher beim Menschen, aber diskutierbar";
  if (kiEignung <= 59) return "Echter Grenzfall – hier widersprechen sich auch die Studien";
  if (kiEignung <= 79) return "Eher bei der KI, aber diskutierbar";
  return "Eindeutig bei der KI";
}

/**
 * Treffergenauigkeit in Prozent (0–100): Anteil der Aufgaben, die wie das
 * Modell zugeordnet wurden. Gleiche Basis wie richtigeAnzahl, nur als Quote.
 */
export function treffergenauigkeit(
  userZuordnung: UserZuordnung,
  tasks: Task[],
): number {
  if (tasks.length === 0) return 0;
  return Math.round((richtigeAnzahl(userZuordnung, tasks) / tasks.length) * 100);
}

/**
 * Liefert einen zufälligen anderen Slug aus derselben Liste (Beruf oder
 * Studiengang) – oder null, wenn es keinen gibt.
 */
export function naechsterBerufSlug(
  aktuellerSlug: string,
  alleEinheiten: PuzzleEinheit[],
): string | null {
  const andere = alleEinheiten.filter((b) => b.slug !== aktuellerSlug);
  if (andere.length === 0) return null;
  const index = Math.floor(Math.random() * andere.length);
  return andere[index].slug;
}
