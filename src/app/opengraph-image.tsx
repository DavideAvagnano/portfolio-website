import { ImageResponse } from "next/og"
import { siteConfig } from "@/lib/site"

// Immagine OpenGraph generata a build-time con next/og. Next la collega
// automaticamente a og:image e twitter:image. Colori allineati al tema del sito.
export const alt = siteConfig.title
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        backgroundColor: "hsl(216, 65%, 11%)",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 34,
          color: "hsl(166, 100%, 70%)",
          letterSpacing: "0.05em",
        }}
      >
        hi, Davide here.
      </div>
      <div
        style={{
          marginTop: 24,
          fontSize: 88,
          fontWeight: 700,
          color: "hsl(226, 70%, 88%)",
          lineHeight: 1.1,
        }}
      >
        Software Engineer
      </div>
      <div
        style={{
          marginTop: 32,
          fontSize: 36,
          color: "hsl(225, 20%, 65%)",
          maxWidth: 900,
        }}
      >
        I build fast, scalable, and impactful web apps with React & Next.js.
      </div>
    </div>,
    size
  )
}
