# Piano di refactor UI/UX & contenuti — a fasi

> Piano operativo per eseguire il redesign definito in
> [`redesign-goals.md`](redesign-goals.md), con i contenuti da
> [`site-content.md`](site-content.md). Stessa filosofia della **migrazione tecnica
> già conclusa** (Next 16 / React 19 / Tailwind v4 — vedi git history): **fasi
> atomiche, un commit per fase, dopo ogni fase `typecheck` + `lint` + `build`
> verdi** prima di procedere.
>
> Branch: `development`. **Non si committa finché Davide non dà l'ok** (fase attuale
> = preparazione).

---

## Sintesi decisioni (da `redesign-goals.md`)

Editoriale minimale, tipografico, **light-first**, **monocromo**; via il motivo
"developer". **i18n** IT+EN (default IT, next-intl). **Tema** light/dark (next-themes,
segue sistema, fallback dark). **shadcn ricostruito da zero** (globals.css modello
baaarber, OKLCH). Progetti come **card + modale**, raggruppati per tipo. **Competenze**
liste testo a 2 colonne. **Percorso** timeline. **Contatti** CTA + form. **CV**
scaricabile per-lingua (PDF già in `public/`). Font: deciso **a vista** (A Fraunces+
Inter / B Geist / C Space Grotesk+Inter).

---

## Fase 0 — Preparazione ✅ FATTA

- [x] Contenuti sintetizzati (`site-content.md`).
- [x] Obiettivi & design direction (`redesign-goals.md`).
- [x] Reference salvata (`private/`, gitignored).
- [x] Decisioni chiave prese; PDF CV in `public/`; anno software confermato (~2023).

---

## Fase 1 — Fondamenta del design system (globals.css + font + tema) ✅ FATTA

Obiettivo: base visiva pulita e monocroma, tema light/dark funzionante, font pronto.

- [x] **`globals.css` riscritto** (modello baaarber): token shadcn v4 **OKLCH**,
      **neutral monocromo**, `@theme inline`, `:root` = light, `.dark` = dark,
      `@custom-variant dark`. Rimossi token inutili (chart/sidebar) e `--animate-blink`.
- [x] **Font** via `next/font`: **Fraunces** (display, `--font-serif`) + **Inter**
      (testo, `--font-sans`) in `layout.tsx`. _(Coppia A; switch a B/C banale a vista.)_
- [x] **next-themes**: `ThemeProvider` (`attribute="class"`, `defaultTheme="system"`,
      `enableSystem`, `disableTransitionOnChange`), `suppressHydrationWarning`.
- [x] **ModeToggle** (icona lucide) guidato da CSS `.dark` (niente stato → niente
      hydration mismatch / niente `react-hooks/set-state-in-effect`).
- [x] **Shell minimale** (`page.tsx`) + `not-found.tsx` sui nuovi token.
- [x] Verifica: `typecheck` + `lint` + `build` verdi; smoke dev (home 200, font ok,
      no errori/hydration).

**Pivot importante — shadcn ora su Base UI:** il nuovo preset shadcn
(`shadcn init --preset … --template next`) usa **Base UI** (`@base-ui/react`), non
più Radix. Colto al volo (siamo a Fase 1, costo minimo):

- Deps: `+@base-ui/react +shadcn` (quest'ultimo serve per `@import "shadcn/tailwind.css"`),
  `−radix-ui`. Base color **zinc**, stile **base-nova**.
- `globals.css`, `components.json` e `ui/button.tsx` allineati al preset (valori zinc,
  set token completo, scala radius). Font nostri: **Fraunces** (`--font-heading`) +
  **Inter** (`--font-sans`).
- **Base UI ≠ Radix**: niente `asChild`/`Slot` → si usa il prop **`render`**
  (es. `<Button render={<Link/>}>` nella 404).
- **Pulizia (clean slate)**: rimosse TUTTE le vecchie sezioni + i componenti `ui/`
  radix. Restano `theme-provider`, `mode-toggle`, `ui/button`. Logica riusabile
  tenuta (`actions/`, `schemas/`, `lib/`, `data/`, `assets/`).

**Altre deviazioni:**

- **`opengraph-image`** ancora vecchio stile (navy/mint) → aggiornamento in Fase 6.

---

## Fase 2 — Internazionalizzazione (next-intl) — strutturale

Obiettivo: routing multilingua + messaggi, **prima** di costruire le sezioni (così
tutto il copy nasce già i18n).

- [ ] Installare `next-intl`; config (`i18n/routing.ts`, `request.ts`), **locales
      `["it","en"]`, default `it`**.
- [ ] **Ristrutturare** le route sotto `src/app/[locale]/…` (layout, page, not-found).
      Middleware next-intl. Aggiornare `tsconfig`/import se serve.
- [ ] `messages/it.json` + `messages/en.json` (scheletro chiavi per sezioni).
- [ ] **SEO per-locale**: `generateMetadata` per lingua, `alternates`/`hreflang`,
      `sitemap.ts` e `robots.ts` per-locale, OG per-locale.
- [ ] **Language switcher** (IT · EN) che preserva la sezione corrente.
- [ ] Verifica: `/it` e `/en` rispondono, switch funziona, metadata per-locale ok.

---

## Fase 3 — Shell di layout (header, footer, scaffold sezioni)

Obiettivo: la "cornice" editoriale minimale.

- [ ] **Header** nuovo: nome/logo tipografico + nav testuale (Profilo · Percorso ·
      Competenze · Progetti · Contatti) + **language switch** + **theme toggle** +
      **bottone CV** (scarica `cv-davide-avagnano-<locale>.pdf`).
- [ ] **Footer** nuovo: anno **dinamico**, contatti, essenziale.
- [ ] **Layout**: colonna unica stretta e centrata, spaziatura generosa; componente
      riutilizzabile "sezione" (etichetta piccola + filetto + contenuto).
- [ ] Rimuovere i vecchi: `navbar/`, `mobile-menu`, `logo`, `resume-dialog`,
      `social-icon` (rifare minimale), `section-heading` (rifare).
- [ ] Verifica build + navigazione ancore.

---

## Fase 4 — Sezioni di contenuto (Hero, Profilo, Percorso, Competenze, Contatti)

Obiettivo: costruire le sezioni testuali nello stile nuovo, con copy da messages.

- [ ] **Hero**: saluto tipografico ("Ciao, sono Davide" / EN), ruolo, one-liner di
      posizionamento (§2 content), link social. **Niente foto, niente cursore.**
- [ ] **Profilo** (about): narrativa §3 (transizione + baricentro backend). Rimuovere
      "currently seeking a role" e tono junior.
- [ ] **Percorso**: timeline a 2 colonne (anno · tappa) — laurea 2020 → software da
      ~2023 (autodidatta/frontend) → freelance 2025 (§6 content). _(Grafico opzionale,
      di default omesso per pulizia.)_
- [ ] **Competenze**: liste testo a 2 colonne (etichetta sx / tech dx) — categorie §4
      content (Linguaggi, Frontend, Backend, Database, Cache & code, AI, Infra/DevOps,
      Integrazioni).
- [ ] **Contatti**: blocco CTA "Lavoriamo insieme" + **form Resend** minimale
      (riusare `actions/send-email` + `schemas`, restilizzati).
- [ ] Copy IT + EN in `messages/`.
- [ ] Verifica build + entrambe le lingue.

---

## Fase 5 — Progetti / case study (card + modale)

Obiettivo: il pezzo forte, senza svendere i case study.

- [ ] **Nuovo modello dati** `data/projects` (case study): `title`, `tagline`, `type`
      (SaaS / Data & Perf. Marketing / Infra & Security / Side), `stack[]`, `highlights[]`,
      `metrics[]`, `role`, `links?` (solo side projects). Contenuti da §5 di `site-content.md`.
- [ ] **Lista/card essenziali** raggruppate **per tipo** (no filtri/tab), ordine per
      impatto: Baaarber → Hypefill → Scalability → ixily → log-manager → side.
- [ ] **Modale/drawer di dettaglio** al click: problema → stack → highlights →
      metriche → ruolo. Rispettare le **cautele** (no link Baaarber, no dettagli
      sensibili Scalability, attribuzione onesta ixily).
- [ ] **Side projects** (2: Authentication App, Dashboard Management) con link GitHub.
- [ ] i18n dei contenuti progetti.
- [ ] Verifica build + modale accessibile (focus trap, ESC, aria).

---

## Fase 6 — Motion, responsive, a11y, SEO

- [ ] **Motion discreto**: entrate allo scroll, hover misurati, transizioni tema/lingua
      (`motion` + `tw-animate-css`). Niente effetti appariscenti.
- [ ] **Responsive**: pass mobile completo (l'editoriale a colonna unica aiuta).
- [ ] **A11y**: contrasto **AA in entrambi i temi**, focus states, `aria-label`,
      ordine tab, `lang` per-locale.
- [ ] **SEO**: verificare metadata/OG per-locale, hreflang, sitemap/robots, l'immagine
      OG (aggiornarla al nuovo stile).
- [ ] Verifica Lighthouse (perf/SEO/a11y) su `/it` e `/en`.

---

## Fase 7 — Pulizia & chiusura

- [ ] **Prune componenti shadcn**: in Fase 1 sono stati aggiunti **tutti i ~60**
      componenti (+ deps pesanti: recharts, embla-carousel, react-day-picker, cmdk,
      react-resizable-panels, date-fns, sonner). Tenere **solo quelli usati**,
      rimuovere gli altri e le rispettive deps. _(Runtime già ok: i non usati sono
      tree-shaken; questo è cleanup di repo/deps.)_
- [ ] Rimuovere asset/data morti: foto `src/assets/*` (foto tolta dal design) →
      eliminare la cartella. `src/data/*` (`navbar-data`, `projects-data`,
      `skills-data`) sono dead code, sostituiti in Fase 4/5 → rimuovere. **`react-icons`**
      è usato solo da `skills-data` → rimuovibile una volta tolto quel file.
- [ ] Rimuovere componenti/file legacy rimasti.
- [ ] `typecheck` + `lint` + `build` verdi; smoke test **entrambe le lingue × entrambi
      i temi**; form contatti.
- [ ] Aggiornare `README.md` (nuove sezioni, i18n, tema).
- [ ] Merge `development` → `main` (a cura di Davide).

---

## Ordine consigliato & note

1. **Design system (1)** e **i18n (2)** sono **fondamenta**: farle prima evita di
   rifare le sezioni due volte.
2. Poi **shell (3)** → **sezioni (4)** → **progetti (5)** → **rifinitura (6)** →
   **pulizia (7)**.
3. Ogni fase resta **buildabile**; se una sezione vecchia va rimossa prima della
   nuova, usare stub temporanei per non rompere il build.

## Dipendenze / cose da Davide

- [x] PDF CV IT/EN in `public/`.
- [x] Anno inizio software (~2023) confermato.
- [x] Side projects scelti (Authentication App, Dashboard Management).
- [x] **Font deciso: coppia A (Fraunces + Inter)** — attiva in `src/lib/fonts.ts`
      (`ACTIVE = "A"`; B/C restano provabili cambiando quella riga).
- [ ] (Opzionale) screenshot Baaarber **solo con permesso cliente** (parte public).

---

## Stato avanzamento (per riprendere dopo un compact)

- ✅ **Fase 1 FATTA e committata** (`fbbac5d`): design system Base UI (base-nova,
  zinc), suite shadcn completa, tema light/dark, font A, shell minimale, pulizia
  vecchie sezioni.
- 🔜 **Prossima: Fase 2 — i18n (next-intl)** (IT default + EN, route `[locale]`).
- Le decisioni e i contenuti sono in questo file + `redesign-goals.md` +
  `site-content.md`; le regole di lavoro in `CLAUDE.md`. Reference visiva in
  `private/` (gitignored).
