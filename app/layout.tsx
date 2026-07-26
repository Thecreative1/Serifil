import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import { brand } from "@/config/brand";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: brand.website ? new URL(brand.website) : undefined,
  title: "Serifil | Impressão de Sacos para Calçado em Guimarães",
  description: "Impressão e personalização de sacos em tecido para calçado, sacos plásticos e capas guarda-fatos em Guimarães. Peça um orçamento à Serifil.",
  ...(brand.website ? { alternates: { canonical: brand.website } } : {}),
  openGraph: {
    title: "Serifil | Impressão de Sacos para Calçado em Guimarães",
    description: "Sacos em tecido para calçado, sacos plásticos e capas guarda-fatos personalizados em Guimarães.",
    locale: "pt_PT",
    type: "website",
    ...(brand.website ? {
      url: brand.website,
      images: [{
        url: new URL("images/hero-serigrafia.webp", brand.website).toString(),
        width: 1536,
        height: 1024,
        alt: "Processo de serigrafia na SERIFIL",
      }],
    } : {}),
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-PT" className={`${archivo.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
