"use client";

import { useState } from "react";

/**
 * Datenschutzfreundliche YouTube-Einbettung: Erst nach Klick wird
 * youtube-nocookie.com geladen – vorher fließt keine Verbindung zu Google.
 */
export default function VideoEmbed({
  id,
  titel,
  quelle,
}: {
  id: string;
  titel: string;
  quelle: string;
}) {
  const [aktiv, setAktiv] = useState(false);

  return (
    <div className="overflow-hidden">
      <div className="relative aspect-video bg-ink">
        {aktiv ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={titel}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setAktiv(true)}
            className="group absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-mensch"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-paper text-ink transition-transform group-hover:scale-105">
              <svg viewBox="0 0 24 24" className="ml-0.5 h-6 w-6 fill-current" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="font-display text-[0.95rem] font-semibold text-paper">{titel}</span>
            <span className="font-prose text-xs italic text-paper/60">
              Klick lädt das Video von YouTube (datensparsam, ohne Cookies)
            </span>
          </button>
        )}
      </div>
      <p className="mt-2 font-prose text-xs italic text-ink-2">
        Video: {quelle}
      </p>
    </div>
  );
}
