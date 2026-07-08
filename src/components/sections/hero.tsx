import { useTranslations } from "next-intl"
import { Container } from "@/components/container"
import { SocialLinks } from "@/components/social-links"

// Hero: saluto tipografico, ruolo, riga di posizionamento, luogo e social.
// Niente foto e niente CTA a bottone: la chiamata all'azione del sito sono il CV
// (header) e la sezione Contatti. `id="top"` è la destinazione del marchio e del
// "torna su" del footer.
export function Hero() {
  const t = useTranslations("hero")

  return (
    <section id="top" className="scroll-mt-24">
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

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <SocialLinks />
          <span aria-hidden className="hidden h-4 w-px bg-border sm:block" />
          <p className="text-sm text-muted-foreground">{t("location")}</p>
        </div>
      </Container>
    </section>
  )
}
