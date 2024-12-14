import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const myEmail = "dav.avagnano@gmail.com";

export const sendEmail = async (
  name: string,
  email: string,
  message: string
) => {
  return await resend.emails.send({
    from: "onboarding@resend.dev",
    to: myEmail,
    subject: `Nuovo messaggio da ${name}`,
    html: `
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Messaggio:</strong></p>
          <p>${message}</p>
        `,
  });
};
