import { skillsData } from "@/data/skills-data";
import { projectsCategories } from "@/data/projects-data";

export type SkillCategoryType = keyof typeof skillsData;

export type SkillType = {
  name: string;
  icon: React.ReactNode;
};

export type ProjectCategoryType = (typeof projectsCategories)[number];
