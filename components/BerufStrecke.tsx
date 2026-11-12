"use client";

import Link from "next/link";
import { useRef } from "react";
import type { PuzzleEinheit } from "@/types";
import { useStrecke } from "./useStrecke";
import "./Fahrplan.css";

/** Alle Berufe einer Kategorie als Haltestellen an einer Linie; die Bahn fährt sie nacheinander ab. */
export default function BerufStrecke({ liste, hrefBase }: { liste: PuzzleEinheit[]; hrefBase: string }) {
  const ref = useRef<HTMLUListElement>(null);
  useStrecke(ref, liste.map((b) => b.slug).join(","));
  return (
    <ul ref={ref} data-strecke className="fahrplan beruf-strecke">
      {liste.map((beruf) => (
        <li key={beruf.slug}>
          <Link className="halt" href={`${hrefBase}/${beruf.slug}`}>
            <span className="halt-titel">{beruf.title}</span>
            <span className="halt-text">{beruf.shortDescription}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
