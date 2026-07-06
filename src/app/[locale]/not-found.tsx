import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"

// 404 localizzato: reso all'interno del layout `[locale]`, quindi con font, tema
// e provider i18n già in scope.
export default function NotFound() {
  const t = useTranslations("notFound")

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-8 text-center">
      <p className="font-heading text-7xl font-semibold sm:text-9xl">
        {t("code")}
      </p>
      <h1 className="text-2xl font-semibold sm:text-3xl">{t("title")}</h1>
      <p className="max-w-md text-muted-foreground">{t("description")}</p>
      <Button
        render={<Link href="/" />}
        variant="outline"
        size="lg"
        className="mt-4"
      >
        {t("back")}
      </Button>
    </main>
  )
}
