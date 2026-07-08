import { setRequestLocale } from "next-intl/server"
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
// I case study dei Progetti arrivano in Fase 5.
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const locale = await resolveLocale(params)
  setRequestLocale(locale)

  return (
    <>
      <SiteHeader />

      <main>
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
