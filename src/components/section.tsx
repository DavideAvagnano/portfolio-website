import { cn } from "@/lib/utils"

// Blocco "sezione" editoriale: indice + etichetta piccola + filetto sottile, poi
// il contenuto. Riutilizzato da tutte le sezioni della home. `scroll-mt-*` dà lo
// spazio sotto l'header sticky quando si arriva via ancora.
export function Section({
  id,
  index,
  label,
  children,
  className,
}: {
  id: string
  index?: string
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-label`}
      className={cn("scroll-mt-24 py-16", className)}
    >
      <div className="flex items-baseline gap-4">
        {index && (
          <span aria-hidden className="text-xs tabular-nums sm:text-sm">
            {index}
          </span>
        )}
        <h2
          id={`${id}-label`}
          className="text-xs font-medium tracking-widest uppercase sm:text-sm"
        >
          {label}
        </h2>
        <span aria-hidden className="h-px flex-1 bg-border" />
      </div>

      <div className="mt-8">{children}</div>
    </section>
  )
}
