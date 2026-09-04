# KI-Berufs-Puzzle

Ein interaktives Werkzeug für Berufsorientierungs-Workshops (ab Klasse 8). Man
sortiert die Aufgaben eines Berufs selbst in zwei Spalten – *Mensch macht* und
*Maschine übernimmt* – und sieht danach, wie Arbeitsmarktforschung dieselben
Aufgaben einschätzt.

## Die Daten

Die KI-Eignungswerte sind ein **didaktisches Modell zur Diskussion, keine
Prognose**. Der Durchschnitt je Beruf ist grob an zwei realen Quellen kalibriert:

- Frey & Osborne (2013), *The Future of Employment* (Oxford Martin School) –
  Wahrscheinlichkeit der Computerisierung. Für IT- und Kreativberufe bewusst nach
  oben korrigiert, da die Schätzung vor generativer KI entstand.
- IAB Job-Futuromat / Dengler & Matthes – Substituierbarkeitspotenzial je Beruf
  in Deutschland (Stand 2022, Kurzbericht 5|2024).

Die konkreten Vergleichswerte stehen im Tool bei jedem Beruf.

## Entwicklung

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Produktions-Build
```

Next.js (App Router) · TypeScript · Tailwind CSS · dnd-kit.

## Deployment

Für Netlify vorbereitet (`netlify.toml` mit `@netlify/plugin-nextjs`). Repo mit
Netlify verbinden, keine Umgebungsvariablen nötig – alle Daten liegen statisch in
`data/berufe.ts`.
