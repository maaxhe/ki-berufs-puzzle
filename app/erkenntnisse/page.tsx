import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Was mir beim Bauen aufgefallen ist – KI-Berufs-Puzzle",
  description:
    "Über 350 Aufgaben aus Berufen und Studiengängen kalibriert – was dabei an Mustern sichtbar wurde.",
};

export default function ErkenntnissePage() {
  return (
    <div className="mx-auto max-w-[68rem] px-5 py-14 sm:px-8 sm:py-20">
      <Link
        href="/"
        className="font-prose text-sm italic text-ink-2 underline decoration-ink/20 underline-offset-2 hover:text-mensch hover:decoration-mensch"
      >
        Alle Berufe
      </Link>

      <h1 className="mt-4 font-display text-[clamp(1.9rem,4.5vw,2.8rem)] font-semibold leading-[1.05] tracking-[-0.015em] text-ink">
        Was mir beim Bauen aufgefallen ist
      </h1>

      <div className="prose-text mt-6 max-w-[46rem] space-y-8 text-ink">
        <section className="space-y-3">
          <p>
            Studium oder Ausbildung – was ist eigentlich sicherer vor KI? Das
            war die Frage, die mich zu diesem Tool gebracht hat. Und meine
            Vermutung ging eher in die andere Richtung, als man erwarten
            würde: Handwerk trifft es am wenigsten. Da geht es um echte
            Hände, echte Werkstoffe, echte Räume – das übernimmt kein Modell
            einfach so. Die eigentlich unbequeme Frage ist doch: Lohnt sich
            ein Studium überhaupt noch, wenn Sprachmodelle immer
            zuverlässiger akademische Texte schreiben, Code produzieren,
            Analysen liefern – also genau die Dinge, für die man früher
            jahrelang studiert hat?
          </p>
          <p>
            Also habe ich angefangen, Aufgabe für Aufgabe durchzugehen. Erst
            für 27 Berufe, dann für 24 Studiengänge, am Ende über 350
            einzelne Aufgaben. Und je mehr ich kalibriert habe, desto klarer
            wurde: Ein Studium ist nicht automatisch die sicherere Wahl. Der
            Bildungsweg selbst sagt fast nichts darüber aus, wie gut du vor
            KI geschützt bist.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-[1.4rem] font-semibold text-ink">
            Der Titel entscheidet nicht. Die Aufgabe entscheidet.
          </h2>
          <p>
            Jura und BWL – zwei Studiengänge, die man eher selten mit
            Automatisierungsangst verbindet. Und trotzdem: voller Routine,
            die KI heute schon gut kann. Standardverträge, Kennzahlen
            berechnen, Rechtsrecherche. Bei Kanzleifachangestellten gelten
            laut <em>Clio Legal Trends</em> um die 81 % der Aufgaben als
            automatisierbar. Bei Anwält:innen selbst sind es nur rund 57 %.
            Allein das zeigt schon: Innerhalb eines einzigen Berufsfelds
            kann der Unterschied riesig sein – je nachdem, wer die Aufgabe
            eigentlich macht.
          </p>
          <p>
            Auf der anderen Seite: Pflegefachkraft, Erzieher:in, Soziale
            Arbeit. Alles Berufe bzw. Studiengänge ohne großen akademischen
            Nimbus – aber mit einem Kern, an den KI nicht rankommt. Da geht
            es um Vertrauen, um Präsenz, um Verantwortung für einen anderen
            Menschen. Das lässt sich nicht outsourcen, egal wie gut das
            nächste Sprachmodell wird.
          </p>
          <p>
            Die ehrliche Lektion daraus: Es ist nicht der Bildungsweg, der
            zählt. Es ist, wie viel von dem, was du tatsächlich tust,
            Beziehungsarbeit oder persönliche Verantwortung ist – und wie
            viel davon strukturierte, wiederholbare Routine.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-[1.4rem] font-semibold text-ink">
            Warum ich die Prozentzahlen wieder rausgenommen habe
          </h2>
          <p>
            Am Anfang stand bei jeder Aufgabe eine Zahl: „62 % KI“. Wirkt
            erstmal seriös. Ist es aber nicht. Niemand – auch keine Studie,
            die ich für dieses Tool gelesen habe – kann seriös zwischen 58 %
            und 62 % unterscheiden. Diese Präzision gibt es einfach nicht.
          </p>
          <p>
            Also habe ich die Zahl wieder aus der Oberfläche genommen. Was du
            jetzt siehst, ist ein Label wie „Eindeutig bei der KI“ – oder,
            genau bei den Aufgaben, wo es wirklich knapp ist: „Echter
            Grenzfall, hier widersprechen sich auch die Studien“. Und genau
            diese Grenzfälle werden im Ergebnis nicht mehr als richtig oder
            falsch gewertet. Wenn selbst die Forschung uneins ist, kann ich
            dich nicht dafür bestrafen, dass du anders getippt hast als mein
            Modell.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-[1.4rem] font-semibold text-ink">
            Können heißt nicht Machen
          </h2>
          <p>
            Das war mir vorher schon klar, aber beim Kalibrieren von 350
            Aufgaben ist es mir noch mal richtig bewusst geworden: Dass eine
            Aufgabe automatisierbar <em>ist</em>, heißt nicht, dass sie
            automatisiert <em>wird</em>. Dazwischen stehen Kosten, Recht,
            Haftung – und schlicht der Wunsch, mit einem Menschen zu tun zu
            haben. Ein Sprachmodell kann heute einen Pflegebericht
            formulieren. Heißt das, die Fachkraft wird überflüssig? Nein.
          </p>
          <p>
            Fast jeder Beruf und jeder Studiengang, den ich mir angeschaut
            habe, hat beides: stark automatisierbare Anteile und Anteile,
            die ziemlich menschlich bleiben. Die eigentliche Zukunftsfrage
            ist meistens nicht „gibt es meinen Job noch“, sondern „welcher
            Teil meiner Arbeit wächst gerade“.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-[1.4rem] font-semibold text-ink">
            Was das für dich bedeutet
          </h2>
          <p>
            Wenn du gerade zwischen Ausbildung und Studium stehst: Frag
            weniger „welcher Weg ist sicherer“ und mehr „was mache ich in
            diesem Beruf eigentlich den ganzen Tag“. Steckt viel Vertrauen,
            Präsenz oder Verantwortung für andere Menschen drin? Dann bist du
            vermutlich gut aufgestellt – unabhängig davon, ob davor ein
            Ausbildungs- oder ein Studienzeugnis stand.
          </p>
          <p>
            Sortier ein paar Aufgaben selbst durch – bei einem Beruf oder
            einem Studiengang, der dich interessiert – und schau, wo du mit
            dem Modell übereinstimmst und wo nicht. Genau diese
            Meinungsverschiedenheiten sind der spannendste Teil.
          </p>
        </section>

        <section className="space-y-2 border-t border-rule pt-6 text-sm">
          <p>
            Woher die einzelnen Zahlen und Quellen kommen, steht ausführlich
            auf der{" "}
            <Link
              href="/methodik"
              className="underline decoration-ink/30 underline-offset-2 hover:text-mensch hover:decoration-mensch"
            >
              Methodik-Seite
            </Link>
            .
          </p>
        </section>

        <p className="pt-2 text-sm text-ink-2">Bis zum nächsten Mal, Euer Max</p>
      </div>
    </div>
  );
}
