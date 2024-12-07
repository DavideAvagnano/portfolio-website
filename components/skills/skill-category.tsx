import { motion } from "framer-motion";
import { SkillCategoryType } from "@/data/types";

interface SkillCategoryProps {
  category: SkillCategoryType;
  isActive: boolean;
  setActive: () => void;
}

export const SkillCategory = ({
  category,
  isActive,
  setActive,
}: SkillCategoryProps) => {
  return (
    <li className="relative">
      <button
        className={`py-3 pl-4 w-28 sm:w-44 text-start text-xs sm:text-sm 2xl:text-base font-light tracking-widest ${
          isActive && "text-accent bg-accent/[0.03]"
        }`}
        onClick={setActive}
      >
        {category.toUpperCase()}

        {isActive && (
          <motion.span
            layoutId="activeCategory"
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 40,
            }}
            className="absolute w-[2px] bg-accent inset-y-0 right-0"
          ></motion.span>
        )}
      </button>
    </li>
  );
};

// TODO: animazione sullo sfondo quando clicco sulla categoria
