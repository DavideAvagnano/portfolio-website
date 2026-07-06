import { getTranslations, setRequestLocale } from "next-intl/server"
import { resolveLocale } from "@/i18n/routing"
import { ModeToggle } from "@/components/mode-toggle"
import { LocaleSwitcher } from "@/components/locale-switcher"

// Shell minimale (Fase 1-2 del redesign): valida design system, font, tema e i18n.
// Le sezioni reali (Profilo, Percorso, Competenze, Progetti, Contatti) arrivano
// nelle fasi successive — vedi docs/redesign-plan.md.
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const locale = await resolveLocale(params)
  // Abilita il rendering statico di questa pagina.
  setRequestLocale(locale)

  const t = await getTranslations("hero")

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-24">
      <div className="mb-10 flex items-center justify-between">
        <LocaleSwitcher />
        <ModeToggle />
      </div>

      <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
        {t("eyebrow")}
      </p>
      <h1 className="mt-4 font-heading text-5xl font-semibold tracking-tight sm:text-6xl">
        {t("greeting")}
      </h1>
      <p className="mt-6 text-lg text-muted-foreground">{t("role")}</p>
      <p className="mt-4 max-w-prose leading-relaxed text-muted-foreground">
        {t("intro")}
      </p>
    </main>
  )
}
