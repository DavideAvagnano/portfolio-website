"use client";

import Link from "next/link";

interface NavItemProps {
  name: string;
  hash: string;
  isActive: boolean;
}

export const NavItem = ({ name, hash, isActive }: NavItemProps) => {
  // cosi non cambio url
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const section = document.querySelector(hash);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <li>
      <Link
        href={hash}
        onClick={onClick}
        className={`transition-all ${
          isActive ? "text-accent" : "hover:text-accent"
        }`}
      >
        {name}
      </Link>
    </li>
  );
};
