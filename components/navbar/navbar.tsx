"use client";

import { useEffect, useState } from "react";

import { navLinks } from "@/data/navbar-data";

import { Logo } from "@/components/navbar/logo";
import { NavItem } from "@/components/navbar/nav-item";
import { MobileMenu } from "@/components/navbar/mobile-menu";
import { SocialIcon } from "@/components/social-icon";
import { ResumeDialog } from "@/components/resume-dialog";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { BiMenuAltRight } from "react-icons/bi";

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [toggleMobileMenu, setToggleMobileMenu] = useState<boolean>(false);

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

  return (
    <>
      <header className="z-50 fixed top-0 w-full bg-background">
        <nav className="flex items-center justify-between max-w-screen-xl mx-auto px-6 py-4">
          {/* Logo */}
          <Logo />

          {/* Menu Desktop */}
          <ul className="hidden text-sm md:flex md:gap-6 lg:gap-8">
            {navLinks.map((item) => (
              <NavItem
                key={item.hash}
                name={item.name}
                hash={item.hash}
                isActive={activeSection === item.hash.substring(1)}
              />
            ))}
          </ul>

          {/* Social & Resume */}
          <div className="flex items-center gap-4">
            <SocialIcon
              link="https://github.com/DavideAvagnano"
              icon={<FaGithub size={22} />}
            />
            <SocialIcon
              link="https://www.linkedin.com/in/davide-avagnano/"
              icon={<FaLinkedin size={22} />}
            />
            <ResumeDialog />
          </div>

          {/* Mobile Menu */}
          <div
            onClick={() => setToggleMobileMenu((state) => !state)}
            className="md:hidden"
          >
            <BiMenuAltRight size={35} className="text-accent cursor-pointer" />
          </div>
        </nav>
      </header>

      <MobileMenu
        isOpen={toggleMobileMenu}
        onClose={() => setToggleMobileMenu(false)}
      />
    </>
  );
};
