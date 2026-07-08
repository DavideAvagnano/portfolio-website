import { ArrowUpRight } from "lucide-react"
import { useTranslations } from "next-intl"

import { Section } from "@/components/section"
import { ProjectCard } from "@/components/project-card"
import { sectionIndex } from "@/lib/nav"
import { PROJECT_GROUPS, SIDE_PROJECTS } from "@/data/projects"

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
      {children}
    </h3>
  )
}

// Sezione minore, in coda: progetti personali del periodo da autodidatta. Qui il
// link GitHub c'è (a differenza dei progetti cliente) e il modale non serve: la
// profondità sta nel repository.
function SideProjects() {
  const t = useTranslations("projects")

  return (
    <div>
      <GroupLabel>{t("groups.side")}</GroupLabel>
      <ul className="mt-2 divide-y divide-border/50">
        {SIDE_PROJECTS.map((project) => (
          <li key={project.id}>
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              aria-label={`${t(`side.${project.id}.title`)} — ${t("labels.viewSource")}`}
              className="group -mx-3 flex items-start gap-4 rounded-lg px-3 py-5 transition-colors hover:bg-muted/50"
            >
              <div className="flex-1">
                <h4 className="font-heading font-medium tracking-tight">
                  {t(`side.${project.id}.title`)}
                </h4>
                <p className="mt-1 text-sm text-pretty text-muted-foreground">
                  {t(`side.${project.id}.tagline`)}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {project.stack.join(", ")}
                </p>
              </div>
              <ArrowUpRight
                aria-hidden
                className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Progetti: case study raggruppati **per tipo** (niente filtri o tab: sarebbero
// contro il minimalismo, e con sei voci non servono). L'ordine è per impatto.
export function Projects() {
  const t = useTranslations("projects")
  const tn = useTranslations("nav")

  return (
    <Section
      id="projects"
      index={sectionIndex("projects")}
      label={tn("projects")}
    >
      <p className="max-w-xl text-pretty text-muted-foreground">{t("intro")}</p>

      <div className="mt-12 space-y-12">
        {PROJECT_GROUPS.map((group) => (
          <div key={group.id}>
            <GroupLabel>{t(`groups.${group.id}`)}</GroupLabel>
            <div className="mt-2 divide-y divide-border/50">
              {group.projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        ))}

        <SideProjects />
      </div>
    </Section>
  )
}
