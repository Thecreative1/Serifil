import { notFound } from "next/navigation";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LocalePreference } from "@/components/LocalePreference";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Introduction } from "@/components/sections/Introduction";
import { Services } from "@/components/sections/Services";
import { WorkModes } from "@/components/sections/WorkModes";
import { Sectors } from "@/components/sections/Sectors";
import { Portfolio } from "@/components/sections/Portfolio";
import { Benefits } from "@/components/sections/Benefits";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { ContactSection } from "@/components/sections/ContactSection";
import { brand } from "@/config/brand";
import { businessId, getBusinessIdentity } from "@/config/seo";
import { isLocale, translations } from "@/data/i18n";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const copy = translations[locale];
  const canonical = `${brand.website}${locale}/`;
  const structuredData = {
    "@context": "https://schema.org",
    ...getBusinessIdentity({
      description: copy.businessDescription,
      inLanguage: copy.htmlLang,
      mainEntityOfPage: canonical,
    }),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: copy.services.title,
      itemListElement: copy.services.items.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          provider: { "@id": businessId },
        },
      })),
    },
  };

  return (
    <>
      <LocalePreference locale={locale} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <Header locale={locale} copy={copy.header} />
      <main id="conteudo-principal" tabIndex={-1}>
        <Hero copy={copy.hero} />
        <Marquee copy={copy.marquee} />
        <Introduction copy={copy.introduction} />
        <Services locale={locale} copy={copy.services} />
        <WorkModes copy={copy.workModes} />
        <Sectors copy={copy.sectors} />
        <Portfolio locale={locale} copy={copy.portfolio} />
        <Benefits copy={copy.benefits} />
        <Process copy={copy.process} />
        <About copy={copy.about} />
        <QuoteCTA copy={copy.quoteCta} />
        <QuoteForm copy={copy.quoteForm} />
        <ContactSection copy={copy.contact} />
      </main>
      <FloatingContact copy={copy.contact} />
      <Footer copy={copy.footer} headerCopy={copy.header} />
    </>
  );
}
