"use client";

import Link from "next/link";

interface NavItemProps {
  name: string;
  hash: string;
  isActive?: boolean;
  onClose?: () => void;
}

export const NavItem = ({ name, hash, isActive, onClose }: NavItemProps) => {
  // scroll alla sezione senza cambiare url
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const section = document.querySelector(hash);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    // Chiude il menu mobile, se onClose è definita
    if (onClose) {
      onClose();
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
