import { SectionHeading } from "@/components/section-heading";
import { ContactForm } from "@/components/contact/contact-form";

export const Contact = () => {
  return (
    <section id="contact" className="section">
      <SectionHeading label="/contact" />

      <p className="pb-10 max-w-xl mx-auto text-center text-foreground-light">
        Whether you have a question, or just want to say hi, feel free to drop
        me a message. I'll get back to you as soon as possible.
      </p>

      <ContactForm />
    </section>
  );
};
