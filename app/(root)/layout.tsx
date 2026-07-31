import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import { brand } from "@/config/brand";
import { businessId, businessAlternateNames, getBusinessIdentity } from "@/config/seo";
import "../globals.css";

const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(brand.website),
  title: "SERIFIL",
  description: "A SERIFIL é uma empresa de serigrafia e personalização em Guimarães, Portugal.",
  applicationName: brand.name,
  creator: brand.name,
  publisher: brand.name,
  alternates: {
    canonical: brand.website,
    languages: {
      "pt-PT": `${brand.website}pt/`,
      en: `${brand.website}en/`,
      "x-default": brand.website,
    },
  },
  robots: { index: false, follow: true },
};

export default function RedirectLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${brand.website}#website`,
        name: brand.name,
        alternateName: [...businessAlternateNames, "serifil.com"],
        url: brand.website,
        inLanguage: ["pt-PT", "en"],
        publisher: { "@id": businessId },
        about: { "@id": businessId },
      },
      getBusinessIdentity({
        description:
          "A SERIFIL é uma empresa portuguesa de serigrafia e personalização em Guimarães, especializada em impressão sobre PVC, tecido e TNT.",
        inLanguage: "pt-PT",
        mainEntityOfPage: `${brand.website}pt/`,
      }),
    ],
  };

  return (
    <html lang="pt-PT" className={`${archivo.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
