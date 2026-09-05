"use client";

import { useMemo, useState } from "react";
import type { PuzzleEinheit } from "@/types";
import BerufCard from "./BerufCard";

/**
 * Liste mit Textsuche und Kategorie-Filter über alle Einheiten (Berufe oder
 * Studiengänge). Generisch über die Kategorie, damit sie für beide Reiter
 * dieselbe Such-/Filterlogik verwendet.
 */
type MitKategorie<K extends string> = PuzzleEinheit & { kategorie: K };

export default function BerufListe<K extends string>({
  berufe,
  kategorieLabels,
  kategorieReihenfolge,
  hrefBase = "/puzzle",
  leerText = "Nichts gefunden. Versuch einen anderen Suchbegriff.",
}: {
  berufe: MitKategorie<K>[];
  kategorieLabels: Record<K, string>;
  kategorieReihenfolge: K[];
  hrefBase?: string;
  leerText?: string;
}) {
  const [query, setQuery] = useState("");
  const [aktivKategorie, setAktivKategorie] = useState<K | null>(null);

  const gefiltert = useMemo(() => {
    const q = query.trim().toLowerCase();
    return berufe.filter((b) => {
      const matchtKategorie = !aktivKategorie || b.kategorie === aktivKategorie;
      if (!matchtKategorie) return false;
      if (!q) return true;
      return (
        b.title.toLowerCase().includes(q) ||
        b.shortDescription.toLowerCase().includes(q)
      );
    });
  }, [berufe, query, aktivKategorie]);

  const nachKategorie = kategorieReihenfolge
    .map((kat) => ({
      kat,
      liste: gefiltert.filter((b) => b.kategorie === kat),
    }))
    .filter((g) => g.liste.length > 0);

  const vorhandeneKategorien = new Set(berufe.map((b) => b.kategorie));

  return (
    <div>
      <div className="mt-10 space-y-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Suchen …"
          aria-label="Suchen"
          className="w-full max-w-[26rem] rounded-[2px] border border-rule bg-paper px-4 py-3 text-[0.95rem] text-ink placeholder:text-ink-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mensch"
        />

        <div className="relative -mx-5 sm:mx-0">
        <div
          className="flex gap-2 overflow-x-auto px-5 pb-1 sm:flex-wrap sm:px-0"
          role="group"
          aria-label="Nach Kategorie filtern"
        >
          <button
            type="button"
            onClick={() => setAktivKategorie(null)}
            aria-pressed={aktivKategorie === null}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
              aktivKategorie === null
                ? "border-ink bg-ink text-paper"
                : "border-rule text-ink-2 hover:border-ink hover:text-ink"
            }`}
          >
            Alle
          </button>
          {kategorieReihenfolge
            .filter((k) => vorhandeneKategorien.has(k))
            .map((kat) => (
              <button
                key={kat}
                type="button"
                onClick={() =>
                  setAktivKategorie((cur) => (cur === kat ? null : kat))
                }
                aria-pressed={aktivKategorie === kat}
                className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                  aktivKategorie === kat
                    ? "border-ink bg-ink text-paper"
                    : "border-rule text-ink-2 hover:border-ink hover:text-ink"
                }`}
              >
                {kategorieLabels[kat]}
              </button>
            ))}
        </div>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-paper to-transparent sm:hidden"
          />
        </div>
      </div>

      {nachKategorie.length === 0 ? (
        <p className="mt-14 font-prose text-[0.95rem] italic text-ink-2">
          {leerText}
        </p>
      ) : (
        nachKategorie.map(({ kat, liste }) => (
          <section key={kat} className="mt-16">
            <h2 className="border-b-2 border-ink pb-2 font-display text-[1.4rem] font-semibold text-ink">
              {kategorieLabels[kat]}
            </h2>
            <div>
              {liste.map((beruf) => (
                <BerufCard key={beruf.slug} beruf={beruf} hrefBase={hrefBase} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
