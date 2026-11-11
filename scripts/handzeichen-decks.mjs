// Erzeugt je Beruf ein Handzeichen-Mitmach-Deck (Meinung, kein Quiz) aus data/berufe.ts.
// Ausgabe: JSON für klassen-abstimmung/seed-berufe.json. Der Handzeichen-Server legt fehlende Decks beim Start an,
// erreichbar unter https://handzeichen.com/m/<link> (siehe lib/handzeichen.ts).
//
//   node --experimental-strip-types scripts/handzeichen-decks.mjs > "../klassen-abstimmung/seed-berufe.json"
//
// Alter und Geschlecht am Ende und die Danke-Folie hängt der Server selbst an. Vorhandene Decks ändert er nicht,
// damit gesammelte Stimmen erhalten bleiben.
import { register } from "node:module";
import { fileURLToPath } from "node:url";

// "@/…" wie in tsconfig auf das Projektverzeichnis auflösen
const root = fileURLToPath(new URL("..", import.meta.url));
register(
  "data:text/javascript," +
    encodeURIComponent(`
import { existsSync } from "node:fs";
import { pathToFileURL } from "node:url";
const root = ${JSON.stringify(root)};
export async function resolve(spec, ctx, next) {
  if (!spec.startsWith("@/")) return next(spec, ctx);
  const base = root + spec.slice(2);
  return next(pathToFileURL(existsSync(base + ".ts") ? base + ".ts" : base + "/index.ts").href, ctx);
}`),
);

const { berufe } = await import("../data/berufe.ts");
const { handzeichenLink } = await import("../lib/handzeichen.ts");

const WER = ["Die KI", "Ein Mensch", "Beide zusammen"];

/** Drei Aufgaben zum Abstimmen und vier für die Rangfolge, ohne Doppelungen. */
function auswahl(tasks) {
  const rest = [...tasks];
  const nimm = (t) => (rest.splice(rest.indexOf(t), 1), t);
  const absteigend = () => [...rest].sort((a, b) => b.kiEignung - a.kiEignung);
  // 1. die überraschende Aufgabe (Faustregel führt in die Irre), sonst die KI-nächste
  const a = nimm(rest.find((t) => t.ueberraschend) ?? absteigend()[0]);
  // 2. die Aufgabe, die am ehesten nach KI aussieht
  const b = nimm(absteigend()[0]);
  // 3. ein Grenzfall um 50 %
  const c = nimm([...rest].sort((x, y) => Math.abs(x.kiEignung - 50) - Math.abs(y.kiEignung - 50))[0]);
  // Rangfolge: vier Aufgaben quer durch die übrigen, von KI-nah bis menschlich
  const r = absteigend();
  const idx = [0, Math.round((r.length - 1) / 3), Math.round((2 * (r.length - 1)) / 3), r.length - 1];
  const rang = [...new Set(idx)].map((i) => r[i]);
  return { frage: [a, b, c], rang };
}

const decks = berufe.map((beruf) => {
  const { frage, rang } = auswahl(beruf.tasks);
  return {
    slug: beruf.slug,
    link: handzeichenLink(beruf.slug),
    title: `${beruf.title}: Was soll KI machen?`,
    description: `Was soll in diesem Beruf eine KI übernehmen, was ein Mensch? Stimm ab und sieh, wie andere denken. Passend zum KI-Berufs-Puzzle auf jobs.coxilab.de.`,
    slides: [
      ["info", `${beruf.title}: Was soll eine KI übernehmen, was ein Mensch? Anonym und ohne richtige Antwort.`],
      ["scale", "Könntest du dir vorstellen, in diesem Beruf zu arbeiten?", { labels: { lo: "auf keinen Fall", hi: "sehr gut" } }],
      ...frage.map((t) => ["choice", `${t.title}${t.title.endsWith("?") ? "" : ":"} Wer soll das machen?`, { options: WER }]),
      ["slider", "Was schätzt du: Wie viel der Arbeit in diesem Beruf kann KI heute schon übernehmen?", { labels: { lo: "gar nichts", hi: "alles" } }],
      ["ranking", "Stell dir vor, das ist dein Job. Was würdest du am liebsten an eine KI abgeben? Platz 1 bis 4", { options: rang.map((t) => t.title) }],
      ["cluster", "Wie sieht dieser Beruf in zehn Jahren aus?", { labels: { lo: "kaum KI", hi: "viel KI", top: "mehr Leute gesucht", bottom: "weniger Leute gesucht" } }],
    ],
  };
});

const zuLang = decks.filter((d) => d.link.length > 40);
if (zuLang.length) throw new Error("Link länger als 40 Zeichen, in lib/handzeichen.ts kürzen: " + zuLang.map((d) => d.link).join(", "));

// Ein Deck pro Zeile, damit Änderungen im Diff lesbar bleiben
process.stdout.write("[\n" + decks.map((d) => JSON.stringify(d)).join(",\n") + "\n]\n");
