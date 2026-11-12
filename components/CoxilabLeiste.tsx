"use client";

import { useEffect, useState } from "react";
import { currentTheme, setTheme, type Theme } from "@/components/theme";
import "./CoxilabLeiste.css";

// Identische Umsteigeleiste auf jeder Seite (Vorlage: coxilab-stile/leiste/leiste.css): Rückweg zu coxilab.de, Umsteigen, Hell/Dunkel.
const LINIEN = [
  { id: "d", name: "Dilemma", href: "https://dilemma.coxilab.de/", farbe: "#e88080" },
  { id: "p", name: "KI-Berufs-Puzzle", href: "https://jobs.coxilab.de/", farbe: "#9a86dc" },
  { id: "r", name: "Reward Rover", href: "https://rover.coxilab.de/", farbe: "#5cb68e" },
  { id: "h", name: "Handzeichen", href: "https://coxilab.de/handzeichen/", farbe: "#ee9a5a" },
  { id: "a", name: "Artikel", href: "https://maximilianherrmann.com/blog/", farbe: "#5aaed6" },
];

const Sonne = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);
const Mond = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z" />
  </svg>
);

export default function CoxilabLeiste() {
  const [theme, setT] = useState<Theme>("light");
  useEffect(() => setT(currentTheme()), []);

    const wahl = (t: Theme) => {
    setTheme(t);
    setT(t);
  };
  const liste = (
    <ul>
      {LINIEN.map((l) => (
        <li key={l.id}>
          <a href={l.href} aria-label={l.name} aria-current={l.id === "p" ? "page" : undefined}>
            <i style={{ background: l.farbe }} aria-hidden="true">{l.id.toUpperCase()}</i>
            <span>{l.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
  return (
    <nav className="cx-leiste" aria-label="coxilab">
      <a className="cx-zurueck" href="https://coxilab.de/"><i aria-hidden="true">←</i><span>coxilab</span></a>
      <span className="cx-info">Umsteigen:</span>
      {liste}
      <div className="cx-theme" role="group" aria-label="Farbschema">
        <button type="button" aria-pressed={theme === "light"} onClick={() => wahl("light")} title="Hell" aria-label="Hell">
          <Sonne />
          <span>Hell</span>
        </button>
        <button type="button" aria-pressed={theme === "dark"} onClick={() => wahl("dark")} title="Dunkel" aria-label="Dunkel">
          <Mond />
          <span>Dunkel</span>
        </button>
      </div>
    </nav>
  );
}
