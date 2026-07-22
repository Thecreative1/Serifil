import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import { brand } from "@/config/brand";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "Serifil | Serigrafia e Personalização em Guimarães",
  description: "Serigrafia, impressão em plástico e sacos, personalização têxtil, roupa profissional, merchandising e gravação laser em Guimarães. Peça um orçamento para o seu projeto.",
  ...(brand.website ? { metadataBase: new URL(brand.website), alternates: { canonical: "/" } } : {}),
  openGraph: {
    title: "Serifil | Serigrafia e Personalização em Guimarães",
    description: "Produção profissional em Guimarães, da ideia à peça final.",
    locale: "pt_PT",
    type: "website",
    ...(brand.website ? { images: [{ url: "/images/hero-serigrafia.webp", width: 1536, height: 1024, alt: "Processo de serigrafia na SERIFIL" }] } : {}),
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-PT" className={`${archivo.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
