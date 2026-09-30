import type { Metadata } from "next";
import Link from "next/link";
import { berufe } from "@/data/berufe";
import { studiengaenge } from "@/data/studiengaenge";
import {
  KATEGORIE_LABELS,
  KATEGORIE_REIHENFOLGE,
  STUDIENGANG_KATEGORIE_LABELS,
  STUDIENGANG_KATEGORIE_REIHENFOLGE,
} from "@/types";

export const metadata: Metadata = {
  title: "Für Lehrkräfte – KI-Berufs-Puzzle",
  description:
    "Ablauf für 45 Minuten, Klassenauswertung ohne Anmeldung und druckbare Arbeitsblätter zum KI-Berufs-Puzzle.",
};

const linkKlasse =
  "underline decoration-ink/30 underline-offset-2 hover:text-mensch hover:decoration-mensch";

export default function LehrkraeftePage() {
  return (
    <div className="mx-auto max-w-[68rem] px-5 py-14 sm:px-8 sm:py-20">
      <Link
        href="/"
        className="font-prose text-sm italic text-ink-2 underline decoration-ink/20 underline-offset-2 hover:text-mensch hover:decoration-mensch"
      >
        Alle Berufe
      </Link>
      <h1 className="mt-4 font-display text-[clamp(1.9rem,4.5vw,2.8rem)] font-semibold tracking-[-0.015em] text-ink">
        Für Lehrkräfte und Workshop-Leitungen
      </h1>

      <div className="prose-text mt-6 max-w-[46rem] space-y-10 text-ink">
        <section className="space-y-3">
          <p>
            Das Puzzle ist für Berufsorientierung ab Klasse 8 gedacht. Es
            braucht keine Anmeldung, speichert keine Namen und funktioniert auf
            dem Handy. Diese Seite sammelt alles, was du für eine Stunde
            brauchst.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-[1.4rem] font-semibold text-ink">
            Ablauf in 45 Minuten
          </h2>
          <ol className="ml-5 list-decimal space-y-2">
            <li>
              <strong>Einstieg (5 Min.):</strong> Frage in den Raum: „Welche
              Aufgabe in einem Beruf, den du kennst, würde eine KI zuerst
              übernehmen?“ Gib die Berufe an die Gruppen.
            </li>
            <li>
              <strong>Sortieren (15 Min.):</strong> Einzeln oder zu zweit am
              Handy, oder mit dem Arbeitsblatt auf Papier. Die Schüler:innen
              sortieren die Aufgaben in „Mensch“ und „KI“.
            </li>
            <li>
              <strong>Vergleichen (10 Min.):</strong> Jede Gruppe sieht das
              Ergebnis, dazu die Begründungen. Mit dem Klassenmodus seht ihr
              gemeinsam, wo die Klasse uneins ist.
            </li>
            <li>
              <strong>Diskutieren (10 Min.):</strong> Zu jedem Beruf gibt es
              Diskussionsfragen auf dem Arbeitsblatt. Besonders ergiebig sind
              die Aufgaben mit dem Vermerk „Überraschend“.
            </li>
            <li>
              <strong>Transfer (5 Min.):</strong> Was heißt das für die eigene
              Berufswahl? Welche Stärken zählen künftig mehr?
            </li>
          </ol>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-[1.4rem] font-semibold text-ink">
            Klassenauswertung ohne Anmeldung
          </h2>
          <p>
            Nach dem Sortieren zeigt das Ergebnis einen kurzen{" "}
            <strong>Klassencode</strong>. Er enthält nur die Zuordnung, keine
            Namen. Sammle die Codes der Schüler:innen ein (Zuruf, Chat,
            Zettel) und füge sie auf der{" "}
            <Link href="/klasse" className={linkKlasse}>
              Klassenauswertung
            </Link>{" "}
            ein. Du siehst pro Aufgabe, wie viele Schüler:innen für „KI“ oder
            „Mensch“ gestimmt haben – und wo die Klasse am meisten
            auseinanderliegt. Die Auswertung läuft komplett im Browser, nichts
            wird hochgeladen.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-[1.4rem] font-semibold text-ink">
            Worauf ihr achten solltet
          </h2>
          <ul className="ml-5 list-disc space-y-1">
            <li>
              Die Werte sind didaktische Schätzungen, keine Prognosen. Sie
              sollen Streit auslösen, nicht das Gespräch beenden – mehr auf der{" "}
              <Link href="/methodik" className={linkKlasse}>
                Methodik-Seite
              </Link>
              .
            </li>
            <li>
              „KI kann das“ heißt nicht „KI macht das“: Kosten, Recht,
              Verantwortung und Kundenwunsch entscheiden mit.
            </li>
            <li>
              Bei Berufen mit dem Vermerk „Überraschend“ lohnt es sich, die
              Faustregel „Verwaltung = KI, Beziehung = Mensch“ gemeinsam zu
              hinterfragen.
            </li>
          </ul>
        </section>
      </div>

      <section className="mt-14">
        <h2 className="border-b-2 border-ink pb-2 font-display text-[1.4rem] font-semibold text-ink">
          Materialien pro Beruf
        </h2>
        <p className="prose-text mt-3 max-w-[46rem] text-ink">
          Zu jedem Beruf gibt es das Puzzle, ein druckbares Arbeitsblatt und
          eine Lösungs-Version mit Begründungen und allen Diskussionsfragen.
        </p>
        <div className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {KATEGORIE_REIHENFOLGE.map((kat) => {
            const liste = berufe.filter((b) => b.kategorie === kat);
            if (liste.length === 0) return null;
            return (
              <div key={kat}>
                <h3 className="font-display text-sm font-semibold text-ink">
                  {KATEGORIE_LABELS[kat]}
                </h3>
                <ul className="mt-2 space-y-2 text-sm">
                  {liste.map((b) => (
                    <li key={b.slug} className="leading-snug">
                      <span className="text-ink">{b.title}</span>
                      <br />
                      <span className="text-ink-2">
                        <Link href={`/puzzle/${b.slug}`} className={linkKlasse}>
                          Puzzle
                        </Link>
                        {" · "}
                        <Link
                          href={`/arbeitsblatt/${b.slug}`}
                          className={linkKlasse}
                        >
                          Arbeitsblatt
                        </Link>
                        {" · "}
                        <Link
                          href={`/arbeitsblatt/${b.slug}/loesung`}
                          className={linkKlasse}
                        >
                          Lösung
                        </Link>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="border-b-2 border-ink pb-2 font-display text-[1.4rem] font-semibold text-ink">
          Materialien pro Studiengang
        </h2>
        <div className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {STUDIENGANG_KATEGORIE_REIHENFOLGE.map((kat) => {
            const liste = studiengaenge.filter((s) => s.kategorie === kat);
            if (liste.length === 0) return null;
            return (
              <div key={kat}>
                <h3 className="font-display text-sm font-semibold text-ink">
                  {STUDIENGANG_KATEGORIE_LABELS[kat]}
                </h3>
                <ul className="mt-2 space-y-2 text-sm">
                  {liste.map((s) => (
                    <li key={s.slug} className="leading-snug">
                      <span className="text-ink">{s.title}</span>
                      <br />
                      <span className="text-ink-2">
                        <Link href={`/studium/${s.slug}`} className={linkKlasse}>
                          Puzzle
                        </Link>
                        {" · "}
                        <Link
                          href={`/arbeitsblatt/${s.slug}`}
                          className={linkKlasse}
                        >
                          Arbeitsblatt
                        </Link>
                        {" · "}
                        <Link
                          href={`/arbeitsblatt/${s.slug}/loesung`}
                          className={linkKlasse}
                        >
                          Lösung
                        </Link>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
