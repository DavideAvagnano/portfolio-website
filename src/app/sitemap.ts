import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site"

// Portfolio single-page: la home con le sue sezioni ancorate. Se in futuro si
// aggiungono pagine reali (es. /blog), vanno elencate qui.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ]
}
