# Obiettivi del redesign — portfolio-website

> Documento di **obiettivi e scope** per la riprogettazione completa del sito
> (contenuti + UI/UX + funzionalità). Non è ancora un piano implementativo:
> definisce _cosa_ vogliamo ottenere e _perché_, così da avere un riferimento
> condiviso prima di scrivere codice. Il _come_ (piano a fasi) verrà dopo.
>
> Correlato: [`site-content.md`](site-content.md) (contenuti). Lo stack è già stato
> modernizzato (Next 16, React 19, Tailwind v4) in una **migrazione conclusa** —
> traccia in git history, non più in un file dedicato.

---

## 1. Punto di partenza (stato attuale)

Sito one-page, **solo tema dark** (navy `hsl(216 65% 11%)` + accent menta
`hsl(166 100% 70%)`), estetica "developer" (logo `<DA />`, heading con slash
`/about me`, cursore lampeggiante). Sezioni:

- **Navbar** — logo, nav (Home/About/Skills/Projects/Contact), icone social,
  bottone Resume.
- **Hero** — "hi, Davide here." + tagline + CTA "View my projects!".
- **About** — testo + foto ritagliata; tech evidenziate in accent.
- **Skills** — tab verticali (Languages/Frontend/Backend/Database/Versioning) +
  griglia icone.
- **Projects** — tab (All/Full-stack/Frontend) + card (icona, GitHub, titolo,
  descrizione, tag).
- **Contact** — form (Name/Email/Message) + Send (Resend).
- **Footer** — "Copyright © 2024".

**Limiti attuali:**

- Contenuti **obsoleti** (progetti-esercizio, skills sottodimensionate, about
  generico con "currently seeking a role" — da evitare, vedi framing in `site-content.md`).
- **Solo dark**, nessuna scelta lingua, footer datato (2024).
- Estetica funzionale ma poco distintiva/"vecchia".

---

## 2. Obiettivi principali (macro)

1. **Contenuti allineati alla realtà professionale** — dai progetti-esercizio ai
   case study reali (Baaarber, ecosistemi performance marketing, Hypefill,
   log-manager); skills e about aggiornati. Fonte: `site-content.md`.
2. **Restyle completo dell'UI** — colori, tipografia, forme, spaziatura, motion:
   un'identità visiva moderna e distintiva (direzione da definire sulla reference
   che fornirà Davide).
3. **UX migliore** — gerarchia dei contenuti, leggibilità, scannability,
   presentazione dei progetti come case study (non semplici card con repo).
4. **Internazionalizzazione (i18n)** — selettore lingua, con **next-intl**.
5. **Theming light/dark** — toggle tema utente, con palette pensate per entrambi.
6. **Qualità mantenuta** — accessibilità, performance, SEO (già impostate durante
   la migrazione: metadata/OG/sitemap/robots) non devono regredire.

---

## 3. Contenuti

Riferimento unico: [`site-content.md`](site-content.md). In sintesi il redesign dei
contenuti deve:

- **Hero** → posizionamento aggiornato (fullstack backend-heavy; l'angolo
  "contribuito a sistemi complessi + costruito un SaaS da solo").
- **About** → narrativa transizione aerospaziale→software + rapida crescita;
  **rimuovere** "currently seeking a role" e il tono da junior.
- **Skills** → stack reale completo (tRPC, Drizzle, Redis, BullMQ, Elasticsearch,
  AI/OpenAI, Docker, Nginx, PM2, integrazioni…), categorizzato.
- **Projects** → **case study professionali** (niente repo/demo pubbliche);
  attribuzione onesta del ruolo. **Deciso:** i vecchi progetti-esercizio si
  riducono ai **migliori 1-2** in una sezione minore "side / learning projects"
  (col link GitHub), dopo i case study.
- **Footer** → anno dinamico, contatti.

> Le decisioni ancora aperte sui contenuti sono elencate in fondo a
> `site-content.md` (anni bagnino, demo Baaarber, sorte dei vecchi progetti,
> livello di attribuzione).

---

## 4. Information Architecture & UX

Obiettivi UX (indipendenti dallo stile visivo):

- **Racconto per un recruiter/cliente in <30s**: chi sono, cosa so fare, prova
  (case study), come contattarmi.
- **Mobile-first**: l'esperienza mobile deve essere di pari livello.

**Struttura a sezioni (one-page, ispirata alla reference — mappata sui contenuti):**

1. **Hero** — saluto + ruolo + posizionamento + social.
2. **Profilo** _(≈ About)_ — narrativa transizione + baricentro backend/architettura.
3. **Percorso** _(nuovo, ≈ Esperienza/Timeline)_ — timeline verticale della carriera
   (formazione aerospaziale → transizione autodidatta → freelance dal 2025). Gancio
   forte per un CV. _(Nuova sezione: risolve la domanda "aggiungere timeline?".)_
4. **Competenze** _(≈ Skills)_ — liste di testo categorizzate.
5. **Progetti** _(≈ case study)_ — lista/card essenziali + **modale di dettaglio**
   (problema → stack → highlights → metriche → ruolo). One-page. Sezione minore
   "side projects" (1-2) in coda.
6. **Contatti** — CTA "Lavoriamo insieme" + form Resend minimale.
7. **Footer** — anno dinamico, contatti.

**Raggruppamento progetti — raccomandazione (delegata a Claude):** **per tipo** con
etichette di gruppo sobrie, **niente filtri/tab interattivi** (contro il
minimalismo). Ordine per impatto: (1) **Prodotti SaaS** → Baaarber _(flagship,
primo in assoluto)_, Hypefill; (2) **Data & Performance Marketing** → Scalability,
ixily; (3) **Infra & Security** → fy-log-manager; (4) **Side projects** → 1-2
progetti personali. Motivo: la timeline è corta (~1,5 anni) → il cronologico
appiattirebbe tutto sul 2025; il raggruppamento per tipo **mostra l'ampiezza**
(SaaS + data/marketing + infra/security) ed è più leggibile.

---

## 5. Sistema di design / UI

**Direzione:** **editoriale minimale, tipografica, light-first.** Ispirata alla
reference (screenshot in `private/` , gitignored): un "CV ben tipografato reso web". Priorità
assolute: **pulizia, semplicità, leggibilità, spazio bianco.** Si abbandona
l'estetica "developer" attuale (niente `<DA/>`, slash nei titoli, cursore, menta neon).

### Principi

- **Colonna unica, stretta e centrata** (indicativamente `max-w-2xl/3xl`), tanto
  respiro verticale. Niente griglie complesse, tab o segmented control.
- **Tipografia protagonista**: nome/hero grande e bold, corpo sobrio, **etichette
  di sezione piccole** (Profilo, Percorso, Competenze…) con **filetti sottili** di
  separazione.
- **Contenuto scrollabile in verticale** (one-page), sezioni ben spaziate.

### Palette

- **Monocroma** _(deciso)_: scala di neutri (base `neutral`/`zinc`), **niente
  accento colore**. Contrasto e gerarchia dati da peso tipografico e spazio, non dal
  colore. Light: bianco/off-white + testo quasi-nero + grigi per meta/filetti.
- **Dark derivato**: contraltare scuro neutro (non "navy neon"), accessibile (AA).

### Ripartenza pulita di shadcn/ui _(deciso)_

Invece di adattare i componenti esistenti, **si riparte da zero**:

- **Riscrivere `globals.css`** sul modello di
  `~/repos/baaarber/src/app/globals.css` (token shadcn v4 in **OKLCH**,
  `@theme inline`, `:root` = light, `.dark` = dark, `@custom-variant dark`), tenendo
  **solo ciò che serve** (base monocroma neutra; scartare token inutili tipo chart/
  sidebar se non usati).
- **Reinizializzare shadcn** con base color **neutral** e **riscaricare solo i
  componenti necessari** (es. button, dialog/drawer per il modale progetti, form,
  input, textarea, label, dropdown per i toggle) — **cancellando** i componenti `ui/`
  attuali per partire puliti.
- Coerenza con la nostra base già Tailwind v4.

### Tipografia

Via Poppins. Coppia **display** (nome/heading, con carattere) + **testo** molto
leggibile, self-hosted via `next/font`. Proposte (da scegliere a vista):

- **A — Editoriale/serif _(raccomandata)_:** display **Fraunces** (serif moderno,
  caldo, "da CV") + testo **Inter**. Sofisticata, coerente con lo stile della reference.
- **B — All-sans moderna:** **Geist** (o **Instrument Sans**) per display + testo.
  Ultra pulita, neutra, tech-ma-sobria.
- **C — Grotesque:** display **Space Grotesk** + testo **Inter**. Carattere
  contemporaneo, leggermente più "techie".

Scala tipografica ampia, gerarchia netta (hero grande, etichette sezione piccole).

### Forme, spaziatura, motion

- **Forme sobrie**: radius contenuti, bordi/filetti sottili, **poche o zero ombre**,
  superfici piatte. Densità bassa, ritmo verticale generoso.
- **Motion discreto**: entrate leggere allo scroll, hover misurati, transizione
  fluida di **tema** e **lingua**. Stack: `motion` + `tw-animate-css` (già presenti).
  Niente effetti appariscenti.

### Componenti chiave

- **Header**: nome/logo tipografico + nav testuale semplice (Profilo · Percorso ·
  Competenze · Progetti · Contatti) + **language switch** (IT · EN) + **theme toggle**
  - **bottone CV**.
- **Bottone CV** _(deciso)_: **niente modale di scelta lingua** → scarica
  direttamente il PDF **nella lingua corrente** del sito. ✅ **PDF già presenti** in
  `public/`: `cv-davide-avagnano-it.pdf` e `cv-davide-avagnano-en.pdf`.
- **Hero**: saluto tipografico grande (es. "Ciao, sono Davide") + ruolo + una riga
  di posizionamento + link social. **Niente foto.**
- **Competenze**: **liste di testo categorizzate** con **layout a due colonne**
  (come la reference): **etichetta categoria a sinistra**, tech in testo a destra.
  **Niente griglia icone / tab.**
- **Progetti**: lista/card **essenziali** (titolo + una riga) che aprono un
  **modale/drawer di dettaglio** (problema → stack → highlights → metriche → ruolo).
  Minimalismo fuori, profondità on-demand — così i case study non vengono svenduti.
- **Percorso**: timeline a due colonne (**anno a sinistra**, tappa/descrizione a
  destra), come la reference — vedi §4. _(Il grafico "crescita" della reference è
  opzionale/gimmick: valutare se ometterlo per pulizia.)_
- **Contatti**: blocco CTA ("Lavoriamo insieme") + **form Resend minimale**.
- **Footer**: essenziale, anno dinamico, contatti.

### Iconografia

- Ridotta al minimo: poche icone UI (`lucide-react`) per social/toggle. **Niente
  tech-icons** nelle competenze (sono testo). Coerenza e sobrietà.

---

## 6. Internazionalizzazione (next-intl)

**Obiettivo:** sito multilingua con selettore.

> **Deciso:** lingue **IT + EN**, **default IT**. (Struttura estendibile ad altre
> lingue in futuro.)

**Implicazioni tecniche (da valutare nel piano):**

- next-intl in App Router usa tipicamente routing con segmento **`[locale]`** +
  middleware → le route si spostano sotto `src/app/[locale]/…`. Impatto strutturale
  da mettere in conto.
- I testi passano da hardcoded a **file di messaggi per lingua** (`messages/it.json`,
  `messages/en.json`, …). Tutti i contenuti (incluso `site-content.md` reso in copy)
  vanno tradotti.
- SEO: `metadata` per-locale, `hreflang`/`alternates`, sitemap per-locale.
- Da definire: **quali lingue** e la **lingua di default** (vedi domande §10).

---

## 7. Theming light / dark (next-themes)

**Obiettivo:** toggle tema con preferenza persistita e rispetto di
`prefers-color-scheme`.

> **Deciso:** al primo caricamento **segue il sistema**, con **fallback dark** se
> non determinabile. Toggle sempre disponibile, preferenza persistita.

**Implicazioni tecniche:**

- **next-themes** per gestire la classe `dark` + persistenza + no-flash.
- Tailwind v4: il `@custom-variant dark (&:is(.dark *))` **è già presente** in
  `globals.css` → serve definire i **valori light** (oggi `:root` ha solo i valori
  dark) e spostare i valori dark sotto `.dark`.
- Tutti i token colore devono avere una controparte light leggibile e accessibile
  (contrasto AA).
- Da definire: **tema di default** e se il primo caricamento segue il sistema
  (vedi domande §10).

---

## 8. Vincoli & fondamenta tecniche

Si parte dallo stack già modernizzato nella migrazione conclusa (git history):

- Next.js 16 (App Router/RSC), React 19, TypeScript strict.
- Tailwind CSS v4 (config CSS-first in `globals.css`), tw-animate-css, `motion`.
- shadcn/ui + Radix (`radix-ui`), react-hook-form + Zod, Resend (contatti).
- Deploy Vercel (auto-deploy da `main`), SEO/OG/sitemap/robots già presenti.

Il redesign deve **preservare**: type-safety, `typecheck`/`lint`/`build` verdi,
accessibilità e SEO impostate in Fase 7.

---

## 9. Non-goals (per ora)

- Backend/CMS per i contenuti (restano in file/dati versionati; niente headless CMS).
- Blog o aree autenticate.
- Ridiscutere lo stack di base (già fatto nella migrazione).
- Animazioni "di ingresso" del vecchio TODO come priorità a sé — rientrano nel
  linguaggio di motion complessivo, non come task isolato.

---

## 10. Decisioni prese & domande ancora aperte

### ✅ Deciso

- **Estetica**: **editoriale minimale, tipografica, light-first**
  Priorità: pulizia e semplicità.
- **Motivo "developer" abbandonato** (niente `<DA/>`, slash, cursore, menta neon).
- **Palette monocroma** (neutri, niente accento colore).
- **Ripartenza pulita shadcn**: riscrivere `globals.css` (modello baaarber, OKLCH),
  reinit shadcn base neutral, ri-scaricare solo i componenti necessari, cancellare
  gli `ui/` attuali.
- **Font**: proposte A/Fraunces+Inter _(racc.)_, B/Geist, C/Space Grotesk+Inter →
  scelta a vista.
- **Foto rimossa** (Profilo/hero senza foto). Se `src/assets/` resta vuota → rimuoverla.
- **i18n**: IT + EN, **default IT**.
- **Tema**: segue il sistema, **fallback dark**; toggle + persistenza. Design
  **light-first**, dark derivato.
- **Competenze**: **liste di testo categorizzate** (no icone/tab).
- **Progetti**: card essenziali + **modale di dettaglio**; one-page; raggruppamento
  **per tipo** (SaaS / Data & Perf. Marketing / Infra & Security / Side), no filtri.
  Vecchi progetti ridotti a **1-2** "side projects".
- **Contatti**: **CTA "Lavoriamo insieme" + form Resend** minimale.
- **Percorso/timeline**: **aggiunta** (nuova sezione).
- **CV**: bottone che scarica il PDF **nella lingua corrente** (2 PDF in `public/`
  da `cv-system`).
- **Dominio**: resta **Vercel** per ora; eventuale **dominio custom in futuro**
  (Vercel resta l'host, si punta solo il DNS → aggiornare `SITE_URL` alla migrazione).
- **Baaarber**: **nessun link pubblico** (il sito in prod è del cliente; solo parte
  public, no dashboard). Presentare come case study; valutare screenshot solo con
  permesso del cliente.

### ❓ Ancora aperte

- **Font**: scelta finale tra A / B / C.
- **Dipendenza CV**: i 2 PDF (IT/EN) da generare dal `cv-system`.
- **Timeline/framing anni**: vedi nota in `site-content.md` §6 (riformulazione
  onesta del percorso software; bagnino ridimensionato).
- **Attribuzione** per ecosistema (livello di claim per progetto).
