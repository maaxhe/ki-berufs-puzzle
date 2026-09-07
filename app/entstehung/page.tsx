import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Wie dieses Tool entstanden ist – KI-Berufs-Puzzle",
  description:
    "Gebaut mit Claude Code in ein paar Tagen – und was das darüber zeigt, wie man heute mit KI arbeitet.",
};

export default function EntstehungPage() {
  return (
    <div className="mx-auto max-w-[68rem] px-5 py-14 sm:px-8 sm:py-20">
      <Link
        href="/"
        className="font-prose text-sm italic text-ink-2 underline decoration-ink/20 underline-offset-2 hover:text-mensch hover:decoration-mensch"
      >
        Alle Berufe
      </Link>

      <h1 className="mt-4 font-display text-[clamp(1.9rem,4.5vw,2.8rem)] font-semibold leading-[1.05] tracking-[-0.015em] text-ink">
        Wie dieses Tool entstanden ist
      </h1>

      <div className="prose-text mt-6 max-w-[46rem] space-y-8 text-ink">
        <section className="space-y-3">
          <p>
            Kurze Frage vorweg: Wie lange, glaubst du, hat es gedauert, dieses
            Tool zu bauen – 27 Berufe, 24 Studiengänge, über 350 einzelne
            Aufgaben, Drag&amp;Drop, Vergleichsseiten, alles? Ein halbes Jahr?
            Ein Team von Entwickler:innen?
          </p>
          <p>
            Ein paar Tage. Allein. Mit einem Werkzeug namens{" "}
            <strong>Claude Code</strong>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-[1.4rem] font-semibold text-ink">
            Was ist Claude Code eigentlich?
          </h2>
          <p>
            Claude Code ist ein KI-Modell von Anthropic, das nicht nur Text
            ausgibt wie ein Chatbot, sondern direkt in einem Projekt
            arbeitet: Es liest Code, schreibt ihn, testet ihn selbst, findet
            eigene Fehler und behebt sie – und das in einer Endlosschleife,
            bis etwas Funktionierendes dabei rauskommt. Man nennt das{" "}
            <em>agentisches Coden</em>: Ich gebe eine Aufgabe, und das Modell
            arbeitet sie eigenständig ab, statt nur einen Codeschnipsel
            vorzuschlagen, den ich selbst einbauen müsste.
          </p>
          <p>
            Konkret heißt das: Ich habe getippt „mach die Studiengänge-Seite
            optisch unterscheidbar von den Berufen“ oder „die Prozentzahlen
            wirken zu ungenau, überleg dir was Besseres“. Und Claude Code hat
            selbstständig Dateien durchsucht, CSS-Variablen umgebaut, Code
            geschrieben, den Build laufen lassen, Fehler gefunden und
            korrigiert – bis die Seite tatsächlich lief.
          </p>
          <figure className="space-y-2">
            <Image
              src="/entstehung/claude-code-diff.png"
              alt="Terminal-Ausschnitt: Claude Code ändert eigenständig CSS-Variablen in app/globals.css, nachdem ich getippt hatte „mache den Kontrast zwischen Beruf und Studium noch etwas deutlicher“."
              width={1962}
              height={1196}
              className="w-full rounded-[2px] border border-rule"
            />
            <figcaption className="text-sm text-ink-2">
              So sieht das in echt aus: Ich tippe „mache den Kontrast
              zwischen Beruf und Studium noch etwas deutlicher“ – Claude Code
              findet selbstständig die richtigen CSS-Variablen in{" "}
              <code className="text-[0.85em]">app/globals.css</code> und
              ändert sie.
            </figcaption>
          </figure>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-[1.4rem] font-semibold text-ink">
            Der eigentlich wichtige Teil: Ich musste trotzdem ständig
            eingreifen
          </h2>
          <p>
            Und hier wird es spannend – auch für das, worum es in diesem Tool
            geht. Claude Code konnte den Code schreiben. Aber ob die{" "}
            <em>Inhalte</em> stimmten, musste ich beurteilen. Ein Beispiel:
            Als die Studiengänge fertig kalibriert waren, stand Physiotherapeut
            bei rund 40 % KI-Anteil. Mein Kommentar dazu, ziemlich genau so
            getippt: „dein Ernst???? Wie soll man so viel KI in den Beruf
            bringen. Der Beruf bleibt natürlich ganz klar beim Menschen!“
          </p>
          <p>
            Das Modell hatte einfach alle Aufgaben gleich gewichtet –
            Dokumentation und Abrechnung genauso stark wie die eigentliche
            Behandlung am Patienten. Rechnerisch nicht falsch, inhaltlich
            aber Unsinn: Zwei Verwaltungsaufgaben von acht ziehen den
            Schnitt nach oben, obwohl sie im echten Arbeitsalltag einer
            Physiotherapeutin einen Bruchteil der Zeit ausmachen. Erst mein
            Widerspruch hat dazu geführt, dass die Werte neu und realistischer
            kalibriert wurden – und danach habe ich <em>jeden einzelnen</em>{" "}
            der über 350 Werte noch einmal durchgeschaut.
          </p>
          <p>
            Genau das ist die Lektion, die auch bei den{" "}
            <Link
              href="/erkenntnisse"
              className="underline decoration-ink/30 underline-offset-2 hover:text-mensch hover:decoration-mensch"
            >
              Erkenntnissen
            </Link>{" "}
            aus diesem Tool immer wieder auftaucht: KI kann heute enorm viel
            <em> ausführen</em>. Ob das Ergebnis stimmt, taugt oder Sinn
            ergibt, entscheidet trotzdem ein Mensch, der genau hinschaut und
            nachfragt.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-[1.4rem] font-semibold text-ink">
            Ein paar Zahlen zum Prozess
          </h2>
          <p>
            Von der ersten Zeile Code bis zu dieser Version: knapp 40 Commits
            über wenige Tage, fast alle direkt live geschaltet, sobald sie
            funktionierten. Kein Entwicklungsteam, kein Lastenheft – nur ein
            Chat mit einem KI-Modell, das direkt im Code arbeitet, und ich als
            jemand, der ständig nachgehakt hat: „nein, überleg nochmal“, „das
            ergibt keinen Sinn, warum ist das so eingeordnet?“, „schau dir das
            nochmal genau an“.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-[1.4rem] font-semibold text-ink">
            Was das für euch bedeutet
          </h2>
          <p>
            Der Punkt hier ist nicht „schaut her, wie schnell KI ein Tool
            bauen kann“ – auch wenn das beeindruckend ist. Der Punkt ist: Wer
            heute mit KI arbeitet, muss trotzdem <em>wissen</em>, worüber
            sie oder er urteilt. Ich musste über Berufe und Studiengänge
            nachdenken, um die KI-generierten Werte zu hinterfragen. Ohne
            dieses eigene Urteilsvermögen wäre am Ende nur eine hübsch
            aussehende, aber inhaltlich falsche Seite rausgekommen.
          </p>
          <p>
            Das gilt für euch genauso, egal ob ihr später mit KI programmiert,
            schreibt oder recherchiert: Sie liefert einen ersten Entwurf,
            oft einen richtig guten. Ob er stimmt, bleibt eure Aufgabe.
          </p>
        </section>

        <section className="space-y-2 border-t border-rule pt-6 text-sm">
          <p>
            Mehr zu Claude Code:{" "}
            <a
              href="https://claude.com/product/claude-code"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-ink/30 underline-offset-2 hover:text-mensch hover:decoration-mensch"
            >
              claude.com/product/claude-code
            </a>
            . Woher die Inhalte dieses Tools kommen, steht auf der{" "}
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
