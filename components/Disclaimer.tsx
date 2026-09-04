import Link from "next/link";

export default function Disclaimer() {
  return (
    <p className="border-l-2 border-mensch pl-4 font-prose text-[0.95rem] italic leading-relaxed text-ink-2">
      Die Werte sind ein didaktisches Modell zur Diskussion, keine Prognose. Der
      Richtwert je Beruf orientiert sich an realer Forschung – Frey &amp; Osborne
      (2013) und dem IAB Job-Futuromat, die Unterschiedliches messen und hier
      nicht verrechnet werden. Die Einzelwerte pro Aufgabe sind eine begründete
      Schätzung, keine Messung. Mehr dazu auf der{" "}
      <Link
        href="/methodik"
        className="underline decoration-ink/30 underline-offset-2 hover:text-mensch hover:decoration-mensch"
      >
        Methodik-Seite
      </Link>
      .
    </p>
  );
}
