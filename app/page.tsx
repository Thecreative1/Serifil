import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
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

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: brand.name,
    description: brand.descriptor,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Guimarães",
      addressCountry: "PT",
      ...(brand.address ? { streetAddress: brand.address } : {}),
    },
    ...(brand.phone ? { telephone: brand.phone } : {}),
    ...(brand.email ? { email: brand.email } : {}),
    ...(brand.website ? { url: brand.website } : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Introduction />
        <Services />
        <Portfolio />
        <Benefits />
        <Process />
        <About />
        <QuoteCTA />
        <QuoteForm />
        <ContactSection />
      </main>
      {brand.whatsapp ? <a className="fixed bottom-5 right-5 z-40 grid min-h-12 place-items-center bg-accent px-5 text-sm font-bold text-light-text" href={`https://wa.me/${brand.whatsapp.replace(/\D/g, "")}`}>WhatsApp</a> : null}
      <Footer />
    </>
  );
}
