import type { Metadata } from "next";
import Link from "next/link";
import KlasseAuswertung from "@/components/KlasseAuswertung";

export const metadata: Metadata = {
  title: "Klassenauswertung – KI-Berufs-Puzzle",
  description:
    "Klassencodes einsammeln und gemeinsam auswerten: Wo ist sich die Klasse uneins? Ohne Anmeldung, alles bleibt im Browser.",
};

export default function KlassePage() {
  return (
    <div className="mx-auto max-w-[68rem] px-5 py-14 sm:px-8 sm:py-20">
      <Link
        href="/lehrkraefte"
        className="font-prose text-sm italic text-ink-2 underline decoration-ink/20 underline-offset-2 hover:text-mensch hover:decoration-mensch"
      >
        Für Lehrkräfte
      </Link>
      <h1 className="mt-4 font-display text-[clamp(1.9rem,4.5vw,2.8rem)] font-semibold tracking-[-0.015em] text-ink">
        Klassenauswertung
      </h1>
      <p className="prose-text mt-3 max-w-[46rem] text-ink">
        Jede:r Schüler:in bekommt am Ende des Puzzles einen Code. Sammle sie ein
        und füge sie hier ein – dann siehst du, wo die Klasse einig und wo sie
        gespalten ist. Es werden keine Namen und keine Daten gespeichert.
      </p>
      <div className="mt-10">
        <KlasseAuswertung />
      </div>
    </div>
  );
}
