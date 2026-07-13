// Configurazione centralizzata del sito, usata da metadata, sitemap, robots e
// dall'immagine OpenGraph. L'URL di produzione viene da `SITE_URL` (.env), con
// fallback al dominio Vercel.
export const siteConfig = {
  name: "Davide Avagnano",
  title: "Davide Avagnano — Software Engineer",
  description:
    "Full-stack software engineer. I build production systems end-to-end — TypeScript, Node.js, PostgreSQL — and ship applied AI (RAG, LLM assistants) with cost governance.",
  url: process.env.SITE_URL ?? "https://portfolio-website-blond-phi.vercel.app",
  locale: "en_US",
  author: {
    name: "Davide Avagnano",
    email: "dav.avagnano@gmail.com",
    github: "https://github.com/DavideAvagnano",
    linkedin: "https://www.linkedin.com/in/davide-avagnano/",
  },
} as const
