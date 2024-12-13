import * as z from "zod";

export const ContactSchema = z.object({
  name: z.string().min(1, {
    message: "Il nome è obbligatorio.",
  }),
  email: z.string().email({
    message: "Inserisci un'email valida.",
  }),
  message: z
    .string()
    .min(20, {
      message: "Il messaggio deve contenere almeno 20 caratteri.",
    })
    .max(300, {
      message: "Il messaggio può contenere al massimo 300 caratteri.",
    }),
});
