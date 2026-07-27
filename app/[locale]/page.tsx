import { notFound } from "next/navigation";
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
      {brand.whatsapp ? <a className="fixed bottom-5 right-5 z-40 grid min-h-12 place-items-center bg-accent px-5 text-sm font-bold text-light-text" href={`https://wa.me/${brand.whatsapp.replace(/\D/g, "")}`}>WhatsApp</a> : null}
      <Footer copy={copy.footer} headerCopy={copy.header} />
    </>
  );
}
