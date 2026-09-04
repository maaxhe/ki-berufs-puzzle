import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto max-w-[68rem] px-5 py-12 sm:px-8 sm:py-14">
        <p className="font-display text-sm font-semibold text-ink">
          KI-Berufs-Puzzle
        </p>
        <p className="mt-2 max-w-[54ch] font-prose text-sm italic leading-relaxed text-ink-2">
          Ein Werkzeug für Berufsorientierungs-Workshops. Die KI-Werte sind
          didaktische Schätzungen zur Diskussion, keine Prognosen – grob
          kalibriert an Frey &amp; Osborne (2013) und dem IAB Job-Futuromat.
        </p>
        <p className="mt-4 flex gap-x-6 text-sm">
          <Link
            href="/"
            className="text-ink underline decoration-ink/30 underline-offset-4 hover:text-mensch hover:decoration-mensch"
          >
            Alle Berufe
          </Link>
          <Link
            href="/impressum"
            className="text-ink underline decoration-ink/30 underline-offset-4 hover:text-mensch hover:decoration-mensch"
          >
            Impressum
          </Link>
        </p>
        <p className="mt-6 font-prose text-xs italic text-ink-2">
          Konzept von Maximilian Herrmann. Code, Texte und Datenrecherche wurden
          mit KI (Claude) erstellt.
        </p>
      </div>
    </footer>
  );
}
