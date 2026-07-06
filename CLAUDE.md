# CLAUDE.md

Istruzioni per lavorare su questo repository. Leggere prima di iniziare.

**Cos'è:** portfolio/CV personale di Davide Avagnano. Sito one-page, Next.js.
Obiettivo del sito: presentarsi come **CV** a recruiter/clienti.

---

## 1. Git & commit — REGOLA PRINCIPALE

- **NON fare `git commit` né `git push` senza l'ok esplicito di Davide.**
  A fine task, **proponi** il commit (con il messaggio già pronto) e **aspetta** il
  via ("vai" / "committa"). Solo allora committi.
- Si lavora sul branch **`development`**, mai direttamente su `main`.
- **Un commit per fase/step logico** (atomico e ripristinabile), non maxi-commit (a meno che
  non sia Davide a chiederlo).
- Messaggi in **italiano**, stile conventional: `feat:`, `fix:`, `refactor:`,
  `chore:`, `docs:`.
- Il merge `development → main` lo decide/fa Davide (push su `main` = deploy in
  produzione, vedi §6).

## 2. Prima di dire "fatto" (verifica)

Dopo ogni modifica non banale, questi devono essere **verdi**:

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # eslint (flat config)
npm run build       # next build
npm run format      # prettier (prima del commit)
```

- Per cambi con superficie a runtime, fai anche uno **smoke test** reale
  (`npm run dev`, verifica le pagine/flussi toccati), non solo il build.
- Riporta i risultati onestamente: se qualcosa fallisce, dillo con l'output.

## 3. Stack & convenzioni

- **Next.js 16** (App Router/RSC, Turbopack), **React 19**, **TypeScript strict**.
- **Tailwind CSS v4** — config **CSS-first** in `src/app/globals.css`
  (`@theme`, `@custom-variant dark`). **Non** esiste `tailwind.config.ts`.
- **shadcn/ui** + **radix-ui** (pacchetto unificato: `Slot` → `Slot.Root`),
  **motion** (non framer-motion), **react-hook-form** + **Zod v4**, **Resend**.
- Struttura **`src/`**; alias **`@/* → ./src/*`**. Asset importati staticamente in
  `src/assets`, non in `public/`.
- **Niente `any`**: la regola ESLint `no-explicit-any` **blocca il build**.
- Prettier: **no punto e virgola**, doppie virgolette, `printWidth: 80`. Il plugin
  Tailwind usa `tailwindStylesheet` (v4) — non `tailwindConfig`.
- Preferisci i tool dedicati (Read/Edit/Grep) alle shell `cat/sed`.

## 4. Documentazione — fonte di verità

I documenti in `docs/` sono il riferimento; **aggiornali** quando cambiano decisioni:

- **`docs/site-content.md`** — contenuti del sito (chi è Davide, progetti, skill).
  Fonte: `~/cv-system`.
- **`docs/redesign-goals.md`** — obiettivi e direzione di design del redesign.
- **`docs/redesign-plan.md`** — piano di refactor a fasi (in corso).

## 5. Contenuti & framing (il sito è un CV — regole di onestà)

Leggere **`docs/site-content.md` §10** prima di scrivere copy pubblico. In breve:

- **Niente si inventa** fuori dai contenuti verificati.
- Status **freelance / a consulenza**; mai "dipendente", mai "in cerca di lavoro".
- **Attribuzione onesta**: Baaarber = costruito in autonomia; ecosistemi di
  performance marketing (ixily/Scalability/Hypefill) = "ho contribuito a" (ixily è
  a più mani → no authorship). **Fyonda** = intermediario, non datore di lavoro.
- **Progetti cliente**: niente link a repo/demo/produzione (es. Baaarber). No
  dettagli sensibili o tecniche controverse dai report.
- **Percorso software**: presentato da ~2023 (autodidatta → frontend → full-stack),
  professionale da feb 2025. Non dichiarare impieghi retribuiti anteriori al 2025.
- Il **bagnino** resta fuori dalla narrazione tech del sito.

## 6. Segreti, ambiente & deploy

- **Mai committare segreti.** `.env`, `credentials.json` sono gitignored;
  `.env.example` è il template tracciato.
- Env necessarie: `RESEND_API_KEY` (form contatti), `SITE_URL` (usata da
  metadata/sitemap/robots/OG — la SEO è **env-driven**).
- Deploy su **Vercel**, collegato al repo: **push su `main` → deploy in produzione
  automatico** (nessuna GitHub Action necessaria). Le env vanno impostate su Vercel.

## 7. Comunicazione

- Rispondi in **italiano** (Davide scrive in italiano).
- Quando una scelta è tua da fare in autonomia, decidi e vai; quando serve una
  decisione di Davide (irreversibile, di prodotto, o di gusto), **chiedi** invece di
  indovinare.
