"use client";

import { useState } from "react";
import { skillsData } from "@/data/skills-data";

import { SkillCategoryType, SkillType } from "@/types/types";

import { SectionHeading } from "@/components/section-heading";
import { SkillCategory } from "@/components/skills/skill-category";
import { SingleSkill } from "@/components/skills/single-skill";

export const Skills = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<SkillCategoryType>("frontend");

  return (
    <section id="skills" className="section">
      <SectionHeading label="/skills" />

      <div className="flex gap-10 md:gap-20 text-foreground-light">
        {/* Categorie */}
        <ul className="flex flex-col flex-none">
          {Object.keys(skillsData).map((category) => (
            <SkillCategory
              key={category}
              category={category as SkillCategoryType}
              isActive={selectedCategory === category}
              setActive={() =>
                setSelectedCategory(category as SkillCategoryType)
              }
            />
          ))}
        </ul>

        {/* Skills filtrate */}
        <div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-5 lg:gap-y-10 gap-x-20 place-content-center">
            {skillsData[selectedCategory].map((skill: SkillType, index) => (
              <SingleSkill key={skill.name} index={index} skill={skill} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
