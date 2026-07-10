import { useTranslations } from "next-intl"

import { Section } from "@/components/section"
import { ProjectCard } from "@/components/project-card"
import {
  ProjectCardBody,
  projectCardShell,
} from "@/components/project-card-body"
import { sectionIndex } from "@/lib/nav"
import { PROJECT_GROUPS, SIDE_PROJECTS } from "@/data/projects"
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

// Sezione minore, in coda: progetti personali del periodo da autodidatta. Qui il
// link GitHub c'è (a differenza dei progetti cliente) e il modale non serve: la
// profondità sta nel repository.
function SideProjects() {
  const t = useTranslations("projects")

  return (
    <div>
      <GroupLabel>{t("groups.side")}</GroupLabel>
      <CardGrid>
        {SIDE_PROJECTS.map((project) => (
          <a
            key={project.id}
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className={projectCardShell}
          >
            <ProjectCardBody
              title={t(`side.${project.id}.title`)}
              tagline={t(`side.${project.id}.tagline`)}
              stack={project.stack}
              srLabel={t("labels.viewSource")}
            />
          </a>
        ))}
      </CardGrid>
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

      <div className="mt-12 space-y-10">
        {PROJECT_GROUPS.map((group) => (
          <div key={group.id}>
            <GroupLabel>{t(`groups.${group.id}`)}</GroupLabel>
            <CardGrid>
              {group.projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  className={cn(group.projects.length === 1 && "sm:col-span-2")}
                />
              ))}
            </CardGrid>
          </div>
        ))}

        <SideProjects />
      </div>
    </Section>
  )
}
