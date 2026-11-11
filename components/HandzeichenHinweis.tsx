import { handzeichenUrl } from "@/lib/handzeichen";

/** Verweis auf die Handzeichen-Umfrage zum Beruf: Meinung statt Einschätzung, mit den Antworten der anderen. */
export default function HandzeichenHinweis({ slug, title }: { slug: string; title: string }) {
  return (
    <section className="mt-14 max-w-[46rem] border-t border-rule pt-8">
      <p className="font-display text-xs font-semibold uppercase tracking-wider text-mensch">
        Umfrage bei Handzeichen
      </p>
      <h2 className="mt-2 font-display text-[1.35rem] font-semibold leading-snug text-ink">
        Was soll KI hier machen?
      </h2>
      <p className="prose-text mt-3 text-ink">
        Im Puzzle geht es darum, was KI übernehmen kann. Ob sie es auch soll, ist eine andere Frage. In der Umfrage zu{" "}
        {title} stimmst du anonym ab und siehst danach, wie die anderen geantwortet haben. Ohne Anmeldung, in ein paar
        Minuten.
      </p>
      <p className="mt-4 font-prose text-[0.95rem]">
        <a
          href={handzeichenUrl(slug)}
          target="_blank"
          rel="noopener"
          className="italic text-ink underline decoration-mensch decoration-2 underline-offset-4 hover:text-mensch"
        >
          Zur Umfrage ↗
        </a>
      </p>
    </section>
  );
}
