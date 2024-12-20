import React from "react";
import {
  SiTypescript,
  SiPython,
  SiTailwindcss,
  SiReact,
  SiNextdotjs,
  SiShadcnui,
  SiFramer,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMongoose,
  SiPrisma,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiRedux,
} from "react-icons/si";

export const skillsData = {
  languages: [
    { name: "TypeScript", icon: React.createElement(SiTypescript) },
    { name: "Python", icon: React.createElement(SiPython) },
  ],
  frontend: [
    { name: "React", icon: React.createElement(SiReact) },
    { name: "Redux", icon: React.createElement(SiRedux) },
    { name: "Next.js", icon: React.createElement(SiNextdotjs) },
    { name: "Tailwind", icon: React.createElement(SiTailwindcss) },
    { name: "Shadcn/ui", icon: React.createElement(SiShadcnui) },
    { name: "Framer Motion", icon: React.createElement(SiFramer) },
  ],
  backend: [
    { name: "Node.js", icon: React.createElement(SiNodedotjs) },
    { name: "Express", icon: React.createElement(SiExpress) },
  ],
  database: [
    { name: "MongoDB", icon: React.createElement(SiMongodb) },
    { name: "Mongoose", icon: React.createElement(SiMongoose) },
    { name: "Prisma", icon: React.createElement(SiPrisma) },
    { name: "PostgreSQL", icon: React.createElement(SiPostgresql) },
  ],
  versioning: [
    { name: "Git", icon: React.createElement(SiGit) },
    { name: "GitHub", icon: React.createElement(SiGithub) },
  ],
};
