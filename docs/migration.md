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

### Fase 2 — Upgrade core: Next 16 + React 19 ✅ FATTA (insieme a Fase 4)

- [x] `next@16.2`, `react@19.2`, `react-dom@19.2` installati
- [x] `eslint-config-next@16.2`, `@types/react@19`, `@types/react-dom@19`, `@types/node` aggiornati
- [x] `tsconfig` `jsx: preserve → react-jsx` (auto, allineato a baaarber)
- [x] **React 19**: nessun `useFormState`/`useFormStatus`/`propTypes`/`defaultProps` nel codice; `forwardRef` (shadcn `ui/`) resta valido. Form contatti usa `useTransition` → compatibile.
- [x] **Next 16**: nessuna pagina con `params`/`searchParams`/`cookies`/`headers` → nessun breaking async.
- [x] `next-env.d.ts` rigenerato al build
- [x] Verificato: `typecheck` + `lint` + `build` verdi; **smoke test dev**: `/` 200 con tutte le sezioni, `/test` 200, `/api/gsc` 200 (locale), nessun warning runtime nel log

> **Anticipato da Fase 5** (accoppiato all'upgrade React 19):
>
> - [x] `framer-motion` → `motion@12` (peer di framer-motion 11 bloccava React 19). Import aggiornati in `project-card`, `project-category`, `skill-category`, `single-skill` → `motion/react`.
> - [x] Radix aggiornati all'ultima (`react-dialog`, `react-label`, `react-slot`) per compat React 19 → eliminati i peer "invalid". L'unificazione nel pacchetto unico `radix-ui` resta in Fase 5.

### Fase 3 — Tailwind v3 → v4 ✅ FATTA (via codemod ufficiale)

Eseguita con `npx @tailwindcss/upgrade` + rifiniture manuali.

- [x] Tailwind `3.4` → `4.3.2`, aggiunto `@tailwindcss/postcss`, `tailwindcss-animate` → **`tw-animate-css`** (port v4-nativo)
- [x] `postcss.config.mjs`: `tailwindcss` → `@tailwindcss/postcss` (auto dal tool)
- [x] **`tailwind.config.ts` eliminato**; tema migrato in `src/app/globals.css`:
  - `@import "tailwindcss";` + `@import "tw-animate-css";`
  - `@custom-variant dark (&:is(.dark *));`
  - `@theme { --color-*: hsl(var(--*)); ... }` — **token HSL preservati identici** (nessuna conversione OKLCH, per garantire resa uguale)
  - valori raw in `:root { --background: 216 65% 11%; ... }` invariati
  - `--radius-*` in `@theme`
  - layer di compatibilità per il colore bordi (`currentcolor` è il nuovo default v4)
- [x] Utility deprecate v4 migrate dal tool su 12 file: `h-[1px]`→`h-px`, `max-w-screen-lg`→`max-w-(--breakpoint-lg)`, `max-w-screen-sm`→`max-w-(--breakpoint-sm)`, + rename silenziosi (`rounded`/`shadow`/`ring`/`blur`)
- [x] **`tailwindcss-motion` rimosso** (plugin NON compatibile v4: definisce una utility con selettore `@media`, rifiutata dal motore v4). Usato solo per il cursore lampeggiante dell'hero → sostituito con keyframe nativa `--animate-blink` in `@theme` (`intro.tsx`: `motion-preset-blink motion-duration-1500` → `animate-blink`)
- [x] `.prettierrc`: `tailwindConfig` → `tailwindStylesheet: ./src/app/globals.css` (ora valido, siamo su v4)
- [x] `components.json`: `tailwind.config` → `""`
- [x] Verificato: `typecheck` + `lint` + `build` verdi; CSS compilato contiene tutti i token custom (`166 100% 70%`, `bg-bg-lightest`, `text-foreground-light`), la keyframe `blink` e le utility `animate-in` di tw-animate-css
- [ ] **CHECK VISIVO UTENTE** in corso (dopo restart del dev server): confrontare intro/about/skills/projects/contact/footer con lo stato pre-v4
- [ ] ⚠️ Da confermare a occhio: il **cursore lampeggiante** (nuova keyframe `blink 1.5s step-end` — ritmo del blink potrebbe differire leggermente dal preset originale di tailwindcss-motion; facilmente regolabile in `globals.css`)

### Fase 4 — Tooling (ESLint flat + prettier + script) ✅ FATTA

> Accoppiata a Fase 2: Next 16 **rimuove** `next lint`, quindi la flat config è obbligatoria. Inoltre i subpath flat di `eslint-config-next` (`/core-web-vitals`, `/typescript`) esistono solo da v16 → impossibile farla prima dell'upgrade.

- [x] Rimosso `.eslintrc.json`; creato `eslint.config.mjs` (struttura baaarber: `defineConfig([...nextVitals, ...nextTs, globalIgnores([...])])`)
- [x] `package.json`: `"lint": "eslint"` (`typecheck` già presente)
- [x] `.prettierignore`: aggiunto `package-lock.json` (gli altri già presenti)
- [x] `npm run format` eseguito
- [x] Effetto collaterale: la flat config lint-a anche `tailwind.config.ts` → convertiti i `require()` in import ESM + shim `src/types/tailwindcss-motion.d.ts` (entrambi rimossi in Fase 3 con l'eliminazione del config)

### Fase 5 — Pulizia & aggiornamento librerie

- [ ] **Rimuovere dipendenze morte**: `axios`, `xml2js`, `@types/xml2js`, `dotenv` (nessun uso nel codice)
- [x] ~~**`framer-motion` → `motion`**~~ **FATTO in Fase 2** (era bloccante per React 19). Import aggiornati a `motion/react`.
- [x] Radix aggiornati all'ultima per React 19 (Fase 2). **Resta da fare**: unificazione nel pacchetto unico `radix-ui` (`npm rm @radix-ui/react-* && npm i radix-ui`, aggiornare import in `ui/dialog.tsx`, `ui/label.tsx`, `ui/button.tsx`).
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
