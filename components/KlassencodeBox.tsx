"use client";

import Link from "next/link";
import { useState } from "react";
import type { PuzzleEinheit, UserZuordnung } from "@/types";
import { erzeugeCode } from "@/lib/klassencode";
import { raumApi } from "@/lib/raumApi";

/** Kurzer Code für den Klassenmodus – enthält nur die Zuordnung, keine Namen. */
export default function KlassencodeBox({
  einheit,
  userZuordnung,
  art,
}: {
  einheit: PuzzleEinheit;
  userZuordnung: UserZuordnung;
  art: "beruf" | "studium";
}) {
  const code = erzeugeCode(art, einheit, userZuordnung);
  const [status, setStatus] = useState<"idle" | "kopiert" | "fehler">("idle");

  const [raum, setRaum] = useState("");
  const [raumStatus, setRaumStatus] = useState<"idle" | "sendet" | "ok" | string>("idle");

  const senden = async () => {
    setRaumStatus("sendet");
    try {
      await raumApi.senden(raum, code);
      setRaumStatus("ok");
    } catch (e) {
      setRaumStatus(e instanceof Error ? e.message : "Senden fehlgeschlagen");
    }
  };

  const kopieren = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setStatus("kopiert");
    } catch {
      setStatus("fehler");
    }
    window.setTimeout(() => setStatus("idle"), 2500);
  };

  return (
    <section className="max-w-[46rem] border border-rule bg-paper-2 p-4">
      <h2 className="font-display text-base font-semibold text-ink">
        Für den Unterricht
      </h2>
      <p className="mt-1 font-prose text-[0.95rem] text-ink-2">
        Dein Klassencode enthält nur deine Zuordnung, keinen Namen. Gib ihn
        deiner Lehrkraft, dann sieht die Klasse gemeinsam, wo sie uneins ist.
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <code className="break-all rounded-[2px] border border-rule bg-paper px-2.5 py-1.5 font-mono text-sm text-ink">
          {code}
        </code>
        <button
          type="button"
          onClick={kopieren}
          className="inline-flex min-h-11 items-center rounded-[2px] border border-ink px-3 py-2 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
        >
          {status === "kopiert"
            ? "Kopiert ✓"
            : status === "fehler"
              ? "Kopieren fehlgeschlagen"
              : "Code kopieren"}
        </button>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <label htmlFor="raumcode" className="text-sm text-ink-2">
          Raumcode deiner Lehrkraft (4 Zeichen):
        </label>
        <input
          id="raumcode"
          value={raum}
          onChange={(e) => setRaum(e.target.value.toUpperCase().slice(0, 4))}
          maxLength={4}
          autoCapitalize="characters"
          className="w-24 rounded-[2px] border border-rule bg-paper px-2.5 py-1.5 text-center font-mono text-sm uppercase text-ink"
        />
        <button
          type="button"
          onClick={senden}
          disabled={raum.length !== 4 || raumStatus === "sendet"}
          className="inline-flex min-h-11 items-center rounded-[2px] border border-ink px-3 py-2 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper disabled:opacity-40"
        >
          {raumStatus === "sendet" ? "Sende …" : raumStatus === "ok" ? "Gesendet ✓" : "An Klasse senden"}
        </button>
        {raumStatus !== "idle" && raumStatus !== "ok" && raumStatus !== "sendet" && (
          <span className="text-sm text-miss" role="status">{raumStatus}</span>
        )}
      </div>
      <p className="mt-3 text-sm">
        <Link
          href="/lehrkraefte"
          className="text-ink underline decoration-ink/30 underline-offset-4 hover:text-mensch hover:decoration-mensch"
        >
          Für Lehrkräfte: Ablauf, Arbeitsblatt und Klassenauswertung
        </Link>
      </p>
    </section>
  );
}
