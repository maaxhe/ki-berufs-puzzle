import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Arbeitsblatt from "@/components/Arbeitsblatt";
import { berufe, getBeruf } from "@/data/berufe";
import { studiengaenge, getStudiengang } from "@/data/studiengaenge";

export function generateStaticParams() {
  return [...berufe, ...studiengaenge].map((e) => ({ slug: e.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/arbeitsblatt/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const einheit = getBeruf(slug) ?? getStudiengang(slug);
  return {
    title: `Arbeitsblatt: ${einheit?.title ?? "Beruf"} – KI-Berufs-Puzzle`,
    robots: { index: false, follow: false },
  };
}

export default async function ArbeitsblattPage({
  params,
}: PageProps<"/arbeitsblatt/[slug]">) {
  const { slug } = await params;
  const einheit = getBeruf(slug) ?? getStudiengang(slug);
  if (!einheit) notFound();
  return <Arbeitsblatt einheit={einheit} pfad={`/arbeitsblatt/${slug}`} />;
}
