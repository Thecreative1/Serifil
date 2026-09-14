import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { Footer } from "@/components/layout/Footer";
import { LocalePreference } from "@/components/LocalePreference";
import { GuidesIndex } from "@/components/sections/GuidesIndex";
import { brand } from "@/config/brand";
import { absoluteUrl, getBusinessIdentity } from "@/config/seo";
import {
  getGuideIndexHreflangPaths,
  getGuideIndexPath,
  getGuideLanguageHrefs,
  getGuidePath,
  getPublishedGuides,
  guideLocales,
  guidesUi,
  isGuideLocale,
} from "@/data/guides";
import { translations } from "@/data/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return guideLocales
    .filter((locale) => getPublishedGuides(locale).length > 0)
    .map((locale) => ({ locale }));
}

function absoluteLanguages(paths: Record<string, string>) {
  return Object.fromEntries(Object.entries(paths).map(([language, path]) => [language, absoluteUrl(path)]));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isGuideLocale(locale)) return {};

  const ui = guidesUi[locale];
  const canonical = absoluteUrl(getGuideIndexPath(locale));
  const imageUrl = absoluteUrl("/og.jpg");

  return {
    title: ui.metaTitle,
    description: ui.metaDescription,
    alternates: {
      canonical,
      languages: absoluteLanguages(getGuideIndexHreflangPaths()),
    },
    openGraph: {
      title: ui.metaTitle,
      description: ui.metaDescription,
      siteName: brand.name,
      type: "website",
      url: canonical,
      locale: ui.ogLocale,
      alternateLocale: guideLocales.filter((item) => item !== locale).map((item) => guidesUi[item].ogLocale),
      images: [{ url: imageUrl, width: 1200, height: 630, alt: translations[locale].meta.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: ui.metaTitle,
      description: ui.metaDescription,
      images: [{ url: imageUrl, alt: translations[locale].meta.imageAlt }],
    },
  };
}

export default async function GuidesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isGuideLocale(locale)) notFound();

  const guides = getPublishedGuides(locale);
  if (guides.length === 0) notFound();

  const copy = translations[locale];
  const ui = guidesUi[locale];
  const homePath = `/${locale}/`;
  const indexPath = getGuideIndexPath(locale);
  const canonical = absoluteUrl(indexPath);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonical}#collection`,
        name: ui.title,
        description: ui.metaDescription,
        url: canonical,
        inLanguage: ui.htmlLang,
        publisher: getBusinessIdentity({
          description: copy.businessDescription,
          inLanguage: copy.htmlLang,
          mainEntityOfPage: absoluteUrl(homePath),
        }),
        mainEntity: {
          "@type": "ItemList",
          itemListElement: guides.map((guide, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: guide.title,
            url: absoluteUrl(getGuidePath(locale, guide.slug)),
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: ui.home, item: absoluteUrl(homePath) },
          { "@type": "ListItem", position: 2, name: ui.sectionName, item: canonical },
        ],
      },
    ],
  };

  return (
    <>
      <LocalePreference locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Header
        locale={locale}
        copy={copy.header}
        homeHref={homePath}
        languageHrefs={getGuideLanguageHrefs()}
        activeHref={indexPath}
      />
      <GuidesIndex locale={locale} guides={guides} />
      <FloatingContact copy={copy.contact} />
      <Footer copy={copy.footer} headerCopy={copy.header} homeHref={homePath} />
    </>
  );
}
