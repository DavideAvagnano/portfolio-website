import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "peer block max-h-40 w-full resize-none appearance-none border-b border-foreground-light bg-transparent px-0 py-2.5 text-sm text-foreground-light focus:outline-none focus:ring-0 sm:max-h-32",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
