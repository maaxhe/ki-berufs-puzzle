"use client";

import { useEffect, useRef } from "react";
import "./Fahrplan.css";

/**
 * "So läuft es ab": vier Haltestellen. Ohne JavaScript bleibt es eine normale Liste.
 * Mit JavaScript fährt eine kleine Bahn von oben ein, hält an jeder Haltestelle und verschwindet unten
 * (nicht bei "Bewegung reduzieren"). Maße kommen aus Fahrplan.css: --sx = Mitte der Linie, --sy = Höhe des Rings.
 */
export default function Fahrplan() {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const ul = ref.current;
    if (!ul || ul.children.length < 2) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const px = (wert: string) => {
      const p = document.createElement("span");
      p.style.cssText = "position:absolute;visibility:hidden;width:" + wert;
      ul.appendChild(p);
      const w = p.getBoundingClientRect().width;
      p.remove();
      return w;
    };

    const zug = document.createElement("div");
    zug.className = "zug";
    zug.setAttribute("aria-hidden", "true");
    zug.innerHTML = '<div class="k"><span></span><span></span></div>';
    ul.appendChild(zug);

    let halte: number[] = [];
    let x = 0, t = 0, ziel = 0, idx = 0, warte = 0.5, letzte = 0;
    let laeuft = false, sichtbar = false, raf = 0;

    const messen = () => {
      const cs = getComputedStyle(ul), ur = ul.getBoundingClientRect();
      x = px(cs.getPropertyValue("--sx").trim() || "0.6rem");
      const sy = px(cs.getPropertyValue("--sy").trim() || "1.3rem");
      halte = [];
      for (const li of Array.from(ul.children)) {
        if (li === zug || li.tagName !== "LI") continue;
        halte.push(li.getBoundingClientRect().top - ur.top + sy);
      }
    };
    const setzen = () => {
      zug.style.transform = `translate(${x.toFixed(1)}px,${t.toFixed(1)}px) translate(-50%,-50%)`;
    };
    const neustart = () => {
      messen();
      t = -12;
      idx = 0;
      ziel = halte[0];
      warte = 0.5;
      zug.style.opacity = "1";
      setzen();
    };
    const takt = (ts: number) => {
      if (!laeuft) return;
      const dt = Math.min(0.05, (ts - letzte) / 1000 || 0);
      letzte = ts;
      if (warte > 0) {
        warte -= dt;
      } else if (Math.abs(ziel - t) < 1) {
        t = ziel;
        if (idx >= halte.length - 1) { zug.style.opacity = "0"; warte = 1.6; idx = -1; }
        else if (idx === -1) neustart();
        else { idx++; ziel = halte[idx]; warte = 0.7; }
      } else {
        t += Math.sign(ziel - t) * Math.min(Math.abs(ziel - t), 150 * dt);
      }
      setzen();
      raf = requestAnimationFrame(takt);
    };
    const anwerfen = () => {
      const soll = sichtbar && !document.hidden;
      if (soll && !laeuft) { laeuft = true; letzte = performance.now(); raf = requestAnimationFrame(takt); }
      if (!soll) { laeuft = false; cancelAnimationFrame(raf); }
    };
    const hop = () => {
      const k = zug.firstElementChild as HTMLElement;
      k.classList.remove("hop");
      void k.offsetWidth;
      k.classList.add("hop");
    };

    zug.addEventListener("click", hop);
    document.addEventListener("visibilitychange", anwerfen);
    neustart();

    const ro = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(() => {
          const ende = halte[halte.length - 1] || 1;
          const a = halte.length ? t / ende : 0;
          messen();
          t = a * halte[halte.length - 1];
          if (idx >= 0) ziel = halte[Math.max(0, idx)];
          setzen();
        })
      : null;
    ro?.observe(ul);
    const io = typeof IntersectionObserver !== "undefined"
      ? new IntersectionObserver((es) => { sichtbar = es[0].isIntersecting; anwerfen(); }, { threshold: 0.2 })
      : null;
    io?.observe(ul);

    return () => {
      laeuft = false;
      cancelAnimationFrame(raf);
      ro?.disconnect();
      io?.disconnect();
      document.removeEventListener("visibilitychange", anwerfen);
      zug.removeEventListener("click", hop);
      zug.remove();
    };
  }, []);

  return (
    <ul ref={ref} data-strecke className="fahrplan">
      <li>
        <a className="halt" href="#berufe">
          <span className="halt-titel">1. Beruf wählen</span>
          <span className="halt-text">Such dir unten einen Beruf aus der Liste aus.</span>
        </a>
      </li>
      <li>
        <div className="halt">
          <span className="halt-titel">2. Aufgaben sortieren</span>
          <span className="halt-text">Du ordnest die Aufgaben in zwei Spalten: was KI heute übernehmen kann und was beim Menschen bleibt.</span>
        </div>
      </li>
      <li>
        <div className="halt">
          <span className="halt-titel">3. Mit der Forschung vergleichen</span>
          <span className="halt-text">Danach siehst du, wie Arbeitsmarktforschung dieselben Aufgaben einschätzt.</span>
        </div>
      </li>
      <li>
        <a className="halt" href="https://coxilab.de/handzeichen/" target="_blank" rel="noopener">
          <span className="halt-titel">4. Mit Handzeichen nachbesprechen ↗</span>
          <span className="halt-text">Zu jedem Beruf gibt es eine Umfrage: Ob KI es auch soll, ist Meinungssache.</span>
        </a>
      </li>
    </ul>
  );
}
