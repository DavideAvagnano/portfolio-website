import type { Metadata } from "next"
import { getLocale } from "next-intl/server"
import "./globals.css"

import { siteConfig } from "@/lib/site"
import { fontVariables } from "@/lib/fonts"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

// Impostato qui così vale per TUTTE le route (incluse `_not-found`).
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
}

// Root layout: `<html>`, `<body>` e `ThemeProvider` vivono QUI (non in `[locale]`).
// Motivo: questo layout NON si ri-renderizza al cambio lingua, quindi la classe
// tema (`dark`/`light`) che next-themes applica a `<html>` a runtime non viene mai
// toccata → niente flash del tema quando si cambia lingua (e lo script anti-FOUC
// non viene ricreato sul client → niente warning React 19).
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn(fontVariables, "antialiased")}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
