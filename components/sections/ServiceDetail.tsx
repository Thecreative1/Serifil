import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { assetPath, localizedPath } from "@/config/paths";
import type { Locale } from "@/data/i18n";
import {
  getServicePath,
  serviceKeys,
  servicePages,
  servicePageUi,
  type ServicePageContent,
} from "@/data/service-pages";

type ServiceDetailProps = {
  locale: Locale;
  page: ServicePageContent;
};

export function ServiceDetail({ locale, page }: ServiceDetailProps) {
  const ui = servicePageUi[locale];
  const homePath = localizedPath(locale);
  const quotePath = localizedPath(locale, "#orcamento");
  const workPath = localizedPath(locale, "#trabalhos");
  const relatedPages = serviceKeys
    .filter((key) => key !== page.key)
    .map((key) => servicePages[locale][key]);

  return (
    <main id="conteudo-principal" tabIndex={-1}>
      <section className="relative overflow-hidden border-b border-border bg-background pt-24 sm:pt-28 lg:pt-32">
        <div className="industrial-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />
        <Container className="relative">
          <nav aria-label={ui.breadcrumbsLabel}>
            <ol className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">
              <li>
                <a
                  href={homePath}
                  className="transition-colors hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  {ui.home}
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <a
                  href={localizedPath(locale, "#servicos")}
                  className="transition-colors hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  {ui.services}
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-text-primary" aria-current="page">{page.shortName}</li>
            </ol>
          </nav>

          <div className="grid gap-10 pt-10 pb-14 sm:pt-12 sm:pb-16 lg:grid-cols-12 lg:items-center lg:gap-12 lg:pt-14 lg:pb-20">
            <div className="lg:col-span-7">
              <p className="section-kicker text-accent">{page.eyebrow}</p>
              <h1 className="mt-6 max-w-[13ch] text-[clamp(3.2rem,6.4vw,6.9rem)] leading-[0.88] font-black tracking-[-0.07em] text-text-primary">
                {page.title}
              </h1>
              <p className="mt-7 max-w-[58ch] text-lg leading-8 text-text-secondary sm:text-xl">
                {page.lead}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={quotePath}>{ui.quote}</Button>
                <Button href={workPath} variant="secondary">{ui.seeWork}</Button>
              </div>
            </div>

            <figure className="relative aspect-[4/3] overflow-hidden border border-border bg-surface lg:col-span-5">
              <Image
                src={assetPath(page.image.src)}
                alt={page.image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-background/90 px-4 py-3 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-text-secondary">
                {ui.realWork}
              </figcaption>
            </figure>
          </div>
        </Container>
      </section>

      <section className="bg-accent text-light-text">
        <Container>
          <dl className="grid divide-y divide-[#171916]/25 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
            {page.facts.map((fact) => (
              <div key={fact.label} className="py-8 lg:px-9 lg:py-10 first:lg:pl-0 last:lg:pr-0">
                <dt className="text-[0.7rem] font-black uppercase tracking-[0.14em]">{fact.label}</dt>
                <dd className="mt-3 max-w-[38ch] text-base leading-7">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="bg-light-background py-20 sm:py-28 lg:py-36">
        <Container>
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <p className="section-kicker text-light-muted lg:col-span-3">01 · {ui.services}</p>
              <div className="lg:col-span-8">
                <h2 className="max-w-[15ch] text-[clamp(2.7rem,5.6vw,5.8rem)] leading-[0.92] font-bold tracking-[-0.06em] text-light-text">
                  {page.introduction.title}
                </h2>
                <div className="mt-9 grid gap-6 text-lg leading-8 text-[#555951]">
                  {page.introduction.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-background py-20 sm:py-28 lg:py-36">
        <Container>
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <p className="section-kicker text-accent">{page.technique.eyebrow}</p>
                <h2 className="mt-8 max-w-[11ch] text-[clamp(2.6rem,5vw,5.4rem)] leading-[0.92] font-bold tracking-[-0.06em] text-text-primary">
                  {page.technique.title}
                </h2>
                <p className="mt-7 max-w-[48ch] text-base leading-7 text-text-secondary">
                  {page.technique.description}
                </p>
              </div>

              <ol className="border-t border-border lg:col-span-8">
                {page.technique.steps.map((step, index) => (
                  <li key={step.title} className="grid gap-4 border-b border-border py-8 sm:grid-cols-[4rem_minmax(0,0.8fr)_minmax(0,1.2fr)] sm:gap-8 lg:py-10">
                    <span className="text-sm font-bold text-accent">{String(index + 1).padStart(2, "0")}</span>
                    <h3 className="text-2xl leading-tight font-bold tracking-[-0.035em] text-text-primary">{step.title}</h3>
                    <p className="max-w-[52ch] text-base leading-7 text-text-secondary">{step.description}</p>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-y border-border bg-surface py-20 sm:py-28 lg:py-36">
        <Container>
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-6">
                <p className="section-kicker text-accent">{page.applications.eyebrow}</p>
                <h2 className="mt-8 max-w-[12ch] text-[clamp(2.7rem,5vw,5.4rem)] leading-[0.92] font-bold tracking-[-0.06em] text-text-primary">
                  {page.applications.title}
                </h2>
                <p className="mt-7 max-w-[54ch] text-base leading-7 text-text-secondary">{page.applications.description}</p>
              </div>
              <ul className="border-t border-border lg:col-span-6">
                {page.applications.items.map((item) => (
                  <li key={item} className="flex min-h-16 items-center gap-4 border-b border-border py-4 text-lg font-semibold text-text-primary">
                    <Check className="size-4 shrink-0 text-accent" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      {page.gallery.images.length > 0 ? (
        <section className="bg-background py-20 sm:py-28 lg:py-36">
          <Container>
            <Reveal>
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
                <div className="min-w-0 lg:col-span-5">
                  <p className="section-kicker text-accent">{page.gallery.eyebrow}</p>
                  <h2 className="mt-8 max-w-[11ch] text-[clamp(2.6rem,4.8vw,5.2rem)] leading-[0.92] font-bold tracking-[-0.06em] text-text-primary">
                    {page.gallery.title}
                  </h2>
                </div>
                <div className="grid min-w-0 grid-cols-2 gap-px bg-border lg:col-span-7">
                  {page.gallery.images.map((image, index) => (
                    <figure key={image.src} className="relative aspect-[4/3] overflow-hidden bg-surface">
                      <Image
                        src={assetPath(image.src)}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1024px) 31vw, 48vw"
                        className="object-cover"
                      />
                      <span className="absolute right-0 bottom-0 bg-background/90 px-2.5 py-1.5 text-[0.625rem] font-bold tracking-[0.12em] text-text-secondary" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </figure>
                  ))}
                </div>
              </div>
            </Reveal>
          </Container>
        </section>
      ) : null}

      <section className="bg-light-background py-20 sm:py-28 lg:py-36">
        <Container>
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <p className="section-kicker text-light-muted">{page.preparation.eyebrow}</p>
                <h2 className="mt-8 max-w-[12ch] text-[clamp(2.7rem,5vw,5.4rem)] leading-[0.92] font-bold tracking-[-0.06em] text-light-text">
                  {page.preparation.title}
                </h2>
                <p className="mt-7 max-w-[50ch] text-base leading-7 text-light-muted">{page.preparation.description}</p>
              </div>
              <dl className="border-t border-[#c9c3b8] lg:col-span-7">
                {page.preparation.items.map((item) => (
                  <div key={item.label} className="grid gap-3 border-b border-[#c9c3b8] py-6 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-8">
                    <dt className="text-xs font-black uppercase tracking-[0.12em] text-light-text">{item.label}</dt>
                    <dd className="max-w-[54ch] text-base leading-7 text-light-muted">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-background py-20 sm:py-28 lg:py-36">
        <Container>
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <p className="section-kicker text-accent">{page.questions.eyebrow}</p>
                <h2 className="mt-8 max-w-[11ch] text-[clamp(2.7rem,4.8vw,5.2rem)] leading-[0.92] font-bold tracking-[-0.06em] text-text-primary">
                  {page.questions.title}
                </h2>
              </div>
              <div className="border-t border-border lg:col-span-8">
                {page.questions.items.map((item) => (
                  <details key={item.question} className="group border-b border-border">
                    <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-8 py-5 text-xl font-bold tracking-[-0.025em] text-text-primary transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
                      {item.question}
                      <span className="text-2xl font-light text-accent transition-transform duration-300 group-open:rotate-45" aria-hidden="true">+</span>
                    </summary>
                    <p className="max-w-[62ch] pb-7 text-base leading-7 text-text-secondary">{item.answer}</p>
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
                <p className="section-kicker text-accent">{ui.relatedEyebrow}</p>
                <h2 className="mt-8 max-w-[12ch] text-[clamp(2.6rem,4.8vw,5.2rem)] leading-[0.92] font-bold tracking-[-0.06em] text-text-primary">{ui.relatedTitle}</h2>
                <p className="mt-7 max-w-[52ch] text-base leading-7 text-text-secondary">{ui.relatedDescription}</p>
              </div>
              <nav className="border-t border-border lg:col-span-7" aria-label={ui.relatedEyebrow}>
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

      <section className="bg-accent py-16 text-light-text sm:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <h2 className="max-w-[15ch] text-[clamp(2.7rem,5vw,5.8rem)] leading-[0.9] font-black tracking-[-0.06em]">
              {ui.quoteTitle}
            </h2>
            <Button href={quotePath} variant="dark">{ui.quote}</Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
