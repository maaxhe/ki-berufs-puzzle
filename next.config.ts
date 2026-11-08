import type { NextConfig } from "next";

// BASE_PATH: nur gesetzt, wenn die App unter einem Unterpfad läuft (z. B. /jobs auf future.maximilianherrmann.com).
// Auf Netlify (jobs.coxilab.de) bleibt die Variable leer und alles verhält sich wie bisher.
const basePath = process.env.BASE_PATH || undefined;

const nextConfig: NextConfig = {
  basePath,
  // Unter Unterpfad hinter nginx: Bilder direkt ausliefern, der Next-Bildoptimierer findet sie dort nicht.
  env: { NEXT_PUBLIC_BASE_PATH: basePath ?? "" },
  images: { unoptimized: !!basePath },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
