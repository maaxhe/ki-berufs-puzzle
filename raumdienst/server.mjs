// Kleiner Raumdienst für das KI-Berufs-Puzzle: Schüler:innen schicken ihren Klassencode in einen Raum,
// die Lehrkraft sieht alle Codes live. Keine Namen, keine Konten, Räume verfallen nach 24 h.
// Läuft ohne Abhängigkeiten (Node >= 18). Start: PORT=3070 node server.mjs
import http from "node:http";
import crypto from "node:crypto";
import fs from "node:fs";

const PORT = Number(process.env.PORT || 3070);
const DATA_FILE = process.env.DATA_FILE || new URL("./raeume.json", import.meta.url).pathname;
const ORIGINS = (process.env.ALLOWED_ORIGINS || "https://jobs.coxilab.de,http://localhost:3000").split(",");
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

    if (url.pathname === "/health") return send(res, 200, { ok: true, rooms: rooms.size }, origin);
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
