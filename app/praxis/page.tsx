import type { Metadata } from "next";
import Link from "next/link";
import { praxisBeispiele } from "@/data/praxis";

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
        ← Zurück zu allen Berufen
      </Link>

      <header className="mt-4 max-w-[46rem]">
        <div className="inline-flex items-center gap-2 rounded-full border border-mensch/30 bg-mensch/10 px-3 py-1 text-xs font-semibold text-ink">
          <span className="h-2 w-2 rounded-full bg-mensch animate-pulse" />
          Aus der Praxis
        </div>

        <h1 className="mt-3 font-display text-[clamp(2.1rem,5vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.015em] text-ink">
          Schon heute Realität: Was Maschinen im Alltag wirklich tun
        </h1>

        <p className="prose-text mt-5 text-ink leading-relaxed">
          Oft reden wir über KI, als wäre sie eine ferne Zukunftsprognose. Doch in
          deutschen Supermärkten, Handwerksbetrieben, Praxen und Kliniken rollen längst
          Serviceroboter, scannen Algorithmen Verträge oder federn Exoskelette schwere Lasten ab.
        </p>
        <p className="prose-text mt-3 font-prose italic text-ink-2">
          Hier sammeln wir konkrete, reale Fälle aus dem Alltag. Bei jedem Beispiel stellen wir
          dieselbe Frage wie im Puzzle: <strong>Was übernimmt die Maschine – und wo ist der Mensch unersetzlich?</strong>
        </p>
      </header>

      <div className="mt-12 max-w-[48rem] space-y-10">
        {praxisBeispiele.map((bsp, idx) => (
          <article
            key={bsp.id}
            className="group rounded-2xl border border-rule bg-paper p-6 sm:p-8 transition-shadow hover:shadow-md"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-4 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold uppercase tracking-wider text-mensch">
                  {bsp.berufTitel}
                </span>
                <span className="text-ink-2">·</span>
                <span className="text-ink-2">{bsp.ort}</span>
              </div>
              <span className="rounded bg-rule/50 px-2 py-0.5 font-mono text-[0.75rem] text-ink-2">
                {bsp.medium}
              </span>
            </div>

            <h2 className="mt-4 font-display text-[1.35rem] sm:text-[1.5rem] font-semibold text-ink leading-snug">
              {bsp.titel}
            </h2>

            <p className="mt-3 font-prose text-[1.02rem] leading-relaxed text-ink">
              {bsp.teaser}
            </p>

            {/* Gegenüberstellung: Was macht die KI vs. Was bleibt menschlich */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-ki/30 bg-ki/5 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-ink">
                  <span className="h-2 w-2 rounded-full bg-ki" />
                  Was die Maschine macht:
                </div>
                <p className="mt-2 text-sm text-ink-2 leading-relaxed">
                  {bsp.wasMachtDieKI}
                </p>
              </div>

              <div className="rounded-xl border border-mensch/30 bg-mensch/5 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-ink">
                  <span className="h-2 w-2 rounded-full bg-mensch" />
                  Was menschlich bleibt:
                </div>
                <p className="mt-2 text-sm text-ink-2 leading-relaxed">
                  {bsp.wasBleibtMenschlich}
                </p>
              </div>
            </div>

            {/* Didaktische Diskussionsfrage */}
            <div className="mt-5 rounded-xl border-l-4 border-ink bg-rule/20 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-2">
                Diskussionsimpuls für den Unterricht:
              </p>
              <p className="mt-1 font-prose text-sm italic text-ink">
                „{bsp.diskussionsFrage}“
              </p>
            </div>

            {/* Links */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-2">
              {bsp.berufSlug && (
                <Link
                  href={`/puzzle/${bsp.berufSlug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline decoration-mensch decoration-2 underline-offset-4 hover:text-mensch"
                >
                  Zum {bsp.berufTitel}-Puzzle →
                </Link>
              )}
              <a
                href={bsp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-ink-2 underline decoration-ink/20 underline-offset-2 hover:text-ink"
              >
                Quelle / Originalbericht ansehen ↗
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-16 max-w-[46rem] rounded-2xl border border-rule bg-paper p-8 text-center sm:text-left">
        <h3 className="font-display text-lg font-semibold text-ink">
          Kennst du weitere reale Beispiele aus deiner Region?
        </h3>
        <p className="mt-2 text-sm text-ink-2 leading-relaxed">
          Ob der Bäcker mit Teig-Scanner, die Zahnarztpraxis mit 3D-Druck oder der Rettungsdienst mit KI-EKG:
          Echte Beispiele machen Berufsorientierung lebendig.
        </p>
        <div className="mt-5">
          <Link
            href="/"
            className="inline-block rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-opacity hover:opacity-85"
          >
            Jetzt Berufe selbst sortieren →
          </Link>
        </div>
      </div>
    </div>
  );
}
