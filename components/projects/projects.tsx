"use client";

import { useState } from "react";
import { projectsCategories, projectsData } from "@/data/projects-data";

import { ProjectCategoryType } from "@/types/types";

import { SectionHeading } from "@/components/section-heading";
import { ProjectCategory } from "@/components/projects/project-category";
import { ProjectCard } from "@/components/projects/project-card";

export const Projects = () => {
  const [activeCategory, setActiveCategory] =
    useState<ProjectCategoryType>("all");

  const filteredProjects =
    activeCategory === "all"
      ? projectsData
      : projectsData.filter((project) => project.category === activeCategory);

  return (
    <section id="projects" className="section">
      <SectionHeading label="/projects" />

      {/* Categorie */}
      <ul className="flex items-center text-foreground-light">
        {projectsCategories.map((category) => (
          <ProjectCategory
            key={category}
            category={category}
            isActive={activeCategory === category}
            setActive={() => setActiveCategory(category)}
          />
        ))}
      </ul>

      {/* Progetti filtrati */}
      <ul className="pt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.title} index={index} {...project} />
        ))}
      </ul>
    </section>
  );
};
