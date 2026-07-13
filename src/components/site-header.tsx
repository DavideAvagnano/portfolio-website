import { useLocale, useTranslations } from "next-intl"
import { Container } from "@/components/container"
import { Logo } from "@/components/logo"
import { LocaleSwitcher } from "@/components/locale-switcher"
import { ModeToggle } from "@/components/mode-toggle"
import { CvButton } from "@/components/cv-button"
import { MobileNav } from "@/components/mobile-nav"
import { NAV_ITEMS } from "@/lib/nav"

export function SiteHeader() {
  const t = useTranslations("nav")
  const tcv = useTranslations("cv")
  const locale = useLocale()

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        {/* Marchio: la "D" su mobile, il nome tipografico da `sm` in su.
            `shrink-0` + `whitespace-nowrap`: il nome non si spezza mai su due righe
            quando la barra si stringe. */}
        <a
          href="#top"
          aria-label="Davide Avagnano"
          className="flex shrink-0 items-center transition-opacity hover:opacity-70"
        >
          <Logo className="size-7 sm:hidden" />
          <span className="hidden font-heading text-base font-semibold tracking-tight whitespace-nowrap sm:inline">
            Davide Avagnano
          </span>
        </a>

        {/* Nav orizzontale solo da `lg`: con sei voci non entra nella colonna
            `max-w-4xl` a larghezze inferiori — sotto `lg` si passa all'hamburger
            (che contiene già nav, lingua e CV). `gap-5` per farle stare comode. */}
        <nav
          aria-label={t("menu")}
          className="hidden items-center gap-5 lg:flex"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(item)}
            </a>
          ))}
        </nav>

        {/* Gruppo destro: preferenze (lingua, tema) separate dall'azione (CV)
            con un filetto verticale. `shrink-0` così non viene compresso e il CV
            non sborda. Sotto `lg` restano tema + menu (lingua e CV nell'hamburger). */}
        <div className="flex shrink-0 items-center gap-2 md:gap-3">
          <LocaleSwitcher className="hidden lg:flex" />
          <span aria-hidden className="hidden h-5 w-px bg-border lg:block" />
          <ModeToggle />
          <CvButton
            locale={locale}
            label={tcv("label")}
            aria={tcv("aria")}
            className="ml-1 hidden whitespace-nowrap lg:inline-flex"
          />
          <MobileNav />
        </div>
      </Container>
    </header>
  )
}
