import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { guidesUi, type GuideLocale } from "@/data/guides";
import { dtfCopy, dtfPublished, getDtfPath } from "@/data/dtf";
import { getScreensPath, screensCopy, screensPublished } from "@/data/screens";
import { getServicePath, servicePages, type ServiceKey } from "@/data/service-pages";

export function GuideServiceLinks({ locale, services }: { locale: GuideLocale; services: readonly ServiceKey[] }) {
  const ui = guidesUi[locale];
  // Os guias explicam telas e gravação: os quadros de serigrafia entram sempre nas ligações.
  const links = [
    ...services.map((key) => ({ href: getServicePath(locale, key), name: servicePages[locale][key].shortName })),
    ...(screensPublished ? [{ href: getScreensPath(locale), name: screensCopy[locale].sectionName }] : []),
    ...(dtfPublished ? [{ href: getDtfPath(locale), name: dtfCopy[locale].sectionName }] : []),
  ];

  return (
    <section className="border-t border-border bg-surface py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="section-kicker text-accent">{ui.relatedServicesEyebrow}</p>
              <h2 className="mt-8 max-w-[12ch] text-[clamp(2.6rem,4.8vw,5.2rem)] leading-[0.92] font-bold tracking-[-0.06em] text-text-primary">
                {ui.relatedServicesTitle}
              </h2>
              <p className="mt-7 max-w-[52ch] text-base leading-7 text-text-secondary">{ui.relatedServicesDescription}</p>
            </div>
            <nav className="border-t border-border lg:col-span-7" aria-label={ui.relatedServicesEyebrow}>
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group flex min-h-20 items-center justify-between gap-6 border-b border-border py-5 text-xl font-bold tracking-[-0.025em] text-text-primary transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  {link.name}
                  <ArrowRight className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </a>
              ))}
            </nav>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
