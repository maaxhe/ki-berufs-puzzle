"use client";

import { useMemo, useState } from "react";
import type { PuzzleEinheit } from "@/types";
import Link from "next/link";
import BerufCard from "./BerufCard";
import { suche } from "@/lib/suche";

/** Die jeweils andere Liste (Berufe ↔ Studiengänge), die bei der Suche mitdurchsucht wird. */
export interface Querverweis {
  einheiten: PuzzleEinheit[];
  hrefBase: string;
  /** z. B. „Studiengängen“ → „Auch gefunden bei Studiengängen“ */
  label: string;
}

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
  querverweis,
}: {
  berufe: MitKategorie<K>[];
  kategorieLabels: Record<K, string>;
  kategorieReihenfolge: K[];
  hrefBase?: string;
  leerText?: string;
  querverweis?: Querverweis;
}) {
  const [query, setQuery] = useState("");
  const [aktivKategorie, setAktivKategorie] = useState<K | null>(null);

  const suchWort = query.trim();

  const ergebnis = useMemo(() => {
    const inKategorie = berufe.filter(
      (b) => !aktivKategorie || b.kategorie === aktivKategorie,
    );
    return suche(inKategorie, suchWort);
  }, [berufe, suchWort, aktivKategorie]);

  const querTreffer = useMemo(() => {
    if (!suchWort || !querverweis) return [];
    const r = suche(querverweis.einheiten, suchWort);
    return [...r.treffer, ...r.verwandt].slice(0, 6);
  }, [querverweis, suchWort]);

  const gefiltert = ergebnis.treffer;

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

      {querTreffer.length > 0 && (
        <aside className="mt-10 border-l-2 border-mensch bg-paper-2 py-3 pl-4">
          <p className="font-display text-xs font-semibold uppercase tracking-wider text-mensch">
            Auch gefunden bei {querverweis!.label}
          </p>
          <ul className="mt-2 space-y-1.5">
            {querTreffer.map((b) => (
              <li key={b.slug}>
                <Link
                  href={`${querverweis!.hrefBase}/${b.slug}`}
                  className="font-prose text-[1.02rem] italic text-ink underline decoration-mensch decoration-2 underline-offset-4 hover:text-mensch"
                >
                  {b.title} →
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}

      {suchWort ? (
        <>
          {ergebnis.treffer.length > 0 && (
            <section className="mt-12">
              <h2 className="border-b-2 border-ink pb-2 font-display text-[1.4rem] font-semibold text-ink">
                Treffer
              </h2>
              {ergebnis.treffer.map((beruf) => (
                <BerufCard key={beruf.slug} beruf={beruf} hrefBase={hrefBase} />
              ))}
            </section>
          )}
          {ergebnis.verwandt.length > 0 && (
            <section className="mt-12">
              <h2 className="border-b border-rule pb-2 font-display text-[1.15rem] font-semibold text-ink-2">
                Verwandt – kommt in der Beschreibung oder den Aufgaben vor
              </h2>
              {ergebnis.verwandt.map((beruf) => (
                <BerufCard key={beruf.slug} beruf={beruf} hrefBase={hrefBase} />
              ))}
            </section>
          )}
          {ergebnis.treffer.length + ergebnis.verwandt.length === 0 && (
            <p className="mt-14 font-prose text-[0.95rem] italic text-ink-2">
              {leerText}
            </p>
          )}
        </>
      ) : nachKategorie.length === 0 ? (
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
