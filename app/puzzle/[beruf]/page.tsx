import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TaskPuzzle from "@/components/TaskPuzzle";
import { berufe, getBeruf } from "@/data/berufe";

export function generateStaticParams() {
  return berufe.map((beruf) => ({ beruf: beruf.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/puzzle/[beruf]">): Promise<Metadata> {
  const { beruf: slug } = await params;
  const beruf = getBeruf(slug);
  if (!beruf) return { title: "Beruf nicht gefunden – KI-Berufs-Puzzle" };
  return {
    title: `${beruf.title} – KI-Berufs-Puzzle`,
    description: `${beruf.shortDescription} Ordne die Aufgaben selbst zu: Was übernimmt KI, was bleibt menschlich?`,
    alternates: { canonical: `/puzzle/${beruf.slug}` },
  };
}

export default async function PuzzlePage({
  params,
}: PageProps<"/puzzle/[beruf]">) {
  const { beruf: slug } = await params;
  const beruf = getBeruf(slug);
  if (!beruf) notFound();

  return <TaskPuzzle beruf={beruf} alleBerufe={berufe} />;
}
