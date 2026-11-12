import { handzeichenUrl } from "@/lib/handzeichen";

/** Verweis auf die Handzeichen-Umfrage zum Beruf: Meinung statt Einschätzung, mit den Antworten der anderen. */
export default function HandzeichenHinweis({ slug, title }: { slug: string; title: string }) {
  return (
    <section className="mt-14 max-w-[46rem] border-t-2 border-rule pt-8">
      <h2 className="font-display text-[1.9rem] text-ink">
        Was soll KI hier machen?
      </h2>
      <p className="mt-1 text-base font-semibold text-ink-2">
        Umfrage bei Handzeichen
      </p>
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
          className="text-ink underline decoration-akzent decoration-2 underline-offset-4 hover:text-akzent"
        >
          Zur Umfrage ↗
        </a>
      </p>
    </section>
  );
}
