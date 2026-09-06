import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TaskPuzzle from "@/components/TaskPuzzle";
import { studiengaenge, getStudiengang } from "@/data/studiengaenge";

export function generateStaticParams() {
  return studiengaenge.map((s) => ({ studiengang: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/studium/[studiengang]">): Promise<Metadata> {
  const { studiengang: slug } = await params;
  const studiengang = getStudiengang(slug);
  if (!studiengang)
    return { title: "Studiengang nicht gefunden – KI-Studiengänge-Puzzle" };
  return {
    title: `${studiengang.title} – KI-Studiengänge-Puzzle`,
    description: `Ordne die typischen Aufgaben von ${studiengang.title} zu: Was übernimmt KI, was bleibt menschlich?`,
  };
}

export default async function StudiumPuzzlePage({
  params,
}: PageProps<"/studium/[studiengang]">) {
  const { studiengang: slug } = await params;
  const studiengang = getStudiengang(slug);
  if (!studiengang) notFound();

  return (
    <div className="theme-studium">
      <TaskPuzzle
        beruf={studiengang}
        alleBerufe={studiengaenge}
        zurueckHref="/studium"
        zurueckLabel="Alle Studiengänge"
        vergleichHref="/studium-vergleich"
        vergleichLabel="Studiengänge im Vergleich"
        appTitel="KI-Studiengänge-Puzzle"
        puzzleBasePath="/studium"
        naechstesLabel="Nächster Studiengang"
      />
    </div>
  );
}
