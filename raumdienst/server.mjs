// Kleiner Raumdienst für das KI-Berufs-Puzzle: Schüler:innen schicken ihren Klassencode in einen Raum,
// die Lehrkraft sieht alle Codes live. Keine Namen, keine Konten, Räume verfallen nach 24 h.
// Dazu eine dauerhafte, anonyme Statistik: Wie haben alle anderen eine Aufgabe sortiert, und mit welcher
// vorgegebenen Begründung? Gespeichert wird pro Browser (gehashte Zufalls-ID) nur Zuordnung + Begründungs-ID.
// Läuft ohne Abhängigkeiten (Node >= 18). Start: PORT=3070 node server.mjs
import http from "node:http";
import crypto from "node:crypto";
import fs from "node:fs";

const PORT = Number(process.env.PORT || 3070);
const DATA_FILE = process.env.DATA_FILE || new URL("./raeume.json", import.meta.url).pathname;
const STATS_FILE = process.env.STATS_FILE || new URL("./statistik.json", import.meta.url).pathname;
const ORIGINS = (
  process.env.ALLOWED_ORIGINS ||
  "https://jobs.coxilab.de,https://future.maximilianherrmann.com,http://localhost:3000"
).split(",");
const TTL_MS = 24 * 60 * 60 * 1000;
const MAX_ROOMS = 500;
const MAX_CODES = 300;
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const FOKUS_RE = /^[bs]\.[a-z0-9-]{1,60}$/;
const CODE_RE = /^[bs]\.[a-z0-9-]{1,60}\.\d{1,2}\.[0-9a-z]{1,20}$/;

/** @type {Map<string, {code:string, hostKey:string, createdAt:number, fokus?:string|null, codes: Map<string,string>}>} */
const rooms = new Map();

try {
  const raw = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  for (const r of raw) rooms.set(r.code, { ...r, codes: new Map(r.codes) });
} catch {
  /* erster Start */
}
const save = () => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify([...rooms.values()].map((r) => ({ ...r, codes: [...r.codes] }))));
  } catch (e) {
    console.error("save failed", e.message);
  }
};
const sweep = () => {
  const now = Date.now();
  for (const [k, r] of rooms) if (now - r.createdAt > TTL_MS) rooms.delete(k);
};
setInterval(() => (sweep(), save()), 10 * 60 * 1000).unref();

// ─── Statistik ────────────────────────────────────────────────────────────────
// Vorgegebene Begründungen (müssen zu lib/statistik.ts passen). k- = für „KI“, m- = für „Mensch“.
const GRUENDE = new Set([
  "k-routine", "k-daten", "k-schneller", "k-gibts-schon",
  "m-gefuehl", "m-risiko", "m-haftung", "m-haende", "m-einzelfall",
]);
const TASK_RE = /^[a-z0-9-]{1,40}$/;
const MAX_TASKS = 40;
const MAX_SUBS_PRO_EINHEIT = 50000;

/** @type {Map<string, Map<string, {z: Record<string,"k"|"m">, g: Record<string,string>, t: number}>>} */
const stats = new Map();
try {
  const raw = JSON.parse(fs.readFileSync(STATS_FILE, "utf8"));
  for (const [einheit, subs] of Object.entries(raw)) stats.set(einheit, new Map(Object.entries(subs)));
} catch {
  /* erster Start */
}
let statsDirty = false;
const saveStats = (sync = false) => {
  if (!statsDirty) return;
  statsDirty = false;
  const out = {};
  for (const [einheit, subs] of stats) out[einheit] = Object.fromEntries(subs);
  const json = JSON.stringify(out);
  // Erst in eine Temp-Datei, dann umbenennen: Ein Absturz mitten im Schreiben zerstört die Statistik nicht.
  const tmp = `${STATS_FILE}.tmp`;
  try {
    if (sync) {
      fs.writeFileSync(tmp, json);
      fs.renameSync(tmp, STATS_FILE);
    } else {
      fs.writeFile(tmp, json, (e) => (e ? console.error("stats save failed", e.message) : fs.rename(tmp, STATS_FILE, () => {})));
    }
  } catch (e) {
    console.error("stats save failed", e.message);
  }
};
setInterval(saveStats, 30 * 1000).unref();
for (const sig of ["SIGINT", "SIGTERM"]) process.on(sig, () => (saveStats(true), save(), process.exit(0)));

/** Aggregat-Cache pro Einheit, wird bei jeder neuen Einsendung verworfen. */
const aggCache = new Map();
const aggregat = (einheit) => {
  if (aggCache.has(einheit)) return aggCache.get(einheit);
  const subs = stats.get(einheit);
  /** @type {Record<string, {ki:number, mensch:number, gruende: Record<string, number>}>} */
  const tasks = {};
  if (subs) {
    for (const sub of subs.values()) {
      for (const [tid, z] of Object.entries(sub.z)) {
        const t = (tasks[tid] ||= { ki: 0, mensch: 0, gruende: {} });
        if (z === "k") t.ki += 1;
        else t.mensch += 1;
      }
      for (const [tid, g] of Object.entries(sub.g)) {
        const t = tasks[tid];
        if (t) t.gruende[g] = (t.gruende[g] || 0) + 1;
      }
    }
  }
  const out = { n: subs ? subs.size : 0, tasks };
  aggCache.set(einheit, out);
  return out;
};
const hashId = (id) => crypto.createHash("sha256").update(`berufs-puzzle:${id}`).digest("hex").slice(0, 24);

const hits = new Map();
const limited = (ip, key, max, windowMs) => {
  const k = `${key}:${ip}`;
  const now = Date.now();
  const list = (hits.get(k) || []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(k, list);
  return list.length > max;
};
setInterval(() => hits.clear(), 60 * 60 * 1000).unref();

const newCode = () => {
  for (let i = 0; i < 50; i += 1) {
    let c = "";
    for (let j = 0; j < 4; j += 1) c += ALPHABET[crypto.randomInt(ALPHABET.length)];
    if (!rooms.has(c)) return c;
  }
  return null;
};

const send = (res, status, body, origin) => {
  const headers = { "Content-Type": "application/json", "Cache-Control": "no-store" };
  if (origin && ORIGINS.includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Vary"] = "Origin";
  }
  res.writeHead(status, headers);
  res.end(JSON.stringify(body));
};
const readBody = (req) =>
  new Promise((resolve) => {
    let data = "";
    req.on("data", (c) => {
      data += c;
      if (data.length > 4096) req.destroy();
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(data || "{}"));
      } catch {
        resolve({});
      }
    });
  });
const sameKey = (a, b) => {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
};

http
  .createServer(async (req, res) => {
    const origin = req.headers.origin;
    const ip = String(req.headers["x-real-ip"] || req.socket.remoteAddress);
    if (req.method === "OPTIONS") {
      res.writeHead(204, {
        "Access-Control-Allow-Origin": origin && ORIGINS.includes(origin) ? origin : "",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type,X-Host-Key",
        Vary: "Origin",
      });
      return res.end();
    }
    const url = new URL(req.url || "/", "http://x");
    const parts = url.pathname.split("/").filter(Boolean); // ["raeume", CODE, "codes"]
    sweep();

    if (url.pathname === "/health") return send(res, 200, { ok: true, rooms: rooms.size, einheiten: stats.size }, origin);

    // Statistik: /statistik/<b|s>.<slug>
    if (parts[0] === "statistik" && parts.length === 2) {
      const einheit = parts[1];
      if (!FOKUS_RE.test(einheit)) return send(res, 400, { error: "ungültige Einheit" }, origin);
      if (req.method === "GET") return send(res, 200, aggregat(einheit), origin);
      if (req.method === "POST") {
        if (limited(ip, "stats", 120, 10 * 60 * 1000)) return send(res, 429, { error: "zu schnell" }, origin);
        const body = await readBody(req);
        const clientId = String(body.clientId || "").slice(0, 40);
        if (!clientId || typeof body.z !== "object" || !body.z) return send(res, 400, { error: "ungültig" }, origin);
        const z = {};
        for (const [tid, v] of Object.entries(body.z).slice(0, MAX_TASKS)) {
          if (TASK_RE.test(tid) && (v === "k" || v === "m")) z[tid] = v;
        }
        const g = {};
        if (body.g && typeof body.g === "object") {
          for (const [tid, v] of Object.entries(body.g).slice(0, MAX_TASKS)) {
            // Begründung muss zur gewählten Seite passen (k- zu KI, m- zu Mensch).
            if (z[tid] && GRUENDE.has(v) && v[0] === z[tid]) g[tid] = v;
          }
        }
        if (Object.keys(z).length === 0) return send(res, 400, { error: "keine Zuordnung" }, origin);
        let subs = stats.get(einheit);
        if (!subs) stats.set(einheit, (subs = new Map()));
        const key = hashId(clientId);
        subs.delete(key); // neu einfügen, damit die Reihenfolge = zuletzt aktiv
        subs.set(key, { z, g, t: Date.now() });
        if (subs.size > MAX_SUBS_PRO_EINHEIT) subs.delete(subs.keys().next().value);
        aggCache.delete(einheit);
        statsDirty = true;
        return send(res, 200, aggregat(einheit), origin);
      }
    }

    if (parts[0] !== "raeume") return send(res, 404, { error: "not found" }, origin);

    if (req.method === "POST" && parts.length === 1) {
      if (limited(ip, "create", 10, 60 * 60 * 1000)) return send(res, 429, { error: "zu viele Räume" }, origin);
      if (rooms.size >= MAX_ROOMS) return send(res, 503, { error: "Dienst ist voll" }, origin);
      const code = newCode();
      if (!code) return send(res, 503, { error: "kein freier Code" }, origin);
      const room = { code, hostKey: crypto.randomBytes(16).toString("hex"), createdAt: Date.now(), codes: new Map() };
      rooms.set(code, room);
      save();
      return send(res, 201, { code, hostKey: room.hostKey }, origin);
    }

    const room = rooms.get((parts[1] || "").toUpperCase());
    if (!room) return send(res, 404, { error: "Raum nicht gefunden oder abgelaufen" }, origin);

    // Schüler:in schickt Klassencode. clientId = zufällige ID aus dem Browser, damit erneutes Senden desselben Berufs ersetzt statt verdoppelt.
    if (req.method === "POST" && parts[2] === "codes") {
      if (limited(ip, "submit", 60, 10 * 60 * 1000)) return send(res, 429, { error: "zu schnell" }, origin);
      const body = await readBody(req);
      const code = String(body.code || "").trim();
      const clientId = String(body.clientId || "").slice(0, 40);
      if (!CODE_RE.test(code) || !clientId) return send(res, 400, { error: "ungültiger Code" }, origin);
      // Schlüssel = Browser + Beruf/Studiengang: Eine neue Bewertung desselben Berufs ersetzt die alte, andere Berufe kommen dazu.
      const key = `${clientId}:${code.split(".").slice(0, 2).join(".")}`;
      if (!room.codes.has(key) && room.codes.size >= MAX_CODES) return send(res, 409, { error: "Raum ist voll" }, origin);
      room.codes.set(key, code);
      save();
      return send(res, 201, { ok: true }, origin);
    }

    // Lehrkraft liest alle Codes (nur mit Host-Key).
    if (req.method === "GET" && parts[2] === "codes") {
      if (!sameKey(req.headers["x-host-key"] || "", room.hostKey)) return send(res, 403, { error: "Host-Key nötig" }, origin);
      return send(res, 200, { codes: [...room.codes.values()], count: room.codes.size }, origin);
    }

    // Lehrkraft sperrt alle auf einen Beruf/Studiengang (fokus = "b.slug" / "s.slug") oder hebt die Sperre auf (null).
    if (req.method === "POST" && parts[2] === "fokus") {
      if (!sameKey(req.headers["x-host-key"] || "", room.hostKey)) return send(res, 403, { error: "Host-Key nötig" }, origin);
      const body = await readBody(req);
      const fokus = body.fokus == null ? null : String(body.fokus);
      if (fokus !== null && !FOKUS_RE.test(fokus)) return send(res, 400, { error: "ungültiger Fokus" }, origin);
      room.fokus = fokus;
      save();
      return send(res, 200, { ok: true, fokus }, origin);
    }

    // Schüler:in prüft, ob der Raum existiert und ob die Lehrkraft gesperrt hat.
    if (req.method === "GET" && parts.length === 2) return send(res, 200, { code: room.code, count: room.codes.size, fokus: room.fokus ?? null }, origin);

    return send(res, 404, { error: "not found" }, origin);
  })
  .listen(PORT, "127.0.0.1", () => console.log(`berufs-raum on :${PORT}`));
