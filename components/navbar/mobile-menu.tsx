import { navLinks } from "@/data/data-navbar";
import { NavItem } from "@/components/navbar/nav-item";
import { BiX } from "react-icons/bi";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  // TODO: modifica con spazio a sinistra ed effetto blur sfondo e in qeusto caso va anche messo listner per chiudere quando clicco fuori
  return (
    <div
      className={`fixed inset-0 z-50 bg-background transition-all ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-end p-6">
        <BiX
          size={35}
          className="text-accent cursor-pointer"
          onClick={onClose}
        />
      </div>
      <ul className="flex flex-col items-center justify-center gap-8 text-lg h-[calc(100%-80px)]">
        {navLinks.map((item) => (
          <NavItem
            key={item.hash}
            name={item.name}
            hash={item.hash}
            onClose={onClose}
          />
        ))}
      </ul>
    </div>
  );
};
