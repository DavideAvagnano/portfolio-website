import { motion } from "framer-motion";
import { SkillType } from "@/data/types";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 * index,
    },
  }),
};

interface SingleSkillProps {
  skill: SkillType;
  index: number;
}

export const SingleSkill = ({ skill, index }: SingleSkillProps) => {
  return (
    <motion.li
      variants={fadeInAnimationVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      custom={index}
      className="flex gap-2 items-center 2xl:text-lg"
    >
      <span className="text-accent">{skill.icon}</span>
      {skill.name}
    </motion.li>
  );
};
