"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const studiumAktiv = pathname?.startsWith("/studium") ?? false;
  const erkenntnisseAktiv = pathname === "/erkenntnisse";

  return (
    <header className="border-b border-rule">
      {/* Akzentleiste: sofort erkennbar, in welchem Bereich man ist, auch
          nach dem Scrollen und bevor man den Text liest. */}
      <div className="h-[3px] bg-mensch" aria-hidden="true" />
      <div className="mx-auto flex max-w-[68rem] items-baseline justify-between px-5 py-5 sm:px-8">
        <div className="flex items-baseline gap-5">
          <span className="font-display text-[1.05rem] font-semibold tracking-tight text-ink">
            KI-Puzzle
          </span>
          <nav className="flex gap-1 text-sm" aria-label="Bereich wählen">
            <Link
              href="/"
              aria-current={!studiumAktiv ? "page" : undefined}
              className={`rounded-full px-3 py-1 font-semibold transition-colors ${
                !studiumAktiv
                  ? "bg-beruf text-paper"
                  : "text-ink-2 hover:text-beruf"
              }`}
            >
              Berufe{" "}
              <span className="font-normal opacity-70">(Ausbildung)</span>
            </Link>
            <Link
              href="/studium"
              aria-current={studiumAktiv ? "page" : undefined}
              className={`rounded-full px-3 py-1 font-semibold transition-colors ${
                studiumAktiv
                  ? "bg-uni text-paper"
                  : "text-ink-2 hover:text-uni"
              }`}
            >
              Studiengänge
            </Link>
          </nav>
        </div>
        <div className="flex items-baseline gap-5">
          <Link
            href="/erkenntnisse"
            aria-current={erkenntnisseAktiv ? "page" : undefined}
            className={`text-sm font-semibold underline decoration-2 underline-offset-4 transition-colors ${
              erkenntnisseAktiv
                ? "text-ink decoration-ink/40"
                : "text-ink-2 decoration-transparent hover:text-ink hover:decoration-ink/30"
            }`}
          >
            Erkenntnisse
          </Link>
          <span className="hidden font-prose text-sm italic text-ink-2 sm:block">
            für Berufsorientierungs-Workshops
          </span>
        </div>
      </div>
    </header>
  );
}
