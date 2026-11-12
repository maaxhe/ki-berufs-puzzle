"use client";

import { useRef } from "react";
import { useStrecke } from "./useStrecke";
import "./Fahrplan.css";

/**
 * "So läuft es ab": vier Haltestellen. Ohne JavaScript bleibt es eine normale Liste.
 * Mit JavaScript fährt eine kleine Bahn von oben ein, hält an jeder Haltestelle und verschwindet unten
 * (nicht bei "Bewegung reduzieren"). Maße kommen aus Fahrplan.css: --sx = Mitte der Linie, --sy = Höhe des Rings.
 */
export default function Fahrplan() {
  const ref = useRef<HTMLUListElement>(null);

  useStrecke(ref);

  return (
    <ul ref={ref} data-strecke className="fahrplan">
      <li>
        <a className="halt" href="#berufe">
          <span className="halt-titel">1. Beruf wählen</span>
          <span className="halt-text">Such dir unten einen Beruf aus der Liste aus.</span>
        </a>
      </li>
      <li>
        <div className="halt">
          <span className="halt-titel">2. Aufgaben sortieren</span>
          <span className="halt-text">Du ordnest die Aufgaben in zwei Spalten: was KI heute übernehmen kann und was beim Menschen bleibt.</span>
        </div>
      </li>
      <li>
        <div className="halt">
          <span className="halt-titel">3. Mit der Forschung vergleichen</span>
          <span className="halt-text">Danach siehst du, wie Arbeitsmarktforschung dieselben Aufgaben einschätzt.</span>
        </div>
      </li>
      <li>
        <a className="halt" href="https://coxilab.de/handzeichen/" target="_blank" rel="noopener">
          <span className="halt-titel">4. Mit Handzeichen nachbesprechen ↗</span>
          <span className="halt-text">Zu jedem Beruf gibt es eine Umfrage: Ob KI es auch soll, ist Meinungssache.</span>
        </a>
      </li>
    </ul>
  );
}
