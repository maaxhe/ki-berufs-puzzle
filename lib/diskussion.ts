import type { PuzzleEinheit } from "@/types";
import { istGrenzfall } from "./scoring";

/**
 * Diskussionsfragen für Lehrkräfte – automatisch aus den Daten der jeweiligen
 * Einheit abgeleitet (Grenzfälle, Überraschungen, Extreme), damit sie zum
 * konkreten Beruf oder Studiengang passen statt generisch zu bleiben.
 */
export function diskussionsfragen(einheit: PuzzleEinheit): string[] {
  const fragen: string[] = [];
  const sortiertNachKi = [...einheit.tasks].sort(
    (a, b) => b.kiEignung - a.kiEignung,
  );
  const mostKi = sortiertNachKi[0];
  const mostMensch = sortiertNachKi[sortiertNachKi.length - 1];
  const grenzfall = [...einheit.tasks]
    .filter((t) => istGrenzfall(t.kiEignung))
    .sort((a, b) => Math.abs(a.kiEignung - 50) - Math.abs(b.kiEignung - 50))[0];
  const ueberraschend = einheit.tasks.filter((t) => t.ueberraschend);

  if (grenzfall) {
    fragen.push(
      `Bei „${grenzfall.title}“ sind sich sogar die Studien uneins. Wie würdet ihr entscheiden – und woran macht ihr das fest?`,
    );
  }
  if (ueberraschend[0]) {
    fragen.push(
      `„${ueberraschend[0].title}“ ist eine Aufgabe, bei der die Faustregel „Verwaltung = KI, Beziehung = Mensch“ in die Irre führt. Warum?`,
    );
  }
  if (mostKi) {
    fragen.push(
      `Wenn KI „${mostKi.title}“ übernimmt: Was könnte die Person mit der gewonnenen Zeit anfangen – und wer profitiert davon?`,
    );
  }
  if (mostMensch) {
    fragen.push(
      `„${mostMensch.title}“ bleibt beim Menschen. Wäre das auch so, wenn es billiger wäre, es der KI zu überlassen? Und wenn niemand dafür haften müsste?`,
    );
  }
  if (einheit.tippsMenschlich[0]) {
    fragen.push(
      `Als Stärke bleibt: „${einheit.tippsMenschlich[0]}“. Wie könnte man das in der Ausbildung oder im Studium gezielt üben?`,
    );
  }
  if (einheit.tasks.some((t) => t.kontext)) {
    fragen.push(
      "Welche Aufgaben fallen schon im Studium an, welche erst im Beruf danach? Verändert KI beides gleich stark?",
    );
  }
  fragen.push(
    "Nennt eine Aufgabe, die KI heute könnte, die ihr aber trotzdem nicht automatisieren würdet. Warum nicht?",
  );
  return fragen;
}
