import { CheckCircle2 } from "lucide-react"

interface FormSuccessProps {
  message?: string
}

export function FormSuccess({ message }: FormSuccessProps) {
  if (!message) return null

  return (
    <div className="flex items-center gap-x-2 rounded-md bg-accent/15 p-3 text-sm text-accent">
      <CheckCircle2 className="size-4" />
      <p>{message}</p>
    </div>
  )
}
