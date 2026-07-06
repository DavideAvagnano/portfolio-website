# Davide Avagnano — Portfolio Website

My personal portfolio: projects, skills, and experience as a software engineer.
A single-page site built with a modern React/Next.js stack, focused on
performance, accessibility, and SEO.

**Live:** [portfolio-website-blond-phi.vercel.app](https://portfolio-website-blond-phi.vercel.app/)

## Tech stack

| Area          | Stack                                              |
| ------------- | -------------------------------------------------- |
| Framework     | Next.js 16 (App Router, Turbopack), React 19       |
| Language      | TypeScript (strict)                                |
| Styling       | Tailwind CSS v4 (CSS-first config), tw-animate-css |
| UI components | shadcn/ui + Radix UI                               |
| Animations    | motion (ex framer-motion)                          |
| Forms         | react-hook-form + Zod v4 validation                |
| Email         | Resend (via Server Actions)                        |
| Icons         | lucide-react, react-icons                          |
| Tooling       | ESLint (flat config), Prettier                     |
| Hosting       | Vercel                                             |

## Project structure

```
src/
  app/          # App Router: layout, page, not-found, sitemap, robots, opengraph-image
  components/   # UI e sezioni (intro, about, skills, projects, contact, footer, navbar)
  actions/      # Server Actions (invio email)
  lib/          # utils, config sito (site.ts), mail
  data/         # dati statici (nav, progetti, skill)
  schemas/      # schemi Zod
  assets/       # immagini importate staticamente
  types/        # tipi condivisi
public/         # asset statici serviti via URL
docs/           # documentazione (migration.md)
```

Import alias: `@/*` → `src/*`.

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

   Apri [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando             | Azione                                 |
| ------------------- | -------------------------------------- |
| `npm run dev`       | Dev server (Turbopack)                 |
| `npm run build`     | Build di produzione                    |
| `npm run start`     | Avvia la build di produzione           |
| `npm run lint`      | ESLint                                 |
| `npm run typecheck` | Type-check TypeScript (`tsc --noEmit`) |
| `npm run format`    | Formatta il codice con Prettier        |

## Deployment

Deploy su Vercel. Ricordati di impostare `RESEND_API_KEY` e `SITE_URL` tra le
Environment Variables del progetto.
