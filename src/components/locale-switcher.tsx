"use client"

import { Fragment } from "react"
import { useLocale, useTranslations } from "next-intl"
import { usePathname, useRouter } from "@/i18n/navigation"
import { locales, localeMeta, type Locale } from "@/i18n/routing"
import { cn } from "@/lib/utils"

// Switch lingua minimale ed editoriale (IT / EN). `router.replace(pathname, …)` è
// l'API canonica di next-intl: cambia solo il prefisso di lingua mantenendo la
// pagina corrente e sincronizza da sé il cookie `NEXT_LOCALE`.
export function LocaleSwitcher({ className }: { className?: string }) {
  const current = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations("localeSwitcher")

  const change = (next: Locale) => {
    if (next === current) return
    router.replace(pathname, { locale: next })
  }

  return (
    <div
      role="group"
      aria-label={t("label")}
      className={cn("flex items-center text-sm", className)}
    >
      {locales.map((loc, i) => (
        <Fragment key={loc}>
          {i > 0 && (
            <span aria-hidden className="px-0.5 text-muted-foreground/30">
              /
            </span>
          )}
          <button
            type="button"
            onClick={() => change(loc)}
            aria-current={loc === current ? "true" : undefined}
            className={cn(
              "rounded-sm px-1 py-1 font-medium transition-colors",
              loc === current
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {localeMeta[loc].short}
          </button>
        </Fragment>
      ))}
    </div>
  )
}
