import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LocalePreference } from "@/components/LocalePreference";
import { ScreenConfigurator } from "@/components/screens/ScreenConfigurator";
import { Container } from "@/components/ui/Container";
import { brand } from "@/config/brand";
import { absoluteUrl, getBusinessIdentity } from "@/config/seo";
import { isLocale, locales, translations } from "@/data/i18n";
import { getScreensHreflangPaths, getScreensPath, screensCopy, screensPublished } from "@/data/screens";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
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
  if (!isLocale(locale)) return {};

  const copy = screensCopy[locale];
  const canonical = absoluteUrl(getScreensPath(locale));
  const imageUrl = absoluteUrl("/og.jpg");

  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    // Enquanto o serviço está em teste, a página existe mas não é indexada.
    robots: screensPublished ? { index: true, follow: true } : { index: false, follow: false },
    alternates: {
      canonical,
      languages: absoluteLanguages(getScreensHreflangPaths()),
    },
    openGraph: {
      title: copy.metaTitle,
      description: copy.metaDescription,
      siteName: brand.name,
      type: "website",
      url: canonical,
      locale: copy.ogLocale,
      alternateLocale: locales.filter((item) => item !== locale).map((item) => screensCopy[item].ogLocale),
      images: [{ url: imageUrl, width: 1200, height: 630, alt: translations[locale].meta.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.metaTitle,
      description: copy.metaDescription,
      images: [{ url: imageUrl, alt: translations[locale].meta.imageAlt }],
    },
  };
}

export default async function ScreensPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const copy = screensCopy[locale];
  const siteCopy = translations[locale];
  const homePath = `/${locale}/`;
  const canonical = absoluteUrl(getScreensPath(locale));
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${canonical}#service`,
        name: copy.sectionName,
        description: copy.metaDescription,
        url: canonical,
        provider: getBusinessIdentity({
          description: siteCopy.businessDescription,
          inLanguage: siteCopy.htmlLang,
          mainEntityOfPage: absoluteUrl(homePath),
        }),
        areaServed: {
          "@type": "City",
          name: "Guimarães",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: copy.home, item: absoluteUrl(homePath) },
          { "@type": "ListItem", position: 2, name: copy.sectionName, item: canonical },
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
        copy={siteCopy.header}
        homeHref={homePath}
        languageHrefs={{
          pt: getScreensPath("pt"),
          en: getScreensPath("en"),
        }}
      />
      <main id="conteudo-principal" tabIndex={-1}>
        <section className="relative overflow-hidden border-b border-border bg-background pt-24 sm:pt-28 lg:pt-32">
          <div className="industrial-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />
          <Container className="relative">
            <nav aria-label={copy.breadcrumbsLabel}>
              <ol className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">
                <li>
                  <a
                    href={homePath}
                    className="transition-colors hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    {copy.home}
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-text-primary" aria-current="page">{copy.sectionName}</li>
              </ol>
            </nav>
            <div className="grid gap-5 pt-6 pb-8 lg:grid-cols-12 lg:items-end lg:gap-12 lg:pb-10">
              <div className="lg:col-span-7">
                <p className="section-kicker text-accent">{copy.eyebrow}</p>
                <h1 className="mt-4 text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.9] font-black tracking-[-0.065em] text-text-primary">
                  {copy.title}
                </h1>
              </div>
              <p className="max-w-[52ch] text-base leading-7 text-text-secondary sm:text-lg lg:col-span-5">{copy.lead}</p>
            </div>
          </Container>
        </section>
        <ScreenConfigurator locale={locale} />
      </main>
      <FloatingContact copy={siteCopy.contact} />
      <Footer copy={siteCopy.footer} headerCopy={siteCopy.header} homeHref={homePath} />
    </>
  );
}
