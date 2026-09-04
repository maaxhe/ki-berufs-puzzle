import type { Quelle } from "@/types";

export default function Quellen({
  quellen,
  compact = false,
}: {
  quellen: Quelle[];
  compact?: boolean;
}) {
  if (quellen.length === 0) return null;

  return (
    <section className={compact ? undefined : "border-t border-rule pt-6"}>
      <h2 className="font-display text-sm font-semibold text-ink">
        Datengrundlage
      </h2>
      {!compact && (
        <p className="mt-1 font-prose text-[0.95rem] italic text-ink-2">
          Der Durchschnittswert dieses Berufs ist an diesen Studien und Tools
          kalibriert.
        </p>
      )}
      <ol
        className={`mt-2 space-y-1.5 font-prose text-[0.95rem] leading-relaxed text-ink ${
          compact ? "" : "list-inside list-decimal"
        }`}
      >
        {quellen.map((q) => (
          <li key={q.url}>
            <a
              href={q.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-ink/30 underline-offset-2 transition-colors hover:decoration-mensch hover:text-mensch"
            >
              {q.label}
            </a>
            {q.wert && !compact && (
              <span className="text-ink-2"> — Vergleichswert: {q.wert}</span>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
