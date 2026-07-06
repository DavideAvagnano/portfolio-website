import Link from "next/link"
import { ReactNode } from "react"

interface SocialIconProps {
  link: string
  icon: ReactNode
}

export const SocialIcon = ({ link, icon }: SocialIconProps) => {
  return (
    <Link href={link} target="_blank">
      <div className="transition-all hover:text-accent">{icon}</div>
    </Link>
  )
}
