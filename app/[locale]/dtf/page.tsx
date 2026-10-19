import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { InlineText } from "@/components/guides/InlineText";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LocalePreference } from "@/components/LocalePreference";
import { DtfCalculator } from "@/components/dtf/DtfCalculator";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { brand } from "@/config/brand";
import { absoluteUrl, businessId, getBusinessIdentity } from "@/config/seo";
import { stripInlineLinks } from "@/data/guides";
import { isLocale, locales, translations } from "@/data/i18n";
import { dtfCopy, dtfPublished, dtfShareImage, getDtfHreflangPaths, getDtfPath } from "@/data/dtf";
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

  const copy = dtfCopy[locale];
  const canonical = absoluteUrl(getDtfPath(locale));
  const imageUrl = absoluteUrl(dtfShareImage.src);

  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    // Publicada, herda do layout index/follow e as pré-visualizações grandes de imagem.
    ...(dtfPublished ? {} : { robots: { index: false, follow: false } }),
    alternates: {
      canonical,
      languages: absoluteLanguages(getDtfHreflangPaths()),
    },
    openGraph: {
      title: copy.metaTitle,
      description: copy.metaDescription,
      siteName: brand.name,
      type: "website",
      url: canonical,
      locale: copy.ogLocale,
      alternateLocale: locales.filter((item) => item !== locale).map((item) => dtfCopy[item].ogLocale),
      images: [{ url: imageUrl, width: dtfShareImage.width, height: dtfShareImage.height, alt: copy.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.metaTitle,
      description: copy.metaDescription,
      images: [{ url: imageUrl, alt: copy.imageAlt }],
    },
  };
}

export default async function DtfPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const copy = dtfCopy[locale];
  const siteCopy = translations[locale];
  const homePath = `/${locale}/`;
  const servicesPath = `${homePath}#servicos`;
  const canonical = absoluteUrl(getDtfPath(locale));
  const relatedPages = serviceKeys.map((key) => servicePages[locale][key]);
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
        url: absoluteUrl(dtfShareImage.src),
        contentUrl: absoluteUrl(dtfShareImage.src),
        width: dtfShareImage.width,
        height: dtfShareImage.height,
        caption: copy.imageAlt,
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
        areaServed: [
          { "@type": "City", name: "Guimarães" },
          { "@type": "AdministrativeArea", name: "Braga" },
          { "@type": "Country", name: "Portugal" },
        ],
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
          pt: getDtfPath("pt"),
          en: getDtfPath("en"),
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
        <DtfCalculator locale={locale} />

        <section aria-labelledby="dtf-como-funciona" className="border-t border-border bg-background py-16 sm:py-20">
          <Container>
            <h2 id="dtf-como-funciona" className="section-kicker text-accent">{copy.howTitle}</h2>
            <ol className="mt-8 grid border-t border-border md:grid-cols-3 md:border-t-0 md:border-l">
              {copy.howSteps.map((step, index) => (
                <li key={step.title} className="border-b border-border py-6 md:border-r md:border-b-0 md:border-t md:px-7">
                  <span className="text-sm font-bold tabular-nums text-accent" aria-hidden="true">0{index + 1}</span>
                  <h3 className="mt-3 text-xl font-bold tracking-[-0.025em] text-text-primary">{step.title}</h3>
                  <p className="mt-2 max-w-[40ch] text-base leading-7 text-text-secondary">{step.text}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        <section aria-labelledby="dtf-perguntas" className="border-t border-border bg-background py-20 sm:py-28">
          <Container>
            <Reveal>
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-4">
                  <p className="section-kicker text-accent">{copy.questions.eyebrow}</p>
                  <h2
                    id="dtf-perguntas"
                    className="mt-8 max-w-[11ch] text-[clamp(2.7rem,4.8vw,5.2rem)] leading-[0.92] font-bold tracking-[-0.06em] text-text-primary"
                  >
                    {copy.questions.title}
                  </h2>
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
                  {relatedPages.map((related) => (
                    <a
                      key={related.key}
                      href={getServicePath(locale, related.key)}
                      className="group flex min-h-20 items-center justify-between gap-6 border-b border-border py-5 text-xl font-bold tracking-[-0.025em] text-text-primary transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                    >
                      {related.shortName}
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
