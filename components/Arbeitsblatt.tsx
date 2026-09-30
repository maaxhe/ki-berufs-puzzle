import Link from "next/link";
import type { PuzzleEinheit } from "@/types";
import { CATEGORY_LABELS } from "@/types";
import { istGrenzfall, konfidenzLabel, modellZuordnung } from "@/lib/scoring";
import { diskussionsfragen } from "@/lib/diskussion";
import { SITE_URL } from "@/lib/site";
import PrintButton from "./PrintButton";

/**
 * Druckbares Arbeitsblatt zum Sortieren ohne Bildschirm. Die Lösungs-Variante
 * (für Lehrkräfte) zeigt zusätzlich Modell-Einschätzung und Begründung.
 */
export default function Arbeitsblatt({
  einheit,
  pfad,
  loesung = false,
}: {
  einheit: PuzzleEinheit;
  pfad: string;
  loesung?: boolean;
}) {
  const fragen = diskussionsfragen(einheit);
  return (
    <div className="mx-auto max-w-[52rem] px-5 py-10 sm:px-8 print:max-w-none print:px-0 print:py-0">
      <div className="mb-6 flex flex-wrap items-center gap-4 print:hidden">
        <PrintButton label="Drucken / als PDF speichern" />
        <Link
          href="/lehrkraefte"
          className="text-sm text-ink underline decoration-ink/30 underline-offset-4 hover:text-mensch"
        >
          Zurück zur Lehrkräfte-Seite
        </Link>
        <Link
          href={loesung ? pfad : `${pfad}/loesung`}
          className="text-sm text-ink underline decoration-ink/30 underline-offset-4 hover:text-mensch"
        >
          {loesung ? "Zur Schüler:innen-Version" : "Zur Lösungs-Version"}
        </Link>
      </div>

      <header className="border-b-2 border-ink pb-3">
        <p className="text-xs uppercase tracking-wide text-ink-2">
          KI-Berufs-Puzzle · Arbeitsblatt{loesung ? " · Lösung für Lehrkräfte" : ""}
        </p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-ink">
          {einheit.title}
        </h1>
        <p className="mt-1 font-prose text-[0.95rem] text-ink-2">
          {einheit.shortDescription}
        </p>
        {!loesung && (
          <p className="mt-4 text-sm text-ink">
            Name: ______________________ &nbsp; Datum: ______________
          </p>
        )}
      </header>

      <section className="mt-5">
        <h2 className="font-display text-lg font-semibold text-ink">
          1. Sortieren
        </h2>
        <p className="mt-1 font-prose text-[0.95rem] text-ink">
          Wer kann diese Aufgabe <strong>heute</strong> übernehmen? Setze für
          jede Aufgabe ein Kreuz: beim <strong>Menschen</strong> oder bei der{" "}
          <strong>KI</strong>. Du musst dich entscheiden – aber du darfst
          unsicher sein.
        </p>
        <table className="mt-3 w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-ink">
              <th className="py-2 pr-3 font-semibold">Aufgabe</th>
              <th className="w-20 py-2 text-center font-semibold">Mensch</th>
              <th className="w-20 py-2 text-center font-semibold">KI</th>
              {loesung && (
                <th className="w-40 py-2 pl-3 font-semibold">Modell</th>
              )}
            </tr>
          </thead>
          <tbody>
            {einheit.tasks.map((task) => {
              const modell = modellZuordnung(task);
              const grenz = istGrenzfall(task.kiEignung);
              return (
                <tr
                  key={task.id}
                  className="break-inside-avoid border-b border-rule align-top"
                >
                  <td className="py-2.5 pr-3">
                    <span className="font-semibold text-ink">{task.title}</span>
                    <span className="ml-2 text-xs text-ink-2">
                      {CATEGORY_LABELS[task.category]}
                      {task.kontext === "studium" && " · im Studium"}
                      {task.kontext === "beruf" && " · im Beruf danach"}
                    </span>
                    <span className="block font-prose text-[0.9rem] text-ink-2">
                      {task.description}
                    </span>
                    {loesung && (
                      <span className="mt-1 block font-prose text-[0.9rem] text-ink">
                        {task.ueberraschend && (
                          <strong>Überraschend: </strong>
                        )}
                        {task.warum}
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 text-center text-lg">
                    {loesung && modell === "mensch" && !grenz ? "☒" : "☐"}
                  </td>
                  <td className="py-2.5 text-center text-lg">
                    {loesung && modell === "ki" && !grenz ? "☒" : "☐"}
                  </td>
                  {loesung && (
                    <td className="py-2.5 pl-3 text-xs text-ink-2">
                      {konfidenzLabel(task.kiEignung)}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section className="mt-6 break-inside-avoid">
        <h2 className="font-display text-lg font-semibold text-ink">
          2. Besprechen
        </h2>
        <ol className="mt-2 list-decimal space-y-3 pl-5 font-prose text-[0.95rem] text-ink">
          {fragen.slice(0, loesung ? fragen.length : 3).map((frage) => (
            <li key={frage}>
              {frage}
              {!loesung && (
                <span className="mt-2 block border-b border-ink/40 pb-4" />
              )}
            </li>
          ))}
        </ol>
      </section>

      <footer className="mt-8 border-t border-rule pt-3 text-xs text-ink-2">
        Die Werte sind didaktische Schätzungen zur Diskussion, keine Prognosen.
        Mehr unter {SITE_URL}
      </footer>
    </div>
  );
}
