import Link from "next/link";
import { getBeruf } from "@/data/berufe";
import { getStudiengang } from "@/data/studiengaenge";
import type { Verwandte } from "@/data/verwandt";

/** Kuratierte Verweise auf verwandte Berufe und Studiengänge – unter dem Puzzle. */
export default function VerwandteBox({ verwandte }: { verwandte?: Verwandte }) {
  const berufe = (verwandte?.berufe ?? []).map(getBeruf).filter((x) => !!x);
  const studien = (verwandte?.studiengaenge ?? []).map(getStudiengang).filter((x) => !!x);
  if (berufe.length + studien.length === 0) return null;

  const gruppe = (titel: string, basis: string, liste: { slug: string; title: string }[]) =>
    liste.length > 0 && (
      <div>
        <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-ink-2">{titel}</h3>
        <ul className="mt-2 space-y-1.5">
          {liste.map((e) => (
            <li key={e.slug}>
              <Link
                href={`${basis}/${e.slug}`}
                className="font-prose text-[1.02rem] italic text-ink underline decoration-mensch decoration-2 underline-offset-4 hover:text-mensch"
              >
                {e.title} →
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );

  return (
    <section className="mx-auto mt-14 max-w-[46rem] border-t border-rule px-5 pb-10 pt-8 sm:px-0">
      <h2 className="font-display text-[1.2rem] font-semibold text-ink">Verwandt</h2>
      <div className="mt-4 grid gap-6 sm:grid-cols-2">
        {gruppe("Berufe", "/puzzle", berufe as { slug: string; title: string }[])}
        {gruppe("Studiengänge", "/studium", studien as { slug: string; title: string }[])}
      </div>
    </section>
  );
}
