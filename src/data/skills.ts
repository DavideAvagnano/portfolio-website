// Competenze tecniche, da `docs/site-content.md` §4.
//
// I **nomi delle tecnologie non si traducono**, quindi vivono qui e non nei
// messaggi: nei `messages/*.json` sta solo l'**etichetta di categoria** (namespace
// `skills`, chiave = `id`). Un'unica lista, zero duplicazione IT/EN.
//
// La riga "Pattern" è invece prosa (parole comuni, non marchi) → sta nei messaggi
// (`skills.patternsList`) ed è renderizzata a parte in `sections/skills.tsx`.
export const SKILL_GROUPS = [
  {
    id: "languages",
    items: ["TypeScript", "JavaScript", "SQL", "Bash", "Python"],
  },
  {
    id: "frontend",
    items: [
      "React",
      "Next.js (App Router / RSC)",
      "Tailwind CSS",
      "shadcn/ui",
      "Material UI",
      "TanStack Query",
      "TanStack Table",
      "Zustand",
      "react-hook-form",
      "Recharts",
      "next-intl",
    ],
  },
  {
    id: "backend",
    items: [
      "Node.js",
      "Bun",
      "Express",
      "tRPC",
      "Zod",
      "better-auth",
      "NextAuth",
    ],
  },
  {
    id: "database",
    items: ["PostgreSQL", "MySQL", "Drizzle ORM", "Knex.js", "Elasticsearch"],
  },
  {
    id: "dataAnalysis",
    items: ["NumPy", "pandas", "Matplotlib", "Seaborn", "Jupyter Notebook"],
  },
  {
    id: "queues",
    items: ["Redis", "BullMQ", "Varnish"],
  },
  {
    id: "ai",
    items: ["OpenAI API", "Vercel AI SDK", "RAG", "LangChain", "Replicate"],
  },
  {
    id: "infra",
    items: [
      "Docker",
      "Nginx",
      "PM2",
      "VPS Linux (Ubuntu)",
      "GitHub Actions",
      "Git",
    ],
  },
  {
    id: "integrations",
    items: [
      "Meta Graph API",
      "Shopify",
      "ad network (TikTok, Taboola, Outbrain, MGID)",
      "GA4",
      "RedTrack",
      "Ringba",
      "OneSignal",
      "reCAPTCHA",
      "MaxMind GeoIP",
    ],
  },
  // Strumenti dal background di ingegneria aerospaziale (vedi sezione Formazione).
  {
    id: "engineering",
    items: ["Nastran", "Femap", "Ansys Fluent", "Xfoil", "Matlab", "AutoCAD"],
  },
] as const

export type SkillGroup = (typeof SKILL_GROUPS)[number]
export type SkillGroupId = SkillGroup["id"]
