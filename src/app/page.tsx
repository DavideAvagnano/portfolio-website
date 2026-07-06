import { ModeToggle } from "@/components/mode-toggle"

// Shell minimale (Fase 1 del redesign): serve a validare design system, font e
// tema. Le sezioni reali (Profilo, Percorso, Competenze, Progetti, Contatti)
// arrivano nelle fasi successive — vedi docs/redesign-plan.md.
export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-24">
      <div className="mb-10 flex justify-end">
        <ModeToggle />
      </div>

      <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
        Work in progress
      </p>
      <h1 className="mt-4 font-heading text-5xl font-semibold tracking-tight sm:text-6xl">
        Ciao, sono Davide.
      </h1>
      <p className="mt-6 text-lg text-muted-foreground">
        Fullstack Developer — React, Next.js, Node.js, PostgreSQL.
      </p>
      <p className="mt-4 max-w-prose leading-relaxed text-muted-foreground">
        Nuovo sito in costruzione. Sto ripartendo da una base pulita:
        tipografia, tema chiaro/scuro e una struttura editoriale minimale.
      </p>
    </main>
  )
}
