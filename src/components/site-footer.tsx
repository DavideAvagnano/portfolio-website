import { useTranslations } from "next-intl"
import { Container } from "@/components/container"
import { SocialLinks } from "@/components/social-links"

// Footer essenziale: nome + tagline, social come icone, anno dinamico e "torna su".
// L'indirizzo email per esteso vivrà nella sezione Contatti (Fase 4); qui basta
// l'icona, per non ripetere lo stesso dato due volte.
export function SiteFooter() {
  const t = useTranslations("footer")
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border/60">
      <Container className="py-14">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="font-heading text-lg font-semibold tracking-tight">
              Davide Avagnano
            </p>
            <p className="max-w-xs text-sm text-muted-foreground">
              {t("tagline")}
            </p>
          </div>

          <SocialLinks />
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-border/60 pt-6 text-xs text-muted-foreground">
          <p>© {year} Davide Avagnano</p>
          <a href="#top" className="transition-colors hover:text-foreground">
            {t("backToTop")} ↑
          </a>
        </div>
      </Container>
    </footer>
  )
}
