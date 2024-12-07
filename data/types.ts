import { skillsData } from "@/data/skills-data";

export type SkillCategoryType = keyof typeof skillsData;

export type SkillType = {
  name: string;
  icon: React.ReactNode;
};
