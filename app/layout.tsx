import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import { Navbar } from "@/components/navbar/navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

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
      <body className={poppins.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
