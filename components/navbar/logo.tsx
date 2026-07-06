import Link from "next/link"

export const Logo = () => {
  return (
    <Link href="/" className="text-xl font-semibold xl:text-2xl">
      <span className="text-accent">{"<"}</span>
      DA
      <span className="text-accent">{" />"}</span>
    </Link>
  )
}
