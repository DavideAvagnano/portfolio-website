import Link from "next/link"
import { motion } from "motion/react"
import { projectsData } from "@/data/projects-data"

import { LuFolderCode } from "react-icons/lu"
import { SiGithub } from "react-icons/si"
import { RxOpenInNewWindow } from "react-icons/rx"

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 0.25 * index,
    },
  }),
}

type ProjectCardProps = (typeof projectsData)[number] & { index: number }

export const ProjectCard = ({
  title,
  description,
  demoUrl,
  gitHubUrl,
  tags,
  index,
}: ProjectCardProps) => {
  return (
    <motion.li
      variants={fadeInAnimationVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      custom={index}
      key={index}
    >
      <div className="group h-full rounded-lg bg-bg-light p-7 transition-all hover:-translate-y-3">
        <div className="flex h-full flex-col">
          {/* Heading */}
          <div className="flex items-center justify-between">
            <LuFolderCode size={30} className="text-accent" />
            <div className="flex items-center justify-center gap-3">
              {gitHubUrl && (
                <Link href={gitHubUrl} target="_blank">
                  <SiGithub
                    size={20}
                    className="transition-all hover:text-accent"
                  />
                </Link>
              )}
              {/* TODO: Auth app incompleta - problemi di build */}
              {demoUrl && (
                <Link href={demoUrl} target="_blank">
                  <RxOpenInNewWindow
                    size={25}
                    className="transition-all hover:text-accent"
                  />
                </Link>
              )}
            </div>
          </div>

          <div className="flex flex-grow flex-col">
            {/* Body */}
            <div className="flex flex-col gap-3 py-8">
              <p className="text-xl font-semibold transition-all group-hover:text-accent">
                {title}
              </p>
              <p className="text-sm font-light leading-loose text-foreground-light">
                {description}
              </p>
            </div>

            {/* Footer */}
            <ul className="mt-auto flex flex-wrap justify-center gap-y-3 text-foreground-light group-hover:text-accent">
              {tags.map((tag, index) => (
                <li key={index} className="text-sm transition-all">
                  {tag}
                  {index < tags.length - 1 && <span className="mx-2">-</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.li>
  )
}
