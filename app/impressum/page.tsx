import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum – KI-Berufs-Puzzle",
};

export default function ImpressumPage() {
  return (
    <div className="mx-auto max-w-[68rem] px-5 py-14 sm:px-8 sm:py-16">
      <Link
        href="/"
        className="font-prose text-sm italic text-ink-2 underline decoration-ink/20 underline-offset-2 hover:text-mensch hover:decoration-mensch"
      >
        Alle Berufe
      </Link>

      <h1 className="mt-6 font-display text-lg font-semibold text-ink">
        Impressum
      </h1>
      <p className="mt-3 font-prose text-sm leading-relaxed text-ink-2">
        Maximilian Herrmann
        <br />
        Osnabrück, Deutschland
        <br />
        <a
          href="mailto:contact@maximilianherrmann.com"
          className="underline decoration-ink/30 underline-offset-2 hover:text-mensch hover:decoration-mensch"
        >
          contact@maximilianherrmann.com
        </a>
      </p>
    </div>
  );
}
