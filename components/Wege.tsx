"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useKlasse } from "@/lib/useKlasse";
import { raumApi } from "@/lib/raumApi";

/**
 * Einstieg wie bei Dilemma: zwei gleich große Wege (mit einer Gruppe / allein) und das Codefeld.
 * Wer schon per QR-Code oder Code in einer Klasse ist, sieht den Block nicht.
 */
export default function Wege() {
  const klasse = useKlasse();
  const [code, setCode] = useState("");
  const [fehler, setFehler] = useState("");
  const [laeuft, setLaeuft] = useState(false);
  if (klasse) return null;

  const beitreten = async (e: FormEvent) => {
    e.preventDefault();
    const c = code.trim().toUpperCase();
    if (!/^[A-Z0-9]{4}$/.test(c)) {
      setFehler("Der Code hat vier Zeichen, zum Beispiel ABCD.");
      return;
    }
    setLaeuft(true);
    setFehler("");
    try {
      await raumApi.info(c);
      localStorage.setItem("raum-code", c);
      window.dispatchEvent(new Event("raum-geaendert"));
      setTimeout(() => document.getElementById("berufe")?.scrollIntoView({ behavior: "smooth" }), 50);
    } catch {
      setFehler("Diesen Raum gibt es nicht. Prüf den Code und versuch es noch einmal.");
    } finally {
      setLaeuft(false);
    }
  };

  return (
    <div className="max-w-[34rem]">
      <div className="wege">
        <Link className="weg" href="/klasse">
          <strong>Mit einer Gruppe</strong>
          <span>Raum öffnen, alle sortieren per Handy. Ihr seht, wo ihr euch einig seid und wo nicht.</span>
        </Link>
        <a className="weg hell" href="#berufe">
          <strong>Allein</strong>
          <span>Selbst einen Beruf wählen, sortieren und mit der Forschung vergleichen.</span>
        </a>
      </div>
      <form className="beitritt" onSubmit={beitreten} autoComplete="off">
        <label htmlFor="raumcode">Du hast einen Code bekommen?</label>
        <div className="zeile">
          <input
            className="code-feld"
            id="raumcode"
            name="code"
            maxLength={4}
            placeholder="ABCD"
            inputMode="text"
            autoCapitalize="characters"
            spellCheck={false}
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            aria-describedby="raumcode-fehler"
          />
          <button className="btn" type="submit" disabled={laeuft}>
            Mitmachen
          </button>
        </div>
        {fehler ? (
          <p className="fehler" id="raumcode-fehler" role="alert">
            {fehler}
          </p>
        ) : null}
      </form>
    </div>
  );
}
