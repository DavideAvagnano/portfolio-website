import { motion } from "framer-motion";
import { ProjectCategoryType } from "@/types/types";

interface ProjectCategoryProps {
  category: ProjectCategoryType;
  isActive: boolean;
  setActive: () => void;
}

export const ProjectCategory = ({
  category,
  isActive,
  setActive,
}: ProjectCategoryProps) => {
  return (
    <li className="relative">
      <button
        className={`py-3 px-5 sm:px-10 lg:px-14 text-xs sm:text-sm 2xl:text-base font-light tracking-widest ${
          isActive && "text-accent bg-accent/[0.03]"
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
            className="absolute h-[2px] bg-accent inset-x-0 bottom-0"
          />
        )}
      </button>
    </li>
  );
};
