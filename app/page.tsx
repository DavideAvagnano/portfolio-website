import { Intro } from "@/components/intro/intro";
import { About } from "@/components/about/about";
import { Skills } from "@/components/skills/skills";

export default function WebSite() {
  return (
    <main className="flex flex-col justify-center items-center px-8">
      <Intro />
      <About />
      <Skills />
    </main>
  );
}
