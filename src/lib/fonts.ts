import { Fraunces, Geist, Inter, Space_Grotesk } from "next/font/google"

// Istanze font. Le variabili CSS (`--font-sans` = testo, `--font-heading` =
// display) sono mappate in globals.css → utility `font-sans` / `font-heading`.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})
const geistHeading = Geist({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})
const spaceGroteskHeading = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

// Le 3 coppie proposte — formato: [display/heading, testo/sans].
const FONT_PAIRS = {
  // A — Editoriale: Fraunces (display, serif) + Inter (testo)
  A: [fraunces, inter],
  // B — All-sans: Geist (display + testo)
  B: [geistHeading, geistSans],
  // C — Grotesque: Space Grotesk (display) + Inter (testo)
  C: [spaceGroteskHeading, inter],
} as const

// ─────────────────────────────────────────────────────────────────────────────
//  👇  CAMBIA QUI per provare le alternative:  "A" | "B" | "C"
// ─────────────────────────────────────────────────────────────────────────────
const ACTIVE: keyof typeof FONT_PAIRS = "A"

/** Classi delle variabili font della coppia attiva, da mettere sull'`<html>`. */
export const fontVariables = FONT_PAIRS[ACTIVE].map((f) => f.variable).join(" ")
