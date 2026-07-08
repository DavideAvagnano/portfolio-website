"use server"

import { ContactSchema, type ContactValues } from "@/schemas"
import { sendEmail } from "@/lib/mail"

/**
 * Esito della server action. Niente testi: solo un **codice**, che il client
 * traduce nella lingua corrente (il server non conosce la locale del form).
 */
export type ContactResult =
  { ok: true } | { ok: false; error: "invalid" | "send" }

export const sendContactForm = async (
  formData: ContactValues
): Promise<ContactResult> => {
  const validatedFields = ContactSchema.safeParse(formData)

  if (!validatedFields.success) {
    return { ok: false, error: "invalid" }
  }

  const { name, email, message } = validatedFields.data

  try {
    await sendEmail(name, email, message)
    return { ok: true }
  } catch (err) {
    console.error("Error sending email:", err)
    return { ok: false, error: "send" }
  }
}
