import { motion } from "motion/react"
import { ProjectCategoryType } from "@/types/types"

interface ProjectCategoryProps {
  category: ProjectCategoryType
  isActive: boolean
  setActive: () => void
}

export const ProjectCategory = ({
  category,
  isActive,
  setActive,
}: ProjectCategoryProps) => {
  return (
    <li className="relative">
      <button
        className={`px-5 py-3 text-xs font-light tracking-widest sm:px-10 sm:text-sm lg:px-14 2xl:text-base ${
          isActive && "bg-accent/[0.03] text-accent"
        }`}
        onClick={setActive}
      >
        {category.toUpperCase()}

        {isActive && (
          <motion.span
            layoutId="activeCategoryProjects"
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
            }}
            className="absolute inset-x-0 bottom-0 h-[2px] bg-accent"
          />
        )}
      </button>
    </li>
  )
}
