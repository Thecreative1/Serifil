import { ArrowRight } from "lucide-react";
import { GuideBreadcrumbs } from "@/components/guides/GuideBreadcrumbs";
import { GuideQuoteCta } from "@/components/guides/GuideQuoteCta";
import { GuideServiceLinks } from "@/components/guides/GuideServiceLinks";
import { Container } from "@/components/ui/Container";
import { localizedPath } from "@/config/paths";
import { getGuidePath, getGuideReadingMinutes, guidesUi, type Guide, type GuideLocale } from "@/data/guides";
import { serviceKeys } from "@/data/service-pages";

export function GuidesIndex({ locale, guides }: { locale: GuideLocale; guides: Guide[] }) {
  const ui = guidesUi[locale];

  return (
    <main id="conteudo-principal" tabIndex={-1}>
      <section className="relative overflow-hidden border-b border-border bg-background pt-24 sm:pt-28 lg:pt-32">
        <div className="industrial-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />
        <Container className="relative">
          <GuideBreadcrumbs
            label={ui.breadcrumbsLabel}
            items={[{ label: ui.home, href: localizedPath(locale) }, { label: ui.sectionName }]}
          />
          <div className="pt-10 pb-14 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-20">
            <p className="section-kicker text-accent">{ui.eyebrow}</p>
            <h1 className="mt-6 max-w-[12ch] text-[clamp(3.2rem,7vw,7.4rem)] leading-[0.88] font-black tracking-[-0.07em] text-text-primary">
              {ui.title}
            </h1>
            <p className="mt-7 max-w-[58ch] text-lg leading-8 text-text-secondary sm:text-xl">{ui.lead}</p>
          </div>
        </Container>
      </section>

      <section className="bg-light-background py-16 sm:py-24 lg:py-28" aria-labelledby="guias-publicados">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="section-kicker text-light-muted">{ui.listEyebrow}</p>
              <h2
                id="guias-publicados"
                className="mt-6 max-w-[12ch] text-[clamp(2.4rem,4.4vw,4.6rem)] leading-[0.92] font-bold tracking-[-0.06em] text-light-text"
              >
                {ui.listTitle}
              </h2>
              <p className="mt-6 max-w-[46ch] text-base leading-7 text-light-muted">{ui.listDescription}</p>
            </div>
            <ol className="border-t border-light-text lg:col-span-8">
              {guides.map((guide, index) => (
                <li key={guide.slug} className="border-b border-[#c9c3b8]">
                  <article className="group relative grid gap-4 py-8 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-8 lg:py-10">
                    <span className="text-sm font-bold text-light-muted">{String(index + 1).padStart(2, "0")}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-light-muted">
                        {ui.readingTime(getGuideReadingMinutes(guide))}
                      </p>
                      <h3 className="mt-3 max-w-[22ch] text-[clamp(1.9rem,3.2vw,3.2rem)] leading-[0.98] font-bold tracking-[-0.05em] text-light-text">
                        <a
                          href={getGuidePath(locale, guide.slug)}
                          className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                        >
                          {guide.title}
                        </a>
                      </h3>
                      <p className="mt-4 max-w-[60ch] text-base leading-7 text-light-muted">{guide.excerpt}</p>
                      <span
                        className="mt-6 inline-flex min-h-11 items-center gap-2 border-b border-light-text py-2 text-sm font-bold uppercase tracking-[0.08em] text-light-text"
                        aria-hidden="true"
                      >
                        {ui.readGuide}
                        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <GuideServiceLinks locale={locale} services={serviceKeys} />
      <GuideQuoteCta locale={locale} />
    </main>
  );
}
