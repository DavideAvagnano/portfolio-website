import Link from "next/link"
import { ReactNode } from "react"

interface SocialIconProps {
  link: string
  icon: ReactNode
  label: string
}

export const SocialIcon = ({ link, icon, label }: SocialIconProps) => {
  return (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      <div className="transition-all hover:text-accent">{icon}</div>
    </Link>
  )
}
