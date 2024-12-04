import { navLinks } from "@/data/data-navbar";
import { Logo } from "@/components/navbar/logo";
import { NavItem } from "@/components/navbar/nav-item";

import { SocialIcon } from "@/components/social-icon";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export const Navbar = () => {
  return (
    <header className="fixed top-0 w-full bg-background">
      <nav className="flex items-center justify-between max-w-screen-xl mx-auto px-4 py-6">
        <Logo />

        <ul className="hidden md:flex gap-8">
          {navLinks.map((item) => (
            <NavItem key={item.hash} name={item.name} hash={item.hash} />
          ))}
        </ul>

        <div className="flex gap-4">
          <SocialIcon
            link="https://github.com/DavideAvagnano"
            icon={<FaGithub size={22} />}
          />
          <SocialIcon
            link="https://www.linkedin.com/in/davide-avagnano/"
            icon={<FaLinkedin size={22} />}
          />
        </div>

        <div className="md:hidden">menu</div>
      </nav>
    </header>
  );
};
