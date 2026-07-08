import * as z from "zod"

export const MESSAGE_MIN = 20
export const MESSAGE_MAX = 400

/** Testi degli errori di validazione: sul client arrivano dai messaggi i18n. */
export type ContactErrorMessages = {
  nameRequired: string
  emailInvalid: string
  messageMin: string
  messageMax: string
}

/**
 * Lo schema è una **factory** perché i messaggi d'errore sono tradotti: il client
 * lo costruisce con `useTranslations`, il server con i testi neutri qui sotto —
 * che non vengono mai mostrati, perché la server action risponde con un **codice**
 * d'errore e la traduzione avviene sul client.
 */
export function createContactSchema(messages: ContactErrorMessages) {
  return z.object({
    name: z.string().trim().min(1, messages.nameRequired),
    email: z.email(messages.emailInvalid),
    message: z
      .string()
      .trim()
      .min(MESSAGE_MIN, messages.messageMin)
      .max(MESSAGE_MAX, messages.messageMax),
  })
}

/** Schema di ri-validazione lato server (non ci si fida mai del client). */
export const ContactSchema = createContactSchema({
  nameRequired: "Name is required.",
  emailInvalid: "Invalid email address.",
  messageMin: `Message must be at least ${MESSAGE_MIN} characters.`,
  messageMax: `Message must be at most ${MESSAGE_MAX} characters.`,
})

export type ContactValues = z.infer<typeof ContactSchema>
