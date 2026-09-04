import type { Metadata } from "next";
import Link from "next/link";
import { STANDARD_QUELLEN } from "@/types";

export const metadata: Metadata = {
  title: "Methodik – KI-Berufs-Puzzle",
  description:
    "Woher die KI-Werte im KI-Berufs-Puzzle kommen, wie sie zu lesen sind und was sie nicht bedeuten.",
};

const { freyOsborne, jobFuturomat, iabKurzbericht, ilo } = STANDARD_QUELLEN;

export default function MethodikPage() {
  return (
    <div className="mx-auto max-w-[68rem] px-5 py-14 sm:px-8 sm:py-20">
      <Link
        href="/"
        className="font-prose text-sm italic text-ink-2 underline decoration-ink/20 underline-offset-2 hover:text-mensch hover:decoration-mensch"
      >
        Alle Berufe
      </Link>

      <h1 className="mt-4 font-display text-[clamp(1.9rem,4.5vw,2.8rem)] font-semibold tracking-[-0.015em] text-ink">
        Woher die Zahlen kommen
      </h1>

      <div className="prose-text mt-6 space-y-10 text-ink">
        <section className="space-y-3">
          <p>
            Jede Aufgabe in diesem Tool hat einen Wert zwischen 0 und 100. Er
            sagt: So gut könnte eine Maschine diese Aufgabe heute übernehmen. 0
            heißt „reine Menschensache“, 100 heißt „das kann Software praktisch
            allein“. Diese Einzelwerte sind meine Einschätzung. Sie sind dazu da,
            ein Gespräch anzustoßen – nicht, um eine Prognose abzugeben.
          </p>
          <p>
            Damit die Einschätzung nicht aus der Luft gegriffen ist, habe ich den
            Durchschnitt jedes Berufs an zwei ernsthaften Quellen geeicht.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-[1.4rem] font-semibold text-ink">
            Die zwei Quellen
          </h2>
          <p>
            Die erste ist die Studie von <strong>Frey &amp; Osborne (2013)</strong>{" "}
            aus Oxford. Sie hat für über 700 Berufe geschätzt, wie
            wahrscheinlich es ist, dass Computer sie übernehmen. Sie ist berühmt,
            wird aber auch viel kritisiert – die Zahlen sind eher eine Obergrenze
            als eine Vorhersage.
          </p>
          <p>
            Die zweite ist der <strong>IAB Job-Futuromat</strong> vom Institut
            für Arbeitsmarkt- und Berufsforschung. Er zeigt für deutsche Berufe,
            welcher Anteil der Tätigkeiten sich <em>technisch</em> ersetzen ließe
            – das sogenannte Substituierbarkeitspotenzial, zuletzt für das Jahr
            2022. Diese Zahlen passen besser auf deutsche Ausbildungsberufe.
          </p>
          <p>
            Ich habe beide nebeneinandergelegt und für jeden Beruf einen
            plausiblen Mittelwert gewählt. Den Vergleichswert der Studie findest
            du im Ergebnis bei jedem Beruf unter „Datengrundlage“.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-[1.4rem] font-semibold text-ink">
            Warum IT und Kreativberufe höher stehen, als die Studien sagen
          </h2>
          <p>
            Frey &amp; Osborne haben 2013 gerechnet – lange vor ChatGPT.
            Softwareentwicklung stand bei ihnen bei 4 Prozent, Grafikdesign bei 8
            Prozent. Das kann man heute nicht mehr ernst nehmen. Generative KI
            schreibt inzwischen große Teile des Alltagscodes und liefert
            Bildentwürfe im Sekundentakt. Für diese Berufe habe ich die Werte
            deshalb bewusst nach oben gezogen und im Ausblick erklärt, warum.
          </p>
          <p>
            Umgekehrt beim Berufskraftfahrer: Da war die alte Schätzung sehr
            hoch, aber selbstfahrende LKW kommen viel langsamer als gedacht.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-[1.4rem] font-semibold text-ink">
            „Die Maschine kann das“ heißt nicht „die Maschine macht das“
          </h2>
          <p>
            Das ist der wichtigste Punkt. Dass eine Aufgabe technisch
            automatisierbar ist, entscheidet nicht, ob sie auch automatisiert
            wird. Dazwischen stehen: Kosten – ein Mensch ist oft billiger oder
            flexibler. Recht – manche Entscheidungen darf keine Software treffen.
            Verantwortung – wenn etwas schiefgeht, muss jemand geradestehen. Und
            schlicht der Wunsch der Kundschaft, mit einem Menschen zu tun zu
            haben.
          </p>
          <p>
            Ein hoher Wert bedeutet also nicht „dieser Beruf verschwindet“. Er
            bedeutet: In diesem Beruf verschiebt sich die Arbeit – weg von dem,
            was die Maschine übernimmt, hin zu dem, was sie nicht kann.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-[1.4rem] font-semibold text-ink">
            Was dieses Tool nicht ist
          </h2>
          <p>
            Es ist keine Berufsberatung und keine Vorhersage deiner Zukunft. Die
            Werte sind grob, sie altern, und sie stehen hier vor allem, damit man
            im Workshop darüber streiten kann. Stand der Zahlen: 2025.
          </p>
        </section>

        <section className="space-y-2 border-t border-rule pt-6">
          <h2 className="font-display text-sm font-semibold text-ink">Quellen</h2>
          <ol className="mt-1 list-inside list-decimal space-y-1.5 text-[0.95rem] leading-relaxed">
            {[freyOsborne, jobFuturomat, iabKurzbericht, ilo].map((q) => (
              <li key={q.url}>
                <a
                  href={q.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-ink/30 underline-offset-2 hover:text-mensch hover:decoration-mensch"
                >
                  {q.label}
                </a>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
