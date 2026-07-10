import { Resend } from "resend"
import { siteConfig } from "@/lib/site"

const resend = new Resend(process.env.RESEND_API_KEY)

const ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
}

// Il contenuto del form finisce dentro l'HTML della mail: senza escaping, chiunque
// potrebbe iniettare markup (o un link mascherato) nella casella di Davide.
const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => ESCAPES[char])

export const sendEmail = async (
  name: string,
  email: string,
  message: string
) => {
  return await resend.emails.send({
    from: "onboarding@resend.dev",
    to: siteConfig.author.email,
    // `replyTo`: rispondere alla mail scrive direttamente a chi ha compilato il
    // form (il `from` è il mittente tecnico di Resend).
    replyTo: email,
    subject: `Nuovo messaggio da ${name}`,
    html: `
          <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Messaggio:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
        `,
  })
}
