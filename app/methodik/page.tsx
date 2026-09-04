import type { Metadata } from "next";
import Link from "next/link";
import { STANDARD_QUELLEN } from "@/types";

export const metadata: Metadata = {
  title: "Methodik – KI-Berufs-Puzzle",
  description:
    "Woher die KI-Werte im KI-Berufs-Puzzle kommen, wie sie zu lesen sind und was sie nicht bedeuten.",
};

const { freyOsborne, jobFuturomat, iabKurzbericht, ilo, wef, iabBetriebe } =
  STANDARD_QUELLEN;

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
            sagt: So stark könnte KI diese Aufgabe heute übernehmen oder
            unterstützen. 0 heißt nicht „KI kann gar nichts“, sondern:
            Präsenz, Beziehung, Urteil oder Verantwortung stehen im Mittelpunkt.
            100 heißt nicht „der Beruf verschwindet“, sondern: Ein großer Teil
            der Aufgabe lässt sich unter guten Bedingungen digital erledigen.
          </p>
          <p>
            Diese Einzelwerte sind meine Einschätzung – keine Messwerte und keine
            Prognose. Sie sollen im Workshop ein Gespräch anstoßen.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-[1.4rem] font-semibold text-ink">
            Die zwei Anker
          </h2>
          <p>
            Damit die Werte nicht aus der Luft gegriffen sind, habe ich sie an
            zwei ernsthaften Quellen orientiert.
          </p>
          <p>
            <strong>Frey &amp; Osborne (2013)</strong> aus Oxford haben für über
            700 Berufe geschätzt, wie wahrscheinlich es ist, dass Computer den{" "}
            <em>ganzen Beruf</em> übernehmen. Die Studie ist berühmt und wird viel
            kritisiert – die Zahlen sind eher eine Obergrenze als eine Vorhersage.
          </p>
          <p>
            Der <strong>IAB Job-Futuromat</strong> misst etwas anderes: den{" "}
            <em>Anteil der Tätigkeiten</em> eines deutschen Berufs, die sich
            technisch ersetzen ließen – zuletzt für 2022. Das passt besser auf
            deutsche Ausbildungsberufe.
          </p>
          <p>
            Diese beiden Werte messen also nicht dasselbe und lassen sich nicht
            sauber verrechnen. Ich habe sie als Orientierungsrahmen genommen und
            daraus für jeden Beruf einen <strong>didaktischen Richtwert</strong>{" "}
            abgeleitet – ein begründetes Urteil, keine statistische Kombination.
            Den jeweiligen Vergleichswert der Studie findest du im Ergebnis unter
            „Datengrundlage“.
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
            Umgekehrt beim Berufskraftfahrer: Da war die alte Schätzung sehr hoch,
            aber selbstfahrende LKW kommen viel langsamer als gedacht.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-[1.4rem] font-semibold text-ink">
            Technisch möglich heißt nicht: im Betrieb angekommen
          </h2>
          <p>„KI kann diese Aufgabe“ kann drei ganz verschiedene Dinge heißen:</p>
          <ul className="ml-5 list-disc space-y-1">
            <li>Ein System kann die Aufgabe grundsätzlich ausführen.</li>
            <li>Es funktioniert zuverlässig in echten Situationen.</li>
            <li>
              Es wird in Betrieben schon eingesetzt – und ist rechtlich erlaubt.
            </li>
          </ul>
          <p>
            Ein Sprachmodell kann einen Pflegebericht formulieren. Das heißt noch
            nicht, dass er klinisch korrekt ist, dass sensible Daten so
            verarbeitet werden dürfen oder dass die Fachkraft überflüssig wird.
          </p>
          <p>
            In der Praxis nutzt in Deutschland derzeit etwa jeder vierte Betrieb
            generative KI – stark steigend, aber sehr ungleich verteilt. Manche
            Branchen bauen ihre Abläufe schon um, andere probieren gerade erst.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-[1.4rem] font-semibold text-ink">
            Können heißt nicht Machen
          </h2>
          <p>
            Das ist der wichtigste Punkt. Dass eine Aufgabe automatisierbar ist,
            entscheidet nicht, ob sie auch automatisiert wird. Dazwischen stehen:
            Kosten – ein Mensch ist oft billiger oder flexibler. Recht – manche
            Entscheidungen darf keine Software treffen. Verantwortung – wenn
            etwas schiefgeht, muss jemand geradestehen. Und schlicht der Wunsch
            der Kundschaft, mit einem Menschen zu tun zu haben.
          </p>
          <p>
            Ein hoher Wert bedeutet also nicht „dieser Beruf verschwindet“. Er
            bedeutet: Die Arbeit verschiebt sich – weg von dem, was die KI
            übernimmt, hin zu dem, was sie nicht kann. Neue Aufgaben kommen
            dazu, andere fallen weg.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-[1.4rem] font-semibold text-ink">
            Wie dieses Tool entstanden ist
          </h2>
          <p>
            Dieses Tool wurde mit Unterstützung generativer KI entwickelt – bei
            Code, Textentwürfen, Struktur und einzelnen Formulierungen. Die
            Auswahl der Berufe und Aufgaben, die didaktische Gestaltung, die
            Quellenprüfung, die Einordnung und die Verantwortung für die
            Veröffentlichung liegen bei mir.
          </p>
          <p>
            Genau darum geht es im Workshop: KI kann Vorschläge machen – Menschen
            müssen Ziele setzen, Ergebnisse prüfen, den Kontext verstehen und
            geradestehen.
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
            {[freyOsborne, jobFuturomat, iabKurzbericht, ilo, iabBetriebe, wef].map(
              (q) => (
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
              ),
            )}
          </ol>
        </section>
      </div>
    </div>
  );
}
