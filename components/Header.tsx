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

  const berufeLink = (
    <Link
      href="/"
      aria-current={!studiumAktiv ? "page" : undefined}
      className={`shrink-0 rounded-full px-3 py-1 font-semibold transition-colors ${
        !studiumAktiv ? "bg-beruf text-paper" : "text-ink-2 hover:text-beruf"
      }`}
    >
      Berufe <span className="hidden font-normal opacity-70 sm:inline">(Ausbildung)</span>
    </Link>
  );
  const studiumLink = (
    <Link
      href="/studium"
      aria-current={studiumAktiv ? "page" : undefined}
      className={`shrink-0 rounded-full px-3 py-1 font-semibold transition-colors ${
        studiumAktiv ? "bg-uni text-paper" : "text-ink-2 hover:text-uni"
      }`}
    >
      Studiengänge
    </Link>
  );
  const praxisLink = (
    <Link
      href="/praxis"
      aria-current={pathname === "/praxis" ? "page" : undefined}
      className={`inline-flex shrink-0 items-center justify-center rounded-full border px-3.5 py-1.5 text-center text-sm font-semibold leading-none transition-colors ${
        pathname === "/praxis" ? "border-ink bg-ink text-paper" : "border-rule text-ink hover:border-ink"
      }`}
    >
      Aus der Praxis
    </Link>
  );
  const erkenntnisseLink = (
    <Link
      href="/erkenntnisse"
      aria-current={erkenntnisseAktiv ? "page" : undefined}
      className={`shrink-0 px-2 text-sm font-semibold underline decoration-2 underline-offset-4 transition-colors sm:px-0 ${
        erkenntnisseAktiv
          ? "text-ink decoration-ink/40"
          : "text-ink-2 decoration-transparent hover:text-ink hover:decoration-ink/30"
      }`}
    >
      Erkenntnisse
    </Link>
  );
  const klasseLink = !klasse && (
    <Link
      href="/klasse"
      aria-current={pathname === "/klasse" ? "page" : undefined}
      className="shrink-0 rounded-full bg-ink px-3.5 py-1.5 text-sm font-semibold text-paper transition-opacity hover:opacity-85"
    >
      Klasse starten
    </Link>
  );

  return (
    <header className="border-b border-rule">
      {/* Akzentleiste: sofort erkennbar, in welchem Bereich man ist, auch
          nach dem Scrollen und bevor man den Text liest. */}
      <div className="h-[3px] bg-mensch" aria-hidden="true" />
      {/* Mobil: oben Logo + Klasse starten, darunter eine wischbare Navigationszeile. */}
      <div className="mx-auto max-w-[68rem] px-5 pt-4 sm:hidden">
        <span className="font-display text-[1.05rem] font-semibold tracking-tight text-ink">
          KI-Puzzle
        </span>
        <nav
          className="-mx-5 mt-3 flex items-center gap-1 overflow-x-auto whitespace-nowrap px-5 pb-3 text-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Bereich wählen"
        >
          {berufeLink}
          {studiumLink}
          <span className="mx-1 h-4 w-px shrink-0 bg-rule" aria-hidden="true" />
          {praxisLink}
          {erkenntnisseLink}
          {klasseLink}
        </nav>
      </div>

      <div className="mx-auto hidden max-w-[68rem] items-center justify-between px-5 py-5 sm:flex sm:px-8">
        <div className="flex items-center gap-5">
          <span className="font-display text-[1.05rem] font-semibold tracking-tight text-ink">
            KI-Puzzle
          </span>
          <nav className="flex gap-1 text-sm" aria-label="Bereich wählen">
            {berufeLink}
            {studiumLink}
          </nav>
        </div>
        <div className="flex items-center gap-5">
          {praxisLink}
          {erkenntnisseLink}
          {klasseLink}
          <span className="hidden font-prose text-sm italic text-ink-2 lg:block">
            für Berufsorientierungs-Workshops
          </span>
        </div>
      </div>
      {klasse && (
        <div className="border-t border-rule bg-ink px-5 py-2 text-center text-sm font-semibold text-paper" role="status">
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
