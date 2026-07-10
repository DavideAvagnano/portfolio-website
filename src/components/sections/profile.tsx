import { useTranslations } from "next-intl"
import { Section } from "@/components/section"
import { sectionIndex } from "@/lib/nav"

// Profilo: narrativa in prosa (transizione di carriera → baricentro backend).
// Il primo paragrafo fa da "lead" (più grande, colore pieno), gli altri sono corpo
// in `muted-foreground`: gerarchia data da peso e colore, non da decorazioni.
const PARAGRAPHS = ["p1", "p2", "p3", "p4"] as const

export function Profile() {
  const t = useTranslations("profile")
  const tn = useTranslations("nav")

  return (
    <Section id="profile" index={sectionIndex("profile")} label={tn("profile")}>
      <div className="max-w-2xl">
        <p className="font-heading text-xl leading-snug text-pretty sm:text-2xl">
          {t("lead")}
        </p>

        <div className="mt-8 space-y-5">
          {PARAGRAPHS.map((key) => (
            <p
              key={key}
              className="leading-relaxed text-pretty text-muted-foreground"
            >
              {t(key)}
            </p>
          ))}
        </div>
      </div>
    </Section>
  )
}
