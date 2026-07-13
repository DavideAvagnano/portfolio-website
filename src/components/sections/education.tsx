import { useTranslations } from "next-intl"

import { Section } from "@/components/section"
import { EducationCard } from "@/components/education-card"
import { sectionIndex } from "@/lib/nav"
import { EDU_GROUPS } from "@/data/education"
import { cn } from "@/lib/utils"

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
      {children}
    </h3>
  )
}

function CardGrid({ children }: { children: React.ReactNode }) {
  return <div className="mt-4 grid gap-4 sm:grid-cols-2">{children}</div>
}

// Formazione: il lato ingegneristico del percorso. Elaborati accademici della
// magistrale aerospaziale (poi interrotta), raggruppati per esame — Strutture e
// Aerodinamica. Stesse card+drawer dei progetti: sintesi fuori, dettaglio tecnico
// e PDF scaricabile dentro. Sta dopo i Progetti: prima il software, poi la radice
// ingegneristica del metodo.
export function Education() {
  const t = useTranslations("education")
  const tn = useTranslations("nav")

  return (
    <Section
      id="education"
      index={sectionIndex("education")}
      label={tn("education")}
    >
      <p className="max-w-2xl text-pretty text-muted-foreground">
        {t("intro")}
      </p>

      <div className="mt-12 space-y-10">
        {EDU_GROUPS.map((group) => (
          <div key={group.id}>
            <GroupLabel>{t(`groups.${group.id}`)}</GroupLabel>
            <CardGrid>
              {group.elaborati.map((elaborato) => (
                <EducationCard
                  key={elaborato.id}
                  elaborato={elaborato}
                  className={cn(
                    group.elaborati.length === 1 && "sm:col-span-2"
                  )}
                />
              ))}
            </CardGrid>
          </div>
        ))}
      </div>
    </Section>
  )
}
