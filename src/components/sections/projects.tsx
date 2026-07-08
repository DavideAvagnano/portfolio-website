import { useTranslations } from "next-intl"
import { Section } from "@/components/section"
import { sectionIndex } from "@/lib/nav"

// Scaffold: i case study (card + modale di dettaglio) arrivano in Fase 5.
export function Projects() {
  const t = useTranslations("sections")
  const tn = useTranslations("nav")

  return (
    <Section
      id="projects"
      index={sectionIndex("projects")}
      label={tn("projects")}
    >
      <p className="max-w-xl text-pretty text-muted-foreground">
        {t("projects")}
      </p>
    </Section>
  )
}
