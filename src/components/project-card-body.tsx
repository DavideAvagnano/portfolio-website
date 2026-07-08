import { ArrowUpRight } from "lucide-react"

/**
 * Superficie condivisa dalle card dei progetti: filetto sottile, radius contenuto,
 * nessuna ombra. `h-full` + griglia `items-stretch` pareggiano le altezze nella riga.
 *
 * La usano sia i case study (un `<button>` che apre il drawer) sia i side project
 * (un `<a>` verso GitHub): stesso aspetto, semantica diversa.
 */
export const projectCardShell =
  "group flex h-full flex-col rounded-xl border border-border p-5 text-left transition-colors hover:bg-muted/40 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"

/** Prime `max` tecnologie + "+N": densità tecnica senza rumore. Il resto è nel drawer. */
export function stackPreview(stack: readonly string[], max = 3) {
  const shown = stack.slice(0, max).join(" · ")
  const rest = stack.length - Math.min(max, stack.length)
  return rest > 0 ? `${shown} +${rest}` : shown
}

/**
 * Corpo della card. Solo `<span>`: il contenuto di un `<button>` deve essere
 * *phrasing content*, quindi niente `<div>`/`<p>`/heading qui dentro (è lo stesso
 * motivo per cui il titolo non è un `<h3>`). I figli di un flex container vengono
 * comunque "blockificati", quindi il layout non cambia.
 */
export function ProjectCardBody({
  title,
  tagline,
  stack,
  srLabel,
}: {
  title: string
  tagline: string
  stack: readonly string[]
  /** Nome dell'azione, per chi usa uno screen reader (es. "Dettagli"). */
  srLabel: string
}) {
  return (
    <>
      <span className="flex w-full items-start justify-between gap-4">
        <span className="font-heading font-medium tracking-tight">{title}</span>
        <ArrowUpRight
          aria-hidden
          className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-[color,transform] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
        />
      </span>

      <span className="mt-2 block text-sm text-pretty text-muted-foreground">
        {tagline}
      </span>

      {/* `mt-auto`: lo stack resta ancorato in basso anche se le tagline hanno
          lunghezze diverse — le card della stessa riga restano allineate. */}
      <span className="mt-auto block pt-6 text-xs text-muted-foreground">
        {stackPreview(stack)}
      </span>

      <span className="sr-only">{srLabel}</span>
    </>
  )
}
