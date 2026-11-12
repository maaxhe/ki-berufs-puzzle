"use client";

import { useEffect, type RefObject } from "react";

interface Punkt {
  x: number;
  y: number;
  /** Drehung der Bahn in Grad */
  w: number;
  pause: number;
}

/** Radius der Gleismitte im Bogen (CSS: 22px Außenradius bei 10px Gleisbreite). */
const R = 17;
/** px pro Sekunde */
const TEMPO = 150;

/**
 * Eine kleine Bahn fährt von oben in eine Haltestellen-Liste (<ul data-strecke> mit <li> als Haltestellen), hält an jeder
 * Haltestelle und verschwindet unten. Nicht bei "Bewegung reduzieren".
 * Maße aus der CSS: --sx = Mitte der Linie, --sy = Höhe des Rings ab Oberkante des Eintrags.
 * Sackgassen-Bahnhof (li.kat): Die Bahn biegt über den Gleisbogen in den Abzweig ein, hält am Prellbock und fährt rückwärts
 * zurück auf die Linie. Maße: --gy = Mitte des waagerechten Gleises ab Oberkante, --lang = Länge des Abzweigs, --gleis = Gleisbreite.
 * `abhaengig` startet die Bahn neu, wenn sich die Haltestellen ändern.
 */
export function useStrecke(ref: RefObject<HTMLUListElement | null>, abhaengig: unknown = 0) {
  useEffect(() => {
    const ul = ref.current;
    if (!ul || ul.children.length < 2) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const px = (wert: string, bezug: Element) => {
      const p = document.createElement("span");
      p.style.cssText = "position:absolute;visibility:hidden;width:" + wert;
      bezug.appendChild(p);
      const w = p.getBoundingClientRect().width;
      p.remove();
      return w;
    };

    const zug = document.createElement("div");
    zug.className = "zug";
    zug.setAttribute("aria-hidden", "true");
    zug.innerHTML = '<div class="k"><span></span><span></span></div>';
    ul.appendChild(zug);

    let weg: Punkt[] = [];
    let ort = { x: 0, y: 0, w: 0 };
    let idx = 0, warte = 0.5, letzte = 0, raf = 0, ausblenden = 0;
    let ende = false, laeuft = false, sichtbar = false;

    const messen = () => {
      const cs = getComputedStyle(ul), ur = ul.getBoundingClientRect();
      const liste = Array.from(ul.children).filter((el) => el !== zug && el.tagName === "LI");
      weg = [];
      if (!liste.length) return;
      const x = liste[0].getBoundingClientRect().left - ur.left + px(cs.getPropertyValue("--sx").trim() || "15px", ul);
      const sy = px(cs.getPropertyValue("--sy").trim() || "1.3rem", ul);
      liste.forEach((el, nr) => {
        const oben = el.getBoundingClientRect().top - ur.top;
        if (!el.classList.contains("kat")) {
          weg.push({ x, y: oben + sy, w: 0, pause: 0.7 });
          return;
        }
        const es = getComputedStyle(el);
        const yc = oben + px(es.getPropertyValue("--gy").trim() || "31px", el);
        const lang = px(es.getPropertyValue("--lang").trim() || "58px", el);
        const gleis = px(es.getPropertyValue("--gleis").trim() || "10px", el);
        // Mitte der Bahn am Prellbock: Gleisende minus halbe Bahnlänge
        const stopp = Math.max(x + R, x - gleis / 2 + lang - 17);
        const rein: Punkt[] = [{ x, y: yc - R, w: 0, pause: 0 }];
        for (let k = 1; k <= 6; k++) {
          const a = (k / 6) * (Math.PI / 2);
          rein.push({ x: x + R - R * Math.cos(a), y: yc - R + R * Math.sin(a), w: -(a * 180) / Math.PI, pause: 0 });
        }
        if (stopp > x + R) rein.push({ x: stopp, y: yc, w: -90, pause: 0 });
        rein[rein.length - 1] = { ...rein[rein.length - 1], pause: 0.9 };
        weg.push(...rein);
        // rückwärts zurück auf die Linie, außer am letzten Eintrag: Dort endet die Fahrt am Prellbock.
        if (nr < liste.length - 1) for (let z = rein.length - 2; z >= 0; z--) weg.push({ ...rein[z], pause: 0 });
      });
    };
    const setzen = () => {
      zug.style.transform = `translate(${ort.x.toFixed(1)}px,${ort.y.toFixed(1)}px) translate(-50%,-50%) rotate(${ort.w.toFixed(1)}deg)`;
    };
    const neustart = () => {
      messen();
      if (!weg.length) return;
      ort = { x: weg[0].x, y: weg[0].y - 24, w: 0 };
      idx = 0;
      warte = 0.5;
      ende = false;
      zug.style.opacity = "1";
      setzen();
    };
    const takt = (ts: number) => {
      if (!laeuft) return;
      const dt = Math.min(0.05, (ts - letzte) / 1000 || 0);
      letzte = ts;
      if (warte > 0) {
        warte -= dt;
        if (warte <= 0 && ende) neustart();
      } else if (weg.length) {
        let schritt = TEMPO * dt;
        // mehrere kurze Bogenstücke in einem Takt schaffen
        while (schritt > 0 && warte <= 0) {
          const z = weg[idx];
          const dx = z.x - ort.x, dy = z.y - ort.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d <= schritt) {
            ort = { x: z.x, y: z.y, w: z.w };
            schritt -= d;
            if (idx >= weg.length - 1) {
              warte = Math.max(z.pause, 0.6);
              ausblenden = window.setTimeout(() => { zug.style.opacity = "0"; }, warte * 1000);
              warte += 1.2;
              ende = true;
            } else {
              warte = z.pause;
              idx++;
            }
          } else {
            const f = schritt / d;
            ort.x += dx * f;
            ort.y += dy * f;
            ort.w += (z.w - ort.w) * f;
            schritt = 0;
          }
        }
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

    let groesse = ul.getBoundingClientRect();
    const ro = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(() => {
          const r = ul.getBoundingClientRect();
          if (Math.abs(r.width - groesse.width) < 1 && Math.abs(r.height - groesse.height) < 1) return;
          groesse = r;
          neustart();
        })
      : null;
    ro?.observe(ul);
    // Lange Listen (alle Berufe) sind nie zu 20 % im Bild: schon bei jedem sichtbaren Stück fahren.
    const io = typeof IntersectionObserver !== "undefined"
      ? new IntersectionObserver((es) => { sichtbar = es[0].isIntersecting; anwerfen(); }, { threshold: 0 })
      : null;
    io?.observe(ul);

    return () => {
      laeuft = false;
      cancelAnimationFrame(raf);
      window.clearTimeout(ausblenden);
      ro?.disconnect();
      io?.disconnect();
      document.removeEventListener("visibilitychange", anwerfen);
      zug.removeEventListener("click", hop);
      zug.remove();
    };
  }, [ref, abhaengig]);
}
