import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-8 text-center">
      <p className="font-heading text-7xl font-semibold sm:text-9xl">404</p>
      <h1 className="text-2xl font-semibold sm:text-3xl">Page not found</h1>
      <p className="max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button
        render={<Link href="/" />}
        variant="outline"
        size="lg"
        className="mt-4"
      >
        Back to home
      </Button>
    </main>
  )
}
