import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-8 text-center">
      <p className="text-7xl font-semibold text-accent sm:text-9xl">404</p>
      <h1 className="text-2xl font-semibold sm:text-3xl">Page not found</h1>
      <p className="max-w-md text-foreground-light">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button asChild variant="outline" size="lg" className="mt-4 h-14">
        <Link href="/">Back to home</Link>
      </Button>
    </main>
  )
}
