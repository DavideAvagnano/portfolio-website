import { useTranslations } from "next-intl"
import { Section } from "@/components/section"
import { sectionIndex } from "@/lib/nav"
import { JOURNEY_ITEMS } from "@/data/journey"

// Percorso: timeline a due colonne (periodo a sinistra, tappa a destra), separate
// da filetti. Su mobile collassa a una colonna. `<ol>` perché l'ordine cronologico
// è informazione, non solo stile.
export function Journey() {
  const t = useTranslations("journey")
  const tn = useTranslations("nav")

  return (
    <Section id="path" index={sectionIndex("path")} label={tn("path")}>
      <ol className="divide-y divide-border/50">
        {JOURNEY_ITEMS.map((item) => (
          <li
            key={item}
            className="grid gap-2 py-6 first:pt-0 last:pb-0 sm:grid-cols-[10rem_1fr] sm:gap-8"
          >
            <p className="text-sm text-muted-foreground tabular-nums">
              {t(`${item}.period`)}
            </p>
            <div className="max-w-xl">
              <h3 className="font-medium">{t(`${item}.title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-pretty text-muted-foreground">
                {t(`${item}.description`)}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
