import { cn } from "@/lib/utils"

// Marchio "D" come SVG **inline** invece che `next/image`:
// - si adatta al tema via token (quadrato = `foreground`, lettera = `background`)
//   → nel dark si inverte da solo, mentre un PNG resterebbe un quadrato nero su
//   fondo nero;
// - nessuna richiesta di rete e nitido a qualsiasi dimensione (niente `width`/
//   `height` da indovinare).
// La versione raster del marchio serve solo come `src/app/favicon.ico`.
//
// Decorativo: `aria-hidden`. Chi lo usa come link deve dare un `aria-label`.
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
      className={cn("size-7", className)}
    >
      <rect width="100" height="100" rx="22" className="fill-foreground" />
      <path
        d="M26 22 H48 C64 22 74 33 74 50 C74 67 64 78 48 78 H26 Z M36 34 H48 C56 34 62 40 62 50 C62 60 56 66 48 66 H36 Z"
        fillRule="evenodd"
        className="fill-background"
      />
    </svg>
  )
}
