"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Umschließt Header, Content und Footer und setzt bei den Studiengängen
 * (/studium, /studium-vergleich) die Klasse "theme-studium" – dadurch
 * wechseln Papier-, Trennlinien- und Akzentfarbe für den ganzen Bereich,
 * nicht nur innerhalb der einzelnen Seiten.
 */
export default function ThemeRoot({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const studium = pathname?.startsWith("/studium") ?? false;

  return (
    <div
      className={`min-h-full flex flex-col bg-paper transition-colors ${
        studium ? "theme-studium" : ""
      }`}
    >
      {children}
    </div>
  );
}
