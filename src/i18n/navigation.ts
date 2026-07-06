import { createNavigation } from "next-intl/navigation"
import { routing } from "./routing"

// Wrapper locale-aware attorno alle API di navigazione di Next: preservano il
// prefisso di lingua. Da usare al posto di `next/link` / `next/navigation`.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
