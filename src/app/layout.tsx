import type { Metadata } from "next"
import { siteConfig } from "@/lib/site"

// Impostato qui così vale per TUTTE le route (incluse `_not-found` e
// `opengraph-image`), che non passano dal layout `[locale]`. Evita il warning
// "metadataBase not set" e permette di risolvere le immagini OG in assoluto.
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
}

// Root layout richiesto da Next: con l'i18n routing (`[locale]`) il vero layout
// — `<html>`, font, provider — vive in `app/[locale]/layout.tsx`. Qui si passano
// solo i children.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
