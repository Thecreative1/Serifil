import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LocalePreference } from "@/components/LocalePreference";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { brand } from "@/config/brand";
import { isLocale, locales, translations } from "@/data/i18n";
import {
  getServiceAlternates,
  getServicePage,
  getServicePath,
  serviceKeys,
  servicePages,
} from "@/data/service-pages";

export const dynamicParams = false;

function absoluteUrl(path: string) {
  return new URL(path, brand.website).toString();
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    serviceKeys.map((key) => ({
      locale,
      slug: servicePages[locale][key].slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) return {};

  const page = getServicePage(localeParam, slug);
  if (!page) return {};

  const alternates = getServiceAlternates(page.key);
  const canonical = absoluteUrl(getServicePath(localeParam, page.key));
  const imageUrl = absoluteUrl(page.image.src);

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical,
      languages: {
        "pt-PT": absoluteUrl(alternates["pt-PT"]),
        en: absoluteUrl(alternates.en),
        "x-default": absoluteUrl(alternates["x-default"]),
      },
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      siteName: brand.name,
      type: "website",
      url: canonical,
      locale: localeParam === "pt" ? "pt_PT" : "en_GB",
      alternateLocale: localeParam === "pt" ? ["en_GB"] : ["pt_PT"],
      images: [{
        url: imageUrl,
        alt: page.image.alt,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
      images: [{ url: imageUrl, alt: page.image.alt }],
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();

  const page = getServicePage(localeParam, slug);
  if (!page) notFound();

  const copy = translations[localeParam];
  const homePath = `/${localeParam}/`;
  const alternates = getServiceAlternates(page.key);
  const canonical = absoluteUrl(getServicePath(localeParam, page.key));
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${canonical}#service`,
        name: page.shortName,
        description: page.metaDescription,
        url: canonical,
        image: absoluteUrl(page.image.src),
        provider: {
          "@type": "LocalBusiness",
          "@id": `${brand.website}#business`,
          name: brand.name,
          url: brand.website,
          telephone: brand.phone,
          address: {
            "@type": "PostalAddress",
            streetAddress: brand.address,
            addressLocality: "Guimarães",
            addressRegion: "Braga",
            addressCountry: "PT",
          },
        },
        areaServed: {
          "@type": "City",
          name: "Guimarães",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: localeParam === "pt" ? "Início" : "Home",
            item: absoluteUrl(homePath),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: page.shortName,
            item: canonical,
          },
        ],
      },
    ],
  };

  return (
    <>
      <LocalePreference locale={localeParam} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Header
        locale={localeParam}
        copy={copy.header}
        homeHref={homePath}
        languageHrefs={{
          pt: alternates["pt-PT"],
          en: alternates.en,
        }}
      />
      <ServiceDetail locale={localeParam} page={page} />
      <Footer copy={copy.footer} headerCopy={copy.header} homeHref={homePath} />
    </>
  );
}
