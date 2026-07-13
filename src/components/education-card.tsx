"use client"

import { ArrowDownToLine } from "lucide-react"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  ProjectCardBody,
  projectCardShell,
} from "@/components/project-card-body"
import { Button, buttonVariants } from "@/components/ui/button"
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
import type { Elaborato } from "@/data/education"

// Blocchetto etichetta + contenuto, gemello di quello dei progetti.
function Block({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <section>
      <h3 className="text-xs font-medium tracking-widest uppercase">{label}</h3>
      <div className="mt-3">{children}</div>
    </section>
  )
}

/**
 * Card di un elaborato aerospaziale che apre il dettaglio in un **drawer**, come i
 * progetti: stesso guscio, stesso gesto (da destra su desktop, dal basso su mobile).
 * La differenza è in fondo: un link per **scaricare il PDF originale** dell'elaborato,
 * che è **in italiano** a prescindere dal locale del sito (lingua originale del lavoro).
 */
export function EducationCard({
  elaborato,
  className,
}: {
  elaborato: Elaborato
  className?: string
}) {
  const t = useTranslations("education")
  const isMobile = useIsMobile()

  const item = `items.${elaborato.id}` as const
  // Le liste di punti chiave hanno lunghezza variabile → array nei messaggi.
  const highlights: string[] = t.raw(`${item}.highlights`)

  return (
    <Drawer
      showSwipeHandle={isMobile}
      swipeDirection={isMobile ? "down" : "right"}
    >
      <DrawerTrigger className={cn(projectCardShell, className)}>
        <ProjectCardBody
          title={t(`${item}.title`)}
          tagline={t(`${item}.tagline`)}
          stack={elaborato.tools}
          srLabel={t("labels.details")}
        />
      </DrawerTrigger>

      <DrawerContent
        keepMounted
        className="md:data-[swipe-axis=x]:[--drawer-content-width:38rem]"
      >
        <DrawerHeader>
          <DrawerTitle className="text-xl">{t(`${item}.title`)}</DrawerTitle>
          <DrawerDescription className="text-pretty">
            {t(`${item}.tagline`)}
          </DrawerDescription>
        </DrawerHeader>

        <div className="min-h-0 flex-1 scroll-fade space-y-7 overflow-y-auto p-6">
          <Block label={t("labels.context")}>
            <p className="leading-relaxed text-pretty">
              {t(`${item}.context`)}
            </p>
          </Block>

          <Block label={t("labels.tools")}>
            <p className="leading-relaxed text-pretty text-muted-foreground">
              {elaborato.tools.join(", ")}
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
                    className="mt-2.5 size-1 shrink-0 rounded-full bg-muted-foreground"
                  />
                  {highlight}
                </li>
              ))}
            </ul>
          </Block>

          <p className="border-t border-border/60 pt-5 text-xs text-muted-foreground">
            {t("labels.documentNote")}
          </p>
        </div>

        <DrawerFooter className="border-t border-border pt-4 sm:flex-row sm:justify-between">
          {/* LINK, non button → `buttonVariants` su un `<a>` (Base UI's Button
              forzerebbe role="button" e romperebbe la semantica del link). Il file
              è servito da `public/`; `download` suggerisce il salvataggio col nome
              originale. Documento in italiano a prescindere dal locale. */}
          <a
            href={`/${elaborato.file}`}
            download={elaborato.file}
            className={cn(buttonVariants({ size: "sm" }), "gap-2")}
          >
            <ArrowDownToLine aria-hidden className="size-4" />
            {t("labels.download")}
          </a>
          <DrawerClose render={<Button variant="outline" size="sm" />}>
            {t("labels.close")}
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
