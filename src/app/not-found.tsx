import Link from "next/link"

// Fallback 404 globale: intercetta i path fuori da una lingua valida. Il root
// layout fornisce già `<html>`/`<body>`/tema, quindi qui basta il contenuto.
// Testo neutro in inglese (default). I 404 dentro una lingua usano
// `[locale]/not-found.tsx` (localizzato).
export default function GlobalNotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-8 text-center">
      <p className="font-heading text-7xl font-semibold sm:text-9xl">404</p>
      <h1 className="text-2xl font-semibold sm:text-3xl">Page not found</h1>
      <p className="max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-4 rounded-md border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
      >
        Back to home
      </Link>
    </main>
  )
}
