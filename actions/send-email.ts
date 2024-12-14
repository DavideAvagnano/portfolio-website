"use server";

import * as z from "zod";
import { ContactSchema } from "@/schemas";

export const sendContactForm = async (
  formData: z.infer<typeof ContactSchema>
) => {
  const validatedFields = ContactSchema.safeParse(formData);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  //TODO: send Email with Resend

  return { success: "Email sent!" };
};
