"use client";

import { Button } from "@/components/ui/button";

export const Intro = () => {
  const scrollToProjects = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const projectsSection = document.querySelector("#projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="intro"
      className="max-w-screen-sm min-h-screen flex flex-col items-center justify-center gap-5 text-center md:pt-40"
    >
      <h1 className="text-4xl sm:text-6xl md:text-7xl flex items-center justify-center gap-2">
        <span className="font-semibold">
          hi, <span className="text-accent">Davide</span> here.
        </span>
        <span className="text-accent motion-preset-blink motion-duration-1500">
          |
        </span>
      </h1>
      <p className="text-xl sm:text-2xl md:text-[28px] text-foreground-light">
        I build fast, scalable, and impactful web apps.
      </p>
      <p className="md:text-lg text-foreground-light">
        I&apos;m a software engineer with a background in aerospace engineering.
        I&apos;m fascinated by large-scale products and contributing to building
        web applications with React and Next.js.
      </p>
      <Button
        variant="outline"
        size="lg"
        className="sm:text-base h-14 mt-6 font-normal"
        onClick={scrollToProjects}
      >
        View my projects!
      </Button>
    </section>
  );
};
