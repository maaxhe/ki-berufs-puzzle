import Link from "next/link";
import Wege from "@/components/Wege";
import BerufListe from "@/components/BerufListe";
import Disclaimer from "@/components/Disclaimer";
import Legend from "@/components/Legend";
import HeroZeichnung from "@/components/HeroZeichnung";
import { berufe } from "@/data/berufe";
import { studiengaenge } from "@/data/studiengaenge";
import { KATEGORIE_LABELS, KATEGORIE_REIHENFOLGE } from "@/types";
import type { BerufKategorie } from "@/types";

export default function Home() {
  return (
    <div className="mx-auto max-w-[64rem] px-4 py-14 sm:px-4 sm:py-20">
      <section className="min-[56rem]:grid min-[56rem]:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] min-[56rem]:items-center min-[56rem]:gap-12">
      <div className="max-w-[46rem]">
        <h1 className="max-w-[18ch] font-display text-[clamp(2.4rem,6vw,4rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-ink">
          Was in deinem Beruf kann KI – und was bleibt menschlich?
        </h1>
        <p className="prose-text mt-6 text-ink">
          Sortier die Aufgaben eines Berufs selbst in zwei Spalten – was KI heute
          übernehmen kann und was beim Menschen bleibt. Danach siehst du, wie
          Arbeitsmarktforschung dieselben Aufgaben einschätzt.
        </p>
        <Wege />
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link
            href="/praxis"
            className="font-prose text-[1.02rem] text-ink underline decoration-akzent decoration-2 underline-offset-4 hover:text-akzent"
          >
            Schon heute Realität: Fälle aus der Praxis →
          </Link>
        </div>
        <div className="mt-7">
          <Legend />
        </div>
      </div>
        <HeroZeichnung />
      </section>

      <div className="mt-12 max-w-[46rem]">
        <Disclaimer />
      </div>

      <div id="berufe" className="scroll-mt-6" />
      <BerufListe<BerufKategorie>
        berufe={berufe}
        kategorieLabels={KATEGORIE_LABELS}
        kategorieReihenfolge={KATEGORIE_REIHENFOLGE}
        hrefBase="/puzzle"
        querverweis={{ einheiten: studiengaenge, hrefBase: "/studium", label: "Studiengängen" }}
      />
    </div>
  );
}
