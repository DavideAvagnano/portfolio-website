import Image from "next/image"
import image from "@/public/about-face-img.png"

interface SectionHeadingProps {
  label: string
  hasImg?: boolean
}

export const SectionHeading = ({ label, hasImg }: SectionHeadingProps) => {
  return (
    <h2 className="relative flex items-center pb-10 text-3xl sm:text-4xl">
      <span className="whitespace-nowrap">{label}</span>
      <span className="ml-5 block h-[1px] w-full max-w-80 bg-bg-lightest"></span>

      {hasImg && (
        <div className="absolute right-0 size-20 rounded-full sm:size-28 md:hidden">
          <Image
            src={image}
            alt="Davide's Image, s software engineer with a background in aerospace engineering"
            fill
            className="rounded-full bg-background transition-all hover:scale-105"
          />
        </div>
      )}
    </h2>
  )
}
