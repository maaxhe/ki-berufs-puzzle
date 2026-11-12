"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { fokusPfad, klasseVerlassen, useKlasse, useKlassenFokus } from "@/lib/useKlasse";

export default function Header() {
  const pathname = usePathname();

  const klasse = useKlasse();
  const router = useRouter();
  const fokus = useKlassenFokus(klasse);
  const ziel = fokus ? fokusPfad(fokus) : null;
  // Lehrkraft hat die Klasse auf einen Beruf festgelegt: alles andere führt dorthin zurück.
  useEffect(() => {
    if (ziel && pathname !== ziel) router.replace(ziel);
  }, [ziel, pathname, router]);

  // QR-Code der Lehrkraft: /?raum=ABCD merkt sich den Raumcode für das Senden am Ende.
  useEffect(() => {
    const raum = new URLSearchParams(window.location.search).get("raum")?.toUpperCase();
    if (raum && /^[A-Z0-9]{4}$/.test(raum)) {
      try {
        localStorage.setItem("raum-code", raum);
        window.dispatchEvent(new Event("raum-geaendert"));
      } catch {}
    }
  }, []);
  const studiumAktiv = pathname?.startsWith("/studium") ?? false;
  const erkenntnisseAktiv = pathname === "/erkenntnisse";
  const praxisAktiv = pathname === "/praxis";
  const klasseAktiv = pathname === "/klasse";

  const tab = (aktiv: boolean, farbe?: "beruf" | "uni") => {
    const basis = "inline-flex min-h-11 shrink-0 items-center rounded-full border-2 px-4 py-1.5 text-[0.95rem] font-semibold leading-none transition-colors";
    if (farbe === "beruf") return `${basis} border-beruf ${aktiv ? "bg-beruf text-paper" : "text-beruf hover:bg-flaeche"}`;
    if (farbe === "uni") return `${basis} border-uni ${aktiv ? "bg-uni text-paper" : "text-uni hover:bg-flaeche"}`;
    return `${basis} ${aktiv ? "border-ink bg-ink text-paper" : "border-rule text-ink hover:bg-flaeche"}`;
  };
  const berufeLink = (
    <Link href="/" aria-current={!studiumAktiv && pathname === "/" ? "page" : undefined} className={tab(!studiumAktiv && !praxisAktiv && !erkenntnisseAktiv && !klasseAktiv, "beruf")}>
      Berufe <span className="ml-1 hidden font-normal opacity-80 sm:inline">(Ausbildung)</span>
    </Link>
  );
  const studiumLink = (
    <Link href="/studium" aria-current={studiumAktiv ? "page" : undefined} className={tab(studiumAktiv, "uni")}>
      Studiengänge
    </Link>
  );
  const praxisLink = (
    <Link href="/praxis" aria-current={praxisAktiv ? "page" : undefined} className={tab(praxisAktiv)}>
      Aus der Praxis
    </Link>
  );
  const erkenntnisseLink = (
    <Link href="/erkenntnisse" aria-current={erkenntnisseAktiv ? "page" : undefined} className={tab(erkenntnisseAktiv)}>
      Erkenntnisse
    </Link>
  );
  const klasseLink = !klasse && (
    <Link
      href="/klasse"
      aria-current={klasseAktiv ? "page" : undefined}
      className="inline-flex min-h-11 shrink-0 items-center rounded-full border-[3px] border-ink bg-ink px-4 py-1.5 text-[0.95rem] font-bold leading-none text-paper transition-colors hover:bg-paper hover:text-ink"
    >
      Klasse starten
    </Link>
  );

  // Nur auf future.maximilianherrmann.com gesetzt: Rücksprung zur Auswahlseite der Werkzeuge (kein Next-Link, die Seite liegt außerhalb von /jobs).
  const werkzeugeLink = process.env.NEXT_PUBLIC_PORTAL_URL && (
    <a
      href={process.env.NEXT_PUBLIC_PORTAL_URL}
      className="inline-flex min-h-11 shrink-0 items-center rounded-full border-2 border-rule px-3 py-1 text-sm font-semibold text-ink-2 transition-colors hover:border-ink hover:text-ink"
    >
      ← Werkzeuge
    </a>
  );

  // Gleiche Kopfzeile wie bei Dilemma und KI und Bias: Name links, rechts coxilab und Für Lehrkräfte.
  const kopfLinks = (
    <nav className="flex shrink-0 items-center gap-5 text-[1.05rem]" aria-label="coxilab und Lehrkräfte">
      <Link href="/lehrkraefte" className="inline-flex min-h-11 items-center font-semibold text-ink underline decoration-transparent decoration-2 underline-offset-4 hover:decoration-ink">
        Für Lehrkräfte
      </Link>
    </nav>
  );

  return (
    <header className={`border-b-2 border-rule bg-flaeche ${studiumAktiv ? "theme-studium" : ""}`}>
      {/* Mobil: oben Logo + Klasse starten, darunter eine wischbare Navigationszeile. */}
      <div className="mx-auto max-w-[68rem] px-5 pt-4 sm:hidden">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="inline-flex items-center gap-2 font-kopf text-[1.7rem] font-extrabold leading-none text-ink">
            <i className="linie" aria-hidden="true">P</i>
            KI-Berufs-Puzzle
          </Link>
          <div className="flex items-center gap-3">
            {werkzeugeLink}
            {kopfLinks}
          </div>
        </div>
        <nav
          className="-mx-5 mt-3 flex items-center gap-2 overflow-x-auto whitespace-nowrap px-5 pb-3 text-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Bereich wählen"
        >
          {berufeLink}
          {studiumLink}
          <span className="mx-1 h-5 w-0.5 shrink-0 bg-rule" aria-hidden="true" />
          {praxisLink}
          {erkenntnisseLink}
          {klasseLink}
        </nav>
      </div>

      {werkzeugeLink && <div className="mx-auto hidden max-w-[68rem] px-5 pt-3 sm:block sm:px-8">{werkzeugeLink}</div>}
      <div className="mx-auto hidden max-w-[68rem] items-center justify-between gap-4 px-5 pt-4 sm:flex sm:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 whitespace-nowrap font-kopf text-[1.7rem] font-extrabold leading-none text-ink"
        >
          <i className="linie" aria-hidden="true">P</i>
          KI-Berufs-Puzzle
        </Link>
        {kopfLinks}
      </div>
      <div className="mx-auto hidden max-w-[68rem] items-center justify-between gap-4 px-5 py-3 sm:flex sm:px-8">
        <nav className="flex shrink-0 gap-1 whitespace-nowrap text-sm" aria-label="Bereich wählen">
          {berufeLink}
          {studiumLink}
        </nav>
        <div className="flex items-center gap-5">
          {praxisLink}
          {erkenntnisseLink}
          {klasseLink}
          <span className="hidden text-sm text-ink-2 2xl:block">
            für Berufsorientierungs-Workshops
          </span>
        </div>
      </div>
      {klasse && (
        <div className="border-t-2 border-ink bg-ink px-5 py-2 text-center text-sm font-semibold text-paper" role="status">
          Du bist in Klasse <span className="font-mono tracking-widest">{klasse}</span>
          {fokus ? " · Die Lehrkraft hat diese Aufgabe für alle festgelegt" : ""} ·{" "}
          <button type="button" onClick={klasseVerlassen} className="font-normal underline underline-offset-4">
            verlassen
          </button>
        </div>
      )}
    </header>
  );
}
