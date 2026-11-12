"use client";

import Link from "next/link";
import { useKlasse } from "@/lib/useKlasse";

/** Einstieg für Lehrkräfte; wer schon per QR-Code in einer Klasse ist, sieht ihn nicht. */
export default function KlasseStartButton() {
  const klasse = useKlasse();
  if (klasse) return null;
  return (
    <div className="mt-7">
      <Link
        href="/klasse"
        className="inline-flex min-h-12 items-center rounded-full border-[3px] border-ink bg-ink px-6 py-2.5 text-lg font-bold text-paper transition-colors hover:bg-paper hover:text-ink"
      >
        Mit einer Klasse starten
      </Link>
    </div>
  );
}
