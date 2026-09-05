import type { Metadata } from "next";
import BerufListe from "@/components/BerufListe";
import Disclaimer from "@/components/Disclaimer";
import Legend from "@/components/Legend";
import { studiengaenge } from "@/data/studiengaenge";
import {
  STUDIENGANG_KATEGORIE_LABELS,
  STUDIENGANG_KATEGORIE_REIHENFOLGE,
} from "@/types";
import type { StudiengangKategorie } from "@/types";

export const metadata: Metadata = {
  title: "KI-Studiengänge-Puzzle",
  description:
    "Sortier die typischen Aufgaben eines Studiengangs selbst: Was kann KI heute übernehmen, was bleibt beim Menschen? Welches Studium ist gut für eine KI-Zukunft gerüstet?",
};

export default function StudiumPage() {
  return (
    <div className="theme-studium mx-auto max-w-[68rem] px-5 py-14 sm:px-8 sm:py-20">
      <section className="max-w-[46rem]">
        <h1 className="max-w-[22ch] font-display text-[clamp(2.4rem,6vw,4rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-ink">
          Welches Studium hält KI stand?
        </h1>
        <p className="prose-text mt-6 text-ink">
          Sortier die typischen Aufgaben eines Studiengangs und des Berufsfelds
          dahinter selbst in zwei Spalten – was KI heute übernehmen kann und
          was beim Menschen bleibt. Danach siehst du, wie gut dieser
          Studiengang für eine KI-Zukunft gerüstet ist.
        </p>
        <div className="mt-7">
          <Legend />
        </div>
      </section>
      <div className="mt-12 max-w-[46rem]">
        <Disclaimer />
      </div>
      <BerufListe<StudiengangKategorie>
        berufe={studiengaenge}
        kategorieLabels={STUDIENGANG_KATEGORIE_LABELS}
        kategorieReihenfolge={STUDIENGANG_KATEGORIE_REIHENFOLGE}
        hrefBase="/studium"
        leerText="Kein Studiengang gefunden. Versuch einen anderen Suchbegriff."
      />
    </div>
  );
}
