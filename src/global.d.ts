import type { routing } from "./i18n/routing"
import type messages from "../messages/it.json"

// Type-safety next-intl v4: `it.json` è la lingua sorgente per lo schema chiavi,
// `routing.locales` definisce le locale valide. Abilita autocomplete e controllo
// tipi su `t("...")` e sulle API locale-aware.
declare module "next-intl" {
  interface AppConfig {
    Messages: typeof messages
    Locale: (typeof routing.locales)[number]
  }
}
