import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { Footer } from "@/components/layout/Footer";
import { LocalePreference } from "@/components/LocalePreference";
import { GuideArticle } from "@/components/sections/GuideArticle";
import { brand } from "@/config/brand";
import { absoluteUrl, businessId, getBusinessIdentity } from "@/config/seo";
import {
  getGuideHreflangPaths,
  getGuideImages,
  getGuideIndexPath,
  getGuideLanguageHrefs,
  getGuidePath,
  getPublishedGuide,
  getPublishedGuides,
  guideLocales,
  guidesUi,
  isGuideLocale,
} from "@/data/guides";
import { translations } from "@/data/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return guideLocales.flatMap((locale) =>
    getPublishedGuides(locale).map((guide) => ({ locale, slug: guide.slug })),
  );
}

function absoluteLanguages(paths: Record<string, string>) {
  return Object.fromEntries(Object.entries(paths).map(([language, path]) => [language, absoluteUrl(path)]));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isGuideLocale(locale)) return {};

  const guide = getPublishedGuide(locale, slug);
  if (!guide) return {};

  const ui = guidesUi[locale];
  const canonical = absoluteUrl(getGuidePath(locale, guide.slug));
  const image = {
    url: absoluteUrl(guide.image.src),
    width: guide.image.width,
    height: guide.image.height,
    alt: guide.image.alt,
  };

  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: {
      canonical,
      languages: absoluteLanguages(getGuideHreflangPaths(guide.key)),
    },
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      siteName: brand.name,
      type: "article",
      url: canonical,
      locale: ui.ogLocale,
      alternateLocale: guideLocales.filter((item) => item !== locale).map((item) => guidesUi[item].ogLocale),
      publishedTime: guide.datePublished,
      modifiedTime: guide.dateModified,
      section: ui.sectionName,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.metaTitle,
      description: guide.metaDescription,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isGuideLocale(locale)) notFound();

  const guide = getPublishedGuide(locale, slug);
  if (!guide) notFound();

  const copy = translations[locale];
  const ui = guidesUi[locale];
  const homePath = `/${locale}/`;
  const indexPath = getGuideIndexPath(locale);
  const guidePath = getGuidePath(locale, guide.slug);
  const canonical = absoluteUrl(guidePath);
  const otherGuides = getPublishedGuides(locale).filter((item) => item.slug !== guide.slug);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonical}#article`,
        headline: guide.title,
        description: guide.metaDescription,
        url: canonical,
        mainEntityOfPage: canonical,
        inLanguage: ui.htmlLang,
        datePublished: guide.datePublished,
        dateModified: guide.dateModified,
        image: getGuideImages(guide).map((image) => absoluteUrl(image.src)),
        articleSection: ui.sectionName,
        author: { "@id": businessId },
        publisher: getBusinessIdentity({
          description: copy.businessDescription,
          inLanguage: copy.htmlLang,
          mainEntityOfPage: absoluteUrl(homePath),
        }),
        isPartOf: {
          "@type": "CollectionPage",
          "@id": `${absoluteUrl(indexPath)}#collection`,
          name: ui.title,
          url: absoluteUrl(indexPath),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: ui.home, item: absoluteUrl(homePath) },
          { "@type": "ListItem", position: 2, name: ui.sectionName, item: absoluteUrl(indexPath) },
          { "@type": "ListItem", position: 3, name: guide.shortTitle, item: canonical },
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
        languageHrefs={getGuideLanguageHrefs(guide.key)}
        activeHref={indexPath}
      />
      <GuideArticle locale={locale} guide={guide} otherGuides={otherGuides} />
      <FloatingContact copy={copy.contact} />
      <Footer copy={copy.footer} headerCopy={copy.header} homeHref={homePath} />
    </>
  );
}
