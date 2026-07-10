import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"

// Next 16: il middleware vive in `proxy.ts` (ex `middleware.ts`). Delega tutto a
// next-intl: redirect alla lingua giusta, detection del browser, cookie NEXT_LOCALE.
export default createMiddleware(routing)

export const config = {
  // Applica a tutti i path tranne: api, asset interni Next/Vercel, le immagini OG
  // e qualsiasi file con estensione (favicon, sitemap.xml, robots.txt, ...).
  //
  // L'OG image ora vive sotto `[locale]/`, quindi il suo path è `/it/opengraph-image`
  // (non `/opengraph-image`): senza il `.*` davanti, il lookahead non la escluderebbe
  // e il middleware la tratterebbe come una pagina, redirezionando `/it/*` → `/*`.
  matcher: ["/((?!api|_next|_vercel|.*opengraph-image|.*\\..*).*)"],
}
