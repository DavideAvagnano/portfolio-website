import { motion } from "motion/react"
import { SkillCategoryType } from "@/types/types"

interface SkillCategoryProps {
  category: SkillCategoryType
  isActive: boolean
  setActive: () => void
}

export const SkillCategory = ({
  category,
  isActive,
  setActive,
}: SkillCategoryProps) => {
  return (
    <li className="relative">
      <button
        className={`w-28 py-3 pl-4 text-start text-xs font-light tracking-widest sm:w-44 sm:text-sm 2xl:text-base ${
          isActive && "bg-accent/[0.03] text-accent"
        }`}
        onClick={setActive}
      >
        {category.toUpperCase()}

        {isActive && (
          <motion.span
            layoutId="activeCategorySkills"
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 40,
            }}
            className="absolute inset-y-0 right-0 w-[2px] bg-accent"
          ></motion.span>
        )}
      </button>
    </li>
  )
}

// TODO: animazione sullo sfondo quando clicco sulla categoria (anche per projects)
