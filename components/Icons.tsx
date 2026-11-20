import type { ReactNode } from "react";
import type { TaskCategory } from "@/types";

/**
 * Eigene Icons statt Emojis. Alle im selben Strich gezeichnet (24er Raster,
 * runde Enden, Farbe kommt vom Text), damit sie auf jedem Gerät gleich aussehen.
 */
function Icon({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1.1em"
      height="1.1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={`inline-block shrink-0 align-[-0.18em] ${className}`}
    >
      {children}
    </svg>
  );
}

/** Routine: ein Kreislauf, immer wieder dasselbe. */
function RoutineIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M4.5 11a7.5 7.5 0 0 1 13-4.2L19.5 9" />
      <path d="M19.5 4.5V9H15" />
      <path d="M19.5 13a7.5 7.5 0 0 1-13 4.2L4.5 15" />
      <path d="M4.5 19.5V15H9" />
    </Icon>
  );
}

/** Kreativ: ein Stift, der eine Linie zieht. */
function KreativIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M14.5 5.5l4 4L9 19l-5 1 1-5z" />
      <path d="M12.5 7.5l4 4" />
      <path d="M14 20.5c1.6-1.4 3.2-1.4 4.6 0" />
    </Icon>
  );
}

/** Sozial: zwei Menschen nebeneinander. */
function SozialIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <circle cx="8.5" cy="8" r="2.8" />
      <path d="M3 19.5c0-3.3 2.4-5.5 5.5-5.5s5.5 2.2 5.5 5.5" />
      <circle cx="17" cy="9" r="2.2" />
      <path d="M16.5 14.2c2.6.1 4.5 2 4.5 5.3" />
    </Icon>
  );
}

/** Analytisch: drei Balken auf einer Grundlinie. */
function AnalytischIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M3.5 20.5h17" />
      <path d="M7 20.5v-6" />
      <path d="M12 20.5V5" />
      <path d="M17 20.5v-10" />
    </Icon>
  );
}

/** Physisch: eine Hand, die zupackt. */
function PhysischIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M8 12.5V6a1.5 1.5 0 0 1 3 0v5" />
      <path d="M11 11V4.5a1.5 1.5 0 0 1 3 0V11" />
      <path d="M14 11V6a1.5 1.5 0 0 1 3 0v8" />
      <path d="M8 12.5l-1.6-1.8a1.5 1.5 0 0 0-2.3 1.9l3.4 5.2A5.5 5.5 0 0 0 12.1 20.5H13a4 4 0 0 0 4-4V14" />
    </Icon>
  );
}

const KATEGORIE: Record<
  TaskCategory,
  (p: { className?: string }) => ReactNode
> = {
  routine: RoutineIcon,
  kreativ: KreativIcon,
  sozial: SozialIcon,
  analytisch: AnalytischIcon,
  physisch: PhysischIcon,
};

export function KategorieIcon({
  category,
  className,
}: {
  category: TaskCategory;
  className?: string;
}) {
  const Zeichnung = KATEGORIE[category];
  return <Zeichnung className={className} />;
}

/** Serie in der Schnellrunde. */
export function FlammeIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M12 3c.6 3.2 5.5 5.6 5.5 10.6A5.5 5.5 0 0 1 12 19.5a5.5 5.5 0 0 1-5.5-5.9c0-2 1-3.4 2.3-4.6.3 1.6 1 2.5 2 3C10.500 9 11 6 12 3z" />
      <path d="M12 19.500c-1.4 0-2.300-1-2.300-2.400 0-1.300 1-2.200 2.300-3.600 1.300 1.400 2.300 2.300 2.300 3.600 0 1.400-.9 2.400-2.300 2.400z" />
    </Icon>
  );
}
