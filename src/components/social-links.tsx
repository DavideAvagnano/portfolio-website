import { siteConfig } from "@/lib/site"
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

// Link social come icone, condivisi tra hero e footer (prima erano duplicati).
// I nomi sono marchi/parole internazionali → nessuna traduzione necessaria, ma
// servono `aria-label` perché i link sono solo-icona.
//
// `-mx-2` + `p-2`: l'area di tap è ~36px (accessibile su mobile) mentre la prima
// icona resta otticamente allineata al testo sopra.
export function SocialLinks({ className }: { className?: string }) {
  const { github, linkedin, email } = siteConfig.author

  const links = [
    { label: "GitHub", href: github, Icon: GitHubIcon, external: true },
    { label: "LinkedIn", href: linkedin, Icon: LinkedInIcon, external: true },
    {
      label: "Email",
      href: `mailto:${email}`,
      Icon: MailIcon,
      external: false,
    },
  ]

  return (
    <ul className={cn("-mx-2 flex items-center gap-1", className)}>
      {links.map(({ label, href, Icon, external }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            {...(external
              ? { target: "_blank", rel: "noreferrer" }
              : undefined)}
            className="block p-2 text-foreground transition-colors hover:text-muted-foreground"
          >
            <Icon className="size-5" />
          </a>
        </li>
      ))}
    </ul>
  )
}
