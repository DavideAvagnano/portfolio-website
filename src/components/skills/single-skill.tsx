import { motion } from "motion/react"
import { SkillType } from "@/types/types"

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
}

interface SingleSkillProps {
  skill: SkillType
  index: number
}

export const SingleSkill = ({ skill, index }: SingleSkillProps) => {
  return (
    <motion.li
      variants={fadeInAnimationVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      custom={index}
      className="flex items-center gap-2 2xl:text-lg"
    >
      <span className="text-accent">{skill.icon}</span>
      {skill.name}
    </motion.li>
  )
}
