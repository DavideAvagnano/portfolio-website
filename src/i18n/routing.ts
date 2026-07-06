import { hasLocale } from "next-intl"
import { defineRouting } from "next-intl/routing"
import { notFound } from "next/navigation"

// Lingue supportate. `it` è la default: con `localePrefix: "as-needed"` l'italiano
// vive sulla root (`/`) senza prefisso, l'inglese su `/en`.
export const locales = ["it", "en"] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "it"

// Metadati per lingua, usati dal language switcher (etichetta nativa).
export const localeMeta: Record<Locale, { label: string; short: string }> = {
  it: { label: "Italiano", short: "IT" },
  en: { label: "English", short: "EN" },
}

export const routing = defineRouting({
  locales,
  defaultLocale,
  // IT su root senza prefisso, EN su `/en`. La detection del browser resta attiva
  // (default di next-intl): alla prima visita reindirizza alla lingua preferita.
  localePrefix: "as-needed",
})

// Restringe `string` → `Locale` (richiesto da next-intl v4 per i tipi strict di
// `getTranslations`/`setRequestLocale`), andando in 404 su locale non valido.
export async function resolveLocale(
  params: Promise<{ locale: string }>
): Promise<Locale> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  return locale
}
