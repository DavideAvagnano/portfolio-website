import { cn } from "@/lib/utils"

// Colonna editoriale del sito: UNICA fonte di verità per larghezza massima e
// padding orizzontale. Per cambiare la larghezza dell'intero sito si tocca solo
// la classe qui sotto.
//
// Header e footer restano volutamente **full-bleed** (sfondo, blur e filetti a
// tutta viewport) e usano `Container` solo per incolonnare il contenuto interno:
// per questo la larghezza non può stare su un wrapper esterno del layout.
//
// `cn` usa tailwind-merge, quindi un consumer può sovrascrivere localmente la
// larghezza passando es. `className="max-w-2xl"`.
export function Container({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("mx-auto w-full max-w-4xl px-6", className)}>
      {children}
    </div>
  )
}
