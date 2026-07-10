import { notFound } from "next/navigation"

// Catch-all: qualsiasi path non gestito sotto una lingua attiva il not-found
// localizzato (`[locale]/not-found.tsx`), così il 404 eredita layout e i18n.
export default function CatchAllPage() {
  notFound()
}
