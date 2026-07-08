import { ArrowDownToLine } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Bottone CV: scarica il PDF nella lingua corrente (file statici in `public/`).
// È un LINK, non un button → usiamo `buttonVariants` su un `<a>` (stile da bottone,
// semantica da link). NON `<Button render={<a/>}>`: Base UI forza `role="button"`
// e romperebbe la semantica del link.
export function CvButton({
  locale,
  label,
  aria,
  className,
}: {
  locale: string
  label: string
  aria: string
  className?: string
}) {
  const file = `/cv-davide-avagnano-${locale}.pdf`

  return (
    <a
      href={file}
      download={`cv-davide-avagnano-${locale}.pdf`}
      aria-label={aria}
      // `cn` (tailwind-merge) risolve i conflitti: es. `hidden` deve battere
      // l'`inline-flex` della variante base, non dipendere dall'ordine nel CSS.
      className={cn(
        buttonVariants({ variant: "outline", size: "sm" }),
        className
      )}
    >
      <ArrowDownToLine aria-hidden className="size-4" />
      {label}
    </a>
  )
}
