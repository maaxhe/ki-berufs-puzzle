"use client";

import Link from "next/link";
import { useRef } from "react";
import type { PuzzleEinheit } from "@/types";
import { useStrecke } from "./useStrecke";
import "./Fahrplan.css";

export interface StreckenGruppe {
  id: string;
  label: string;
  liste: PuzzleEinheit[];
}

/**
 * Alle Berufe (oder Studiengänge) als Haltestellen an EINER durchgehenden Linie. Eine Kategorie beginnt mit einer größeren Station.
 * Die Bahn fährt die ganze Strecke ab.
 */
export default function BerufStrecke({ gruppen, hrefBase }: { gruppen: StreckenGruppe[]; hrefBase: string }) {
  const ref = useRef<HTMLUListElement>(null);
  useStrecke(ref, gruppen.map((g) => g.id + ":" + g.liste.map((b) => b.slug).join(",")).join("|"));
  return (
    <ul ref={ref} data-strecke className="fahrplan beruf-strecke">
      {gruppen.map((g) => [
        <li key={g.id} className="kat">
          <h2 className="halt kat-titel">{g.label}</h2>
        </li>,
        ...g.liste.map((beruf) => (
          <li key={g.id + "/" + beruf.slug}>
            <Link className="halt" href={`${hrefBase}/${beruf.slug}`}>
              <span className="halt-titel">{beruf.title}</span>
              <span className="halt-text">{beruf.shortDescription}</span>
            </Link>
          </li>
        )),
      ])}
    </ul>
  );
}
