import { Home } from "@/components/home/home";
import { About } from "@/components/about/about";

export default function WebSite() {
  return (
    <main className="flex flex-col justify-center items-center">
      <Home />
      <About />
    </main>
  );
}
