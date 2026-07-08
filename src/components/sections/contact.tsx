import { useTranslations } from "next-intl"
import { Section } from "@/components/section"
import { sectionIndex } from "@/lib/nav"
import { ContactForm } from "@/components/contact-form"
import { buttonVariants } from "@/components/ui/button"
import { siteConfig } from "@/lib/site"
import { cn } from "@/lib/utils"

// Contatti: blocco CTA (server, statico) + form (client, interattivo). Tenerli
// separati fa sì che solo il form finisca nel bundle client.
// Qui l'indirizzo email è scritto per esteso: è il posto giusto per farlo (nel
// footer resta la sola icona, per non ripetere lo stesso dato).
export function Contact() {
  const t = useTranslations("contact")
  const tn = useTranslations("nav")
  const { email } = siteConfig.author

  return (
    <Section id="contact" index={sectionIndex("contact")} label={tn("contact")}>
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h3 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {t("title")}
          </h3>
          <p className="mt-5 max-w-sm leading-relaxed text-pretty text-muted-foreground">
            {t("intro")}
          </p>

          <div className="mt-10 space-y-1">
            <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
              {t("emailLabel")}
            </p>
            <a
              href={`mailto:${email}`}
              className={cn(buttonVariants({ variant: "link" }), "-ml-2.5")}
            >
              {email}
            </a>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">{t("location")}</p>
        </div>

        <ContactForm />
      </div>
    </Section>
  )
}
