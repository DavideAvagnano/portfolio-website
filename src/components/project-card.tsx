"use client"

import { ArrowUpRight } from "lucide-react"
import { useFormatter, useTranslations } from "next-intl"

import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import type { Project } from "@/data/projects"

// Blocchetto etichetta + contenuto, ripetuto in tutto il pannello.
function Block({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <section>
      <h3 className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
        {label}
      </h3>
      <div className="mt-3">{children}</div>
    </section>
  )
}

/**
 * Card essenziale che apre il case study in un **drawer**: minimalismo fuori,
 * profondità on-demand. Da destra su desktop, dal basso su mobile — dove il
 * gesto naturale è lo swipe verso il basso e il pollice arriva al bordo.
 *
 * È un client component perché il pannello è interattivo; i messaggi sono già nel
 * provider, quindi legge le traduzioni da sé invece di ricevere una dozzina di prop.
 */
export function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations("projects")
  const format = useFormatter()
  const isMobile = useIsMobile()

  const item = `items.${project.id}` as const
  // Le liste di punti chiave hanno lunghezza variabile → array nei messaggi.
  const highlights: string[] = t.raw(`${item}.highlights`)

  return (
    <Drawer
      showSwipeHandle={isMobile}
      swipeDirection={isMobile ? "down" : "right"}
    >
      <DrawerTrigger className="group -mx-3 flex w-full items-start gap-4 rounded-lg px-3 py-5 text-left transition-colors hover:bg-muted/50 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none">
        <span className="flex-1">
          <span className="block font-heading font-medium tracking-tight">
            {t(`${item}.title`)}
          </span>
          <span className="mt-1 block text-sm text-pretty text-muted-foreground">
            {t(`${item}.tagline`)}
          </span>
        </span>
        <span className="mt-0.5 flex shrink-0 items-center gap-1 text-xs text-muted-foreground transition-colors group-hover:text-foreground">
          <span className="sr-only sm:not-sr-only">{t("labels.details")}</span>
          <ArrowUpRight className="size-4" />
        </span>
      </DrawerTrigger>

      <DrawerContent className="md:data-[swipe-axis=x]:[--drawer-content-width:38rem]">
        <DrawerHeader>
          <DrawerTitle className="text-xl">{t(`${item}.title`)}</DrawerTitle>
          <DrawerDescription className="text-pretty">
            {t(`${item}.tagline`)}
          </DrawerDescription>
        </DrawerHeader>

        <div className="min-h-0 flex-1 scroll-fade space-y-7 overflow-y-auto p-4 pt-6">
          <Block label={t("labels.context")}>
            <p className="leading-relaxed text-pretty">
              {t(`${item}.context`)}
            </p>
          </Block>

          <Block label={t("labels.stack")}>
            <p className="leading-relaxed text-pretty text-muted-foreground">
              {project.stack.join(", ")}
            </p>
          </Block>

          <Block label={t("labels.highlights")}>
            <ul className="space-y-3">
              {highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-3 leading-relaxed text-pretty text-muted-foreground"
                >
                  <span
                    aria-hidden
                    className="mt-2.5 size-1 shrink-0 rounded-full bg-border"
                  />
                  {highlight}
                </li>
              ))}
            </ul>
          </Block>

          <Block label={t("labels.metrics")}>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
              {project.metrics.map((metric) => (
                <div key={metric.key} className="flex flex-col-reverse gap-1">
                  <dt className="text-xs leading-tight text-muted-foreground">
                    {t(`metrics.${metric.key}`)}
                  </dt>
                  <dd className="font-heading text-2xl font-medium tabular-nums">
                    {metric.approx && "~"}
                    {format.number(metric.value)}
                  </dd>
                </div>
              ))}
            </dl>
          </Block>

          <Block label={t("labels.role")}>
            <p className="leading-relaxed text-pretty text-muted-foreground">
              {t(`${item}.role`)}
            </p>
          </Block>

          <p className="border-t border-border/60 pt-5 text-xs text-muted-foreground">
            {t("labels.noPublicLink")}
          </p>
        </div>

        <DrawerFooter className="border-t border-border pt-4">
          <DrawerClose render={<Button variant="outline" />}>
            {t("labels.close")}
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
