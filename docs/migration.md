# Migrazione & Ammodernamento — portfolio-website

> Piano operativo per riportare il progetto allo stato dell'arte, prendendo
> spunto dalle convenzioni del progetto di riferimento `baaarber`
> (`/Users/davideavagnano/repos/baaarber`). Restiamo su **npm** (baaarber usa
> bun), ma adottiamo la stessa organizzazione, gli stessi tool e le stesse
> versioni major.

- **Branch di lavoro:** `development`
- **Stato di partenza:** Next 15, Tailwind 3, layout flat (niente `src/`), ESLint legacy (`.eslintrc.json`)
- **Obiettivo:** Next 16 + React 19, Tailwind v4, struttura `src/`, tooling moderno, dipendenze pulite, SEO completa

---

## 1. Stato attuale vs target

| Area               | Attuale                                 | Target (rif. baaarber)                           |
| ------------------ | --------------------------------------- | ------------------------------------------------ |
| Next.js            | `^15.0.3` (installato 15.5.20)          | `16.x`                                           |
| React              | `^18.3.1`                               | `19.x`                                           |
| Tailwind CSS       | `3.4.x` (config JS)                     | `4.x` (config CSS-first in `globals.css`)        |
| PostCSS plugin     | `tailwindcss`                           | `@tailwindcss/postcss`                           |
| ESLint             | legacy `.eslintrc.json`                 | flat config `eslint.config.mjs`                  |
| Struttura sorgenti | flat (`app/`, `components/`, `lib/`…)   | `src/` con alias `@/* → ./src/*`                 |
| Animazioni         | `framer-motion` v11                     | pacchetto `motion` (nuovo nome di framer-motion) |
| Animazioni CSS     | `tailwindcss-animate`                   | `tw-animate-css` (variante v4)                   |
| Radix              | pacchetti singoli `@radix-ui/react-*`   | pacchetto unico `radix-ui`                       |
| Zod                | `^3.24`                                 | `^4.x`                                           |
| Dipendenze morte   | `axios`, `xml2js`, `dotenv` (non usate) | rimosse                                          |

---

## 2. Principi guida (convenzioni da adottare da baaarber)

1. **`src/` folder**: tutto il codice applicativo sotto `src/` (`src/app`, `src/components`, `src/lib`, `src/hooks`, `src/data`, `src/schemas`, `src/actions`, `src/types`). Alias `@/*` → `./src/*`.
2. **Tailwind v4 CSS-first**: niente `tailwind.config.ts`. Tema, colori e radius definiti in `src/app/globals.css` con `@theme` + variabili CSS. PostCSS via `@tailwindcss/postcss`.
3. **ESLint flat config** (`eslint.config.mjs`) con `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`.
4. **Prettier** identico a baaarber: `semi: false`, `printWidth: 80`, plugin tailwind con `tailwindStylesheet` che punta a `src/app/globals.css`, `tailwindFunctions: ["cn", "cva"]`.
5. **Script npm** allineati: `dev` (turbopack), `build`, `start`, `lint` (`eslint`), `format`, `typecheck` (`tsc --noEmit`).
6. **Zero `any`**: già ripulito nelle route GSC; mantenere la regola.

---

## 3. Fasi di migrazione

> Ogni fase è indipendente e verificabile. Committare a fine fase.
> Comando di verifica base dopo ogni fase: `npm run typecheck && npm run lint && npm run build`.

### Fase 0 — Preparazione ✅ (parziale, già fatto)

- [x] Spostati su branch `development`
- [x] Build/lint/format funzionanti sullo stato attuale (baseline verde)
- [x] Vulnerabilità npm ridotte (23 → 2 residue, tooling interno Next)
- [ ] Assicurarsi che `.env`, `credentials.json` siano fuori da git (già in `.gitignore` ✔)
- [ ] Creare `.env.example` con le sole **chiavi** (`RESEND_API_KEY`, `SITE_URL`, `GOOGLE_APPLICATION_CREDENTIALS`) senza valori
- [ ] Aggiungere `.nvmrc` con la versione Node (>= 20, consigliato 22)

### Fase 1 — Riorganizzazione in `src/` ✅ FATTA

Spostati (con `git mv`, history preservata):

- [x] `app/` → `src/app/`
- [x] `components/` → `src/components/`
- [x] `lib/` → `src/lib/`
- [x] `data/` → `src/data/`
- [x] `schemas/` → `src/schemas/`
- [x] `actions/` → `src/actions/`
- [x] `types/` → `src/types/`
- [x] Immagini importate staticamente `public/*.png` → `src/assets/` (import aggiornati in `about.tsx`, `section-heading.tsx`). Le immagini con `import` non stanno in `public/`; lì resta solo `google….html` (verifica GSC, servita via URL).
- [x] `tsconfig.json`: `"paths": { "@/*": ["./src/*"] }` + incluso `.next/dev/types/**/*.ts`
- [x] `components.json`: `tailwind.css` → `src/app/globals.css`
- [x] `tailwind.config.ts`: `content` globs → `./src/**` (necessario in v3, verrà eliminato in Fase 3)
- [x] Verificato: `typecheck` + `lint` + `build` verdi
- [ ] ~~`.prettierrc`: `tailwindStylesheet`~~ → **rimandato a Fase 3**: è un'opzione Tailwind v4. Ora `.prettierrc` usa correttamente `tailwindConfig: ./tailwind.config.ts` (v3).
- [ ] ~~`components.json` `tailwind.config` → `""`~~ → **rimandato a Fase 3** (config ancora v3)

> Nota: `public/`, `next.config.ts`, i file di config e `credentials.json` restano in root.

### Fase 2 — Upgrade core: Next 16 + React 19

- [ ] `npm i next@latest react@latest react-dom@latest`
- [ ] `npm i -D eslint-config-next@latest @types/react@latest @types/react-dom@latest @types/node@latest`
- [ ] Eseguire il codemod ufficiale: `npx @next/codemod@latest upgrade latest`
- [ ] **Breaking React 19**: verificare i tipi `React.ReactNode`/ref; con React 19 le `ref` sono prop normali (no più `forwardRef` obbligatorio) — i componenti `ui/` shadcn potrebbero avere warning.
- [ ] **Breaking Next 16**: `params`/`searchParams` nelle pagine sono `Promise` (async). Le route API GSC usano `GET()` senza params → OK. Controllare eventuali `cookies()`/`headers()` (qui non usati).
- [ ] Rigenerare `next-env.d.ts` (auto al primo `next dev`/`build`)

### Fase 3 — Tailwind v3 → v4

- [ ] `npm rm tailwindcss-animate tailwind.config.ts` deps; `npm i tailwindcss@latest @tailwindcss/postcss tw-animate-css`
- [ ] `postcss.config.mjs`: sostituire `tailwindcss: {}` → `"@tailwindcss/postcss": {}`
- [ ] **Eliminare `tailwind.config.ts`** e portare il tema dentro `src/app/globals.css`:
  - `@import "tailwindcss";` + `@import "tw-animate-css";` in testa
  - `@custom-variant dark (&:is(.dark *));` per il dark mode class-based
  - Blocco `@theme inline { --color-background: var(--background); … }` che mappa i token attuali (`background`, `foreground`, `foreground-light`, `bg-light`, `bg-lightest`, `primary`, `accent`, `destructive`, `border`, `input`, `ring`, `card`, `popover`, `muted`, `secondary`, `chart-1..5`)
  - I valori restano in `:root { --background: … }` (già presenti in HSL). In v4 vanno wrappati: es. `--background: hsl(216 65% 11%);` **oppure** convertiti in OKLCH come baaarber (opzionale, migliora la gestione colore)
  - `borderRadius` → token `--radius-*` in `@theme`
- [ ] **`tailwindcss-motion`**: la versione `0.4.x` supporta v4 via `@plugin`. Aggiungere `@plugin "tailwindcss-motion";` in `globals.css` (usato in `intro.tsx`). In alternativa rimpiazzare le classi `motion-*` con animazioni `motion` (framer) e droppare il plugin.
- [ ] Verificare visivamente ogni sezione (intro, about, skills, projects, contact, footer): i colori custom (`foreground-light`, `bg-lightest`, ecc.) devono rendere identici.

### Fase 4 — Tooling (ESLint flat + prettier + script)

- [ ] Rimuovere `.eslintrc.json`; creare `eslint.config.mjs` (copiare struttura baaarber: `defineConfig([...nextVitals, ...nextTs, globalIgnores([...])])`)
- [ ] `package.json` scripts: `"lint": "eslint"` (non più `next lint`, deprecato in Next 16), aggiungere `"typecheck": "tsc --noEmit"`
- [ ] Verificare `.prettierignore` (aggiungere `.next/`, `node_modules/`, `coverage/`, `package-lock.json`)
- [ ] `npm run format` per riformattare tutto il codice spostato in `src/`

### Fase 5 — Pulizia & aggiornamento librerie

- [ ] **Rimuovere dipendenze morte**: `axios`, `xml2js`, `@types/xml2js`, `dotenv` (nessun uso nel codice)
- [ ] **`framer-motion` → `motion`**: `npm rm framer-motion && npm i motion`. Aggiornare gli import in `project-category.tsx`, `project-card.tsx`, `skill-category.tsx`, `single-skill.tsx`: `import { motion } from "framer-motion"` → `import { motion } from "motion/react"`. API compatibile.
- [ ] **Radix unificato** (opzionale ma consigliato): `npm rm @radix-ui/react-dialog @radix-ui/react-label @radix-ui/react-slot && npm i radix-ui`. Aggiornare import in `ui/dialog.tsx`, `ui/label.tsx`, `ui/button.tsx` (Slot): `import * as DialogPrimitive from "@radix-ui/react-dialog"` → `import { Dialog as DialogPrimitive } from "radix-ui"`.
- [ ] **Zod v3 → v4**: `npm i zod@latest`. Verificare `schemas/index.ts` e `@hookform/resolvers` (aggiornare a `^5` per compat zod4/RHF7). API zod per lo più compatibile; controllare `z.infer`.
- [ ] Aggiornare le altre minori all'ultima: `lucide-react`, `react-hook-form`, `tailwind-merge` (→ v3), `clsx`, `class-variance-authority`.
- [ ] (Opzionale) Consolidare le icone: attualmente si usano sia `react-icons` che `lucide-react`. Valutare se standardizzare su `lucide-react`.
- [ ] `npm audit` finale: obiettivo 0 vulnerabilità high/critical.

### Fase 6 — Route API, credenziali, cleanup endpoint di test

> Nodo aperto: le route `/api/gsc` e `/api/gsc-test` leggono `credentials.json` da disco, che **non esiste su Vercel** → in produzione vanno in 500. Inoltre sono pubbliche e senza auth, e `gsc-test` è un duplicato con URL hardcoded.

- [ ] **Decisione**: le route GSC servono ancora? (attualmente: da chiarire — l'utente non ricorda lo scopo)
  - Se **NO** → rimuovere `src/app/api/gsc`, `src/app/api/gsc-test`, `src/app/test`, e le dep `googleapis`
  - Se **SÌ** → migrare le credenziali da file su disco a variabile d'ambiente (`GOOGLE_APPLICATION_CREDENTIALS` come JSON in env, parsato in memoria), proteggere gli endpoint, rimuovere l'URL hardcoded in `gsc-test:21` (usare `process.env.SITE_URL`), deduplicare le due route
- [ ] Rimuovere `src/app/test/page.tsx` (placeholder "Test" pubblico) in ogni caso
- [ ] Spostare `google34c2b65274804d71.html` (verifica GSC) — resta in `public/`, OK

### Fase 7 — SEO, accessibilità, finiture (dal `notes.txt`)

- [ ] **Pagina 404**: creare `src/app/not-found.tsx`
- [ ] **Sitemap**: `src/app/sitemap.ts` (API nativa Next, sostituisce l'approccio manuale)
- [ ] **Robots**: `src/app/robots.ts`
- [ ] **Metadata / OpenGraph**: arricchire `metadata` in `layout.tsx` con `openGraph`, `twitter`, `metadataBase`, `alternates`. Aggiungere `og-image`.
- [ ] **Accessibilità**: `aria-label` su icon-button, nav, social links (footer/navbar/mobile-menu)
- [ ] Animazioni di ingresso mancanti (intro/navbar, about/immagine, form) — vedi `notes.txt`
- [ ] Verifica Lighthouse (perf/SEO/a11y) come check finale
- [ ] Rimuovere `notes.txt` una volta esaurita la TODO (contenuto migrato qui)

### Fase 8 — Verifica finale & chiusura

- [ ] `npm run typecheck` pulito
- [ ] `npm run lint` pulito
- [ ] `npm run build` verde
- [ ] `npm run dev` — smoke test manuale di tutte le sezioni + form contatti (Resend)
- [ ] `npm audit` — 0 high/critical
- [ ] Aggiornare `README.md` (stack, comandi, setup env)
- [ ] Merge `development` → `main`

---

## 4. Rischi & note di rollback

- **Tailwind v4 è il rischio maggiore**: il cambio da config JS a CSS-first e la mappatura dei colori custom (`foreground-light`, `bg-lightest`) può alterare la resa. Mitigazione: fare la Fase 3 in un commit isolato e confrontare screenshot prima/dopo.
- **React 19 + shadcn `ui/`**: alcuni componenti generati potrebbero usare pattern deprecati (`forwardRef`). Rigenerarli con `shadcn` aggiornato se necessario.
- **`git mv` in Fase 1**: fare lo spostamento in un commit dedicato e separato dagli edit, così il diff resta leggibile e il rename è tracciato.
- **Rollback**: ogni fase è un commit atomico su `development`; in caso di problemi `git revert` della singola fase senza perdere le altre.

---

## 5. Checklist rapida (ordine consigliato)

1. [ ] Fase 0 — preparazione (`.env.example`, `.nvmrc`)
2. [ ] Fase 1 — `src/` + tsconfig/paths
3. [ ] Fase 4 — ESLint flat + script (prima dell'upgrade, così il lint gira già bene)
4. [ ] Fase 2 — Next 16 + React 19 + codemod
5. [ ] Fase 3 — Tailwind v4
6. [ ] Fase 5 — pulizia dipendenze + motion/radix/zod
7. [ ] Fase 6 — route GSC / credenziali / cleanup test
8. [ ] Fase 7 — SEO / a11y / finiture
9. [ ] Fase 8 — verifica finale + merge

> Regola d'oro: **un commit per fase**, e dopo ogni fase `typecheck + lint + build` devono restare verdi prima di procedere.
