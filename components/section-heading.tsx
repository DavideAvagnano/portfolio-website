import Image from "next/image";
import image from "@/public/about-face-img.png";

interface SectionHeadingProps {
  label: string;
  hasImg?: boolean;
}

export const SectionHeading = ({ label, hasImg }: SectionHeadingProps) => {
  return (
    <h2 className="relative text-3xl sm:text-4xl flex items-center pb-10">
      <span className="whitespace-nowrap">{label}</span>
      <span className="bg-bg-lightest h-[1px] block ml-5 w-full max-w-80"></span>

      {hasImg && (
        <div className="md:hidden absolute z-10 right-0 size-20 sm:size-28 rounded-full">
          <Image
            src={image}
            alt="Davide's Image, s software engineer with a background in aerospace engineering"
            fill
            className="rounded-full bg-background"
          />
        </div>
      )}
    </h2>
  );
};
