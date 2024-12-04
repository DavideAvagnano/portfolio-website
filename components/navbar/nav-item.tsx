"use client";

import Link from "next/link";

interface NavItemProps {
  name: string;
  hash: string;
}

export const NavItem = ({ name, hash }: NavItemProps) => {
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
        className="hover:text-accent transition-all"
      >
        {name}
      </Link>
    </li>
  );
};
