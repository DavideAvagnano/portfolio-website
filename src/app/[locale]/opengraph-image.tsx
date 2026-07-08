import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"
import { notFound } from "next/navigation"
import { hasLocale } from "next-intl"
import { getTranslations } from "next-intl/server"

import { routing } from "@/i18n/routing"
import { siteConfig } from "@/lib/site"

// Immagine OpenGraph, una **per lingua** (sta sotto `[locale]/`, quindi la root IT
// e `/en` hanno la propria). Next la collega da sé a `og:image` e `twitter:image`.
//
// Stile editoriale monocromo come il sito: nessun accento colore, gerarchia data da
// tipografia e spazio. È il contraltare scuro — su un feed social stacca meglio del
// bianco, e i token sono gli stessi del tema dark.
export const alt = siteConfig.title
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// Genera le due immagini a build-time invece che su richiesta.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

// Token del tema dark, in hex: satori non interpreta `oklch()`. Scala **neutral**
// (grigio puro), coerente con globals.css — non zinc (che tende al blu-viola).
const BACKGROUND = "#0a0a0a" // --background dark (neutral-950)
const FOREGROUND = "#fafafa" // --foreground dark (neutral-50)
const MUTED = "#a1a1a1" // --muted-foreground dark (neutral-400)
const RULE = "#262626" // filetto (neutral-800)
const FAINT = "#525252" // badge lingua: subordinato, ma leggibile (neutral-600)

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()

  const [t, tHero] = await Promise.all([
    getTranslations({ locale, namespace: "metadata" }),
    getTranslations({ locale, namespace: "hero" }),
  ])

  // I font vanno letti dal filesystem: `next/font` vive nel browser, satori no.
  // Serve un TTF **statico** — satori non legge woff2 né i variable font.
  const [fraunces, inter] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/fonts/fraunces-600.ttf")),
    readFile(join(process.cwd(), "src/assets/fonts/inter-400.ttf")),
  ])

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        backgroundColor: BACKGROUND,
        fontFamily: "Inter",
      }}
    >
      <div
        style={{
          fontSize: 26,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: MUTED,
        }}
      >
        {tHero("eyebrow")}
      </div>

      <div
        style={{
          marginTop: 28,
          fontFamily: "Fraunces",
          fontSize: 104,
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
          color: FOREGROUND,
        }}
      >
        {siteConfig.name}
      </div>

      <div
        style={{
          marginTop: 44,
          height: 1,
          width: "100%",
          backgroundColor: RULE,
        }}
      />

      {/* Satori richiede `display: flex` esplicito su ogni nodo con più figli. */}
      <div
        style={{
          marginTop: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: 28, color: MUTED }}>{t("ogTagline")}</div>
        <div style={{ fontSize: 24, letterSpacing: "0.1em", color: FAINT }}>
          {locale.toUpperCase()}
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: fraunces, weight: 600, style: "normal" },
        { name: "Inter", data: inter, weight: 400, style: "normal" },
      ],
    }
  )
}
