import { Intro } from "@/components/intro/intro";
import { About } from "@/components/about/about";
import { Skills } from "@/components/skills/skills";
import { Projects } from "@/components/projects/projects";
import { Contact } from "@/components/contact/contact";
import { Footer } from "@/components/footer/footer";

export default function WebSite() {
  return (
    <main className="flex flex-col justify-center items-center px-8">
      <Intro />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
