import Image from "next/image";
import image from "@/public/about-full-img-min.png";
import { SectionHeading } from "@/components/section-heading";

export const About = () => {
  return (
    <section id="about" className="max-w-screen-lg mx-auto py-24">
      <SectionHeading label="/about me" hasImg />

      <div className="md:flex md:justify-between md:gap-10">
        <div className="md:basis-2/3 flex flex-col gap-5 text-foreground-light leading-loose">
          <p>
            Hi! I&apos;m Davide, a{" "}
            <span className="font-semibold">software engineer</span> with a
            background in{" "}
            <span className="font-semibold">aerospace engineering</span>. My
            passion for programming started during my studies, where I
            discovered my love for problem-solving and building impactful
            solutions. After transitioning into tech, I dove into full-stack
            development, focusing on creating fast, scalable, and efficient web
            applications.
          </p>
          <p>
            These days, my core stack includes{" "}
            <span className="text-accent">React</span>,{" "}
            <span className="text-accent">Next.js</span>,{" "}
            <span className="text-accent">TypeScript</span>, and{" "}
            <span className="text-accent">TailwindCSS</span>, and I&apos;ve
            recently been expanding my backend skills with technologies like{" "}
            <span className="font-semibold">Node.js</span>,{" "}
            <span className="font-semibold">Prisma</span>, and{" "}
            <span className="font-semibold">MongoDB</span>. I&apos;m currently
            seeking a full-time role as a software developer, where I can
            contribute to creating large-scale, high-impact products.
          </p>
          <p>
            Outside of coding, I enjoy exploring the blockchain world and
            staying updated on emerging technologies.
          </p>
        </div>
        <div className="hidden md:block md:basis-1/3 relative">
          <Image
            src={image}
            alt="Davide's Image, s software engineer with a background in aerospace engineering"
            fill
            className="object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
};
