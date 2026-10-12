import type { Metadata } from "next";
import Link from "next/link";
import KlasseAuswertung from "@/components/KlasseAuswertung";

export const metadata: Metadata = {
  title: "Klassenauswertung – KI-Berufs-Puzzle",
  description:
    "Die Klasse per QR-Code einladen und gemeinsam auswerten: Wo ist sich die Klasse uneins? Ohne Anmeldung, ohne Namen.",
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
        Erstelle einen Raum und lass die Klasse den QR-Code scannen. Die
        Ergebnisse kommen automatisch hier an – dann siehst du, wo die Klasse
        einig und wo sie gespalten ist. Es werden keine Namen gespeichert.
      </p>
      <div className="mt-10">
        <KlasseAuswertung />
      </div>
    </div>
  );
}
