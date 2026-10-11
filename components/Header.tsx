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

  return (
    <header className="border-b border-rule">
      {/* Akzentleiste: sofort erkennbar, in welchem Bereich man ist, auch
          nach dem Scrollen und bevor man den Text liest. */}
      <div className="h-[3px] bg-mensch" aria-hidden="true" />
      <div className="mx-auto flex max-w-[68rem] items-baseline justify-between px-5 py-5 sm:px-8">
        <div className="flex items-baseline gap-5">
          <span className="font-display text-[1.05rem] font-semibold tracking-tight text-ink">
            KI-Puzzle
          </span>
          <nav className="flex gap-1 text-sm" aria-label="Bereich wählen">
            <Link
              href="/"
              aria-current={!studiumAktiv ? "page" : undefined}
              className={`rounded-full px-3 py-1 font-semibold transition-colors ${
                !studiumAktiv
                  ? "bg-beruf text-paper"
                  : "text-ink-2 hover:text-beruf"
              }`}
            >
              Berufe{" "}
              <span className="font-normal opacity-70">(Ausbildung)</span>
            </Link>
            <Link
              href="/studium"
              aria-current={studiumAktiv ? "page" : undefined}
              className={`rounded-full px-3 py-1 font-semibold transition-colors ${
                studiumAktiv
                  ? "bg-uni text-paper"
                  : "text-ink-2 hover:text-uni"
              }`}
            >
              Studiengänge
            </Link>
          </nav>
        </div>
        <div className="flex items-baseline gap-5">
          <Link
            href="/praxis"
            aria-current={pathname === "/praxis" ? "page" : undefined}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold transition-all ${
              pathname === "/praxis"
                ? "bg-mensch text-paper shadow-sm"
                : "border border-mensch/40 text-ink hover:border-mensch hover:bg-mensch/10"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-mensch" />
            Aus der Praxis
          </Link>
          <Link
            href="/erkenntnisse"
            aria-current={erkenntnisseAktiv ? "page" : undefined}
            className={`text-sm font-semibold underline decoration-2 underline-offset-4 transition-colors ${
              erkenntnisseAktiv
                ? "text-ink decoration-ink/40"
                : "text-ink-2 decoration-transparent hover:text-ink hover:decoration-ink/30"
            }`}
          >
            Erkenntnisse
          </Link>
          {!klasse && (
          <Link
            href="/klasse"
            aria-current={pathname === "/klasse" ? "page" : undefined}
            className="rounded-full bg-ink px-3.5 py-1.5 text-sm font-semibold text-paper transition-opacity hover:opacity-85"
          >
            Klasse starten
          </Link>
          )}
          <span className="hidden font-prose text-sm italic text-ink-2 sm:block">
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
