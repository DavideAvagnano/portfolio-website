import Link from "next/link";
import { motion } from "framer-motion";
import { projectsData } from "@/data/projects-data";

import { LuFolderCode } from "react-icons/lu";
import { SiGithub } from "react-icons/si";
import { RxOpenInNewWindow } from "react-icons/rx";

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
};

type ProjectCardProps = (typeof projectsData)[number] & { index: number };

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
      <div className="group p-7 bg-bg-light rounded-lg h-full hover:-translate-y-3 transition-all">
        <div className="h-full flex flex-col">
          {/* Heading */}
          <div className="flex justify-between items-center">
            <LuFolderCode size={30} className="text-accent" />
            <div className="flex items-center justify-center gap-3">
              {gitHubUrl && (
                <Link href={gitHubUrl} target="_blank">
                  <SiGithub
                    size={20}
                    className="hover:text-accent transition-all"
                  />
                </Link>
              )}
              {/* TODO: Auth app incompleta - problemi di build */}
              {demoUrl && (
                <Link href={demoUrl} target="_blank">
                  <RxOpenInNewWindow
                    size={25}
                    className="hover:text-accent transition-all"
                  />
                </Link>
              )}
            </div>
          </div>

          <div className="flex flex-col flex-grow">
            {/* Body */}
            <div className="py-8 flex flex-col gap-3">
              <p className="font-semibold text-xl group-hover:text-accent transition-all">
                {title}
              </p>
              <p className="text-foreground-light font-light text-sm leading-loose">
                {description}
              </p>
            </div>

            {/* Footer */}
            <ul className="mt-auto flex justify-center flex-wrap gap-y-3 text-foreground-light group-hover:text-accent">
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
  );
};
