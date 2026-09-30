import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Druckvorlagen sind für Lehrkräfte gedacht, nicht als eigene Suchtreffer.
      disallow: ["/arbeitsblatt/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
