"use client"

import { useLocale } from "next-intl"
import { usePathname, useRouter } from "@/i18n/navigation"
import { locales, localeMeta, type Locale } from "@/i18n/routing"
import { cn } from "@/lib/utils"

// Switch lingua minimale ed editoriale (IT · EN). `router.replace(pathname, …)` è
// l'API canonica di next-intl: cambia solo il prefisso di lingua mantenendo la
// pagina corrente e sincronizza da sé il cookie `NEXT_LOCALE`.
//
// Nota: al cambio lingua React 19 può loggare in DEV il warning "script tag while
// rendering" — attrito noto next-intl + next-themes (lo script anti-FOUC di
// next-themes viene ri-renderizzato sul client). È innocuo e viene rimosso nel
// build di produzione.
export function LocaleSwitcher() {
  const current = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const change = (next: Locale) => {
    if (next === current) return
    router.replace(pathname, { locale: next })
  }

  return (
    <div className="flex items-center gap-1 text-sm" role="group">
      {locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-1">
          {i > 0 && <span className="text-muted-foreground/40">·</span>}
          <button
            type="button"
            onClick={() => change(loc)}
            aria-current={loc === current ? "true" : undefined}
            className={cn(
              "font-medium transition-colors",
              loc === current
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {localeMeta[loc].short}
          </button>
        </span>
      ))}
    </div>
  )
}
