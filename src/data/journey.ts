// Tappe del percorso, in ordine cronologico. Qui vivono solo gli **id stabili**:
// periodo, titolo e descrizione sono copy tradotto (`messages/*.json`, namespace
// `journey`), perché cambiano con la lingua.
//
// Framing (vedi `docs/site-content.md` §10): il percorso software parte da ~2023
// come autodidatta e diventa professionale (freelance) da febbraio 2025. Nessun
// impiego retribuito dichiarato prima del 2025.
export const JOURNEY_ITEMS = [
  "degree",
  "selfTaught",
  "freelance",
  "now",
] as const

export type JourneyItem = (typeof JOURNEY_ITEMS)[number]
