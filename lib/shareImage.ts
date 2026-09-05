/**
 * Erzeugt ein teilbares Ergebnis-Bild (PNG, 1200×630) rein im Browser über
 * die Canvas-API – kein Server, kein Screenshot-Dienst. Bewusst ohne
 * Prozentzahlen (siehe lib/scoring.ts konfidenzLabel/STUFE_TEXT): die
 * Achse zeigt die Tendenz nur visuell, Text beschreibt sie in Worten.
 */

const BREITE = 1200;
const HOEHE = 630;

/** Fallback-Palette, falls die Live-Theme-Farben nicht gelesen werden
 *  können (z. B. sehr alter Browser ohne getComputedStyle-Unterstützung
 *  für Custom Properties). Normalerweise werden die echten, gerade aktiven
 *  Theme-Farben übergeben – Berufe (Ziegelrot) und Studiengänge (Petrol)
 *  sehen dadurch automatisch richtig aus, ohne dass diese Datei die
 *  Reiter-Logik kennen muss. */
const FARBEN_FALLBACK = {
  paper: "#f5f4f1",
  ink: "#262019",
  inkMuted: "#6a6258",
  rule: "#ddd6c9",
  menschWash: "#efe1dc",
  kiWash: "#e7eaea",
  accent: "#8a3a2c",
} as const;

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines = 3,
): number {
  const words = text.split(" ");
  let line = "";
  let cursorY = y;
  let lines = 0;
  for (let i = 0; i < words.length; i++) {
    const testLine = line ? `${line} ${words[i]}` : words[i];
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, cursorY);
      line = words[i];
      cursorY += lineHeight;
      lines++;
      if (lines >= maxLines - 1) {
        // letzte erlaubte Zeile: Rest anhängen, ggf. kürzen
        const rest = words.slice(i).join(" ");
        const truncated =
          ctx.measureText(rest).width > maxWidth
            ? rest.slice(0, Math.floor((rest.length * maxWidth) / ctx.measureText(rest).width) - 1) + "…"
            : rest;
        ctx.fillText(truncated, x, cursorY);
        return cursorY + lineHeight;
      }
    } else {
      line = testLine;
    }
  }
  if (line) {
    ctx.fillText(line, x, cursorY);
    cursorY += lineHeight;
  }
  return cursorY;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export interface ErgebnisBildFarben {
  paper?: string;
  ink?: string;
  inkMuted?: string;
  rule?: string;
  menschWash?: string;
  kiWash?: string;
  /** Akzentfarbe passend zum aktuellen Reiter (Ziegelrot bei Berufen, Petrol bei Studiengängen) – im Zweifel `--color-mensch` vom Dokument lesen. */
  accent?: string;
}

export interface ErgebnisBildOptions {
  appTitel: string;
  titel: string;
  stufeText: string;
  saetze: string[];
  risiko: number;
  userAnteil?: number | null;
  url: string;
  farben?: ErgebnisBildFarben;
}

export function erstelleErgebnisBild(
  opts: ErgebnisBildOptions,
): Promise<Blob | null> {
  const canvas = document.createElement("canvas");
  canvas.width = BREITE;
  canvas.height = HOEHE;
  const ctx = canvas.getContext("2d");
  if (!ctx) return Promise.resolve(null);

  const f = { ...FARBEN_FALLBACK, ...opts.farben };
  const margin = 64;

  // Hintergrund
  ctx.fillStyle = f.paper;
  ctx.fillRect(0, 0, BREITE, HOEHE);
  ctx.strokeStyle = f.rule;
  ctx.lineWidth = 2;
  ctx.strokeRect(1, 1, BREITE - 2, HOEHE - 2);

  // App-Titel
  ctx.fillStyle = f.inkMuted;
  ctx.font = "600 20px system-ui, -apple-system, sans-serif";
  ctx.fillText(opts.appTitel.toUpperCase(), margin, margin);

  // Beruf/Studiengang-Titel
  ctx.fillStyle = f.ink;
  ctx.font = "700 52px system-ui, -apple-system, sans-serif";
  const nachTitel = wrapText(
    ctx,
    opts.titel,
    margin,
    margin + 76,
    BREITE - margin * 2,
    58,
    2,
  );

  // Stufen-Badge
  const badgeY = nachTitel + 16;
  ctx.font = "600 24px system-ui, -apple-system, sans-serif";
  const badgeTextWidth = ctx.measureText(opts.stufeText).width;
  const badgeW = badgeTextWidth + 48;
  const badgeH = 48;
  ctx.fillStyle = f.accent;
  roundRect(ctx, margin, badgeY, badgeW, badgeH, badgeH / 2);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.fillText(opts.stufeText, margin + 24, badgeY + 32);

  // Achse: Mensch ↔ KI, rein visuell, ohne Prozentzahl
  const achseY = badgeY + badgeH + 56;
  const achseX = margin;
  const achseW = BREITE - margin * 2;
  const gradient = ctx.createLinearGradient(achseX, 0, achseX + achseW, 0);
  gradient.addColorStop(0, f.menschWash);
  gradient.addColorStop(1, f.kiWash);
  ctx.fillStyle = gradient;
  roundRect(ctx, achseX, achseY, achseW, 10, 5);
  ctx.fill();

  const modellX = achseX + (opts.risiko / 100) * achseW;
  ctx.fillStyle = f.accent;
  roundRect(ctx, modellX - 2, achseY - 10, 4, 30, 2);
  ctx.fill();

  if (opts.userAnteil != null) {
    const userX = achseX + (opts.userAnteil / 100) * achseW;
    ctx.fillStyle = f.ink;
    ctx.beginPath();
    ctx.moveTo(userX, achseY + 30);
    ctx.lineTo(userX - 7, achseY + 44);
    ctx.lineTo(userX + 7, achseY + 44);
    ctx.closePath();
    ctx.fill();
  }

  ctx.fillStyle = f.inkMuted;
  ctx.font = "italic 18px system-ui, -apple-system, sans-serif";
  ctx.fillText("ganz beim Menschen", achseX, achseY + 68);
  const kiLabelWidth = ctx.measureText("ganz bei der KI").width;
  ctx.fillText("ganz bei der KI", achseX + achseW - kiLabelWidth, achseY + 68);

  // Sätze
  let textY = achseY + 120;
  ctx.font = "22px system-ui, -apple-system, sans-serif";
  for (const satz of opts.saetze) {
    ctx.fillStyle = f.ink;
    textY = wrapText(ctx, satz, margin, textY, BREITE - margin * 2, 30, 2) + 6;
  }

  // Footer
  ctx.fillStyle = f.inkMuted;
  ctx.font = "18px system-ui, -apple-system, sans-serif";
  ctx.fillText(opts.url, margin, HOEHE - margin + 8);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), "image/png");
  });
}
