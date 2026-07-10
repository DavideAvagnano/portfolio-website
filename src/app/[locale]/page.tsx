import { getTranslations, setRequestLocale } from "next-intl/server"
import { resolveLocale } from "@/i18n/routing"
import { Container } from "@/components/container"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/sections/hero"
import { Profile } from "@/components/sections/profile"
import { Journey } from "@/components/sections/journey"
import { Skills } from "@/components/sections/skills"
import { Projects } from "@/components/sections/projects"
import { Contact } from "@/components/sections/contact"

// Home one-page. Ogni sezione è un componente in `components/sections/` e ricava
// da sé il proprio indice editoriale da `NAV_ITEMS` (vedi `sectionIndex`), così
// l'ordine della pagina resta l'unica fonte di verità della numerazione.
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const locale = await resolveLocale(params)
  setRequestLocale(locale)

  const t = await getTranslations("nav")

  return (
    <>
      {/* Primo elemento focusabile della pagina: scavalca header e nav (WCAG 2.4.1).
          Invisibile al mouse, appare solo al focus da tastiera. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-60 focus:rounded-md focus:border focus:border-border focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium"
      >
        {t("skipToContent")}
      </a>

      <SiteHeader />

      {/* `tabIndex={-1}`: senza, il browser sposta lo scroll ma non il focus, e il
          tab successivo ripartirebbe dall'header — lo skip link sarebbe inutile. */}
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />

        <Container>
          <Profile />
          <Journey />
          <Skills />
          <Projects />
          <Contact />
        </Container>
      </main>

      <SiteFooter />
    </>
  )
}
