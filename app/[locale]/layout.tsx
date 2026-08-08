import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Archivo, Inter } from "next/font/google";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { brand } from "@/config/brand";
import { isLocale, locales, translations, type Locale } from "@/data/i18n";
import "../globals.css";

const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const dynamicParams = false;

export const viewport: Viewport = {
  themeColor: "#111210",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};

  const locale = localeParam as Locale;
  const copy = translations[locale];
  const canonical = `${brand.website}${locale}/`;
  const imageUrl = `${brand.website}og.jpg`;

  return {
    metadataBase: new URL(brand.website),
    applicationName: brand.name,
    title: copy.meta.title,
    description: copy.meta.description,
    creator: brand.name,
    publisher: brand.name,
    category: locale === "pt" ? "Serigrafia e personalização" : "Screen printing and customisation",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical,
      languages: {
        "pt-PT": `${brand.website}pt/`,
        en: `${brand.website}en/`,
        "x-default": `${brand.website}pt/`,
      },
    },
    openGraph: {
      title: copy.meta.title,
      description: copy.meta.openGraphDescription,
      siteName: brand.name,
      locale: copy.meta.locale,
      alternateLocale: locale === "pt" ? ["en_GB"] : ["pt_PT"],
      type: "website",
      url: canonical,
      images: [{
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: copy.meta.imageAlt,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.meta.title,
      description: copy.meta.openGraphDescription,
      images: [{
        url: imageUrl,
        alt: copy.meta.imageAlt,
      }],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={translations[locale].htmlLang} className={`${archivo.variable} ${inter.variable}`}>
      <body>
        <GoogleAnalytics copy={translations[locale].analytics} />
        {children}
      </body>
    </html>
  );
}
