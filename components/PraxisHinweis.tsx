import Link from "next/link";
import VideoEmbed from "./VideoEmbed";
import type { PraxisBeispiel } from "@/data/praxis";

/** Realer Fall zum Beruf – steht direkt unter dem Puzzle bzw. dem Ergebnis. */
export default function PraxisHinweis({ fall }: { fall: PraxisBeispiel }) {
  return (
    <section className="mt-14 max-w-[46rem] border-t border-rule pt-8">
      <p className="font-display text-xs font-semibold uppercase tracking-wider text-mensch">
        Schon heute Realität · {fall.ort}
      </p>
      <h2 className="mt-2 font-display text-[1.35rem] font-semibold leading-snug text-ink">
        {fall.titel}
      </h2>
      <p className="prose-text mt-3 text-ink">{fall.teaser}</p>
      {fall.einordnung && (
                  <p className="mt-3 font-prose text-sm italic text-ink-2">
                    Einordnung: {fall.einordnung}
                  </p>
                )}

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div className="border-l-2 border-ki pl-4">
          <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-ki">
            Die Maschine
          </h3>
          <p className="mt-1.5 font-prose text-[0.95rem] leading-snug text-ink">{fall.wasMachtDieKI}</p>
        </div>
        <div className="border-l-2 border-mensch pl-4">
          <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-mensch">
            Der Mensch
          </h3>
          <p className="mt-1.5 font-prose text-[0.95rem] leading-snug text-ink">{fall.wasBleibtMenschlich}</p>
        </div>
      </div>

      {fall.video && (
        <div className="mt-6">
          <VideoEmbed {...fall.video} />
          {fall.video.hinweis && (
            <p className="mt-2 font-prose text-xs italic text-ink-2">{fall.video.hinweis}</p>
          )}
        </div>
      )}

      <p className="mt-6 font-prose text-[1.05rem] italic text-ink">„{fall.diskussionsFrage}“</p>

      <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 font-prose text-[0.95rem]">
        <Link
          href={`/praxis#${fall.id}`}
          className="italic text-ink underline decoration-mensch decoration-2 underline-offset-4 hover:text-mensch"
        >
          Alle Praxisfälle ansehen →
        </Link>
        <a
          href={fall.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink-2 underline decoration-ink/20 underline-offset-2 hover:text-ink"
        >
          Quelle: {fall.medium} ↗
        </a>
      </p>
    </section>
  );
}
