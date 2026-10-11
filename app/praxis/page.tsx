import type { Metadata } from "next";
import Link from "next/link";
import VideoEmbed from "@/components/VideoEmbed";
import { praxisBeispiele } from "@/data/praxis";
import { getStudiengang } from "@/data/studiengaenge";

export const metadata: Metadata = {
  title: "Schon heute Realität – Reale KI- und Roboter-Fälle aus der Praxis",
  description:
    "Von REWE in Ahlen bis zur Arztpraxis: Wo Roboter und KI in Deutschland schon heute mitarbeiten – und was trotzdem menschlich bleibt.",
};

export default function PraxisPage() {
  return (
    <div className="mx-auto max-w-[68rem] px-5 py-14 sm:px-8 sm:py-20">
      <Link
        href="/"
        className="font-prose text-sm italic text-ink-2 underline decoration-ink/20 underline-offset-2 hover:text-mensch hover:decoration-mensch"
      >
        Alle Berufe
      </Link>

      <header className="mt-4 max-w-[46rem]">
        <h1 className="font-display text-[clamp(2.1rem,5vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.02em] text-ink">
          Schon heute Realität
        </h1>
        <p className="prose-text mt-6 text-ink">
          Über KI wird oft geredet, als wäre sie eine Prognose für später. Dabei
          rollen in deutschen Supermärkten längst Serviceroboter, scannen
          Algorithmen Verträge und federn Exoskelette schwere Lasten ab.
        </p>
        <p className="prose-text mt-3 italic text-ink-2">
          {praxisBeispiele.length} Fälle aus dem Alltag. Bei jedem dieselbe Frage wie im Puzzle:
          Was übernimmt die Maschine – und wo bleibt der Mensch?
        </p>
        <nav aria-label="Fälle" className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-rule pt-4 font-prose text-sm">
          {praxisBeispiele.map((b, i) => (
            <a
              key={b.id}
              href={`#${b.id}`}
              className="text-ink-2 underline decoration-ink/20 underline-offset-2 hover:text-mensch hover:decoration-mensch"
            >
              <span className="tnum">{i + 1}</span> {b.berufTitel.split(" & ")[0].split(" (")[0]}
            </a>
          ))}
        </nav>
      </header>

      <div className="mt-6">
        {praxisBeispiele.map((bsp, idx) => (
          <article
            key={bsp.id}
            id={bsp.id}
            className="scroll-mt-20 border-t border-rule py-12 sm:py-14"
          >
            <div className="grid gap-x-12 gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <div>
                <p className="font-prose text-sm italic text-ink-2">
                  <span className="tnum not-italic font-display font-semibold text-mensch">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="mx-2">·</span>
                  {bsp.berufTitel}
                  <span className="mx-2">·</span>
                  {bsp.ort}
                </p>
                <h2 className="mt-3 font-display text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-[1.1] text-ink">
                  {bsp.titel}
                </h2>
                <p className="prose-text mt-4 text-ink">{bsp.teaser}</p>
                {bsp.einordnung && (
                  <p className="mt-3 font-prose text-sm italic text-ink-2">
                    Einordnung: {bsp.einordnung}
                  </p>
                )}
                <p className="mt-4 font-prose text-sm text-ink-2">
                  Quelle:{" "}
                  <a
                    href={bsp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-ink/20 underline-offset-2 hover:text-ink"
                  >
                    {bsp.medium} ↗
                  </a>
                </p>
              </div>

              <div className="space-y-5">
                {bsp.video && (
                  <div>
                    <VideoEmbed {...bsp.video} />
                    {bsp.video.hinweis && (
                      <p className="mt-2 font-prose text-xs italic text-ink-2">{bsp.video.hinweis}</p>
                    )}
                  </div>
                )}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="border-l-2 border-ki pl-4">
                    <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-ki">
                      Die Maschine
                    </h3>
                    <p className="mt-2 font-prose text-[0.95rem] leading-snug text-ink">
                      {bsp.wasMachtDieKI}
                    </p>
                  </div>
                  <div className="border-l-2 border-mensch pl-4">
                    <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-mensch">
                      Der Mensch
                    </h3>
                    <p className="mt-2 font-prose text-[0.95rem] leading-snug text-ink">
                      {bsp.wasBleibtMenschlich}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-x-12 gap-y-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <blockquote>
                <p className="font-display text-[0.7rem] font-semibold uppercase tracking-wider text-ink-2">
                  Zum Diskutieren
                </p>
                <p className="mt-1 font-prose text-[1.1rem] italic leading-snug text-ink">
                  {bsp.diskussionsFrage}
                </p>
              </blockquote>
              {(bsp.berufSlug || bsp.studiengangSlugs?.length) && (
                <div className="flex flex-col gap-1.5 lg:items-end lg:justify-end">
                  {bsp.berufSlug && (
                    <Link
                      href={`/puzzle/${bsp.berufSlug}`}
                      className="font-prose text-[1.02rem] italic text-ink underline decoration-mensch decoration-2 underline-offset-4 hover:text-mensch"
                    >
                      Diesen Beruf selbst sortieren →
                    </Link>
                  )}
                  {bsp.studiengangSlugs?.map((slug) => {
                    const sg = getStudiengang(slug);
                    return (
                      sg && (
                        <Link
                          key={slug}
                          href={`/studium/${slug}`}
                          className="font-prose text-[1.02rem] italic text-ink underline decoration-mensch decoration-2 underline-offset-4 hover:text-mensch"
                        >
                          Passendes Studium: {sg.title} →
                        </Link>
                      )
                    );
                  })}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      <aside className="border-t border-rule pt-10">
        <p className="prose-text max-w-[46rem] text-ink">
          Kennst du ein Beispiel aus deiner Region – den Bäcker mit Teig-Scanner,
          die Zahnarztpraxis mit 3D-Druck, den Rettungsdienst mit KI-EKG? Echte
          Fälle machen Berufsorientierung lebendig.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block font-prose text-[1.02rem] italic text-ink underline decoration-mensch decoration-2 underline-offset-4 hover:text-mensch"
        >
          Zurück zu allen Berufen →
        </Link>
      </aside>
    </div>
  );
}
