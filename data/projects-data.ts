export const projectsData = [
  {
    title: "Authentication App",
    description:
      "Authentication service built with NextAuth.js v5, featuring login/logout functionality, password reset, and two-factor authentication via email verification.",
    tags: ["Next.js", "TypeScript", "NextAuth.js v5", "Prisma", "PostgreSQL"],
    demoUrl: "",
    gitHubUrl: "https://github.com/DavideAvagnano/Next-auth",
    category: "full-stack",
  },
  {
    title: "Weather Forecast App",
    description:
      "Weather app featuring real-time forecasts for multiple cities using OpenWeather API, with a search bar to quickly filter and find specific locations.",
    tags: ["React", "Tailwind", "TypeScript", "API REST"],
    demoUrl: "",
    gitHubUrl: "https://github.com/DavideAvagnano/Weather-Forecast-App",
    category: "frontend",
  },
  {
    title: "Meditation App",
    description:
      "Meditation app featuring carousel reviews, an accordion-style FAQ section, and a customizable countdown timer accessible from any page through a global context.",
    tags: ["React", "Tailwind", "TypeScript", "Shadcn/ui"],
    demoUrl: "",
    gitHubUrl: "https://github.com/DavideAvagnano/Meditation-App",
    category: "frontend",
  },
];

export const projectsCategories = [
  "all",
  ...new Set(projectsData.map((project) => project.category)),
];

// TODO: fare il deploy di tutti i progetti e mettere url in demoUrl
