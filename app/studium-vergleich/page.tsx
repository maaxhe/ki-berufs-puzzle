import type { Metadata } from "next";
import Link from "next/link";
import { studiengaenge } from "@/data/studiengaenge";
import { kiRisikoGesamt, risikoStufe } from "@/lib/scoring";
import { STUFE_TEXT } from "@/types";
import Disclaimer from "@/components/Disclaimer";

export const metadata: Metadata = {
  title: "Studiengänge im Vergleich – KI-Studiengänge-Puzzle",
  description:
    "Alle Studiengänge sortiert danach, wie stark das Modell ihre Aufgaben heute der KI zutraut.",
};

const STUFE_FARBE: Record<string, string> = {
  niedrig: "bg-mensch",
  mittel: "bg-ink-2",
  hoch: "bg-ki",
};

export default function StudiumVergleichPage() {
  const sortiert = [...studiengaenge]
    .map((s) => ({ studiengang: s, risiko: kiRisikoGesamt(s.tasks) }))
    .sort((a, b) => b.risiko - a.risiko);

  return (
    <div className="theme-studium mx-auto max-w-[68rem] px-5 py-14 sm:px-8 sm:py-16">
      <Link
        href="/studium"
        className="font-prose text-sm italic text-ink-2 underline decoration-ink/20 underline-offset-2 hover:text-mensch hover:decoration-mensch"
      >
        Alle Studiengänge
      </Link>

      <h1 className="mt-4 font-display text-[clamp(1.9rem,4.5vw,2.8rem)] font-semibold leading-[1.05] tracking-[-0.015em] text-ink">
        Studiengänge im Vergleich
      </h1>
      <p className="prose-text mt-3 max-w-[46rem] text-ink">
        Über alle Aufgaben gemittelt: Wie stark tendiert das Modell je
        Studiengang Richtung KI oder Richtung Mensch? Ganz oben stehen die
        Studiengänge, die am stärksten KI-nah eingeschätzt werden, ganz unten
        die menschlichsten.
      </p>

      <div className="mt-8 max-w-[46rem]">
        <Disclaimer />
      </div>

      <ol className="mt-10 space-y-3">
        {sortiert.map(({ studiengang, risiko }, i) => (
          <li key={studiengang.slug}>
            <Link
              href={`/studium/${studiengang.slug}`}
              className="group flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-rule py-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mensch"
            >
              <span className="tnum w-6 shrink-0 text-right text-sm text-ink-2">
                {i + 1}.
              </span>
              <span className="min-w-0 flex-1 font-display text-[0.95rem] font-semibold leading-snug text-ink transition-colors group-hover:text-mensch sm:w-56 sm:flex-none">
                {studiengang.title}
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
