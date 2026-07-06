# Contenuti del sito — Davide Avagnano

> **Fonte di verità dei contenuti** per il portfolio/CV site. Raccoglie tutto ciò
> che serve a scrivere hero, about, skills, progetti e contatti, allineato al
> profilo professionale reale (`~/cv-system/PROFILO_DAVIDE_AVAGNANO.md` + report
> per-progetto). Questo file è il riferimento da aggiornare quando cambia
> qualcosa su Davide. **Non è il codice del sito**: è il materiale contenuti.
>
> Regola d'oro: **niente si inventa fuori da questa base**. Vedi §10 (regole di
> framing) prima di scrivere copy pubblico.

---

## 1. Identità & contatti

- **Nome:** Davide Avagnano
- **Ruolo:** Fullstack Developer (freelance / a consulenza, dal febbraio 2025)
- **Località:** Napoli (IT) — disponibile a relocation
- **Email:** dav.avagnano@gmail.com
- **Telefono:** +39 331 4699097
- **GitHub:** https://github.com/DavideAvagnano
- **LinkedIn:** https://www.linkedin.com/in/davide-avagnano/
- **Sito:** https://portfolio-website-blond-phi.vercel.app/
- **Nato:** 30 ottobre 1997

---

## 2. Positioning & hero

**One-liner (headline):**

> Fullstack Developer specializzato nell'ecosistema TypeScript / React / Next.js /
> Node.js su PostgreSQL. Costruisco e mantengo sistemi di produzione end-to-end —
> dal frontend all'API type-safe, dal database ai worker schedulati fino al deploy.

**Angolo di posizionamento (il "gancio"):** la combinazione tra

1. **aver contribuito a piattaforme di produzione complesse e ad alto volume**
   (ecosistemi di performance marketing / data analytics), e
2. **aver costruito da solo un prodotto SaaS completo** per un cliente (Baaarber).

**Sotto-tagline possibili:**

- "Da ingegnere aerospaziale a fullstack developer, da autodidatta."
- "Backend-heavy fullstack: modellazione dati, API type-safe, worker asincroni, sicurezza, deploy."
- "I build fast, scalable, and impactful web apps." _(già usata nell'hero attuale — ok mantenerla)_

---

## 3. About (narrativa)

Materiale per la sezione About. Il filo narrativo forte è la **transizione di
carriera** + la **rapida crescita**.

**Storia in breve:**

- Laurea triennale in **Ingegneria Aerospaziale** (Federico II, Napoli, 2020,
  105/110). Magistrale iniziata e **interrotta** dopo 2 esami, per riorientamento.
- **~3 anni di riconversione da autodidatta**: inverni a studiare programmazione,
  estati a lavorare come bagnino di salvataggio (vedi §9).
- **Febbraio 2025:** primo ingaggio come Fullstack Developer freelance. In ~1,5
  anni ha messo le mani su un ventaglio di sistemi reali sproporzionato rispetto
  all'anzianità → **valorizzare come rapida crescita e alta produttività**, non
  come seniority.

**Cosa lo distingue (il "filo conduttore" tecnico):**

- Fullstack a tutto tondo con **baricentro backend/architetturale**.
- Stack moderno e coerente: TypeScript, Next.js, tRPC, Drizzle/PostgreSQL,
  Redis/BullMQ, PM2.
- **Ownership end-to-end** (Baaarber: dall'architettura al deploy, da solo).
- Esperienza su **sistemi reali ad alto volume**: ETL multi-sorgente,
  riconciliazione dati cross-platform, decine di integrazioni esterne, pipeline AI.
- Sensibilità per **qualità, sicurezza, manutenibilità** (cifratura PII, RBAC,
  idempotenza, testing su DB reale, documentazione come parte del "done").
- **AI applicata** con attenzione ai costi, non come gimmick.

**Eredità ingegneristica:** metodo analitico, modellazione dei problemi,
attitudine matematica → si riflettono nel modo di affrontare architetture complesse.

---

## 4. Competenze tecniche (stack aggiornato)

> Sostituisce il vecchio `skills-data.ts` (che elenca solo React/Redux/Next/
> Tailwind/Node/Express/Mongo/Prisma/PostgreSQL) — **fortemente sottodimensionato**
> rispetto allo stack reale.

**Linguaggi:** TypeScript (avanzato), JavaScript, SQL, Bash (nozioni).

**Frontend:** React (17→19), Next.js (12→16, Pages + App Router/RSC), Tailwind CSS,
shadcn/ui + Radix UI, Material-UI, TanStack React Query, Zustand, React Context,
react-hook-form, Recharts, TanStack Table, next-intl (i18n).

**Backend:** Node.js, Express.js, **tRPC** (API type-safe end-to-end), **Zod**,
autenticazione (better-auth, NextAuth — Google OAuth, magic-link, JWT S2S).

**Database:** **PostgreSQL** (avanzato: schema design, viste, enum, indici parziali,
composite key, JSONB, daterange), MySQL, **Drizzle ORM**, Knex.js,
**Elasticsearch** (Scroll API, ricerca ibrida BM25+kNN per RAG).

**Cache & code:** **Redis** (cache, rate limiting, sessioni), **BullMQ** (job queue,
worker distribuiti).

**AI / LLM:** OpenAI API (REST e **Vercel AI SDK** streaming), RAG, traduzione
automatica, assistenti conversazionali, generazione contenuti, **governance costi**
(usage log, cap spesa, pricing per-modello); LangChain, Replicate.

**Infra / DevOps:** deploy su **VPS Linux (Ubuntu)** — DigitalOcean, Linode; **PM2**
(worker always-on + cron); **Docker** / Compose; **Nginx** (reverse proxy, SSL/TLS,
HTTP/2); **Varnish**; **CI/CD GitHub Actions**; Git (submodule, hook); Winston;
runtime **Bun** e Node.

**Integrazioni esterne (esperienza diretta):** Meta/Facebook Graph API, Shopify
(GraphQL + webhook), TikTok/Taboola/Outbrain/MGID/RevContent/Yahoo (ad network),
GA4/AdSense/Microsoft Clarity, RedTrack/Ringba/CallGrid (attribution & call
tracking), OpenAI/Replicate, WordPress REST, OneSignal (push), Google Translate,
SMTP, reCAPTCHA, MaxMind GeoIP.

**Pattern padroneggiati:** architetture full-stack type-safe (DB→client via tRPC);
ETL/data pipeline multi-sorgente config-driven; riconciliazione dati cross-platform;
sistemi event-driven & job asincroni (BullMQ, LISTEN/NOTIFY, idempotenza, retry
backoff, distributed locking); auth/authz (RBAC granulare, anti-escalation,
feature/plan gating); sicurezza dati (PII AES-256-GCM, blind index HMAC, rate
limiting, GDPR); i18n (fino a 7 lingue); multi-tenant config-driven; caching
multi-livello (Varnish→Redis→DB→in-memory).

> **Nota implementativa:** il sito usa `react-icons/si` (Simple Icons). Molte di
> queste tech hanno un'icona (`SiTypescript`, `SiReact`, `SiNextdotjs`, `SiTrpc`,
> `SiDrizzle`, `SiPostgresql`, `SiRedis`, `SiElasticsearch`, `SiDocker`, `SiNginx`,
> `SiOpenai`, ecc.). Alcune (BullMQ, PM2, Varnish, tRPC a volte) potrebbero non
> avere icona → usare fallback testuale o `lucide-react`.

---

## 5. Progetti / case study

> **Cambio di paradigma rispetto al sito attuale.** Oggi il sito mostra
> progetti-esercizio da autodidatta con repo pubbliche e demo (Nasa API, Weather
> App, Meditation App, Auth App, Dashboard Management). Il nuovo sito deve
> **guidare con il lavoro professionale reale**, presentato come **case study**
> (niente repo/demo pubbliche: sono progetti cliente/proprietari).
>
> Attribuzione onesta (vedi §10): **Baaarber** è costruito in autonomia (flagship);
> gli **ecosistemi di performance marketing** sono lavoro cliente a cui Davide **ha
> contribuito** — alcuni pluriennali e a più mani (ixily in particolare).

### 5.1 Baaarber — SaaS di booking _(flagship, sviluppato in autonomia)_

- **Tagline:** Piattaforma SaaS di gestione prenotazioni e presenza online per
  barbershop e saloni, sviluppata end-to-end.
- **Cosa fa:** copre l'intero ciclo operativo di un salone — sito pubblico dove i
  clienti prenotano in autonomia + gestionale admin (servizi, orari, operatori,
  offerte, notifiche). Core: motore di disponibilità che calcola gli slot liberi
  on-the-fly e gestione completa del ciclo di vita della prenotazione.
- **Stack:** Next.js 16 (App Router/RSC), React 19, TypeScript, tRPC 11, Drizzle
  ORM, PostgreSQL, Redis, better-auth, Tailwind v4 + shadcn/Radix, Zod, next-intl,
  OpenAI + Vercel AI SDK, Nodemailer, OneSignal, FullCalendar + dnd-kit, Recharts,
  Vitest, PM2, DigitalOcean.
- **Highlights:**
  - Motore di disponibilità come _single source of truth_ (stessa funzione disegna
    il calendario e valida la prenotazione), con race-safety via partial unique index.
  - **Autorizzazione a 2 assi ortogonali** in AND: scope RBAC (anti-escalation) +
    feature/piano commerciale (cache Redis, fail-closed), defense-in-depth.
  - **Cifratura PII at-rest** AES-256-GCM + blind index HMAC, boundary presidiato
    da CI e brand types TypeScript (errori d'uso a compile-time).
  - Optimistic concurrency + soft-delete universale; 6 cron worker PM2 idempotenti.
  - Notifiche multi-canale (email + push) con pattern outbox + worker con retry.
  - Layer AI con **governance dei costi** (chiave cifrata, cap mensile, usage log,
    pricing dinamico); traduzioni + assistente conversazionale in streaming.
- **Metriche:** ~57.500 LOC TS/TSX, 31 tabelle, ~145 procedure tRPC, 6 cron worker,
  5 lingue, 50 file di documentazione, ~214 commit in ~3 mesi (~206 suoi).
- **Ruolo:** progettazione architetturale + sviluppo full-stack + documentazione +
  deploy, **quasi interamente in autonomia**.
- **Come presentarlo:** il pezzo forte del portfolio. Angolo: "so portare un
  prodotto SaaS dall'idea alla produzione da solo, con pattern da sistema enterprise".
- **Cliente:** generico ("cliente nel settore beauty/booking").
- **Demo/repo:** ⚠️ **nessun link pubblico.** Esiste un sito in produzione ma è del
  **cliente reale** (visibile solo la parte public, non la dashboard gestionale) →
  **non si linka.** Presentare come case study a parole; eventuali screenshot solo
  con **permesso del cliente** (e comunque della sola parte public).

### 5.2 Ecosistema "Scalability" — marketing intelligence & lead generation _(lavoro cliente)_

- **Dominio:** Healthcare & Senior Benefits (USA — Medicare, senior benefits).
- **Cos'è:** tre applicazioni interconnesse che coprono l'intero funnel di
  performance marketing (creazione campagne → landing page → raccolta eventi →
  call tracking → riconciliazione dati cross-platform).
- **I 3 progetti:**
  - **Scaladash** _(il "cervello")_ — SaaS multi-tenant di marketing intelligence:
    aggrega e **riconcilia dati cross-platform** (Facebook Ads + RedTrack + Ringba
    - CallGrid) in dashboard (spend, revenue, profit, ROAS, CPA, conversioni web e
      telefoniche); campaign manager bulk, rule engine di automazione, real-time via
      PostgreSQL LISTEN/NOTIFY. **Stack:** Next.js 15, React 19, tRPC 11, Drizzle,
      PostgreSQL 16, Redis + BullMQ. **~160.500 LOC, 81 tabelle, ~287 endpoint, 15+
      processi PM2, RBAC a 14 flag.** _(Lo stack più vicino a Baaarber.)_
  - **ScalaBuilder** _(il "corpo")_ — renderer multi-tenant di **74 landing page**
    brandizzate (Next.js 13), motore di **chatbot/quiz JSON-driven** (nuovi funnel
    senza codice), caching Varnish + Redis, build domain-per-instance.
  - **Scalarepo** _(il "sistema nervoso")_ — daemon di distribuzione configurazioni
    JSON via rsync/SSH verso 10 server, event-driven con file watching, batch e retry.
- **Highlight trasversale (il cuore):** la **riconciliazione cross-platform** —
  unire spend Facebook + conversioni web (RedTrack) + conversioni telefoniche
  (Ringba/CallGrid) con weighted average e scoring di matching.
- **Ruolo:** contributo full-stack su frontend, API tRPC, worker, schema DB,
  integrazioni, deploy.
- **Come presentarlo:** system design su scala, riconciliazione dati, stack moderno.
- ⚠️ **Cautela (importante):** i report contengono dettagli **sensibili/controversi**
  (IP server, token, comment publishing via rotazione proxy/profili, network
  sniffing via monkeypatch di XHR/fetch). Sul sito **solo livello architetturale**:
  NON esporre infra, NON mettere in vetrina pratiche che a un recruiter/cliente
  potrebbero risultare problematiche.

### 5.3 Ecosistema "ixily" — ad arbitrage / performance marketing _(lavoro cliente, a più mani)_

- **Cos'è:** ciclo chiuso di arbitraggio pubblicitario — traffico comprato da 7 ad
  network verso **27 siti verticali** multi-lingua, monetizzato via feed di ricerca
  sponsorizzati, con conversion tracking server-to-server.
- **I 3 progetti:**
  - **ArbReports** — backend ETL/analytics/automazione (Express + TypeScript +
    PostgreSQL): **10 connettori ETL** config-driven (pattern `AbstractReport<T>`),
    rule engine cross-platform, pipeline AI (ChatGPT → immagini → WordPress →
    traduzioni). 80+ endpoint, 27 job PM2, 55 tabelle.
  - **ArbTree** — frontend consumer multi-sito (Next.js 13 + Express + MySQL +
    Redis + Varnish + WordPress headless): search browsing + **conversion tracking
    S2S** con hashing PII. Multi-tenancy config-driven (27 domini, un codebase).
    **~241.000 LOC** — progetto pluriennale a più mani.
  - **ArbDash** — dashboard (Next.js 12 + React 17 + MUI + Recharts): KPI, gestione
    campagne, **tabella universale riutilizzabile** (`ARBTable`), URL-driven state,
    RBAC a 3 livelli.
- **Ruolo:** ⚠️ **contributo** a un ecosistema pluriennale e **a più mani** (i
  report non attribuiscono a Davide un ruolo di sole authorship; i contributori
  nominati sono altri). **Presentare come "ho contribuito a"**, non "ho costruito".
- **Come presentarlo:** esperienza su un sistema ad-tech reale, complesso e ad alto
  volume; pattern astratti riutilizzabili; integrazioni multiple; multi-tenancy.

### 5.4 Hypefill — SaaS di e-commerce fulfillment analytics _(lavoro cliente)_

- **Tagline:** Piattaforma SaaS B2B multi-tenant di analytics e gestione operativa
  per e-commerce.
- **Cosa fa:** centralizza dati da **Shopify** (GraphQL + webhook), corrieri, **Meta
  Ads**, tassi di cambio e prezzi carburante per calcolare **margini netti
  multi-valuta** in tempo reale. Include un **AI assistant** conversazionale con
  architettura **RAG** (ricerca ibrida BM25/kNN su Elasticsearch), generazione SQL
  dinamica e widget builder in linguaggio naturale.
- **Stack:** Bun, Next.js 15, React 19, tRPC 11, PostgreSQL + Drizzle, Redis +
  BullMQ, Elasticsearch, OpenAI (via Vercel AI SDK + LangChain), NextAuth.
- **Highlights:** type-safety end-to-end (122 procedure tRPC); AI assistant
  multi-nodo con RAG + SQL generation su DB read-only; background processing BullMQ
  con distributed locking e retry; permessi componibili multi-livello; PII cifrata
  (PGP), webhook Shopify con HMAC; uso avanzato di PostgreSQL (daterange, JSONB,
  partial unique index).
- **Metriche:** ~68.600 LOC, 45 tabelle, 122 procedure tRPC, 12+ worker PM2, 7
  lingue, RBAC a 14 permessi.
- **Ruolo:** sviluppo full-stack della piattaforma (architettura, sistema AI/RAG,
  background processing, RBAC, integrazioni).
- **Come presentarlo:** SaaS enterprise che unisce analytics finanziarie
  multi-valuta real-time e AI assistant (RAG + SQL) — full-stack moderno e scalabile.

### 5.5 fy-log-manager — Security Operations automation _(tooling)_

- **Tagline:** Sistema di SecOps automation per threat detection & response su
  infrastrutture web multi-server.
- **Cosa fa:** automatizza il ciclo detection→response — analizza gli alert di
  **Suricata IDS** via **Elasticsearch** (Scroll API), genera report di IP malevoli
  e gestisce automaticamente le regole **firewall UFW** su server remoti via SSH
  (blocco, aging, pruning). Include setup Suricata dual-interface + stack ELK.
- **Stack:** TypeScript (ts-node), Bash, Elasticsearch, Suricata, Filebeat, Kibana,
  UFW, Zod, Winston, systemd, DigitalOcean/Linode.
- **Highlights:** pipeline di filtraggio IP multi-livello protocol-aware; Suricata
  dual-interface (AF-PACKET + PCAP loopback con X-Forwarded-For); UFW lifecycle
  management con metadati nei commenti; streaming Scroll-based per grandi volumi;
  filtering config-driven con validazione Zod.
- **Metriche:** ~1.086 LOC (TS + Bash), CLI (0 endpoint/0 DB, usa Elasticsearch).
- **Come presentarlo:** dimostra competenze **oltre lo sviluppo applicativo** —
  sicurezza di rete, DevSecOps, automazione infrastrutturale, integrazione ELK.

### 5.6 Progetti personali / formazione _(i vecchi, da declassare o rimuovere)_

Gli attuali progetti del sito sono esercizi da autodidatta con repo/demo pubbliche:
Nasa API Manager, Dashboard Management (AWS), Portfolio Website, Authentication App
(NextAuth v5), Weather Forecast App, Meditation App.

**Deciso:** tenerne i **migliori 2** come sezione minore "Side / learning projects"
(col link GitHub), **dopo** i case study professionali. Scelti (i più "fullstack"/
rilevanti, meno da tutorial):

- **Authentication App** — NextAuth v5, 2FA, Prisma, PostgreSQL (mostra auth/sicurezza).
- **Dashboard Management** — Next.js, Redux Toolkit, Node/Express, PostgreSQL, Prisma,
  AWS (fullstack + deploy).

Gli altri (Nasa API, Weather, Meditation) si rimuovono. _(Tutto configurabile via
`data/*`: cambiare i 2 in vetrina sarà banale.)_

Il **Portfolio Website** stesso può restare citato (è questo sito, ora Next 16 /
Tailwind 4).

---

## 6. Esperienza / Percorso (timeline)

> **Framing del percorso software (vedi §10, regola 10).** Il percorso di sviluppo
> si presenta come iniziato **~2023** (autodidatta → **frontend base** con
> React/Next → poi full-stack), **professionalizzato come freelance da feb 2025**.
> Questo dà **~2+ anni di software** ed è **onesto**: i progetti-esercizio (§5.6)
> sono la prova reale di quel periodo. **Non si inventa** un impiego retribuito
> anteriore al 2025 — si valorizza il vero percorso da autodidatta. Il periodo da
> **bagnino è ridimensionato** (fuori dalla timeline tech del sito; resta solo per
> il binario non-tech nel `cv-system`).

- **2020 — Laurea triennale in Ingegneria Aerospaziale**, Federico II (105/110).
- **~2023 → 2024 — Percorso di sviluppo software (autodidatta).** ✅ _Anno di inizio
  confermato da Davide._ Dallo studio ai primi **progetti frontend** (React, Next,
  TypeScript), fino al full-stack. Base tecnica costruita da zero, poi validata in
  produzione dal 2025. _(Evidenza: i progetti personali in §5.6.)_
- **Feb 2025 → oggi — Fullstack Developer, freelance / a consulenza.**
  Lavoro full-time a consulenza per più clienti. Primo ingaggio mediato da **Fyonda
  Tech** (intermediario, oggi cessato) → contributo agli ecosistemi di performance
  marketing (**ixily**, **Scalability**, **Hypefill**) + tooling **fy-log-manager**.
  In parallelo, sviluppo in autonomia di **Baaarber** (SaaS booking) per un cliente
  beauty separato. Team di sviluppo (3-5 persone, fino a ~10 colleghi complessivi);
  interfaccia con CTO, designer e team marketing; call di definizione requisiti.

> **Bagnino (Europing Camping Village)** — dettaglio in §9. **Non** in timeline sul
> sito tech; utile solo per ruoli non-tech.

---

## 7. Soft skills & modo di lavorare

- Autodidatta, forte capacità di apprendimento autonomo (skill costruite da zero,
  validate in produzione).
- Determinazione/resilienza (riconversione completa aerospaziale → software).
- Mentalità ingegneristica (approccio analitico e strutturato).
- Ownership e autonomia (idea → deploy; gestione priorità/scadenze da freelance).
- Lavoro in team e con stakeholder (CTO, design, marketing; requisiti → specifiche).
- Collaborazione e supporto ai colleghi.
- Comunicazione scritta e documentazione (tecnica + funzionale) come parte del "done".
- Affidabilità e responsabilità (confermate dall'esperienza da bagnino).

---

## 8. Formazione, lingue, certificazioni

- **Formazione:** Laurea triennale Ing. Aerospaziale, Federico II (2020, 105/110);
  magistrale interrotta dopo 2 esami. Nessuna certificazione informatica formale.
- **Lingue:** Italiano madrelingua; Inglese **B1/B2** (uso professionale quotidiano
  in lettura/scrittura su codebase e prodotti multilingua; parlato in sviluppo;
  nessuna certificazione formale).
- **Certificazioni:** Brevetto di **bagnino di salvataggio** (acque interne +
  estensione mare) — conseguito ma **scaduto** (da rinnovare). Patente B (di norma
  omessa dal CV).

---

## 9. Extra — Bagnino di salvataggio (Europing Camping Village)

Tre stagioni estive (~2022–2024, _da confermare_). Prima stagione: sicurezza
bagnanti in piscina + manutenzione impianto. Seconda/terza: estensione brevetto per
il mare + salvamento. **Interventi reali:** 3 interventi di salvataggio, 8 persone
portate in salvo (con un collega), alcune in condizioni pericolose.

**Competenze/valore:** responsabilità diretta sull'incolumità, gestione dello stress,
sangue freddo, lavoro in coppia, affidabilità, resistenza fisica. Utile per il
"binario non-tech" e come prova di carattere. _(Brevetto scaduto: presentare come
conseguito e da rinnovare, non attivo.)_

---

## 10. Regole di framing dei contenuti (leggere prima di scrivere copy)

1. **Niente si inventa** fuori da questa base / dai report.
2. **Status: freelance / a consulenza**, mai "dipendente", mai "in cerca di lavoro".
3. **Fyonda Tech** = solo contesto/intermediario (oggi cessato), **non** datore di
   lavoro. Il centro sono i progetti/clienti (ixily, Scalability, Hypefill).
4. **Baaarber** = prodotto per un "cliente nel settore beauty/booking" (generico).
5. **Attribuzione onesta del ruolo:**
   - Baaarber → costruito **in autonomia** (ok "ho progettato e sviluppato").
   - Ecosistemi performance marketing → "**ho contribuito a**" / "ho lavorato su".
   - **ixily in particolare** → pluriennale e a più mani: non rivendicare authorship.
6. **Sensibilità / sicurezza:** non esporre dettagli infra (IP, token) né mettere in
   vetrina tecniche potenzialmente controverse (proxy rotation per comment
   publishing, monkeypatch di XHR/fetch per sniffing). Restare a livello
   architetturale.
7. **Progetti cliente = niente repo/demo pubbliche.** I link GitHub/demo hanno senso
   solo per i progetti personali (§5.6).
8. **Seniority:** ~1,5 anni di attività → valorizzare come **rapida crescita e alta
   produttività**, evitando etichette (Senior/Lead) non coerenti con la timeline.
9. **Doppio binario:** taglio **tech** (backend/architettura/dati/AI) per ruoli
   tecnici; taglio **non-tech** (team, stakeholder, requisiti, documentazione,
   transizione di carriera, bagnino) per ruoli a contatto col cliente / product.
10. **Percorso software / anni:** presentare l'inizio del percorso software a **~2023**
    (autodidatta → **frontend base** → full-stack) → **~2+ anni di software**,
    professionale come freelance da feb 2025. È **onesto**: i progetti-esercizio
    (§5.6) provano quel periodo. **Non** dichiarare impieghi retribuiti anteriori al
    2025 né date lavorative false. Il **bagnino** esce dalla narrazione tech del sito
    (resta nel `cv-system` per i ruoli non-tech).
11. **CV scaricabile:** il bottone CV scarica il PDF **nella lingua corrente** del
    sito (IT/EN); i due PDF vivono in `public/`, generati dal `cv-system`.

---

## 11. Gap analysis vs sito attuale + raccomandazioni

**Cosa c'è oggi (obsoleto):**

- Progetti: solo esercizi da autodidatta (Nasa API, Weather, Meditation, Auth…).
- Skills (`skills-data.ts`): lista minimale (React, Redux, Next, Tailwind, shadcn,
  Framer, Node, Express, Mongo, Mongoose, Prisma, PostgreSQL, Git) — **non riflette**
  tRPC, Drizzle, Redis, BullMQ, Elasticsearch, AI/OpenAI, Docker, Nginx, PM2, ecc.
- About: generico "web developer".

**Da fare (contenuti):**

- **Projects → case study professionali** (Baaarber flagship, poi Scalability,
  Hypefill, ixily, log-manager). Struttura scheda diversa: niente demo/repo, sì
  metriche/highlights/ruolo. Vecchi progetti → rimossi o sezione minore (§5.6).
- **Skills → riscrivere** su §4 (categorie: Linguaggi, Frontend, Backend, Database,
  Cache & code, AI, Infra/DevOps, Integrazioni). Attenzione icone react-icons (§4).
- **About → riscrivere** con la narrativa §3 (transizione + crescita + baricentro
  backend/architettura).
- **Hero → aggiornare** il posizionamento (§2), mantenendo un tono personale.
- **Categorie progetti** attuali (`all / full-stack / frontend`) → ripensare in
  chiave case study (es. "SaaS", "Data / Performance Marketing", "Infra/Security",
  "Side projects").

> Lo **stile/visual** del sito è un'altra fase (refactor UI). Qui ci limitiamo ai
> **contenuti**: questo file è il riferimento da cui attingere quando si scriverà il
> copy e si popoleranno i `data/*.ts`.
