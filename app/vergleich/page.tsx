import type { Metadata } from "next";
import Link from "next/link";
import { berufe } from "@/data/berufe";
import { kiRisikoGesamt, risikoStufe } from "@/lib/scoring";
import { STUFE_TEXT } from "@/types";
import Disclaimer from "@/components/Disclaimer";

export const metadata: Metadata = {
  title: "Berufe im Vergleich – KI-Berufs-Puzzle",
  description:
    "Alle Berufe sortiert danach, wie stark das Modell ihre Aufgaben heute der KI zutraut.",
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
        Über alle Aufgaben gemittelt: Wie stark tendiert das Modell je Beruf
        Richtung KI oder Richtung Mensch? Ganz oben stehen die Berufe, die am
        stärksten KI-nah eingeschätzt werden, ganz unten die menschlichsten.
      </p>

      <div className="mt-8 max-w-[46rem]">
        <Disclaimer />
      </div>

      <ol className="mt-10 space-y-3">
        {sortiert.map(({ beruf, risiko }, i) => (
          <li key={beruf.slug}>
            <Link
              href={`/puzzle/${beruf.slug}`}
              className="group flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-rule py-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mensch"
            >
              <span className="tnum w-6 shrink-0 text-right text-sm text-ink-2">
                {i + 1}.
              </span>
              <span className="min-w-0 flex-1 font-display text-[0.95rem] font-semibold leading-snug text-ink transition-colors group-hover:text-mensch sm:w-56 sm:flex-none">
                {beruf.title}
              </span>
              <span className="shrink-0 text-sm font-semibold text-ink">
                {STUFE_TEXT[risikoStufe(risiko)]}
              </span>
              <span className="relative order-4 h-2 w-full basis-full bg-paper-2 sm:order-none sm:h-2.5 sm:w-auto sm:basis-auto sm:flex-1">
                <span
                  className={`absolute inset-y-0 left-0 ${STUFE_FARBE[risikoStufe(risiko)]}`}
                  style={{ width: `${risiko}%` }}
                />
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
