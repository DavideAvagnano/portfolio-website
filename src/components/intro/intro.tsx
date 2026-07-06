"use client"

import { Button } from "@/components/ui/button"

export const Intro = () => {
  const scrollToProjects = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const projectsSection = document.querySelector("#projects")
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="intro"
      className="flex min-h-screen max-w-160 flex-col items-center justify-center gap-5 text-center md:pt-40"
    >
      <h1 className="flex items-center justify-center gap-2 text-4xl sm:text-6xl md:text-7xl">
        <span className="font-semibold">
          hi, <span className="text-accent">Davide</span> here.
        </span>
        <span className="animate-blink text-accent">|</span>
      </h1>
      <p className="text-xl text-foreground-light sm:text-2xl md:text-[28px]">
        I build fast, scalable, and impactful web apps.
      </p>
      <p className="text-foreground-light md:text-lg">
        I&apos;m a software engineer with a background in aerospace engineering.
        I&apos;m fascinated by large-scale products and contributing to building
        web applications with React and Next.js.
      </p>
      <Button
        variant="outline"
        size="lg"
        className="mt-6 h-14 font-normal sm:text-base"
        onClick={scrollToProjects}
      >
        View my projects!
      </Button>
    </section>
  )
}
