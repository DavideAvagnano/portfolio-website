import { Intro } from "@/components/intro/intro";
import { About } from "@/components/about/about";

export default function WebSite() {
  return (
    <main className="flex flex-col justify-center items-center">
      <Intro />
      <About />
    </main>
  );
}
