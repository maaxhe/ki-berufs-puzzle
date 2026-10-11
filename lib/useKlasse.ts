"use client";

import { useEffect, useState } from "react";

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
