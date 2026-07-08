"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Logo } from "@/components/logo"
import { LocaleSwitcher } from "@/components/locale-switcher"
import { CvButton } from "@/components/cv-button"
import { NAV_ITEMS, navIndex, type NavItem } from "@/lib/nav"

// Fuori dal componente: il React Compiler vieta di mutare valori esterni
// (`window`) dentro un componente.
function goToAnchor(id: string) {
  window.location.hash = id
}

// Menu mobile: sheet laterale con le voci di navigazione, lingua e CV.
// Il tema resta nella barra (un tap, sempre visibile), qui ci sono navigazione +
// preferenze secondarie.
export function MobileNav() {
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState<NavItem | null>(null)
  const t = useTranslations("nav")
  const tcv = useTranslations("cv")
  const locale = useLocale()

  // Il dialog blocca lo scroll del body finché è aperto: se saltassimo all'ancora
  // subito, lo scroll non avverrebbe. Chiudiamo, e navighiamo a chiusura completata.
  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    item: NavItem
  ) => {
    event.preventDefault()
    setPending(item)
    setOpen(false)
  }

  const handleOpenChangeComplete = (isOpen: boolean) => {
    if (isOpen || !pending) return
    goToAnchor(pending)
    setPending(null)
  }

  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
      onOpenChangeComplete={handleOpenChangeComplete}
    >
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={t("openMenu")}
          />
        }
      >
        <Menu aria-hidden className="size-5" />
      </SheetTrigger>

      <SheetContent side="right" className="w-[85%] max-w-xs gap-0 p-0">
        <SheetHeader className="p-5">
          <SheetTitle className="sr-only">{t("menu")}</SheetTitle>
          <div className="flex items-center gap-2.5">
            <Logo className="size-7" />
            <span className="font-heading text-base font-semibold tracking-tight">
              Davide Avagnano
            </span>
          </div>
        </SheetHeader>

        <div className="-mt-2 flex items-center justify-between gap-4 border-b border-border/60 p-5">
          <LocaleSwitcher />
          <CvButton locale={locale} label={tcv("label")} aria={tcv("aria")} />
        </div>

        <nav aria-label={t("menu")} className="flex flex-col gap-1 p-3">
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item}
              href={`#${item}`}
              onClick={(event) => handleNavClick(event, item)}
              className="flex items-baseline gap-3 rounded-md px-3 py-3 text-base font-medium transition-colors hover:bg-muted"
            >
              <span
                aria-hidden
                className="text-xs text-muted-foreground tabular-nums"
              >
                {navIndex(i)}
              </span>
              {t(item)}
            </a>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
