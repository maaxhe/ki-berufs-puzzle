import "./HeroZeichnung.css";

/** Dekorative Hero-Zeichnung: Aufgaben-Kärtchen werden in zwei Spalten sortiert. */
export default function HeroZeichnung() {
  return (
    <div className="hero-zeichnung" aria-hidden="true">
      <svg viewBox="0 0 600 480" className="hz-svg" focusable="false">
        {/* Brett */}
        <rect x="30" y="30" width="540" height="360" rx="14" className="hz-brett" />
        <line x1="300" y1="52" x2="300" y2="370" className="hz-mitte" />
        {/* Spaltenköpfe */}
        <g className="hz-ki">
          <rect x="48" y="46" width="236" height="34" rx="8" className="hz-kopf" />
          <rect x="62" y="56" width="14" height="14" rx="3" className="hz-strich" />
          <path d="M66 52v4M72 52v4M66 70v4M72 70v4M58 60h4M58 66h4M80 60h4M80 66h4" className="hz-strich" />
          <path d="M98 63h120" className="hz-strich hz-leise" />
        </g>
        <g className="hz-mensch">
          <rect x="316" y="46" width="236" height="34" rx="8" className="hz-kopf" />
          <path d="M69 0c-4-5-11-3-11 3 0 5 7 8 11 12 4-4 11-7 11-12 0-6-7-8-11-3z" transform="translate(262 56) scale(.95)" className="hz-strich" />
          <path d="M366 63h120" className="hz-strich hz-leise" />
        </g>

        {/* Karten links (KI) */}
        <g className="hz-ki">
          <g transform="translate(52 96)">
            <rect width="228" height="58" rx="9" className="hz-karte" />
            <g transform="translate(30 29)" className="hz-icon">
              <circle r="7" />
              <path d="M0-12v5M0 7v5M-12 0h5M7 0h5M-8.5-8.5l3.5 3.5M5 5l3.5 3.5M8.5-8.5L5-5M-5 5l-3.5 3.5" />
            </g>
            <path d="M62 22h130M62 36h86" className="hz-strich hz-leise" />
          </g>
          <g transform="translate(52 166)">
            <rect width="228" height="58" rx="9" className="hz-karte" />
            <g transform="translate(30 29)" className="hz-icon">
              <path d="M-12-8h24M-12 0h24M-12 8h14" />
            </g>
            <path d="M62 22h110M62 36h130" className="hz-strich hz-leise" />
          </g>
          <g transform="translate(52 236)">
            <rect width="228" height="58" rx="9" className="hz-karte" />
            <g transform="translate(30 29)" className="hz-icon">
              <rect x="-12" y="-10" width="24" height="20" rx="3" />
              <path d="M-12-2h24M-5-10v-4M5-10v-4" />
            </g>
            <path d="M62 22h120M62 36h70" className="hz-strich hz-leise" />
          </g>
        </g>

        {/* Karten rechts (Mensch) */}
        <g className="hz-mensch">
          <g transform="translate(320 96)">
            <rect width="228" height="58" rx="9" className="hz-karte" />
            <g transform="translate(30 29)" className="hz-icon">
              <path d="M0 10c-14-9-14-18-7-19 4 0 6 2 7 5 1-3 3-5 7-5 7 1 7 10-7 19z" />
            </g>
            <path d="M62 22h120M62 36h90" className="hz-strich hz-leise" />
          </g>
          <g transform="translate(320 166)">
            <rect width="228" height="58" rx="9" className="hz-karte" />
            <g transform="translate(30 29)" className="hz-icon">
              <path d="M-10-12v8a6 6 0 0 0 12 0v-8M-4 2v4a7 7 0 0 0 14 0" />
              <circle cx="10" cy="9" r="3" />
            </g>
            <path d="M62 22h100M62 36h128" className="hz-strich hz-leise" />
          </g>
          <g transform="translate(320 236)">
            <rect width="228" height="58" rx="9" className="hz-karte" />
            <g transform="translate(30 29)" className="hz-icon">
              <path d="M-11-11l10 10M11-11L1-1M-1-1L-9 11M1-1l8 12" />
            </g>
            <path d="M62 22h126M62 36h80" className="hz-strich hz-leise" />
          </g>
        </g>

        {/* Gezogene Karte (Puzzle-Violett) */}
        <g className="hz-zug">
          <g transform="translate(176 306) rotate(-5)">
            <rect width="228" height="58" rx="9" className="hz-karte hz-gezogen" />
            <g transform="translate(30 29)" className="hz-icon hz-lila">
              <path d="M-11-4h8a4 4 0 1 1 7 0h6v8a4 4 0 1 0 0 7h-14z" />
            </g>
            <path d="M62 22h120M62 36h96" className="hz-strich hz-leise" />
          </g>
          {/* Hand/Zeiger */}
          <g transform="translate(372 352)" className="hz-zeiger">
            <path d="M0 0l0 20 5-5 4 9 4-2-4-9 7 0z" />
          </g>
        </g>

        {/* Figur "du" */}
        <g transform="translate(90 450)" className="hz-figur">
          <path d="M-14 0C-14-18-8-28 0-28S14-18 14 0Z" />
          <circle cy="-39" r="11" />
        </g>
        <path d="M130 446h340" className="hz-boden" />
        <g transform="translate(520 450)" className="hz-figur hz-klein">
          <path d="M-9 0C-9-12-5-19 0-19S9-12 9 0Z" />
          <circle cy="-26" r="7.5" />
        </g>
      </svg>
    </div>
  );
}
