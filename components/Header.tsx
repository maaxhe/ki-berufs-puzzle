"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const studiumAktiv = pathname?.startsWith("/studium") ?? false;

  return (
    <header className="border-b border-rule">
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
                  ? "bg-ink text-paper"
                  : "text-ink-2 hover:text-mensch"
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
                  ? "bg-ink text-paper"
                  : "text-ink-2 hover:text-uni"
              }`}
            >
              Studiengänge
            </Link>
          </nav>
        </div>
        <span className="hidden font-prose text-sm italic text-ink-2 sm:block">
          für Berufsorientierungs-Workshops
        </span>
      </div>
    </header>
  );
}
