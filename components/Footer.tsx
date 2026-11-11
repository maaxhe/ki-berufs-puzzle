import Link from "next/link";
import { CoxilabSignet, PuzzleSignet } from "@/components/Signet";

export default function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto max-w-[68rem] px-5 py-12 sm:px-8 sm:py-14">
        <p className="inline-flex items-center gap-2 font-display text-sm font-semibold text-ink">
          <PuzzleSignet className="h-6 w-6 shrink-0" />
          KI-Berufs-Puzzle
        </p>

        <nav className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center text-ink underline decoration-ink/30 underline-offset-4 hover:text-mensch hover:decoration-mensch"
          >
            Alle Berufe
          </Link>
          <Link
            href="/vergleich"
            className="inline-flex min-h-11 items-center text-ink underline decoration-ink/30 underline-offset-4 hover:text-mensch hover:decoration-mensch"
          >
            Berufe im Vergleich
          </Link>
          <Link
            href="/praxis"
            className="inline-flex min-h-11 items-center text-ink underline decoration-ink/30 underline-offset-4 hover:text-mensch hover:decoration-mensch"
          >
            Aus der Praxis
          </Link>
          <Link
            href="/studium"
            className="inline-flex min-h-11 items-center text-ink underline decoration-ink/30 underline-offset-4 hover:text-uni hover:decoration-uni"
          >
            Alle Studiengänge
          </Link>
          <Link
            href="/studium-vergleich"
            className="inline-flex min-h-11 items-center text-ink underline decoration-ink/30 underline-offset-4 hover:text-uni hover:decoration-uni"
          >
            Studiengänge im Vergleich
          </Link>
          <Link
            href="/lehrkraefte"
            className="inline-flex min-h-11 items-center text-ink underline decoration-ink/30 underline-offset-4 hover:text-mensch hover:decoration-mensch"
          >
            Für Lehrkräfte
          </Link>
          <Link
            href="/methodik"
            className="inline-flex min-h-11 items-center text-ink underline decoration-ink/30 underline-offset-4 hover:text-mensch hover:decoration-mensch"
          >
            Methodik
          </Link>
          <Link
            href="/entstehung"
            className="inline-flex min-h-11 items-center text-ink underline decoration-ink/30 underline-offset-4 hover:text-mensch hover:decoration-mensch"
          >
            Wie dieses Tool entstanden ist
          </Link>
        </nav>

        <p className="mt-6 max-w-[56ch] font-prose text-sm italic leading-relaxed text-ink-2">
          Ein Werkzeug für Berufsorientierungs-Workshops. Die KI-Werte sind
          didaktische Schätzungen zur Diskussion, keine Prognosen – grob
          kalibriert an Frey &amp; Osborne (2013) und dem IAB Job-Futuromat.
          Konzept und Kuration von{" "}
          <a
            href="https://maximilianherrmann.com/"
            className="underline decoration-ink/30 underline-offset-2 hover:text-mensch hover:decoration-mensch"
          >
            Maximilian Herrmann
          </a>
          ; Code, Texte und Recherche
          entstanden partnerschaftlich mithilfe von KI (Claude Code), nicht allein durch sie.
        </p>

        {/* coxilab-Leiste: gleich auf allen Werkzeugen (coxilab.de, dilemma, jobs) */}
        <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-1 border-t border-rule pt-4 text-sm">
          <a
            href="https://coxilab.de/"
            className="group inline-flex min-h-11 items-center gap-2 text-ink-2"
          >
            <CoxilabSignet className="h-5 w-5 shrink-0" />
            <span>
              <b className="font-display font-semibold text-ink group-hover:text-mensch">coxilab</b> · Werkzeuge für den
              Unterricht
            </span>
          </a>
          <nav className="flex flex-wrap gap-x-5" aria-label="Weitere Werkzeuge">
            <a href="https://dilemma.coxilab.de/" className="inline-flex min-h-11 items-center text-ink underline decoration-ink/30 underline-offset-4 hover:text-mensch hover:decoration-mensch">
              Dilemma
            </a>
            <a href="https://rover.maximilianherrmann.com/" className="inline-flex min-h-11 items-center text-ink underline decoration-ink/30 underline-offset-4 hover:text-mensch hover:decoration-mensch">
              Reward Rover
            </a>
            <a href="https://handzeichen.com/" className="inline-flex min-h-11 items-center text-ink underline decoration-ink/30 underline-offset-4 hover:text-mensch hover:decoration-mensch">
              Handzeichen
            </a>
            <a href="https://coxilab.de/impressum/" className="inline-flex min-h-11 items-center text-ink underline decoration-ink/30 underline-offset-4 hover:text-mensch hover:decoration-mensch">
              Impressum
            </a>
            <a href="https://coxilab.de/impressum/#puzzle" className="inline-flex min-h-11 items-center text-ink underline decoration-ink/30 underline-offset-4 hover:text-mensch hover:decoration-mensch">
              Datenschutz
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
