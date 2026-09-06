/**
 * Ein-Achsen-Anzeige: links der Mensch, rechts die KI.
 * - Strich (Ziegelrot) = wie das Modell den Beruf im Schnitt verortet.
 * - Dreieck (Ink) = wie die Nutzer:in die Aufgaben selbst aufgeteilt hat.
 * Bewusst ohne Prozentzahl: Die Position auf der Achse zeigt die Tendenz,
 * das Label darüber beschreibt sie in Worten statt mit einer Zahl, die eine
 * Präzision vortäuschen würde, die die Schätzung nicht hat.
 *
 * Die Labels werden bewusst als fertiger Text übergeben statt hier selbst
 * berechnet: Für den Modell-Wert gilt derselbe Stufen-Maßstab wie im
 * restlichen Ergebnis (STUFE_TEXT, relativ zu allen anderen Berufen/
 * Studiengängen) – würde die Gauge stattdessen konfidenzLabel() (feste
 * Schwellen für einzelne Aufgaben) benutzen, könnte hier ein anderer Text
 * stehen als im Fließtext direkt darunter, obwohl beide denselben Wert
 * meinen.
 */
export default function RiskGauge({
  value,
  compareValue,
  modelLabel,
  userLabel,
  size = "sm",
}: {
  value: number;
  compareValue?: number;
  modelLabel?: string;
  userLabel?: string;
  size?: "sm" | "lg";
}) {
  const clamp = (n: number) => Math.max(0, Math.min(100, n));
  const model = clamp(value);
  const user = compareValue == null ? null : clamp(compareValue);
  const lg = size === "lg";

  return (
    <div className={lg ? "space-y-2" : undefined}>
      {lg && user != null && (
        <div className="flex flex-wrap gap-x-6 gap-y-0.5 text-xs">
          {userLabel && (
            <span className="font-semibold text-ink">
              Deine Aufteilung: {userLabel}
            </span>
          )}
          {modelLabel && (
            <span className="font-semibold text-mensch">
              Modell: {modelLabel}
            </span>
          )}
        </div>
      )}

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

        {/* Modell-Strich */}
        <span
          className={`absolute top-0 h-full -translate-x-1/2 ${
            lg ? "w-[3px] bg-mensch" : "w-[2px] bg-ink"
          }`}
          style={{ left: `${model}%` }}
        />

        {/* Selbst-Einschätzung als Dreieck unter der Achse */}
        {user != null && (
          <span
            aria-hidden="true"
            className="absolute -translate-x-1/2 text-ink"
            style={{ left: `${user}%`, top: lg ? "calc(50% + 9px)" : "calc(50% + 4px)" }}
          >
            <svg width="12" height="8" viewBox="0 0 12 8">
              <path d="M6 0 L12 8 L0 8 Z" fill="currentColor" />
            </svg>
          </span>
        )}
      </div>

      {lg && (
        <div className="flex justify-between pt-1 font-prose text-xs italic text-ink-2">
          <span>ganz beim Menschen</span>
          <span>ganz bei der KI</span>
        </div>
      )}
    </div>
  );
}
