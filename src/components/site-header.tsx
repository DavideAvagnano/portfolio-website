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
        {/* Marchio: la "D" su mobile, il nome tipografico da `sm` in su. */}
        <a
          href="#top"
          aria-label="Davide Avagnano"
          className="flex items-center transition-opacity hover:opacity-70"
        >
          <Logo className="size-7 sm:hidden" />
          <span className="hidden font-heading text-base font-semibold tracking-tight sm:inline">
            Davide Avagnano
          </span>
        </a>

        <nav
          aria-label={t("menu")}
          className="hidden items-center gap-7 md:flex"
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
            con un filetto verticale. Su mobile restano tema + menu. */}
        <div className="flex items-center gap-2 md:gap-3">
          <LocaleSwitcher className="hidden md:flex" />
          <span aria-hidden className="hidden h-5 w-px bg-border md:block" />
          <ModeToggle />
          <CvButton
            locale={locale}
            label={tcv("label")}
            aria={tcv("aria")}
            className="ml-1 hidden md:inline-flex"
          />
          <MobileNav />
        </div>
      </Container>
    </header>
  )
}
