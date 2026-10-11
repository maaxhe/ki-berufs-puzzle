import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import TaskPuzzle from "@/components/TaskPuzzle";
import { berufe, getBeruf } from "@/data/berufe";
import { praxisBeispiele } from "@/data/praxis";

export function generateStaticParams() {
  return berufe.map((beruf) => ({ beruf: beruf.slug }));
}

export const dynamicParams = false;

/** Berufe, bei denen Roboter und autonome Maschinen konkret eine Rolle spielen. */
const ROBOTER_BERUFE = ["industriemechaniker", "berufskraftfahrer", "pflegefachkraft", "landwirt", "kfz-mechatroniker"];

export async function generateMetadata({
  params,
}: PageProps<"/puzzle/[beruf]">): Promise<Metadata> {
  const { beruf: slug } = await params;
  const beruf = getBeruf(slug);
  if (!beruf) return { title: "Beruf nicht gefunden – KI-Berufs-Puzzle" };
  return {
    title: `${beruf.title} – KI-Berufs-Puzzle`,
    description: `${beruf.shortDescription} Ordne die Aufgaben selbst zu: Was übernimmt KI, was bleibt menschlich?`,
    alternates: { canonical: `/puzzle/${beruf.slug}` },
  };
}

export default async function PuzzlePage({
  params,
}: PageProps<"/puzzle/[beruf]">) {
  const { beruf: slug } = await params;
  const beruf = getBeruf(slug);
  if (!beruf) notFound();

  const passendesPraxisBeispiel = praxisBeispiele.find((p) => p.berufSlug === beruf.slug);

  return (
    <>
      <TaskPuzzle beruf={beruf} alleBerufe={berufe} />
      
      {passendesPraxisBeispiel && (
        <aside className="mx-auto mb-10 max-w-3xl px-4">
          <div className="border-l-2 border-mensch pl-4">
            <p className="font-display text-xs font-semibold uppercase tracking-wider text-mensch">
              Schon heute Realität · {passendesPraxisBeispiel.ort}
            </p>
            <p className="mt-1 font-display text-[1.05rem] font-semibold text-ink">
              {passendesPraxisBeispiel.titel}
            </p>
            <p className="mt-1 font-prose text-[0.95rem] leading-snug text-ink-2">
              {passendesPraxisBeispiel.teaser}
            </p>
            <Link
              href={`/praxis#${passendesPraxisBeispiel.id}`}
              className="mt-2 inline-block font-prose text-[0.95rem] italic text-ink underline decoration-mensch decoration-2 underline-offset-4 hover:text-mensch"
            >
              Fall und Video ansehen →
            </Link>
          </div>
        </aside>
      )}

      {ROBOTER_BERUFE.includes(beruf.slug) && (
        <aside className="mx-auto mb-10 max-w-3xl px-4">
          <div className="rounded-xl border border-black/10 p-4 text-sm dark:border-white/15">
            <p className="font-semibold">Wie lernen Roboter eigentlich?</p>
            <p className="mt-1 opacity-80">
              Im Reward Rover trainierst du selbst einen kleinen Roboter per Belohnung und Strafe – nach demselben Prinzip,
              nach dem echte Roboter laufen und greifen lernen.
            </p>
            <a
              href="https://rover.maximilianherrmann.com"
              target="_blank"
              rel="noopener"
              className="mt-2 inline-block underline underline-offset-2"
            >
              Reward Rover ausprobieren →
            </a>
          </div>
        </aside>
      )}
    </>
  );
}
