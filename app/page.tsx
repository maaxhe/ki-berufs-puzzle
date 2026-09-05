import BerufListe from "@/components/BerufListe";
import Disclaimer from "@/components/Disclaimer";
import Legend from "@/components/Legend";
import { berufe } from "@/data/berufe";
import { KATEGORIE_LABELS, KATEGORIE_REIHENFOLGE } from "@/types";
import type { BerufKategorie } from "@/types";

export default function Home() {
  return (
    <div className="mx-auto max-w-[68rem] px-5 py-14 sm:px-8 sm:py-20">
      <section className="max-w-[46rem]">
        <h1 className="max-w-[18ch] font-display text-[clamp(2.4rem,6vw,4rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-ink">
          Was in deinem Beruf kann KI – und was bleibt menschlich?
        </h1>
        <p className="prose-text mt-6 text-ink">
          Sortier die Aufgaben eines Berufs selbst in zwei Spalten – was KI heute
          übernehmen kann und was beim Menschen bleibt. Danach siehst du, wie
          Arbeitsmarktforschung dieselben Aufgaben einschätzt.
        </p>
        <div className="mt-7">
          <Legend />
        </div>
      </section>

      <div className="mt-12 max-w-[46rem]">
        <Disclaimer />
      </div>

      <BerufListe<BerufKategorie>
        berufe={berufe}
        kategorieLabels={KATEGORIE_LABELS}
        kategorieReihenfolge={KATEGORIE_REIHENFOLGE}
        hrefBase="/puzzle"
      />
    </div>
  );
}
