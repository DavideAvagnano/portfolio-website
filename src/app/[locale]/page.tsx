import { getTranslations, setRequestLocale } from "next-intl/server"
import { resolveLocale } from "@/i18n/routing"
import { NAV_ITEMS, navIndex } from "@/lib/nav"
import { Container } from "@/components/container"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SocialLinks } from "@/components/social-links"
import { Section } from "@/components/section"

// Home one-page. Fase 3: shell editoriale (header/footer) + scaffold delle sezioni
// con il componente `Section`. Hero e contenuti reali delle sezioni (Profilo,
// Percorso, Competenze, Progetti, Contatti) arrivano nelle Fasi 4-5.
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const locale = await resolveLocale(params)
  setRequestLocale(locale)

  const t = await getTranslations("hero")
  const tn = await getTranslations("nav")
  const ts = await getTranslations("sections")

  return (
    <>
      <SiteHeader />

      <main>
        {/* Hero */}
        <section id="top">
          <Container className="py-16">
            <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
              {t("eyebrow")}
            </p>
            <h1 className="mt-6 font-heading text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
              {t("greeting")}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-pretty text-muted-foreground sm:text-xl">
              {t("role")}
            </p>
            <p className="mt-4 max-w-xl leading-relaxed text-pretty text-muted-foreground">
              {t("intro")}
            </p>

            <SocialLinks className="mt-8" />
          </Container>
        </section>

        {/* Sezioni (scaffold) */}
        <Container>
          {NAV_ITEMS.map((id, i) => (
            <Section key={id} id={id} index={navIndex(i)} label={tn(id)}>
              <p className="max-w-xl text-pretty text-muted-foreground">
                {ts(id)}
              </p>
            </Section>
          ))}
        </Container>
      </main>

      <SiteFooter />
    </>
  )
}
