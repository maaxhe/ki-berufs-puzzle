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
        className="inline-block rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-opacity hover:opacity-85"
      >
        Mit einer Klasse starten
      </Link>
    </div>
  );
}
