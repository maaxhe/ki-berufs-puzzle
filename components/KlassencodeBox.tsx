"use client";

import { useEffect, useState } from "react";
import type { PuzzleEinheit, UserZuordnung } from "@/types";
import { erzeugeCode } from "@/lib/klassencode";
import { raumApi } from "@/lib/raumApi";

/** Sendet das Ergebnis automatisch an die Klasse, wenn man per QR-Code beigetreten ist. */
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
  const [raum, setRaum] = useState("");
  const [raumStatus, setRaumStatus] = useState<"idle" | "sendet" | "ok" | string>("idle");

  // Raumcode aus dem QR-Code (vom Header gespeichert) vorbelegen.
  useEffect(() => {
    try {
      const gespeichert = localStorage.getItem("raum-code");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (gespeichert) setRaum(gespeichert);
    } catch {}
  }, []);

  // Per QR-Code beigetreten: das Ergebnis geht automatisch an die Klasse, auch bei Änderungen.
  const [verbunden, setVerbunden] = useState(false);
  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (localStorage.getItem("raum-code")) setVerbunden(true);
    } catch {}
  }, []);
  useEffect(() => {
    if (!verbunden || raum.length !== 4) return;
    let aktiv = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRaumStatus("sendet");
    raumApi
      .senden(raum, code)
      .then(() => aktiv && setRaumStatus("ok"))
      .catch((e) => {
        if (!aktiv) return;
        setRaumStatus(e instanceof Error ? e.message : "Senden fehlgeschlagen");
        setVerbunden(false);
      });
    return () => {
      aktiv = false;
    };
  }, [verbunden, raum, code]);

  // Kein Feld mehr: nur ein Fehler beim automatischen Senden wird angezeigt.
  if (raumStatus === "idle" || raumStatus === "sendet" || raumStatus === "ok") return null;

  return (
    <p className="max-w-[46rem] text-sm text-miss" role="status">
      {raumStatus} Dein Ergebnis ist nicht bei deiner Lehrkraft angekommen.
    </p>
  );
}
