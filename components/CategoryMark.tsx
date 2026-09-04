import type { TaskCategory } from "@/types";
import { CATEGORY_LABELS } from "@/types";

/**
 * Kleine geometrische Marke pro Aufgaben-Kategorie – ruhiger und weniger
 * "generiert" als ein Emoji-Icon. Die Form trägt die Information:
 * Quadrat = Routine, Kreis = Sozial, Raute = Kreativ, Dreieck = Analytisch,
 * Balken = Körperlich.
 */
export default function CategoryMark({
  category,
  className = "",
}: {
  category: TaskCategory;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex h-3 w-3 shrink-0 items-center justify-center text-current ${className}`}
      title={CATEGORY_LABELS[category]}
    >
      <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
        {category === "routine" && (
          <rect x="1.5" y="1.5" width="9" height="9" fill="currentColor" />
        )}
        {category === "sozial" && (
          <circle cx="6" cy="6" r="4.5" fill="currentColor" />
        )}
        {category === "kreativ" && (
          <rect
            x="6"
            y="0.6"
            width="7.6"
            height="7.6"
            transform="rotate(45 6 6)"
            fill="currentColor"
          />
        )}
        {category === "analytisch" && (
          <path d="M6 1 L11 10.5 L1 10.5 Z" fill="currentColor" />
        )}
        {category === "physisch" && (
          <rect x="0.5" y="4" width="11" height="4" fill="currentColor" />
        )}
      </svg>
      <span className="sr-only">{CATEGORY_LABELS[category]}</span>
    </span>
  );
}
