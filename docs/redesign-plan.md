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

## Fase 2 — Internazionalizzazione (next-intl) — strutturale ✅ FATTA

Obiettivo: routing multilingua + messaggi, **prima** di costruire le sezioni (così
tutto il copy nasce già i18n).

**Decisioni prese con Davide** (ispezionati baaarber + hypefill-dashboard):

- Pattern **con locale nell'URL** (modello baaarber), non session-based (modello
  hypefill, adatto solo a dashboard autenticate).
- **`localePrefix: "as-needed"`**: IT (default) sulla **root** senza prefisso
  (`/`), EN su `/en`. URL puliti per il pubblico primario (italiano).
- **Detection del browser ATTIVA** (default next-intl): alla prima visita reindirizza
  alla lingua preferita (`/` → `/en` se browser EN), poi ricorda con cookie `NEXT_LOCALE`.
- **Un file messaggi per lingua** (`messages/{locale}.json`), non namespace-per-file
  (overkill per un sito piccolo).

**Fatto:**

- [x] `next-intl` (`^4.13`) installato; `next.config.ts` wrappato con
      `createNextIntlPlugin()`. Config in `src/i18n/`: `routing.ts` (locales
      `["it","en"]`, default `it`, `localePrefix: "as-needed"`, `localeMeta`, helper
      `resolveLocale`), `request.ts` (carica `messages/{locale}.json`), `navigation.ts`.
- [x] Route ristrutturate sotto `src/app/[locale]/` (`page.tsx`, `not-found.tsx`,
      catch-all `[...rest]/page.tsx` → `notFound()`).
      **Middleware in `src/proxy.ts`** (Next 16 ha rinominato `middleware`→`proxy`) =
      `createMiddleware(routing)`. _(Vedi Fase 3 per l'assetto finale dei layout:
      `<html>`/tema nel root, provider i18n in `[locale]`.)_
- [x] **`NextIntlClientProvider` con `messages` ESPLICITI** (`getMessages()`), non
      l'inherit v4 via promise. ⚠️ **Non tornare all'inherit senza messages:**
      quella variante rimonta il sottoalbero al cambio lingua → ricrea lo script
      anti-FOUC di next-themes sul client → warning React 19 "script tag while
      rendering". Coi messaggi risolti il warning sparisce (verificato).
- [x] `messages/it.json` + `messages/en.json` (scheletro: `metadata`, `hero`,
      `localeSwitcher`, `theme`, `notFound`). Type-safety via `src/global.d.ts`
      (augment `AppConfig.Messages`/`Locale`).
- [x] **SEO per-locale**: `generateMetadata` per lingua (title/description da
      `getTranslations`), `alternates.languages` (hreflang `it`/`en` + `x-default`),
      `canonical` per-locale, OG `locale`+`url` per-locale; `sitemap.ts` con entry
      `/` e `/en` + alternates hreflang; `robots.ts` invariato.
- [x] **Language switcher** minimale editoriale (`components/locale-switcher.tsx`,
      IT · EN testuale) con `router.replace(pathname, { locale })` → preserva la pagina.
- [x] Verifica (smoke test `next start`): root con `Accept-Language: en` → 307 `/en`;
      root IT → 200; `/it` → 307 `/`; `<html lang>` corretto; hreflang + canonical +
      sitemap con alternates ok; 404 localizzato (IT/EN).
      `typecheck` + `lint` + `format` verdi; smoke visivo di Davide su dev: cambio
      lingua IT↔EN ok, tema ok, **nessun warning** in console.
      _(All'epoca `/[locale]` era prerenderata SSG; in Fase 3 è passata a rendering
      dinamico — vedi la nota lì.)_

**Nota (limite noto, non bloccante):** i **404** renderizzano il guscio HTML iniziale
globale (`__next_error__`) col contenuto localizzato idratato client-side —
comportamento standard di Next col pattern root/`[locale]` split. Irrilevante per SEO
(i 404 sono noindex).

---

## Fase 3 — Shell di layout (header, footer, scaffold sezioni) ✅ FATTA

Obiettivo: la "cornice" editoriale minimale.

- [x] **`Container`** (`components/container.tsx`): **unica fonte di verità** per
      larghezza (`max-w-4xl`), centratura e padding orizzontale. Header/footer restano
      **full-bleed** (sfondo, blur, filetti a tutta viewport) e usano `Container` solo
      per il contenuto → la larghezza NON può stare su un wrapper esterno.
      _(Niente `.container` di Tailwind: è una max-width "a scalini" che cresce fino a
      1536px, l'opposto di una colonna di lettura fissa.)_
- [x] **Header** (`components/site-header.tsx`): sticky, `backdrop-blur`, hairline.
      Marchio: **logo "D" su mobile**, nome tipografico da `sm`. Nav ad ancore (`md+`).
      Gruppo destro raggruppato semanticamente: **preferenze** (lingua, tema) separate
      da un **filetto verticale** dall'**azione** (CV).
- [x] **Menu mobile** (`components/mobile-nav.tsx`): `Sheet` laterale (Base UI) con
      voci numerate, lingua e CV. Il tema resta in barra. ⚠️ Il dialog **blocca lo
      scroll del body**: il salto all'ancora avviene in `onOpenChangeComplete`, cioè a
      chiusura completata (niente `setTimeout` magici).
- [x] **Footer** (`components/site-footer.tsx`): nome + tagline, social a icone,
      **anno dinamico**, "torna su". _(Indirizzo email per esteso → sezione Contatti,
      Fase 4.)_
- [x] **`Section`** (`components/section.tsx`): indice `01` + etichetta uppercase +
      filetto + contenuto, `scroll-mt` per l'header sticky, `aria-labelledby`.
- [x] **`Logo`** (`components/logo.tsx`): SVG **inline** con `fill-foreground` /
      `fill-background` → si inverte col tema (un PNG sarebbe un quadrato nero su
      fondo nero nel dark). Nessuna richiesta di rete, nitido a ogni dimensione.
- [x] **Icone social** (`components/icons.tsx` + `social-links.tsx`): GitHub/LinkedIn/
      Email come SVG inline con `fill="currentColor"` → seguono tema e hover gratis.
      lucide ha **rimosso** i marchi `Github`/`Linkedin` (trademark) e `react-icons`
      sarebbe una dipendenza intera per due icone (oltretutto da rimuovere in Fase 7).
      Envelope **piena** (Heroicons solid) per coerenza ottica coi marchi.
- [x] `NAV_ITEMS` + `navIndex` in **`lib/nav.ts`** (erano duplicati header/home).
- [x] Hero (eyebrow, saluto, ruolo, posizionamento, social) + 5 sezioni scaffold con
      testo di preview (contenuti reali → Fasi 4-5).
- [x] Smooth-scroll ancore in `globals.css` (rispetta `prefers-reduced-motion`);
      aria-label i18n su `ModeToggle`/CV/menu; link solo-icona con area di tap ≈36px.
- [x] Messaggi: `nav` (+`menu`/`openMenu`), `sections`, `cv`, `footer`; hero rivisto
      (it/en). `email` aggiunta a `siteConfig.author`.
- [x] Verifica: `typecheck` + `lint` + `format` verdi; smoke curl `/` e `/en` → 200,
      nav/sezioni/footer/CV per-locale ok. _(Vecchi `navbar/`, `logo`, ecc. già
      rimossi nel clean slate di Fase 1: niente da togliere.)_

**Cambio di architettura dei layout (fix del flash del tema):**

`<html>`, `<body>` e `ThemeProvider` sono stati spostati **dal `[locale]/layout` al
root `app/layout.tsx`**. Motivo: il root **non** si ri-renderizza al cambio lingua,
quindi la classe tema (`dark`) che next-themes applica a `<html>` a runtime non viene
più toccata → **niente flash bianco** cambiando lingua in dark mode. È anche il setup
canonico di next-themes. Nel `[locale]/layout` resta `NextIntlClientProvider` +
`setRequestLocale` + `generateMetadata`. Il not-found globale non ha più un `<html>`
proprio.

⚠️ **Conseguenza:** il root usa `getLocale()` per `<html lang>`, che legge la
richiesta → **`/[locale]` è passata da SSG (`●`) a rendering dinamico (`ƒ`)**.
Accettato: per un CV è irrilevante (SSR ~40ms, pienamente indicizzabile, `lang`
corretto lato server), e l'alternativa per riavere l'SSG darebbe `lang` errato sul
`/en` in SSR — peggio per la SEO.

**Convenzione Base UI:** per un LINK con aspetto da bottone usare
`buttonVariants({...})` su un `<a>`/`Link`, **non** `<Button render={<a/>}>`: Base UI
forza `role="button"` e romperebbe la semantica del link (vedi `CLAUDE.md` §3).

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
- ✅ **Fase 2 FATTA e committata**: i18n next-intl, route `[locale]`,
  `localePrefix: "as-needed"` (IT su root, EN su `/en`), detection browser attiva,
  middleware in `src/proxy.ts`, SEO per-locale (hreflang/canonical/sitemap), language
  switcher canonico (`router.replace`), messaggi it/en con `messages` espliciti nel
  provider (no warning next-themes).
- ✅ **Fase 3 FATTA**: `Container` (unica fonte di verità larghezza), header sticky
  (logo mobile / nome desktop, nav ancore, lang·tema | CV), menu mobile `Sheet`,
  footer con social a icone, `Section`, logo e icone SVG inline theme-aware,
  `lib/nav.ts`. **`<html>`+tema spostati nel root layout** (fix flash del tema) →
  `/[locale]` ora è dinamico invece che SSG (scelta consapevole).
- 🔜 **Prossima: Fase 4 — Sezioni di contenuto** (Hero, Profilo, Percorso,
  Competenze, Contatti) con copy reale da `site-content.md`.
- Le decisioni e i contenuti sono in questo file + `redesign-goals.md` +
  `site-content.md`; le regole di lavoro in `CLAUDE.md`. Reference visiva in
  `private/` (gitignored).
