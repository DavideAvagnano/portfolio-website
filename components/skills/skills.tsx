"use client"

import { useState } from "react"
import { skillsData } from "@/data/skills-data"

import { SkillCategoryType, SkillType } from "@/types/types"

import { SectionHeading } from "@/components/section-heading"
import { SkillCategory } from "@/components/skills/skill-category"
import { SingleSkill } from "@/components/skills/single-skill"

export const Skills = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<SkillCategoryType>("frontend")

  return (
    <section id="skills" className="section">
      <SectionHeading label="/skills" />

      <div className="flex gap-10 text-foreground-light md:gap-20">
        {/* Categorie */}
        <ul className="flex flex-none flex-col">
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
          <ul className="grid grid-cols-1 place-content-center gap-x-20 gap-y-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-10">
            {skillsData[selectedCategory].map((skill: SkillType, index) => (
              <SingleSkill key={skill.name} index={index} skill={skill} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
