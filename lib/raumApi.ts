/** Client für den kleinen Raumdienst (raumdienst/server.mjs). Ohne Raum bleibt alles wie bisher im Browser. */
const BASE = process.env.NEXT_PUBLIC_RAUM_API ?? "https://api.jobs.coxilab.de";

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string }).error ?? `Fehler ${res.status}`);
  return data as T;
}

/** Zufällige ID pro Browser, damit erneutes Senden den Code ersetzt statt zu verdoppeln. */
export function clientId(): string {
  try {
    let id = localStorage.getItem("raum-client-id");
    if (!id) {
      id = Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem("raum-client-id", id);
    }
    return id;
  } catch {
    return Math.random().toString(36).slice(2);
  }
}

export const raumApi = {
  erstellen: () => call<{ code: string; hostKey: string }>("/raeume", { method: "POST" }),
  senden: (raum: string, code: string) =>
    call<{ ok: true }>(`/raeume/${encodeURIComponent(raum.trim().toUpperCase())}/codes`, {
      method: "POST",
      body: JSON.stringify({ code, clientId: clientId() }),
    }),
  codes: (raum: string, hostKey: string) =>
    call<{ codes: string[]; count: number }>(`/raeume/${encodeURIComponent(raum)}/codes`, {
      headers: { "X-Host-Key": hostKey },
    }),
};
