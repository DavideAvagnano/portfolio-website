import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site"

// Sitemap multilingua. Con `localePrefix: "as-needed"` l'italiano vive sulla root,
// l'inglese su `/en`. Ogni entry dichiara gli alternates hreflang per l'altra lingua.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url
  const languages = { it: base, en: `${base}/en` }
  const lastModified = new Date()

  return [
    {
      url: base,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages },
    },
    {
      url: `${base}/en`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages },
    },
  ]
}
