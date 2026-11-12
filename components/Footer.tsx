import Link from "next/link";
import { PuzzleSignet } from "@/components/Signet";

const LINK =
  "inline-flex min-h-11 items-center text-ink underline decoration-ink/40 underline-offset-4 hover:bg-paper hover:decoration-ink";

export default function Footer() {
  return (
    <footer className="mt-20 rounded-t-[28px] border-t-2 border-rule bg-flaeche-tief">
      <div className="mx-auto max-w-[68rem] px-5 py-10 sm:px-8 sm:py-12">
        <p className="inline-flex items-center gap-2 text-base font-bold text-ink">
          <PuzzleSignet className="h-7 w-7 shrink-0" />
          KI-Berufs-Puzzle
        </p>

        <nav className="mt-3 flex flex-wrap gap-x-6 gap-y-0 text-base" aria-label="Seiten">
          <Link href="/" className={LINK}>Alle Berufe</Link>
          <Link href="/vergleich" className={LINK}>Berufe im Vergleich</Link>
          <Link href="/praxis" className={LINK}>Aus der Praxis</Link>
          <Link href="/studium" className={LINK}>Alle Studiengänge</Link>
          <Link href="/studium-vergleich" className={LINK}>Studiengänge im Vergleich</Link>
          <Link href="/lehrkraefte" className={LINK}>Für Lehrkräfte</Link>
          <Link href="/methodik" className={LINK}>Methodik</Link>
          <Link href="/entstehung" className={LINK}>Wie dieses Tool entstanden ist</Link>
        </nav>

        <p className="mt-6 max-w-[56ch] text-base leading-relaxed text-ink">
          Ein Werkzeug für Berufsorientierungs-Workshops. Die KI-Werte sind
          didaktische Schätzungen zur Diskussion, keine Prognosen – grob
          kalibriert an Frey &amp; Osborne (2013) und dem IAB Job-Futuromat.
          Konzept und Kuration von{" "}
          <a
            href="https://maximilianherrmann.com/"
            className="underline decoration-ink/40 underline-offset-2 hover:decoration-ink"
          >
            Maximilian Herrmann
          </a>
          ; Code, Texte und Recherche
          entstanden partnerschaftlich mithilfe von KI (Claude Code), nicht allein durch sie.
        </p>

        <nav className="mt-6 flex flex-wrap gap-x-6 border-t-2 border-rule pt-3 text-base" aria-label="coxilab">
          <a href="https://coxilab.de/" className={LINK}>coxilab</a>
          <a href="https://coxilab.de/impressum/" className={LINK}>Impressum</a>
          <a href="https://coxilab.de/impressum/#puzzle" className={LINK}>Datenschutz</a>
        </nav>
      </div>
    </footer>
  );
}
