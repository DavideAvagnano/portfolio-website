import Link from "next/link"
import "./globals.css"
import { fontVariables } from "@/lib/fonts"
import { cn } from "@/lib/utils"

// Fallback 404 globale: intercetta i path fuori da una lingua valida, quindi gira
// SENZA il layout `[locale]` → deve fornire da sé `<html>`/`<body>`. Testo neutro
// in inglese (default). I 404 dentro una lingua usano `[locale]/not-found.tsx`.
export default function GlobalNotFound() {
  return (
    <html lang="en" suppressHydrationWarning className={cn(fontVariables)}>
      <body className="bg-background text-foreground antialiased">
        <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-8 text-center">
          <p className="font-heading text-7xl font-semibold sm:text-9xl">404</p>
          <h1 className="text-2xl font-semibold sm:text-3xl">Page not found</h1>
          <p className="max-w-md text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <Link
            href="/"
            className="mt-4 rounded-md border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
          >
            Back to home
          </Link>
        </main>
      </body>
    </html>
  )
}
