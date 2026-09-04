import BerufCard from "@/components/BerufCard";
import Disclaimer from "@/components/Disclaimer";
import Legend from "@/components/Legend";
import { berufe } from "@/data/berufe";
import { KATEGORIE_LABELS, KATEGORIE_REIHENFOLGE } from "@/types";

export default function Home() {
  const nachKategorie = KATEGORIE_REIHENFOLGE.map((kat) => ({
    kat,
    liste: berufe.filter((b) => b.kategorie === kat),
  })).filter((g) => g.liste.length > 0);

  return (
    <div className="mx-auto max-w-[68rem] px-5 py-14 sm:px-8 sm:py-20">
      <section className="max-w-[46rem]">
        <h1 className="max-w-[15ch] font-display text-[clamp(2.4rem,6vw,4rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-ink">
          Was von deinem Beruf macht bald eine Maschine?
        </h1>
        <p className="prose-text mt-6 text-ink">
          Sortier die Aufgaben eines Berufs selbst in zwei Spalten – was eine
          Maschine übernehmen kann und was beim Menschen bleibt. Danach siehst
          du, wie Arbeitsmarktforschung dieselben Aufgaben einschätzt.
        </p>
        <div className="mt-7">
          <Legend />
        </div>
      </section>

      <div className="mt-12 max-w-[46rem]">
        <Disclaimer />
      </div>

      {nachKategorie.map(({ kat, liste }) => (
        <section key={kat} className="mt-16">
          <h2 className="border-b-2 border-ink pb-2 font-display text-[1.4rem] font-semibold text-ink">
            {KATEGORIE_LABELS[kat]}
          </h2>
          <div>
            {liste.map((beruf) => (
              <BerufCard key={beruf.slug} beruf={beruf} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
