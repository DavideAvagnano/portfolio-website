"use client"

import { useId, useTransition } from "react"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

import { sendContactForm } from "@/actions/send-email"
import {
  MESSAGE_MAX,
  MESSAGE_MIN,
  createContactSchema,
  type ContactValues,
} from "@/schemas"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm() {
  const t = useTranslations("contact.form")
  const te = useTranslations("contact.form.errors")

  const [isPending, startTransition] = useTransition()

  const id = useId()
  const nameId = `${id}-name`
  const emailId = `${id}-email`
  const messageId = `${id}-message`

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ContactValues>({
    // Lo schema si costruisce coi messaggi tradotti: la validazione client parla
    // la lingua del sito (il server ri-valida per conto suo).
    resolver: zodResolver(
      createContactSchema({
        nameRequired: te("nameRequired"),
        emailInvalid: te("emailInvalid"),
        messageMin: te("messageMin", { min: MESSAGE_MIN }),
        messageMax: te("messageMax", { max: MESSAGE_MAX }),
      })
    ),
    defaultValues: { name: "", email: "", message: "" },
  })

  // `useWatch` e non `form.watch()`: il secondo restituisce una funzione che il
  // React Compiler non sa memoizzare → salterebbe la compilazione del componente.
  const messageLength = useWatch({ control, name: "message" }).length

  const onSubmit = (values: ContactValues) => {
    startTransition(async () => {
      const result = await sendContactForm(values)

      if (result.ok) {
        reset()
        toast.success(t("success"))
        return
      }

      toast.error(t(result.error === "invalid" ? "errorInvalid" : "errorSend"))
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FieldGroup>
        <Field data-invalid={Boolean(errors.name)}>
          <FieldLabel htmlFor={nameId}>{t("name")}</FieldLabel>
          <Input
            id={nameId}
            autoComplete="name"
            placeholder={t("namePlaceholder")}
            className="h-10"
            aria-invalid={Boolean(errors.name)}
            {...register("name")}
          />
          <FieldError errors={[errors.name]} />
        </Field>

        <Field data-invalid={Boolean(errors.email)}>
          <FieldLabel htmlFor={emailId}>{t("email")}</FieldLabel>
          <Input
            id={emailId}
            type="email"
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
            className="h-10"
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
          <FieldError errors={[errors.email]} />
        </Field>

        <Field data-invalid={Boolean(errors.message)}>
          <FieldLabel htmlFor={messageId} className="w-full justify-between">
            {t("message")}
            <span
              aria-hidden
              className="text-xs font-normal text-muted-foreground tabular-nums"
            >
              {messageLength}/{MESSAGE_MAX}
            </span>
          </FieldLabel>
          <Textarea
            id={messageId}
            rows={6}
            placeholder={t("messagePlaceholder")}
            className="min-h-32"
            aria-invalid={Boolean(errors.message)}
            {...register("message")}
          />
          <FieldError errors={[errors.message]} />
        </Field>

        <Button type="submit" disabled={isPending} className="w-fit">
          {isPending ? t("sending") : t("submit")}
        </Button>
      </FieldGroup>
    </form>
  )
}
