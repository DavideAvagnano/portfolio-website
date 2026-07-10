import { useTranslations } from "next-intl"
import { Section } from "@/components/section"
import { sectionIndex } from "@/lib/nav"
import { SKILL_GROUPS } from "@/data/skills"

// Competenze: liste di **testo** categorizzate, due colonne (etichetta a sinistra,
// tecnologie a destra). Niente griglia di icone, niente tab: le tech sono prosa.
// `<dl>` perché è letteralmente una lista di definizioni (categoria → contenuto).
export function Skills() {
  const t = useTranslations("skills")
  const tn = useTranslations("nav")

  return (
    <Section id="skills" index={sectionIndex("skills")} label={tn("skills")}>
      <dl className="divide-y divide-border/50">
        {SKILL_GROUPS.map((group) => (
          <div
            key={group.id}
            className="grid gap-1 py-5 first:pt-0 last:pb-0 sm:grid-cols-[10rem_1fr] sm:gap-8"
          >
            <dt className="text-sm font-medium">{t(group.id)}</dt>
            <dd className="text-sm leading-relaxed text-pretty text-muted-foreground">
              {group.items.join(", ")}
            </dd>
          </div>
        ))}

        {/* Riga a parte: i pattern sono prosa tradotta, non nomi di tecnologie. */}
        <div className="grid gap-1 py-5 last:pb-0 sm:grid-cols-[10rem_1fr] sm:gap-8">
          <dt className="text-sm font-medium">{t("patterns")}</dt>
          <dd className="text-sm leading-relaxed text-pretty text-muted-foreground">
            {t("patternsList")}
          </dd>
        </div>
      </dl>
    </Section>
  )
}
