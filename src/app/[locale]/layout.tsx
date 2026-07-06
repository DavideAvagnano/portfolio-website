import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"
import "../globals.css"

import { routing, type Locale } from "@/i18n/routing"
import { siteConfig } from "@/lib/site"
import { fontVariables } from "@/lib/fonts"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

// Prerender statico di una pagina per lingua.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

// Mappa locale → path (as-needed: la default `it` sta sulla root senza prefisso).
const localePath: Record<Locale, string> = { it: "/", en: "/en" }
// Mappa locale → tag OpenGraph.
const ogLocale: Record<Locale, string> = { it: "it_IT", en: "en_US" }

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()

  const t = await getTranslations({ locale, namespace: "metadata" })
  const title = t("title")
  const description = t("description")

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: title,
      template: `%s — ${siteConfig.name}`,
    },
    description,
    keywords: [
      "Davide Avagnano",
      "Software Engineer",
      "Web Developer",
      "React",
      "Next.js",
      "TypeScript",
      "Full-stack",
      "Portfolio",
    ],
    authors: [{ name: siteConfig.author.name, url: siteConfig.author.github }],
    creator: siteConfig.author.name,
    alternates: {
      canonical: localePath[locale],
      languages: {
        it: "/",
        en: "/en",
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocale[locale],
      url: localePath[locale],
      siteName: siteConfig.name,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()

  // Abilita il rendering statico delle sezioni figlie.
  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn(fontVariables, "antialiased")}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>{children}</ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
