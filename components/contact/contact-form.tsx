"use client";

import * as z from "zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactSchema } from "@/schemas";
import { sendContactForm } from "@/actions/send-email";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/contact/form-error";
import { FormSuccess } from "@/components/contact/form-success";

export const ContactForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSucces] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (formData: z.infer<typeof ContactSchema>) => {
    setError("");
    setSucces("");

    startTransition(() => {
      sendContactForm(formData)
        .then((data) => {
          if (data.error) {
            setError(data.error);

            setTimeout(() => {
              setError("");
            }, 3000);
          }

          if (data.success) {
            setSucces(data.success);

            setTimeout(() => {
              setSucces("");
            }, 3000);

            form.reset();
          }
        })
        .catch(() => {
          setError("Something went wrong!");

          setTimeout(() => {
            setError("");
          }, 3000);
        });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-lg mx-auto space-y-12"
      >
        <div className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder=" " disabled={isPending} />
                </FormControl>
                <FormLabel>Name</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder=" "
                    type="email"
                    disabled={isPending}
                  />
                </FormControl>
                <FormLabel>Email</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea {...field} placeholder=" " disabled={isPending} />
                </FormControl>
                <FormLabel>Message</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormError message={error} />
        <FormSuccess message={success} />

        <div className=" flex justify-center items-center">
          <Button
            variant="outline"
            className="w-1/2 font-medium text-base"
            disabled={isPending}
          >
            Send
          </Button>
        </div>
      </form>
    </Form>
  );
};

// TODO: invece che mostrare i messaggi in questo modo potrei usare un toast (shadcn)
