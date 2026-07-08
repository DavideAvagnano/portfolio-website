# Davide Avagnano — Portfolio Website

My personal portfolio: profile, career path, skills, and project case studies.
A single-page site built with a modern React/Next.js stack, focused on
performance, accessibility, and SEO.

**Live:** [portfolio-website-blond-phi.vercel.app](https://portfolio-website-blond-phi.vercel.app/)

Editorial, minimal, typography-first design: a monochrome neutral palette, a single
narrow reading column, and no color accent — hierarchy comes from type weight and
whitespace. Light and dark themes, Italian and English.

## Tech stack

| Area          | Stack                                                    |
| ------------- | -------------------------------------------------------- |
| Framework     | Next.js 16 (App Router, RSC, Turbopack), React 19        |
| Language      | TypeScript (strict)                                      |
| Styling       | Tailwind CSS v4 (CSS-first config), tw-animate-css       |
| UI components | shadcn/ui on **Base UI** (`base-nova` style) — not Radix |
| i18n          | next-intl (IT default on `/`, EN on `/en`)               |
| Theming       | next-themes (follows system, dark fallback)              |
| Fonts         | Fraunces (display) + Inter (text), via `next/font`       |
| Forms         | react-hook-form + Zod v4 validation                      |
| Email         | Resend (via Server Actions)                              |
| Icons         | lucide-react + inline SVG (`components/icons.tsx`)       |
| Tooling       | ESLint (flat config), Prettier                           |
| Hosting       | Vercel                                                   |

> **Base UI ≠ Radix:** there is no `asChild`/`Slot`. Use the `render` prop for
> polymorphism. For a _link_ that looks like a button, apply `buttonVariants({…})` to
> an `<a>`/`Link` — not `<Button render={<a/>}>`, which would force `role="button"`
> and break link semantics.

## Project structure

```
src/
  app/
    layout.tsx            # <html>, <body>, ThemeProvider (stable across locale switches)
    [locale]/             # localized routes: page, layout, not-found, opengraph-image
    globals.css           # Tailwind v4 CSS-first config + design tokens (OKLCH)
    sitemap.ts robots.ts
  components/
    sections/             # hero, profile, journey, skills, projects, contact
    ui/                   # shadcn/ui primitives
  i18n/                   # routing, request config, navigation helpers
  actions/                # Server Actions (contact email)
  data/                   # non-translatable data (projects, skills, journey)
  lib/                    # site config, fonts, nav, mail, utils
  schemas/                # Zod schemas
  assets/fonts/           # static TTFs, read at build time by the OG image
  hooks/  proxy.ts  global.d.ts
messages/                 # it.json, en.json — all user-facing copy
public/                   # CV PDFs, static files served by URL
docs/                     # site content, redesign goals & plan
```

Import alias: `@/*` → `src/*`.

**Copy lives in `messages/`, not in components.** `data/` only holds what must _not_
be translated (technology names, stable ids, metrics).

## Getting started

Requisiti: Node `22` (vedi `.nvmrc`).

1. **Clona e installa**

   ```bash
   git clone https://github.com/DavideAvagnano/portfolio-website.git
   cd portfolio-website
   npm install
   ```

2. **Configura le variabili d'ambiente**: copia `.env.example` in `.env` e
   compila i valori.

   ```bash
   cp .env.example .env
   ```

   | Variabile        | Descrizione                                                  |
   | ---------------- | ------------------------------------------------------------ |
   | `RESEND_API_KEY` | Chiave API [Resend](https://resend.com) per il form contatti |
   | `SITE_URL`       | URL di produzione (metadata, sitemap, robots, OG image)      |

3. **Avvia il dev server**

   ```bash
   npm run dev
   ```

   Apri [http://localhost:3000](http://localhost:3000) (IT) o
   [/en](http://localhost:3000/en) (EN).

## Scripts

| Comando             | Azione                                 |
| ------------------- | -------------------------------------- |
| `npm run dev`       | Dev server (Turbopack)                 |
| `npm run build`     | Build di produzione                    |
| `npm run start`     | Avvia la build di produzione           |
| `npm run lint`      | ESLint                                 |
| `npm run typecheck` | Type-check TypeScript (`tsc --noEmit`) |
| `npm run format`    | Formatta il codice con Prettier        |

> `next build` e `next dev` condividono la cartella `.next`: lanciarli insieme corrompe
> la cache di Turbopack. Non lanciare `build` mentre il dev server è attivo.

## Internationalization

`localePrefix: "as-needed"` — l'italiano (default) vive sulla root senza prefisso, l'inglese
su `/en`. Il middleware (`src/proxy.ts`, rinominato da `middleware` in Next 16) gestisce la
detection del browser e il cookie `NEXT_LOCALE`. La SEO è per-locale: `hreflang`, `canonical`,
sitemap con alternates e una **immagine OpenGraph per lingua**.

## Accessibility

Skip link, focus visibile su ogni elemento interattivo, icone decorative marcate
`aria-hidden`, e contrasto **AA verificato** su tutte le coppie testo/sfondo in entrambi
i temi. Nessuna animazione allo scroll; lo smooth-scroll delle ancore rispetta
`prefers-reduced-motion`.

## Deployment

Deploy su Vercel: **push su `main` → deploy in produzione**. Si lavora su `development`.
Ricordati di impostare `RESEND_API_KEY` e `SITE_URL` tra le Environment Variables del
progetto.
