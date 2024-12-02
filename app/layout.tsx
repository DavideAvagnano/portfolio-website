import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Davide Avagnano",
  description:
    "Davide Avagnano is a web developer specializing in building accessible, scalable, and high-performance applications using React and the Next.js ecosystem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
