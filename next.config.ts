import type { NextConfig } from "next";

// BASE_PATH: nur gesetzt, wenn die App unter einem Unterpfad läuft (z. B. /jobs auf future.maximilianherrmann.com).
// Auf Netlify (jobs.coxilab.de) bleibt die Variable leer und alles verhält sich wie bisher.
const basePath = process.env.BASE_PATH || undefined;

const nextConfig: NextConfig = {
  basePath,
  // Unter Unterpfad hinter nginx: Bilder direkt ausliefern, der Next-Bildoptimierer findet sie dort nicht.
  env: { NEXT_PUBLIC_BASE_PATH: basePath ?? "" },
  images: { unoptimized: !!basePath },
  // Das Impressum liegt zentral auf coxilab.de (gilt für coxilab.de, dilemma und jobs).
  // Quelle explizit mit basePath, damit auch /jobs/impressum auf future.maximilianherrmann.com greift.
  async redirects() {
    return [
      {
        source: `${basePath ?? ""}/impressum`,
        destination: "https://coxilab.de/impressum/",
        basePath: false,
        permanent: false,
      },
    ];
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
