import type { Metadata } from "next";
import Link from "next/link";
import { berufe } from "@/data/berufe";
import { kiRisikoGesamt, risikoStufe } from "@/lib/scoring";
import Disclaimer from "@/components/Disclaimer";

export const metadata: Metadata = {
  title: "Berufe im Vergleich – KI-Berufs-Puzzle",
  description:
    "Alle Berufe sortiert danach, wie viel Prozent ihrer Aufgaben das Modell heute der KI zutraut.",
};

const STUFE_FARBE: Record<string, string> = {
  niedrig: "bg-mensch",
  mittel: "bg-ink-2",
  hoch: "bg-ki",
};

export default function VergleichPage() {
  const sortiert = [...berufe]
    .map((b) => ({ beruf: b, risiko: kiRisikoGesamt(b.tasks) }))
    .sort((a, b) => b.risiko - a.risiko);

  return (
    <div className="mx-auto max-w-[68rem] px-5 py-14 sm:px-8 sm:py-16">
      <Link
        href="/"
        className="font-prose text-sm italic text-ink-2 underline decoration-ink/20 underline-offset-2 hover:text-mensch hover:decoration-mensch"
      >
        Alle Berufe
      </Link>

      <h1 className="mt-4 font-display text-[clamp(1.9rem,4.5vw,2.8rem)] font-semibold leading-[1.05] tracking-[-0.015em] text-ink">
        Berufe im Vergleich
      </h1>
      <p className="prose-text mt-3 max-w-[46rem] text-ink">
        Über alle Aufgaben gemittelt: Wie viel Prozent traut das Modell je
        Beruf heute der KI zu? Ganz oben stehen die Berufe mit dem höchsten
        Anteil, ganz unten die mit dem niedrigsten.
      </p>

      <div className="mt-8 max-w-[46rem]">
        <Disclaimer />
      </div>

      <ol className="mt-10 space-y-3">
        {sortiert.map(({ beruf, risiko }, i) => (
          <li key={beruf.slug}>
            <Link
              href={`/puzzle/${beruf.slug}`}
              className="group flex items-center gap-4 border-b border-rule py-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mensch"
            >
              <span className="tnum w-6 shrink-0 text-right text-sm text-ink-2">
                {i + 1}.
              </span>
              <span className="w-full min-w-[9rem] shrink-0 font-display text-[0.95rem] font-semibold text-ink transition-colors group-hover:text-mensch sm:w-56">
                {beruf.title}
              </span>
              <span className="relative hidden h-2.5 flex-1 bg-paper-2 sm:block">
                <span
                  className={`absolute inset-y-0 left-0 ${STUFE_FARBE[risikoStufe(risiko)]}`}
                  style={{ width: `${risiko}%` }}
                />
              </span>
              <span className="tnum shrink-0 text-sm font-semibold text-ink">
                {risiko}% KI
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
