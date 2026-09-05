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

/** Spanne um die 50-Punkte-Schwelle, in der die Einschätzung als echter
 *  Grenzfall gilt – hier ist "richtig" oder "falsch" keine sinnvolle
 *  Kategorie mehr, weil sich selbst die zugrunde liegenden Studien nicht
 *  einig wären. */
const GRENZFALL_MIN = 41;
const GRENZFALL_MAX = 59;

/** Ob eine Aufgabe im echten Grenzbereich um die 50-Punkte-Schwelle liegt. */
export function istGrenzfall(kiEignung: number): boolean {
  return kiEignung >= GRENZFALL_MIN && kiEignung <= GRENZFALL_MAX;
}

/** Anzahl der Grenzfall-Aufgaben in einer Aufgabenliste. */
export function grenzfaelleAnzahl(tasks: Task[]): number {
  return tasks.filter((t) => istGrenzfall(t.kiEignung)).length;
}

/**
 * Anzahl Aufgaben, bei denen Nutzer:in und Modell übereinstimmen – gezählt
 * nur unter den eindeutigen Aufgaben. Grenzfälle fließen bewusst nicht als
 * "richtig" oder "falsch" ein, weil dort jede Antwort vertretbar ist.
 */
export function richtigeAnzahl(
  userZuordnung: UserZuordnung,
  tasks: Task[],
): number {
  return tasks.reduce((summe, task) => {
    if (istGrenzfall(task.kiEignung)) return summe;
    return summe + (userZuordnung[task.id] === modellZuordnung(task) ? 1 : 0);
  }, 0);
}

/** Durchschnittlicher KI-Wert eines Berufs in ganzen Prozent. */
export function kiRisikoGesamt(tasks: Task[]): number {
  if (tasks.length === 0) return 0;
  const summe = tasks.reduce((acc, task) => acc + task.kiEignung, 0);
  return Math.round(summe / tasks.length);
}

/** Feste Bänder über die volle 0–100-Skala – Fallback, wenn keine
 *  Vergleichsliste zur Verfügung steht. */
export function risikoStufe(wert: number): RisikoStufe {
  if (wert <= 20) return "eindeutig-mensch";
  if (wert <= 40) return "eher-mensch";
  if (wert <= 59) return "gemischt";
  if (wert <= 79) return "eher-ki";
  return "eindeutig-ki";
}

/**
 * Stufe relativ zu allen anderen Werten in derselben Liste (Quintile) statt
 * über feste 0–100-Bänder. Grund: Die Durchschnittswerte realer Berufe und
 * Studiengänge liegen selten an den Rändern der Skala – ein ganzes Berufs-
 * feld, das im Schnitt "eindeutig KI" (>80) wäre, gibt es praktisch nicht,
 * weil fast überall ein paar Aufgaben mit Beziehungsarbeit/Verantwortung
 * dazwischenstehen. Feste Bänder liefen deshalb Gefahr, dass fast alles im
 * mittleren Band landet ("überall Gemischtes Bild"). Die Quintil-Einteilung
 * verteilt stattdessen relativ zur tatsächlichen Bandbreite der Liste.
 */
export function risikoStufeInListe(
  wert: number,
  alleWerte: number[],
): RisikoStufe {
  if (alleWerte.length < 5) return risikoStufe(wert);
  const sortiert = [...alleWerte].sort((a, b) => a - b);
  const quantil = (p: number) =>
    sortiert[Math.min(sortiert.length - 1, Math.floor(p * sortiert.length))];
  if (wert <= quantil(0.2)) return "eindeutig-mensch";
  if (wert <= quantil(0.4)) return "eher-mensch";
  if (wert <= quantil(0.6)) return "gemischt";
  if (wert <= quantil(0.8)) return "eher-ki";
  return "eindeutig-ki";
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
  if (istGrenzfall(kiEignung))
    return "Echter Grenzfall – hier widersprechen sich auch die Studien";
  if (kiEignung <= 79) return "Eher bei der KI, aber diskutierbar";
  return "Eindeutig bei der KI";
}

/**
 * Treffergenauigkeit in Prozent (0–100): Anteil der eindeutigen Aufgaben
 * (ohne Grenzfälle), die wie das Modell zugeordnet wurden. Gleiche Basis
 * wie richtigeAnzahl, nur als Quote über die eindeutigen Aufgaben.
 */
export function treffergenauigkeit(
  userZuordnung: UserZuordnung,
  tasks: Task[],
): number {
  const eindeutig = tasks.length - grenzfaelleAnzahl(tasks);
  if (eindeutig === 0) return 0;
  return Math.round((richtigeAnzahl(userZuordnung, tasks) / eindeutig) * 100);
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
