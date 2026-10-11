"use client";

import { useEffect, useState } from "react";
import { raumApi } from "./raumApi";

/** Raumcode der Klasse, der man per QR-Code beigetreten ist (oder null). */
export function useKlasse(): string | null {
  const [klasse, setKlasse] = useState<string | null>(null);
  useEffect(() => {
    const lesen = () => {
      try {
        setKlasse(localStorage.getItem("raum-code"));
      } catch {}
    };
    lesen();
    window.addEventListener("raum-geaendert", lesen);
    return () => window.removeEventListener("raum-geaendert", lesen);
  }, []);
  return klasse;
}

export function klasseVerlassen() {
  try {
    localStorage.removeItem("raum-code");
    window.dispatchEvent(new Event("raum-geaendert"));
  } catch {}
}

/** Fokus der Lehrkraft ("b.slug" / "s.slug") für Schüler:innen in einer Klasse, sonst null. Wird alle 5 s abgefragt. */
export function useKlassenFokus(klasse: string | null): string | null {
  const [fokus, setFokus] = useState<string | null>(null);
  useEffect(() => {
    if (!klasse) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Sperre endet mit der Klasse
      setFokus(null);
      return;
    }
    let aktiv = true;
    const holen = () =>
      raumApi
        .info(klasse)
        .then((r) => aktiv && setFokus(r.fokus))
        .catch(() => {});
    holen();
    const id = window.setInterval(holen, 5000);
    return () => {
      aktiv = false;
      window.clearInterval(id);
    };
  }, [klasse]);
  return fokus;
}

export function fokusPfad(fokus: string): string {
  const [art, slug] = fokus.split(".");
  return art === "s" ? `/studium/${slug}` : `/puzzle/${slug}`;
}
