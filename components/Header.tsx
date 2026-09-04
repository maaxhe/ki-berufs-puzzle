import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-rule">
      <div className="mx-auto flex max-w-[68rem] items-baseline justify-between px-5 py-5 sm:px-8">
        <Link
          href="/"
          className="font-display text-[1.05rem] font-semibold tracking-tight text-ink transition-colors hover:text-mensch"
        >
          KI-Berufs-Puzzle
        </Link>
        <span className="hidden font-prose text-sm italic text-ink-2 sm:block">
          für Berufsorientierungs-Workshops
        </span>
      </div>
    </header>
  );
}
