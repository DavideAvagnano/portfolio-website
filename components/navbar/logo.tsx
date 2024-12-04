import Link from "next/link";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export const Logo = () => {
  return (
    <Link href="/" className={`${poppins.className} text-xl font-semibold`}>
      <span className="text-accent">{"<"}</span>
      DA
      <span className="text-accent">{" />"}</span>
    </Link>
  );
};
