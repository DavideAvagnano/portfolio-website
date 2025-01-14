export const projectsData = [
  {
    title: "Nasa API Manager",
    description:
      "API service for managing space launches: integrates SpaceX data, supports advanced CRUD operations, and organizes historical data. Structured with MVC protocol for scalability and maintainability.",
    tags: [
      "React",
      "Node.js",
      "Express",
      "Typescript",
      "MongoDB",
      "Mongoose",
      "Postman",
    ],
    demoUrl: "",
    gitHubUrl: "https://github.com/DavideAvagnano/nasa-project",
    category: "full-stack",
  },
  {
    title: "Dashboad Managment",
    description:
      "Dashboard for inventory management, with dynamic charts and optimized CRUD operations. Designed for scalability and performance, fully deployed on AWS with high reliability.",
    tags: [
      "Next.js",
      "Redux Toolkit",
      "Node.js",
      "Express",
      "Typescript",
      "PostgreSQL",
      "Prisma",
      "AWS",
    ],
    demoUrl: "",
    gitHubUrl:
      "https://github.com/DavideAvagnano/inventory-managment-dashboard",
    category: "full-stack",
  },
  {
    title: "Portfolio Website",
    description:
      "A personal portfolio website showcasing projects, skills, and experience. Focused on aesthetics, performance, and animations with integrated contact form.",
    tags: ["Next.js", "TypeScript", "Shadcn/ui", "Framer Motion", "Tailwind"],
    demoUrl: "https://portfolio-website-blond-phi.vercel.app/",
    gitHubUrl: "https://github.com/DavideAvagnano/portfolio-website",
    category: "frontend",
  },
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
    demoUrl: "https://weather-forecast-app-iota-self.vercel.app/",
    gitHubUrl: "https://github.com/DavideAvagnano/Weather-Forecast-App",
    category: "frontend",
  },
  {
    title: "Meditation App",
    description:
      "Meditation app featuring carousel reviews, an accordion-style FAQ section, and a customizable countdown timer accessible from any page through a global context.",
    tags: ["React", "Tailwind", "TypeScript", "Shadcn/ui"],
    demoUrl: "https://meditation-app-puce.vercel.app/",
    gitHubUrl: "https://github.com/DavideAvagnano/Meditation-App",
    category: "frontend",
  },
];

export const projectsCategories = [
  "all",
  ...new Set(projectsData.map((project) => project.category)),
];
