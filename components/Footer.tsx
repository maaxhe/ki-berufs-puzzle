import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto max-w-[68rem] px-5 py-12 sm:px-8 sm:py-14">
        <p className="font-display text-sm font-semibold text-ink">
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
            href="/studium"
            className="inline-flex min-h-11 items-center text-ink underline decoration-ink/30 underline-offset-4 hover:text-uni hover:decoration-uni"
          >
            Studiengänge
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

        <p className="mt-6 max-w-[54ch] font-prose text-sm italic leading-relaxed text-ink-2">
          Ein Werkzeug für Berufsorientierungs-Workshops. Die KI-Werte sind
          didaktische Schätzungen zur Diskussion, keine Prognosen – grob
          kalibriert an Frey &amp; Osborne (2013) und dem IAB Job-Futuromat.
          Konzept von Maximilian Herrmann; Code, Texte und Datenrecherche
          entstanden mit KI (Claude).
        </p>

        <p className="mt-5 text-xs text-ink-2">
          <Link
            href="/impressum"
            className="underline decoration-ink/20 underline-offset-2 hover:text-mensch hover:decoration-mensch"
          >
            Impressum
          </Link>
        </p>
      </div>
    </footer>
  );
}
