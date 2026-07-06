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

## Fase 1 — Fondamenta del design system (globals.css + shadcn + font + tema)

Obiettivo: base visiva pulita e monocroma, tema light/dark funzionante, font pronto.

- [ ] **Riscrivere `src/app/globals.css`** sul modello `~/repos/baaarber/src/app/globals.css`:
      token shadcn v4 in **OKLCH**, base **neutral monocroma**, `@theme inline`,
      `:root` = light, `.dark` = dark, `@custom-variant dark`. Tenere solo i token utili
      (scartare chart/sidebar se non usati). Rimuovere l'attuale `--animate-blink` (cursore).
- [ ] **Reset shadcn**: aggiornare `components.json` (baseColor neutral); **cancellare**
      gli `ui/` attuali e **ri-aggiungere solo i necessari**: `button`, `dialog` (o
      `drawer`/`sheet` per il modale progetti), `form`, `input`, `textarea`, `label`,
      `dropdown-menu` (per i toggle lingua/tema).
- [ ] **Font** via `next/font` (partiamo con **A: Fraunces + Inter**; predisporre lo
      switch rapido per provare B/C a vista). Aggiornare `layout.tsx`.
- [ ] **next-themes**: installare, `ThemeProvider` (attribute `class`,
      `defaultTheme="system"`, `enableSystem`, fallback dark), gestione no-flash;
      spostare i valori dark da `:root` a `.dark`.
- [ ] Un **theme toggle** minimale (icona lucide) di prova.
- [ ] Verifica: `typecheck` + `lint` + `build` verdi; light/dark switchano puliti.

> ⚠️ Rischio: la ricostruzione shadcn tocca tutti i componenti che importano da
> `@/components/ui`. Le sezioni vecchie verranno comunque riscritte (Fasi 3-5), ma
> tenere il build verde a ogni step (eventuale stub temporaneo).

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

- [ ] Rimuovere asset morti: foto `src/assets/*` (se non più usate) → eliminare la
      cartella. Vecchi `data/*` non usati. Icone/deps non più necessarie (valutare
      `react-icons` se sostituito da `lucide`).
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

## Dipendenze / cose da Davide (già soddisfatte salvo font)

- [x] PDF CV IT/EN in `public/`.
- [x] Anno inizio software (~2023) confermato.
- [x] Side projects scelti (Authentication App, Dashboard Management).
- [ ] **Font**: scelta finale a vista (proviamo A/B/C durante Fase 1).
- [ ] (Opzionale) screenshot Baaarber **solo con permesso cliente** (parte public).
