"use server";

import * as z from "zod";
import { ContactSchema } from "@/schemas";
import { sendEmail } from "@/lib/mail";

export const sendContactForm = async (
  formData: z.infer<typeof ContactSchema>
) => {
  const validatedFields = ContactSchema.safeParse(formData);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, email, message } = validatedFields.data;

  try {
    await sendEmail(name, email, message);
    return { success: "Email sent!" };
  } catch (err) {
    console.error("Error sending email:", err);
    return {
      error: "Error sending email. Please try again later.",
    };
  }
};
