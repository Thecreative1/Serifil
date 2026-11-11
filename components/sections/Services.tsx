import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { assetPath } from "@/config/paths";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale, SiteContent } from "@/data/i18n";
import { dtfCopy, dtfPublished, getDtfPath } from "@/data/dtf";
import { getScreensPath, screensCopy, screensPublished } from "@/data/screens";
import { getServicePath, servicePages, type ServiceKey } from "@/data/service-pages";

type ServiceItem = SiteContent["services"]["items"][number];

const linkClass =
  "inline-flex min-h-11 w-fit items-center gap-2 border-b border-text-secondary py-2 text-sm font-bold uppercase tracking-[0.08em] text-text-primary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

export function Services({ locale, copy }: { locale: Locale; copy: SiteContent["services"] }) {
  const primaryService = copy.items.find((service) => service.emphasis === "primary");
  const supportingServices = copy.items.filter((service) => service.emphasis === "supporting");
  const complementaryServices = copy.items.filter((service) => service.emphasis === "complementary");

  // Cada serviço com página própria liga para ela; os restantes levam ao pedido de orçamento.
  // Aqui ficam só os serviços que não têm cartão acima (t-shirts, quadros e DTF).
  const moreServices = [
    { href: getServicePath(locale, "tshirts"), name: servicePages[locale].tshirts.shortName },
    ...(screensPublished ? [{ href: getScreensPath(locale), name: screensCopy[locale].sectionName }] : []),
    ...(dtfPublished ? [{ href: getDtfPath(locale), name: dtfCopy[locale].sectionName }] : []),
  ];

  const serviceLink = (service: ServiceItem, className = "") =>
    service.pageKey ? (
      <a
        href={getServicePath(locale, service.pageKey as ServiceKey)}
        aria-label={`${copy.viewServiceLabel} ${service.title}`}
        className={`${linkClass} ${className}`}
      >
        {copy.viewService} <ArrowRight className="size-4" aria-hidden="true" />
      </a>
    ) : (
      <a href="#orcamento" aria-label={`${copy.quoteLabel} ${service.title}`} className={`${linkClass} ${className}`}>
        {copy.shortQuote} <ArrowUpRight className="size-4" aria-hidden="true" />
      </a>
    );

  if (!primaryService) return null;

  return (
    <section id="servicos" className="scroll-mt-20 bg-background py-20 sm:py-28 lg:scroll-mt-24 lg:py-36">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
        </Reveal>

        <div className="mt-16 grid border border-border lg:mt-24 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal className="lg:border-r lg:border-border">
            <article className="flex min-h-full flex-col bg-accent text-light-text">
              <figure className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[22rem] lg:flex-1">
                <Image
                  src={assetPath("/images/trabalhos/tnt-01.webp")}
                  alt={copy.primaryImageAlt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-[center_45%]"
                />
                <figcaption className="absolute bottom-0 left-0 bg-light-text px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-text-primary">
                  {copy.primaryImageCaption}
                </figcaption>
              </figure>
              <div className="p-7 sm:p-10 lg:p-14">
                <p className="text-xs font-black uppercase tracking-[0.14em]">{primaryService.label}</p>
                <h3 className="mt-6 max-w-[12ch] text-[clamp(3rem,6vw,6.8rem)] leading-[0.88] font-black tracking-[-0.065em]">
                  {primaryService.title}
                </h3>
                <div className="mt-8 flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
                  <p className="max-w-[46ch] text-base leading-7 text-[#3a2017] sm:text-lg">{primaryService.description}</p>
                  <a href="#orcamento" aria-label={`${copy.quoteLabel} ${primaryService.title}`} className="inline-flex min-h-12 w-fit shrink-0 items-center gap-3 border border-light-text/40 bg-light-text px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-text-primary transition-colors hover:bg-[#2a2d28] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-light-text">
                    {copy.quote} <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          </Reveal>

          <div className="grid">
            {supportingServices.map((service, index) => (
              <Reveal key={service.number} className={index > 0 ? "border-t border-border" : "border-t border-border lg:border-t-0"}>
                <article className="flex min-h-full flex-col justify-between gap-8 bg-surface p-7 sm:p-9 lg:p-10">
                  <div>
                    <h3 className="max-w-[14ch] text-[clamp(2rem,3.2vw,3.4rem)] leading-[0.94] font-bold tracking-[-0.05em] text-text-primary">{service.title}</h3>
                    <p className="mt-5 max-w-[48ch] text-base leading-7 text-text-secondary">{service.description}</p>
                  </div>
                  {serviceLink(service)}
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-20 lg:mt-28">
          <Reveal><p className="section-kicker text-text-secondary">{copy.otherServices}</p></Reveal>
          <div className="mt-7 border-t border-border">
            {complementaryServices.map((service) => (
              <Reveal key={service.number}>
                <article className="grid gap-5 border-b border-border py-9 sm:grid-cols-[minmax(0,1fr)_minmax(18rem,0.9fr)_8.5rem] sm:items-start sm:gap-8 lg:py-12">
                  <h3 className="max-w-[18ch] text-[clamp(1.7rem,2.8vw,3.1rem)] leading-[0.98] font-bold tracking-[-0.045em] text-text-primary">{service.title}</h3>
                  <p className="max-w-[56ch] text-base leading-7 text-text-secondary">{service.description}</p>
                  {serviceLink(service, "sm:justify-self-end")}
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal>
          <nav aria-label={copy.moreServices} className="mt-14 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
            <h3 className="text-xl font-bold tracking-[-0.025em] text-text-primary">{copy.moreServices}</h3>
            <ul className="flex flex-wrap gap-3">
              {moreServices.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group inline-flex min-h-12 items-center gap-3 border border-border px-5 py-3 text-base font-bold text-text-primary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    {link.name}
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal>
      </Container>
    </section>
  );
}
