import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { InlineText } from "@/components/guides/InlineText";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LocalePreference } from "@/components/LocalePreference";
import { ScreenConfigurator } from "@/components/screens/ScreenConfigurator";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { brand } from "@/config/brand";
import { assetPath } from "@/config/paths";
import { absoluteUrl, businessId, getBusinessIdentity, serviceArea } from "@/config/seo";
import { dtfCopy, dtfPublished, getDtfPath } from "@/data/dtf";
import { stripInlineLinks } from "@/data/guides";
import { isLocale, locales, translations } from "@/data/i18n";
import {
  getScreensHreflangPaths,
  getScreensPath,
  screensCopy,
  screensPhoto,
  screensPublished,
  screensShareImage,
} from "@/data/screens";
import { getServicePath, serviceKeys, servicePages } from "@/data/service-pages";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

function absoluteLanguages(paths: Record<string, string>) {
  return Object.fromEntries(Object.entries(paths).map(([language, path]) => [language, absoluteUrl(path)]));
}

const inlineLinkClassName =
  "font-semibold text-text-primary underline decoration-text-secondary underline-offset-4 transition-colors hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const copy = screensCopy[locale];
  const canonical = absoluteUrl(getScreensPath(locale));
  const imageUrl = absoluteUrl(screensShareImage.src);

  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    // Publicada, herda do layout index/follow e as pré-visualizações grandes de imagem.
    ...(screensPublished ? {} : { robots: { index: false, follow: false } }),
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
      images: [{ url: imageUrl, width: screensShareImage.width, height: screensShareImage.height, alt: copy.photoAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.metaTitle,
      description: copy.metaDescription,
      images: [{ url: imageUrl, alt: copy.photoAlt }],
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
  const servicesPath = `${homePath}#servicos`;
  const canonical = absoluteUrl(getScreensPath(locale));
  const relatedLinks = [
    ...serviceKeys.map((key) => ({ href: getServicePath(locale, key), name: servicePages[locale][key].shortName })),
    ...(dtfPublished ? [{ href: getDtfPath(locale), name: dtfCopy[locale].sectionName }] : []),
  ];
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: copy.metaTitle,
        description: copy.metaDescription,
        inLanguage: copy.htmlLang,
        primaryImageOfPage: { "@id": `${canonical}#image` },
        breadcrumb: { "@id": `${canonical}#breadcrumb` },
        mainEntity: { "@id": `${canonical}#service` },
        isPartOf: { "@type": "WebSite", url: brand.website, name: brand.name },
      },
      {
        "@type": "ImageObject",
        "@id": `${canonical}#image`,
        url: absoluteUrl(screensShareImage.src),
        contentUrl: absoluteUrl(screensShareImage.src),
        width: screensShareImage.width,
        height: screensShareImage.height,
        caption: copy.photoAlt,
      },
      {
        "@type": "Service",
        "@id": `${canonical}#service`,
        name: copy.sectionName,
        serviceType: copy.serviceType,
        description: copy.metaDescription,
        url: canonical,
        image: { "@id": `${canonical}#image` },
        provider: getBusinessIdentity({
          description: siteCopy.businessDescription,
          inLanguage: siteCopy.htmlLang,
          mainEntityOfPage: absoluteUrl(homePath),
        }),
        areaServed: serviceArea,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: copy.sectionName,
          itemListElement: copy.offers.map((offer) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: offer.name,
              description: offer.description,
              provider: { "@id": businessId },
            },
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonical}#faq`,
        inLanguage: copy.htmlLang,
        mainEntity: copy.questions.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: stripInlineLinks(item.answer) },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
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
        activeHref="#servicos"
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
                <li>
                  <a
                    href={servicesPath}
                    className="transition-colors hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    {copy.services}
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-text-primary" aria-current="page">{copy.sectionName}</li>
              </ol>
            </nav>
            <div className="grid gap-5 pt-6 pb-8 lg:grid-cols-12 lg:items-end lg:gap-12 lg:pb-10">
              <div className="lg:col-span-7">
                {/* O H1 leva o nome do serviço (pesquisa) e a chamada da ferramenta; o aspeto mantém-se. */}
                <h1>
                  <span className="section-kicker block text-accent">{copy.eyebrow}</span>{" "}
                  <span className="mt-4 block text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.9] font-black tracking-[-0.065em] text-text-primary">
                    {copy.title}
                  </span>
                </h1>
              </div>
              <p className="max-w-[52ch] text-base leading-7 text-text-secondary sm:text-lg lg:col-span-5">{copy.lead}</p>
            </div>
          </Container>
        </section>
        <ScreenConfigurator locale={locale} />

        <section aria-labelledby="quadros-perguntas" className="border-t border-border bg-background py-20 sm:py-28">
          <Container>
            <Reveal>
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-4">
                  <p className="section-kicker text-accent">{copy.questions.eyebrow}</p>
                  <h2
                    id="quadros-perguntas"
                    className="mt-8 max-w-[11ch] text-[clamp(2.7rem,4.8vw,5.2rem)] leading-[0.92] font-bold tracking-[-0.06em] text-text-primary"
                  >
                    {copy.questions.title}
                  </h2>
                  <figure className="mt-10 border border-border bg-surface">
                    <Image
                      src={assetPath(screensPhoto.src)}
                      alt={copy.photoAlt}
                      width={screensPhoto.width}
                      height={screensPhoto.height}
                      sizes="(min-width: 1024px) 30vw, 100vw"
                      className="block h-auto w-full"
                    />
                    <figcaption className="px-4 py-4 sm:px-5">
                      <span className="block text-[0.68rem] font-bold uppercase tracking-[0.12em] text-accent">{copy.photoLabel}</span>
                      <span className="mt-2 block text-sm leading-6 text-text-secondary">{copy.photoCaption}</span>
                    </figcaption>
                  </figure>
                </div>
                <div className="border-t border-border lg:col-span-8">
                  {copy.questions.items.map((item) => (
                    <details key={item.question} className="group border-b border-border">
                      <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-8 py-5 text-xl font-bold tracking-[-0.025em] text-text-primary transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
                        <h3>{item.question}</h3>
                        <span className="text-2xl font-light text-accent transition-transform duration-300 group-open:rotate-45" aria-hidden="true">+</span>
                      </summary>
                      <p className="max-w-[62ch] pb-7 text-base leading-7 text-text-secondary">
                        <InlineText text={item.answer} linkClassName={inlineLinkClassName} />
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </Reveal>
          </Container>
        </section>

        <section className="border-t border-border bg-surface py-20 sm:py-28">
          <Container>
            <Reveal>
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-5">
                  <p className="section-kicker text-accent">{copy.relatedEyebrow}</p>
                  <h2 className="mt-8 max-w-[12ch] text-[clamp(2.6rem,4.8vw,5.2rem)] leading-[0.92] font-bold tracking-[-0.06em] text-text-primary">
                    {copy.relatedTitle}
                  </h2>
                  <p className="mt-7 max-w-[52ch] text-base leading-7 text-text-secondary">{copy.relatedDescription}</p>
                </div>
                <nav className="border-t border-border lg:col-span-7" aria-label={copy.relatedEyebrow}>
                  {relatedLinks.map((related) => (
                    <a
                      key={related.href}
                      href={related.href}
                      className="group flex min-h-20 items-center justify-between gap-6 border-b border-border py-5 text-xl font-bold tracking-[-0.025em] text-text-primary transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                    >
                      {related.name}
                      <ArrowRight className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </a>
                  ))}
                </nav>
              </div>
            </Reveal>
          </Container>
        </section>
      </main>
      <FloatingContact copy={siteCopy.contact} />
      <Footer copy={siteCopy.footer} headerCopy={siteCopy.header} homeHref={homePath} />
    </>
  );
}
