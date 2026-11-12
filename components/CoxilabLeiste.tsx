"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { currentTheme, setTheme, type Theme } from "@/components/theme";
import "./CoxilabLeiste.css";

// Schmale Leiste über jeder Seite: Rückweg zu coxilab.de, Umsteigen zu den anderen Werkzeugen und der Schalter für Hell und Dunkel.
// Auf der Startseite stehen die vier Linien offen, auf Unterseiten bleibt es ruhig: nur "coxilab" und ein "Umsteigen"-Knopf.
const LINIEN = [
  { id: "d", name: "Dilemma", href: "https://dilemma.coxilab.de/", farbe: "#e88080" },
  { id: "p", name: "KI-Berufs-Puzzle", href: "https://jobs.coxilab.de/", farbe: "#9a86dc" },
  { id: "r", name: "Reward Rover", href: "https://rover.coxilab.de/", farbe: "#5cb68e" },
  { id: "h", name: "Handzeichen", href: "https://handzeichen.com/lehrkraefte", farbe: "#ee9a5a" },
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
  const pathname = usePathname();
  const [theme, setT] = useState<Theme>("dark");
  const [offen, setOffen] = useState(false);
  useEffect(() => setT(currentTheme()), []);

  const kompakt = pathname !== "/";
  const wahl = (t: Theme) => {
    setTheme(t);
    setT(t);
  };
  const liste = (
    <ul>
      {LINIEN.map((l) => (
        <li key={l.id}>
          <a href={l.href} aria-label={l.name} aria-current={l.id === "p" ? "page" : undefined} style={{ ["--lf" as string]: l.farbe }}>
            <i aria-hidden="true">{l.id.toUpperCase()}</i>
            <span>{l.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
  return (
    <nav className={kompakt ? "cx-leiste cx-kompakt" : "cx-leiste"} aria-label="coxilab">
      <a className="cx-zurueck" href="https://coxilab.de/">coxilab</a>
      {kompakt ? (
        <button type="button" className="cx-umsteigen" aria-expanded={offen} onClick={() => setOffen(!offen)}>
          Umsteigen <span aria-hidden="true">{offen ? "▴" : "▾"}</span>
        </button>
      ) : (
        <>
          <span className="cx-info">Umsteigen:</span>
          {liste}
        </>
      )}
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
      {kompakt && offen ? <div className="cx-aufgeklappt">{liste}</div> : null}
    </nav>
  );
}
