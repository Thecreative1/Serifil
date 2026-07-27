import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import "../globals.css";

const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "Serifil",
  description: "Serigrafia e personalização em Guimarães, Portugal.",
  robots: { index: false, follow: true },
};

export default function RedirectLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-PT" className={`${archivo.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
