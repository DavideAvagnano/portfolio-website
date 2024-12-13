import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "block py-2.5 px-0 w-full text-sm text-foreground-light bg-transparent border-b border-foreground-light appearance-none focus:outline-none focus:ring-0 peer max-h-40 sm:max-h-32 resize-none",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
