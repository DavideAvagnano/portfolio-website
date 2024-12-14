import { CheckCircle2 } from "lucide-react";

interface FormSuccessProps {
  message?: string;
}

export function FormSuccess({ message }: FormSuccessProps) {
  if (!message) return null;

  return (
    <div className="bg-accent/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-accent">
      <CheckCircle2 className="size-4" />
      <p>{message}</p>
    </div>
  );
}
