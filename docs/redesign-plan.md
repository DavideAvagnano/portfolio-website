# Piano di refactor UI/UX & contenuti — a fasi

> Piano operativo per eseguire il redesign definito in
> [`redesign-goals.md`](redesign-goals.md), con i contenuti da
> [`site-content.md`](site-content.md). Stessa filosofia della **migrazione tecnica
> già conclusa** (Next 16 / React 19 / Tailwind v4 — vedi git history): **fasi
> atomiche, un commit per fase, dopo ogni fase `typecheck` + `lint` + `format`
> verdi** prima di procedere. _(`build` solo prima del merge in `main`, col dev
> fermo — vedi `CLAUDE.md` §2.)_
>
> Branch: `development`. **Non si committa finché Davide non dà l'ok.**

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
  `−radix-ui`. Base color **zinc** _(→ migrato a **neutral** in Fase 7)_, stile **base-nova**.
- `globals.css`, `components.json` e `ui/button.tsx` allineati al preset (valori zinc
  all'epoca, oggi neutral; set token completo, scala radius). Font nostri: **Fraunces**
  (`--font-heading`) +
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

## Fase 4 — Sezioni di contenuto (Hero, Profilo, Percorso, Competenze, Contatti) ✅ FATTA

Obiettivo: costruire le sezioni testuali nello stile nuovo, con copy da messages.

Ogni sezione è un componente in **`components/sections/`** e ricava da sé il proprio
indice editoriale (`sectionIndex(id)` in `lib/nav.ts`, che legge la posizione in
`NAV_ITEMS`): l'ordine della pagina è l'unica fonte di verità della numerazione.

- [x] **Hero** (`sections/hero.tsx`): eyebrow, saluto tipografico, ruolo, riga di
      posizionamento, social + luogo. **Niente foto, niente cursore, niente CTA a
      bottone** (la CTA del sito sono il CV nell'header e la sezione Contatti).
- [x] **Profilo** (`sections/profile.tsx`): "lead" in font display + 4 paragrafi
      (transizione aerospaziale → autodidatta dal 2023 → freelance da feb 2025 →
      baricentro backend → eredità del metodo ingegneristico). Nessun tono junior,
      nessun "in cerca di lavoro".
- [x] **Percorso** (`sections/journey.tsx`): `<ol>` timeline a 2 colonne
      (periodo · tappa) separata da filetti. Tappe in **`data/journey.ts`** (soli id
      stabili), copy nel namespace `journey`. _(Grafico "crescita": omesso.)_
- [x] **Competenze** (`sections/skills.tsx`): `<dl>` a 2 colonne (etichetta sx /
      tech dx). I **nomi delle tecnologie non si traducono** → vivono in
      **`data/skills.ts`**; nei messaggi c'è solo l'**etichetta di categoria**.
      La riga "Pattern" è invece prosa → sta nei messaggi (`skills.patternsList`).
- [x] **Contatti** (`sections/contact.tsx` + `contact-form.tsx`): blocco CTA
      "Lavoriamo insieme" + email per esteso (link con `buttonVariants({variant:"link"})`) + form Resend minimale su primitive shadcn (`Field`/`FieldLabel`/`FieldError`).
      Esito dell'invio via **toast** (`sonner`, `<Toaster/>` montato nel root layout
      dentro `ThemeProvider`, così segue il tema). Il blocco CTA è un server component,
      solo il form è `"use client"` (bundle client minimo).
- [x] Copy IT + EN in `messages/` (namespace `profile`, `journey`, `skills`,
      `contact`; `sections` ridotto al solo placeholder `projects`).
- [x] Verifica: `typecheck` + `lint` + `format` verdi; smoke curl `/` e `/en` → 200
      con contenuti e `<html lang>` corretti per lingua; parità chiavi it/en.

**Form contatti — scelte non ovvie:**

- `schemas/index.ts` espone una **factory** `createContactSchema(messages)`: i testi
  d'errore sono tradotti, quindi il client costruisce lo schema con `useTranslations`.
  Il server ri-valida con lo schema "neutro" e risponde con un **codice** d'errore
  (`invalid` | `send`), non con un testo: la locale del form non è nota all'action.
- `useWatch({control, name})` e **non** `form.watch()` per il contatore di caratteri:
  `watch()` restituisce una funzione che il React Compiler non sa memoizzare → farebbe
  **saltare la compilazione** dell'intero componente (warning `react-hooks/incompatible-library`).
- A11y: `data-invalid` su `Field` + `aria-invalid` sull'input; `FieldError` rende già
  un `role="alert"` (l'errore viene annunciato appena compare). L'esito dell'invio è un
  toast, non un messaggio inline.
- `lib/mail.ts`: **escaping HTML** del contenuto del form (prima veniva interpolato
  grezzo nell'HTML della mail) e `replyTo` sul mittente reale.

---

## Fase 5 — Progetti / case study (card + modale) ✅ FATTA

Obiettivo: il pezzo forte, senza svendere i case study.

- [x] **Modello dati** `data/projects.ts`: solo ciò che **non si traduce** — `id`
      (union, non `string`: rende type-safe le chiavi `projects.items.<id>.*`),
      `stack[]`, `metrics[]` (`{key, value, approx?}`), `repo` (solo side project).
      Titolo, tagline, contesto, punti chiave e ruolo sono copy tradotto.
- [x] **Card essenziali** raggruppate **per tipo**, niente filtri/tab (con sei voci
      non servono, e sarebbero contro il minimalismo). Ordine **per impatto**:
      Baaarber → Hypefill → Scalability → ixily → fy-log-manager → side.
      _(Rifatte dopo la Fase 7: la lista a piena larghezza risultava un muro di testo.
      Ora **griglia a 2 colonne** (1 su mobile) di card con filetto e superficie, con
      **anteprima dello stack** — prime 3 tech + "+N" — e la freccia in alto a destra.
      Il gruppo con una sola voce prende l'intera riga (`sm:col-span-2`), invece di
      lasciare mezza riga vuota. `ProjectCardBody` è condiviso tra i case study
      (`<button>` che apre il drawer) e i side project (`<a>` verso GitHub): stesso
      aspetto, semantica diversa. ⚠️ Solo `<span>` là dentro: il contenuto di un
      `<button>` dev'essere **phrasing content**.)_
- [x] **Drawer di dettaglio** (`components/project-card.tsx`, Base UI `Drawer`):
      contesto → stack → punti chiave → scala del sistema → ruolo, più la nota
      "progetto cliente: codice e ambienti non sono pubblici". Entra **da destra su
      desktop, dal basso su mobile** (`swipeDirection` + `showSwipeHandle` guidati da
      `useIsMobile()`): il gesto di chiusura combacia con il lato di ingresso.
- [x] **Side projects** (Authentication App, Dashboard Management) con link GitHub,
      **senza** modale: la profondità sta nel repository.
- [x] i18n dei contenuti progetti (namespace `projects`; `sections` rimosso perché
      non serviva più). Numeri formattati per locale con `useFormatter().number()`.
- [x] Verifica: `typecheck` + `lint` + `format` verdi; smoke curl `/` e `/en`.

**Cautele di framing applicate** (`site-content.md` §10):

- Nessun link pubblico per i progetti cliente, **Baaarber incluso**.
- Scalability: solo livello architetturale — niente IP/token, niente rotazione proxy
  o sniffing via monkeypatch.
- ixily: ruolo esplicito ("ho contribuito, non ne rivendico l'authorship"). Le LOC
  restano perché il blocco si chiama "scala del sistema" e il ruolo è dichiarato: il
  numero misura il sistema, non la produzione personale.
- L'etichetta delle metriche è **"Scala del sistema"**, non "risultati": i numeri
  descrivono il sistema, non la produzione personale. Se quell'etichetta cambia,
  vanno rivalutate le LOC di ixily e Scalability.

**Scelte non ovvie:**

- Il titolo della card è uno `<span>`, non un `<h3>`: un heading dentro `<button>` è
  HTML non valido (il bottone ammette solo contenuto di frase).
- Il pannello laterale di serie è largo **24rem**: troppo stretto per un case study.
  Lo allarghiamo a 38rem con `md:data-[swipe-axis=x]:[--drawer-content-width:38rem]`.
  Funziona **senza `!important`**: stessa specificità della regola di base
  (`data-[swipe-axis=x]:sm:…`), ma Tailwind emette il blocco `md` dopo quello `sm`
  (verificato nel CSS generato). Sotto `md` l'asse è verticale → la regola non tocca
  il drawer mobile.
- I punti chiave sono **array** nei messaggi (lunghezza variabile per progetto) →
  letti con `t.raw()`, che con i messaggi tipizzati resta type-safe.

⚠️ **Nota SEO → risolta in Fase 6** con `keepMounted` (con una correzione importante
sulla premessa: vedi la nota nella Fase 6).

---

## Fase 6 — Responsive, a11y, SEO _(niente motion: vedi sotto)_

- [x] **Motion allo scroll: SCARTATO.** Era stato implementato (`components/reveal.tsx`,
      entrate in dissolvenza con `motion`), poi **rimosso per scelta di Davide**: il sito
      resta statico alla lettura, coerente col minimalismo editoriale. Restano solo le
      transizioni di **hover** (`transition-colors`), quelle dei componenti Base UI
      (drawer, sheet) e lo **smooth-scroll** delle ancore — già in `globals.css` e già
      disattivato sotto `prefers-reduced-motion`. La dipendenza `motion` non ha più
      alcun import: **va rimossa nel prune di Fase 7**.
- [x] **A11y**: skip link (`nav.skipToContent`) come primo elemento focusabile →
      `<main id="main" tabIndex={-1}>`; icone decorative `aria-hidden` (toggle tema,
      menu, CV, freccia della card); indici editoriali (`01`, `02`…) `aria-hidden`
      (lo screen reader leggeva "01 Profilo"); numerini del menu mobile riportati a
      colore pieno (a `/60` erano sotto 3:1).
      _(Era stata aggiunta anche una regola `:focus-visible` in `globals.css`, poi
      **rimossa da Davide** (`dc3a3bb`): gli elementi senza ring dedicato ricadono
      sull'indicatore nativo del browser, che soddisfa già WCAG 2.4.7. La regola dava
      coerenza cromatica col tema monocromo, non conformità.)_
- [x] **Contrasto AA verificato numericamente** (non a occhio): tutte le coppie
      testo/sfondo dei token sono ≥ 4.5:1 in **entrambi** i temi.
      ⚠️ **Eccezione nota, accettata da Davide** (vedi la nota "Palette neutral" più
      in basso): il `--ring` in **light** è neutral-400 → **2.59:1**, sotto il minimo
      3:1 di WCAG 2.4.11 per l'indicatore di focus. È il valore del preset neutral e
      **si tiene com'è**, per fedeltà al preset. _(Storia: sotto zinc era stato
      abbassato a zinc-500 per conformità; il passaggio a neutral ha riportato il
      valore di preset e si è scelto di lasciarlo.)_
- [x] **SEO**: metadata/hreflang/canonical/sitemap/robots per-locale verificati sul dev
      (`/` IT, `/en`, `/it` → 307, 404 localizzato). **`opengraph-image` rifatta** nello
      stile editoriale monocromo e spostata sotto `[locale]/` → una per lingua, copy da
      `metadata.ogTagline`. Le due PNG 1200×630 sono state generate e **ispezionate**.
- [ ] **Responsive**: pass mobile completo → **smoke visivo di Davide** (serve browser).
- [ ] Verifica Lighthouse (perf/SEO/a11y) su `/` e `/en` → **Davide** (serve browser).

**`keepMounted` sui case study — premessa iniziale sbagliata, decisione confermata:**

Si era detto che `keepMounted` avrebbe messo il testo dei case study **nell'HTML
iniziale**. **Non è vero**, ed è stato verificato: zero `data-slot="drawer-popup"` nel
markup SSR. `createPortal` non ha rappresentazione server-side — `FloatingPortal` crea
il container in un layout effect, quindi in SSR il subtree è `null`, con o senza
`keepMounted`.

Cosa fa davvero `keepMounted`: il pannello entra nel DOM **all'idratazione** invece che
al click, con `hidden` da chiuso (fuori dal tab order, non annunciato). Quindi:

- **Googlebot lo indicizza** (esegue JS e renderizza) — prima non l'avrebbe visto mai.
  Essendo `hidden`, lo pesa meno del contenuto visibile.
- I bot che **non** eseguono JS (anteprime social, alcuni crawler) continuano a non
  vederlo. È il tetto raggiungibile finché il dettaglio vive in un drawer.

Confermato: il costo è nullo e il guadagno reale. Se un giorno i case study dovessero
essere indicizzabili anche senza JS, servirebbe portarli fuori dal portal (pagine
dedicate o `<details>`), non un'altra prop.

**Altre note:**

- **`proxy.ts`, matcher aggiornato**: l'OG image ora vive sotto `[locale]/`, quindi il
  suo path è `/it/opengraph-image` (verificato: è l'URL che Next mette in `og:image`).
  Il vecchio lookahead escludeva solo `/opengraph-image` in root → il middleware
  l'avrebbe trattata come pagina, redirezionando `/it/*` → `/*` e servendo un 404.
  Ora esclude `.*opengraph-image`. Redirect delle pagine ri-verificati, intatti.
- **Font dell'OG**: satori non legge woff2 né i variable font, e `next/font` vive nel
  browser → servono **TTF statici** su disco, letti con `readFile`. In
  `src/assets/fonts/` (Fraunces 600, Inter 400). Sono asset di **build**: non finiscono
  nel bundle client. Verificata la copertura dei glifi (incluso `·`).
- **Perché niente entrate allo scroll** (per non riproporle in futuro): con `motion` le
  sezioni partono da `opacity: 0` inline, quindi senza JS resterebbero **invisibili** —
  serviva un fallback CSS (`prefers-reduced-motion` + `<noscript>`) per non nascondere
  il contenuto. Complessità che, tolto l'effetto, sparisce del tutto. Se un giorno le si
  rivuole: **non** usare `useReducedMotion()` per il fallback (darebbe un DOM diverso tra
  server e client → hydration mismatch); neutralizzare con CSS `!important`, che batte
  lo stile inline di motion.
- **Transizione di tema**: resta `disableTransitionOnChange` (scelta di Fase 1). Una
  transizione morbida sui colori richiederebbe di toglierlo, riaprendo gli artefatti di
  ripitturazione che quella prop esiste per evitare. Il cambio resta istantaneo.

---

## Fase 7 — Pulizia & chiusura

- [x] **Palette: da zinc a neutral** _(scelta di Davide)_. In `globals.css` i token
      sono passati al preset **neutral** di shadcn (chroma e hue azzerati: `0.145 0 0`
      invece di `0.141 0.005 285.823`) → grigio puro, senza la sfumatura blu-viola di
      zinc. Coerente con la palette monocroma dei goals. Ricadute gestite:
      **(a)** l'immagine OG usa hex hardcoded (satori non legge `oklch()`) → aggiornati
      da valori zinc a neutral (`#0a0a0a`, `#a1a1a1`, `#262626`, `#525252`);
      **(b)** il `--ring` light: vedi l'eccezione WCAG accettata, sotto.
      ⚠️ **`--ring` light = neutral-400 (2.59:1), sotto il minimo 3:1 di WCAG 2.4.11.**
      È il valore del preset e **si tiene com'è**, per fedeltà al preset (deciso da
      Davide). Nel dark il preset usa già neutral-500 (0.556, conforme). Se in futuro
      si vuole la conformità anche in light, portare **solo** `--ring` di `:root` a
      `oklch(0.556 0 0)` → 4.18:1. **Non è un bug da "correggere" senza chiedere.**
- [x] ~~**Prune componenti shadcn**~~ → **ANNULLATO, per scelta di Davide.** La suite
      completa (~60 componenti in `components/ui/`) **resta**, e con essa le sue
      dipendenze (`recharts`, `embla-carousel-react`, `react-day-picker`, `cmdk`,
      `react-resizable-panels`, `input-otp`, `date-fns`, `@shadcn/react`, `sonner`).
      Motivo: averla a disposizione per il futuro. _(Nessun costo a runtime: i
      componenti non usati sono tree-shaken e non finiscono nel bundle; è solo peso in
      `node_modules`.)_ ⚠️ **Se un giorno si volesse ridurla:** `date-fns` arriva già
      come dependency di `react-day-picker`, non serve come dep diretta.
- [x] **Rimosse le deps morte**: `motion` (dopo lo scarto delle entrate allo scroll in
      Fase 6, zero import) e `react-icons` (la usava solo `skills-data`, ora eliminato).
      Nessuna delle due serviva a un componente `ui/` — verificato. _(`tw-animate-css`
      **resta**: lo importa `globals.css`.)_
- [x] **Rimossi asset/data morti**: le foto `src/assets/*.png` (foto tolta dal design);
      `data/navbar-data.ts`, `data/projects-data.ts`, `data/skills-data.ts` e
      `types/types.ts` (esisteva solo per derivare tipi dai due file dead → cartella
      `src/types/` eliminata). ⚠️ **`src/assets/` resta**: ospita i TTF dell'immagine OG
      (`fonts/fraunces-600.ttf`, `fonts/inter-400.ttf`), letti a build-time.
- [x] Verificato con un'analisi degli import (non a grep): dopo le rimozioni **non
      restano file orfani** fuori dagli entrypoint di Next.
- [x] `typecheck` + `lint` + `format` verdi. **`npm run build` verde** (col dev fermo) +
      smoke sulla build reale (`next start`): `/` e `/en` 200, `/it` → 307, 404
      localizzato, redirect per `Accept-Language`, `robots.txt`/`sitemap.xml`, `<html lang>`
      corretto, **entrambe le OG servite come PNG** (sono `●` SSG: i TTF vengono letti a
      build-time e Next li traccia). Nessun errore a runtime.
      _(Il form contatti non è stato testato end-to-end: invierebbe una mail vera.)_
- [x] `README.md` riscritto: era fermo a **Radix** (siamo su Base UI), `motion` e
      `react-icons`, e a una struttura di cartelle che non esiste più. Aggiunte le
      sezioni i18n, tema, a11y e la convenzione `buttonVariants` vs `render`.
- [x] `site-content.md`: corretta la nota implementativa che diceva "il sito usa
      `react-icons/si`" — le competenze sono liste di testo, senza icone.
- [ ] Merge `development` → `main` (a cura di Davide) → **deploy in produzione**.

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
  zinc → poi neutral in Fase 7), suite shadcn completa, tema light/dark, font A, shell
  minimale, pulizia vecchie sezioni.
- ✅ **Fase 2 FATTA e committata**: i18n next-intl, route `[locale]`,
  `localePrefix: "as-needed"` (IT su root, EN su `/en`), detection browser attiva,
  middleware in `src/proxy.ts`, SEO per-locale (hreflang/canonical/sitemap), language
  switcher canonico (`router.replace`), messaggi it/en con `messages` espliciti nel
  provider (no warning next-themes).
- ✅ **Fase 3 FATTA e committata** (`6b9a571`): `Container` (unica fonte di verità
  larghezza), header sticky (logo mobile / nome desktop, nav ancore, lang·tema | CV),
  menu mobile `Sheet`, footer con social a icone, `Section`, logo e icone SVG inline
  theme-aware, `lib/nav.ts`. **`<html>`+tema spostati nel root layout** (fix flash del
  tema) → `/[locale]` ora è dinamico invece che SSG (scelta consapevole).
- ✅ **Fase 4 FATTA**: sezioni in `components/sections/` (Hero, Profilo, Percorso,
  Competenze, Contatti) con copy reale IT/EN da `site-content.md`; `data/journey.ts` +
  `data/skills.ts` (id/tech non traducibili); form contatti con schema-factory i18n,
  server action a codici d'errore, escaping HTML e `replyTo` nella mail.
- ✅ **Fase 5 FATTA**: `data/projects.ts` (id/stack/metriche), card raggruppate per
  tipo + modale di dettaglio (`components/project-card.tsx`), side project con link
  GitHub, copy IT/EN nel namespace `projects`. Cautele di framing applicate (no link
  cliente, no LOC su ixily, "scala del sistema" invece di "risultati").
- ✅ **Fase 6 FATTA** (salvo smoke visivo): pass a11y (skip link, icone e indici
  `aria-hidden`), **contrasto AA verificato numericamente** (le coppie testo/sfondo
  sono conformi; il `--ring` light resta sotto soglia per fedeltà al preset neutral —
  scelta consapevole), `keepMounted` sui case study,
  `opengraph-image` rifatta **per lingua** sotto `[locale]/` (+ matcher di `proxy.ts`
  aggiornato, TTF in `src/assets/fonts/`). **Le entrate allo scroll sono state
  implementate e poi scartate**: niente motion, il sito resta statico alla lettura.
- ✅ **Fase 6 smoke visivi**: fatti da Davide, tutto funziona.
- ✅ **Fase 7 FATTA**: rimossi data/types/foto morti e le deps `motion` + `react-icons`;
  `README.md` riscritto; `site-content.md` corretto. **Il prune della suite shadcn è
  stato annullato per scelta di Davide**: `components/ui/` resta completa, con le sue
  dipendenze.
- 🔜 **Rimane solo il merge `development` → `main`** (lo fa Davide: è il deploy in
  produzione).
- Le decisioni e i contenuti sono in questo file + `redesign-goals.md` +
  `site-content.md`; le regole di lavoro in `CLAUDE.md`. Reference visiva in
  `private/` (gitignored).
