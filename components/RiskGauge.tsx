/**
 * Ein-Achsen-Anzeige: links der Mensch, rechts die Maschine. Der Strich sitzt
 * dort, wo das Modell den Beruf verortet (0 % = ganz menschlich, 100 % = ganz
 * maschinell). Ersetzt die Ampel – dieselbe Achse, an der auch sortiert wird.
 */
export default function RiskGauge({
  value,
  size = "sm",
}: {
  value: number;
  size?: "sm" | "lg";
}) {
  const pct = Math.max(0, Math.min(100, value));
  const lg = size === "lg";

  return (
    <div className={lg ? "space-y-2" : undefined}>
      <div className={`relative w-full ${lg ? "h-3" : "h-3"}`}>
        <span
          className={`absolute inset-x-0 top-1/2 -translate-y-1/2 ${
            lg ? "h-2" : "h-px"
          }`}
          style={
            lg
              ? {
                  background:
                    "linear-gradient(90deg, var(--color-mensch-wash), var(--color-ki-wash))",
                }
              : { background: "var(--color-ink)" }
          }
        />
        <span
          className={`absolute top-0 h-full -translate-x-1/2 ${
            lg ? "w-[3px] bg-mensch" : "w-[2px] bg-ink"
          }`}
          style={{ left: `${pct}%` }}
        />
      </div>
      {lg && (
        <div className="flex justify-between font-prose text-xs italic text-ink-2">
          <span>ganz beim Menschen</span>
          <span>ganz bei der Maschine</span>
        </div>
      )}
    </div>
  );
}
