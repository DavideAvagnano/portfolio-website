// Case study professionali, da `docs/site-content.md` §5.
//
// Qui vivono solo i dati **non traducibili**: id stabili, stack (nomi di prodotto),
// numeri e link. Titolo, tagline, contesto, punti chiave e ruolo sono copy tradotto
// (`messages/*.json`, namespace `projects`).
//
// ⚠️ Regole di framing (`docs/site-content.md` §10), già applicate nel copy:
// - **progetti cliente ANONIMIZZATI**: gli `id` qui sotto e i testi nei messaggi non
//   usano i nomi reali di prodotti/clienti (il repo e il sito sono pubblici). I nomi
//   veri stanno solo in `docs/site-content.md`, fuori dal repo;
// - nessun link pubblico ai progetti cliente;
// - solo livello architetturale, niente settori o dettagli che identifichino il cliente;
// - l'ecosistema di ad arbitrage è a più mani: "ho contribuito", mai authorship;
// - i numeri descrivono la **scala del sistema**, non la produzione personale.

/** Chiavi delle metriche: l'etichetta è tradotta (`projects.metrics.*`). */
export type MetricKey =
  | "loc"
  | "tables"
  | "procedures"
  | "endpoints"
  | "workers"
  | "locales"
  | "landings"
  | "sites"
  | "connectors"

export type Metric = {
  key: MetricKey
  value: number
  /** Prefissa il valore con "~" (numeri di ordine di grandezza, non esatti). */
  approx?: boolean
}

/**
 * Union, non `string`: rende type-safe le chiavi `projects.items.<id>.*`.
 * Id **generici** di proposito (non i nomi reali dei clienti): repo e sito pubblici.
 */
export type ProjectId =
  | "bookingSaas"
  | "ecommerceSaas"
  | "marketingIntelligence"
  | "adArbitrage"
  | "logManager"

export type Project = {
  id: ProjectId
  stack: readonly string[]
  metrics: readonly Metric[]
}

export type ProjectGroupId = "saas" | "data" | "infra"

export type ProjectGroup = {
  id: ProjectGroupId
  projects: readonly Project[]
}

// Ordine per impatto, non cronologico: la timeline è corta (~1,5 anni) e il
// cronologico appiattirebbe tutto sul 2025. Il raggruppamento per tipo mostra
// l'ampiezza (SaaS + data/marketing + infra/security).
export const PROJECT_GROUPS: readonly ProjectGroup[] = [
  {
    id: "saas",
    projects: [
      {
        id: "bookingSaas",
        stack: [
          "Next.js 16",
          "React 19",
          "TypeScript",
          "tRPC",
          "Drizzle ORM",
          "PostgreSQL",
          "Redis",
          "better-auth",
          "Tailwind CSS",
          "Zod",
          "next-intl",
          "OpenAI",
          "Vercel AI SDK",
          "OneSignal",
          "Vitest",
          "PM2",
          "DigitalOcean",
        ],
        metrics: [
          { key: "loc", value: 57500, approx: true },
          { key: "tables", value: 31 },
          { key: "procedures", value: 145, approx: true },
          { key: "workers", value: 6 },
          { key: "locales", value: 5 },
        ],
      },
      {
        id: "ecommerceSaas",
        stack: [
          "Bun",
          "Next.js",
          "React 19",
          "TypeScript",
          "tRPC",
          "Drizzle ORM",
          "PostgreSQL",
          "Redis",
          "BullMQ",
          "Elasticsearch",
          "OpenAI",
          "Vercel AI SDK",
          "LangChain",
          "NextAuth",
        ],
        metrics: [
          { key: "loc", value: 68600, approx: true },
          { key: "tables", value: 45 },
          { key: "procedures", value: 122 },
          { key: "workers", value: 12, approx: true },
          { key: "locales", value: 7 },
        ],
      },
    ],
  },
  {
    id: "data",
    projects: [
      {
        id: "marketingIntelligence",
        stack: [
          "Next.js",
          "React 19",
          "TypeScript",
          "tRPC",
          "Drizzle ORM",
          "PostgreSQL",
          "Redis",
          "BullMQ",
          "Varnish",
          "PM2",
        ],
        metrics: [
          { key: "loc", value: 160500, approx: true },
          { key: "tables", value: 81 },
          { key: "endpoints", value: 287, approx: true },
          { key: "landings", value: 74 },
        ],
      },
      {
        id: "adArbitrage",
        stack: [
          "Next.js",
          "React",
          "TypeScript",
          "Express",
          "PostgreSQL",
          "MySQL",
          "Redis",
          "Varnish",
          "WordPress headless",
          "Material UI",
          "Recharts",
          "PM2",
        ],
        metrics: [
          { key: "loc", value: 241000, approx: true },
          { key: "sites", value: 27 },
          { key: "connectors", value: 10 },
          { key: "tables", value: 55 },
          { key: "endpoints", value: 80, approx: true },
        ],
      },
    ],
  },
  {
    id: "infra",
    projects: [
      {
        id: "logManager",
        stack: [
          "TypeScript",
          "Bash",
          "Elasticsearch",
          "Suricata",
          "Filebeat",
          "Kibana",
          "UFW",
          "Zod",
          "Winston",
          "systemd",
        ],
        metrics: [{ key: "loc", value: 1086, approx: true }],
      },
    ],
  },
]

/**
 * Sezione minore, in coda ai case study: progetti personali del periodo da
 * autodidatta. Qui il link GitHub **c'è** (a differenza dei progetti cliente) e
 * non serve un modale: bastano titolo, una riga e stack.
 */
export const SIDE_PROJECTS = [
  {
    id: "authApp",
    stack: ["Next.js", "TypeScript", "NextAuth v5", "Prisma", "PostgreSQL"],
    repo: "https://github.com/DavideAvagnano/Next-auth",
  },
  {
    id: "dashboard",
    stack: [
      "Next.js",
      "Redux Toolkit",
      "Node.js",
      "Express",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "AWS",
    ],
    repo: "https://github.com/DavideAvagnano/inventory-managment-dashboard",
  },
] as const
