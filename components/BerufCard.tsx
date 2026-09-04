import Link from "next/link";
import type { Beruf } from "@/types";

export default function BerufCard({ beruf }: { beruf: Beruf }) {
  return (
    <Link
      href={`/puzzle/${beruf.slug}`}
      className="group grid grid-cols-[1fr_auto] items-baseline gap-4 border-b border-rule py-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mensch"
    >
      <div>
        <h3 className="font-display text-[1.0625rem] font-semibold text-ink transition-colors group-hover:text-mensch">
          {beruf.title}
        </h3>
        <p className="mt-1 font-prose text-[0.95rem] leading-snug text-ink-2">
          {beruf.shortDescription}
        </p>
      </div>

      <span className="shrink-0 translate-x-0 font-prose text-sm italic text-ink-2 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:opacity-100">
        Sortieren
      </span>
    </Link>
  );
}
