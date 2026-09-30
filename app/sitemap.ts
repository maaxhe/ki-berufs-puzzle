import type { MetadataRoute } from "next";
import { berufe } from "@/data/berufe";
import { studiengaenge } from "@/data/studiengaenge";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const seiten = [
    "",
    "/studium",
    "/vergleich",
    "/studium-vergleich",
    "/methodik",
    "/erkenntnisse",
    "/entstehung",
    "/lehrkraefte",
    "/klasse",
    "/impressum",
  ];
  return [
    ...seiten.map((pfad) => ({
      url: `${SITE_URL}${pfad}`,
      changeFrequency: "monthly" as const,
      priority: pfad === "" ? 1 : 0.6,
    })),
    ...berufe.map((b) => ({
      url: `${SITE_URL}/puzzle/${b.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...studiengaenge.map((s) => ({
      url: `${SITE_URL}/studium/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
