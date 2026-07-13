// Ancore delle sezioni: id stabili (NON tradotti), l'ordine è quello della pagina.
// Le etichette visibili vengono dai messaggi `nav.*`. Condivise da header desktop,
// menu mobile e home, così l'elenco vive in un posto solo.
export const NAV_ITEMS = [
  "profile",
  "path",
  "skills",
  "projects",
  "education",
  "contact",
] as const

export type NavItem = (typeof NAV_ITEMS)[number]

/** Indice editoriale della sezione: "01", "02", … */
export function navIndex(i: number) {
  return String(i + 1).padStart(2, "0")
}

/**
 * Indice editoriale a partire dall'ancora, così ogni sezione lo ricava da sé e
 * non va passato a mano dalla home (rinumerazione automatica se cambia l'ordine).
 */
export function sectionIndex(id: NavItem) {
  return navIndex(NAV_ITEMS.indexOf(id))
}
