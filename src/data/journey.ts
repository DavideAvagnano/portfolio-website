// Tappe del percorso, in ordine **discendente** (la più recente prima). Qui vivono
// solo gli **id stabili**: periodo, titolo e descrizione sono copy tradotto
// (`messages/*.json`, namespace `journey`), perché cambiano con la lingua.
//
// Framing (vedi `docs/site-content.md` §10): il percorso software parte dal 2021
// come autodidatta (prima Python/data analysis, poi web/full-stack) e diventa
// professionale (freelance) da febbraio 2025. Date allineate al CV. Nessun impiego
// retribuito dichiarato prima del 2025.
export const JOURNEY_ITEMS = [
  "now",
  "freelance",
  "webDev",
  "foundations",
  "degree",
] as const

export type JourneyItem = (typeof JOURNEY_ITEMS)[number]
