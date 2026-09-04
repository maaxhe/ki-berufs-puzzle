import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum – KI-Berufs-Puzzle",
};

export default function ImpressumPage() {
  return (
    <div className="mx-auto max-w-[68rem] px-5 py-14 sm:px-8 sm:py-20">
      <Link
        href="/"
        className="font-prose text-sm italic text-ink-2 underline decoration-ink/20 underline-offset-2 hover:text-mensch hover:decoration-mensch"
      >
        Alle Berufe
      </Link>

      <h1 className="mt-4 font-display text-[clamp(1.9rem,4.5vw,2.8rem)] font-semibold tracking-[-0.015em] text-ink">
        Impressum
      </h1>

      <div className="prose-text mt-6 text-ink">
        <p>
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
    </div>
  );
}
