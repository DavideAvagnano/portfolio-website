import { motion } from "framer-motion";
import { RiArrowDropRightLine } from "react-icons/ri";

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
  skill: string;
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
      className="flex items-center 2xl:text-lg"
    >
      <RiArrowDropRightLine size={25} className="text-accent" />
      {skill}
    </motion.li>
  );
};
