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

Dopo ogni modifica non banale, questi devono essere **verdi** — sono sicuri da
lanciare mentre Davide ha il dev server attivo:

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # eslint (flat config)
npm run format      # prettier (prima del commit)
```

- **`npm run build` SOLO prima del merge in `main`**, e **solo se il dev di Davide
  è fermo** (concordarlo). `next build` e `next dev` condividono la cartella `.next`:
  lanciarli insieme corrompe la cache di Turbopack e fa crashare il dev (500,
  `ENOENT routes-manifest.json`, `Persisting/Compaction failed`). Durante lo
  sviluppo NON lanciare build. Vedi memoria `no-build-during-user-dev`.
- Gli **smoke test** dei check visivi/runtime li fa **Davide** sul suo `npm run dev`
  (porta 3000). Se mi serve verificare il runtime, glielo chiedo o gli chiedo di
  fermare il dev — non avvio `next start`/`next build` in parallelo.
- Riporta i risultati onestamente: se qualcosa fallisce, dillo con l'output.

## 3. Stack & convenzioni

- **Next.js 16** (App Router/RSC, Turbopack), **React 19**, **TypeScript strict**.
- **Tailwind CSS v4** — config **CSS-first** in `src/app/globals.css`
  (`@theme`, `@custom-variant dark`). **Non** esiste `tailwind.config.ts`.
- **shadcn/ui** su **Base UI** (`@base-ui/react`) — stile `base-nova`, base color
  `zinc`. **Non** Radix (`asChild`/`Slot` non esistono → per il polimorfismo si usa
  il prop **`render`**, es. `<Button render={<Link .../>}>`). `globals.css` importa
  `shadcn/tailwind.css`.
- **motion** (non framer-motion), **react-hook-form** + **Zod v4**, **Resend**,
  **next-themes** (tema), **next-intl** (i18n, in arrivo).
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
