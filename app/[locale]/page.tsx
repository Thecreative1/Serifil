import { notFound } from "next/navigation";
import { MessageCircle, Phone } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LocalePreference } from "@/components/LocalePreference";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Introduction } from "@/components/sections/Introduction";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { Benefits } from "@/components/sections/Benefits";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { ContactSection } from "@/components/sections/ContactSection";
import { brand } from "@/config/brand";
import { isLocale, translations } from "@/data/i18n";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const copy = translations[locale];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: brand.name,
    description: copy.businessDescription,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Guimarães",
      addressCountry: "PT",
      ...(brand.address ? { streetAddress: brand.address } : {}),
    },
    ...(brand.phone ? { telephone: brand.phone } : {}),
    ...(brand.email ? { email: brand.email } : {}),
    url: `${brand.website}${locale}/`,
    inLanguage: copy.htmlLang,
    hasMap: brand.mapsUrl,
    geo: {
      "@type": "GeoCoordinates",
      latitude: brand.latitude,
      longitude: brand.longitude,
    },
  };

  return (
    <>
      <LocalePreference locale={locale} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <Header locale={locale} copy={copy.header} />
      <main>
        <Hero copy={copy.hero} />
        <Marquee copy={copy.marquee} />
        <Introduction copy={copy.introduction} />
        <Services copy={copy.services} />
        <Portfolio copy={copy.portfolio} />
        <Benefits copy={copy.benefits} />
        <Process copy={copy.process} />
        <About copy={copy.about} />
        <QuoteCTA copy={copy.quoteCta} />
        <QuoteForm copy={copy.quoteForm} />
        <ContactSection copy={copy.contact} />
      </main>
      {brand.phone || brand.whatsapp ? (
        <div className="fixed right-4 bottom-4 z-40 flex items-center border border-border bg-background shadow-[0_10px_32px_rgba(0,0,0,0.28)] sm:right-5 sm:bottom-5">
          {brand.phone ? (
            <a
              href={`tel:${brand.phone.replace(/\s/g, "")}`}
              aria-label={`${copy.contact.call} ${brand.phone}`}
              title={`${copy.contact.call} ${brand.phone}`}
              className="inline-flex min-h-12 min-w-12 items-center justify-center gap-2 px-3 text-sm font-bold text-text-primary transition-colors duration-300 hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:px-4"
            >
              <Phone className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline">{copy.contact.call}</span>
            </a>
          ) : null}
          {brand.whatsapp ? (
            <a
              href={`https://wa.me/${brand.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noreferrer"
              aria-label={`WhatsApp ${brand.whatsapp}`}
              title={`WhatsApp ${brand.whatsapp}`}
              className="inline-flex min-h-12 min-w-12 items-center justify-center gap-2 bg-accent px-3 text-sm font-bold text-light-text transition-colors duration-300 hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:px-4"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          ) : null}
        </div>
      ) : null}
      <Footer copy={copy.footer} headerCopy={copy.header} />
    </>
  );
}
