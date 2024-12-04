"use client";

import { useEffect, useState } from "react";

import { navLinks } from "@/data/data-navbar";
import { Logo } from "@/components/navbar/logo";
import { NavItem } from "@/components/navbar/nav-item";
import { SocialIcon } from "@/components/social-icon";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 } // entra almeno 60% della sezione
    );

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // TODO: scaricare cv in ita o eng tramite popover
  // TODO: componente <ResumeButton />

  return (
    <header className="fixed top-0 w-full bg-background">
      <nav className="flex items-center justify-between max-w-screen-xl mx-auto p-6">
        <Logo />

        <ul className="hidden text-sm md:flex gap-8">
          {navLinks.map((item) => (
            <NavItem
              key={item.hash}
              name={item.name}
              hash={item.hash}
              isActive={activeSection === item.hash.substring(1)}
            />
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <SocialIcon
            link="https://github.com/DavideAvagnano"
            icon={<FaGithub size={22} />}
          />
          <SocialIcon
            link="https://www.linkedin.com/in/davide-avagnano/"
            icon={<FaLinkedin size={22} />}
          />
          <a href="/cv_ita_test.pdf" download aria-label="download CV">
            <Button variant="outline">Resume</Button>
          </a>
        </div>

        <div className="md:hidden">menu</div>
      </nav>
    </header>
  );
};
