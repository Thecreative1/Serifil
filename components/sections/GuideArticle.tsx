import Image from "next/image";
import { ArrowRight, Check, Info } from "lucide-react";
import { GuideBreadcrumbs } from "@/components/guides/GuideBreadcrumbs";
import { GuideQuoteCta } from "@/components/guides/GuideQuoteCta";
import { GuideServiceLinks } from "@/components/guides/GuideServiceLinks";
import { InlineText } from "@/components/guides/InlineText";
import { ProcessDiagram } from "@/components/guides/ProcessDiagram";
import { Container } from "@/components/ui/Container";
import { assetPath, localizedPath } from "@/config/paths";
import {
  formatGuideDate,
  getGuideIndexPath,
  getGuidePath,
  getGuideReadingMinutes,
  guidesUi,
  type Guide,
  type GuideBlock,
  type GuideImage,
  type GuideLocale,
} from "@/data/guides";

type GuideArticleProps = {
  locale: GuideLocale;
  guide: Guide;
  otherGuides: Guide[];
};

function GuideFigure({
  locale,
  image,
  orientation = "landscape",
  sizes,
}: {
  locale: GuideLocale;
  image: GuideImage;
  orientation?: "landscape" | "portrait";
  sizes: string;
}) {
  const ui = guidesUi[locale];

  return (
    <figure className={`border border-light-text bg-light-text ${orientation === "portrait" ? "sm:max-w-[26rem]" : ""}`}>
      <Image
        src={assetPath(image.src)}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        className="block h-auto w-full"
      />
      <figcaption className="px-4 py-4 sm:px-5">
        <span className="block text-[0.68rem] font-bold uppercase tracking-[0.12em] text-accent">
          {image.credit === "work" ? ui.realWork : ui.process}
        </span>
        <span className="mt-2 block text-sm leading-6 text-text-secondary">{image.caption}</span>
      </figcaption>
    </figure>
  );
}

function GuideBlockView({ locale, block }: { locale: GuideLocale; block: GuideBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="max-w-[65ch] text-lg leading-8 text-[#555951]">
          <InlineText text={block.text} />
        </p>
      );
    case "note":
      return (
        <p className="flex max-w-[65ch] gap-4 border border-[#c9c3b8] bg-[#e6e1d6] p-5 text-base leading-7 text-light-text sm:p-6">
          <Info className="mt-1 size-5 shrink-0" aria-hidden="true" />
          <span>
            <InlineText text={block.text} />
          </span>
        </p>
      );
    case "checklist":
      return (
        <dl className="border-t border-[#c9c3b8]">
          {block.items.map((item) => (
            <div
              key={item.title}
              className="grid gap-2 border-b border-[#c9c3b8] py-5 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] sm:gap-8"
            >
              <dt className="flex gap-3 text-base leading-7 font-bold text-light-text">
                <Check className="mt-1.5 size-4 shrink-0" aria-hidden="true" />
                {item.title}
              </dt>
              <dd className="pl-7 text-base leading-7 text-light-muted sm:max-w-[54ch] sm:pl-0">
                <InlineText text={item.text} />
              </dd>
            </div>
          ))}
        </dl>
      );
    case "comparison":
      return (
        <div className="grid gap-px border border-[#c9c3b8] bg-[#c9c3b8] sm:grid-cols-2">
          {block.columns.map((column, columnIndex) => (
            <div key={column} className="bg-light-background p-6 sm:p-8">
              <h3 className="text-3xl leading-none font-bold tracking-[-0.045em] text-light-text">{column}</h3>
              <dl className="mt-6 grid gap-5">
                {block.rows.map((row) => (
                  <div key={row.label}>
                    <dt className="text-[0.7rem] font-black uppercase tracking-[0.12em] text-light-muted">{row.label}</dt>
                    <dd className="mt-1.5 text-base leading-7 text-light-text">{row.values[columnIndex]}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      );
    case "process":
      return <ProcessDiagram caption={block.caption} steps={block.steps} />;
    case "figure":
      return (
        <GuideFigure
          locale={locale}
          image={block.image}
          orientation={block.orientation}
          sizes={block.orientation === "portrait" ? "(min-width: 640px) 416px, 100vw" : "(min-width: 1024px) 56vw, 100vw"}
        />
      );
    case "gallery":
      return (
        <div className="grid gap-6 sm:grid-cols-2">
          {block.images.map((image) => (
            <GuideFigure key={image.src} locale={locale} image={image} sizes="(min-width: 1024px) 28vw, (min-width: 640px) 50vw, 100vw" />
          ))}
        </div>
      );
  }
}

export function GuideArticle({ locale, guide, otherGuides }: GuideArticleProps) {
  const ui = guidesUi[locale];
  const readingMinutes = getGuideReadingMinutes(guide);

  return (
    <main id="conteudo-principal" tabIndex={-1}>
      <article>
        <div className="relative overflow-hidden border-b border-border bg-background pt-24 sm:pt-28 lg:pt-32">
          <div className="industrial-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />
          <Container className="relative">
            <GuideBreadcrumbs
              label={ui.breadcrumbsLabel}
              items={[
                { label: ui.home, href: localizedPath(locale) },
                { label: ui.sectionName, href: getGuideIndexPath(locale) },
                { label: guide.shortTitle },
              ]}
            />
            <div className="pt-10 pb-14 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-20">
              <p className="section-kicker text-accent">{guide.eyebrow}</p>
              <h1 className="mt-6 max-w-[18ch] text-[clamp(2.6rem,5.6vw,6rem)] leading-[0.92] font-black tracking-[-0.065em] text-text-primary">
                {guide.title}
              </h1>
              <p className="mt-7 max-w-[62ch] text-lg leading-8 text-text-secondary sm:text-xl">{guide.lead}</p>
              <p className="mt-8 flex flex-wrap gap-x-3 gap-y-1 text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">
                <span>
                  {ui.published} <time dateTime={guide.datePublished}>{formatGuideDate(locale, guide.datePublished)}</time>
                </span>
                <span aria-hidden="true">·</span>
                <span>{ui.readingTime(readingMinutes)}</span>
              </p>
            </div>
          </Container>
        </div>

        <div className="bg-light-background py-16 text-light-text sm:py-24 lg:py-28">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <aside className="lg:col-span-3">
                <nav aria-label={ui.tocTitle} className="lg:sticky lg:top-32">
                  <p className="section-kicker text-light-muted">{ui.tocTitle}</p>
                  <ol className="mt-5 border-t border-[#c9c3b8]">
                    {guide.sections.map((section, index) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="grid min-h-12 grid-cols-[2rem_minmax(0,1fr)] items-center gap-2 border-b border-[#c9c3b8] py-3 text-sm leading-5 font-semibold text-light-text underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                        >
                          <span className="text-xs font-bold text-light-muted">{String(index + 1).padStart(2, "0")}</span>
                          {section.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </aside>

              <div className="min-w-0 lg:col-span-8 lg:col-start-5">
                <div className="bg-light-text p-7 text-text-primary sm:p-9">
                  <h2 className="section-kicker text-accent">{ui.summaryTitle}</h2>
                  <ul className="mt-6 grid gap-4">
                    {guide.summary.map((item) => (
                      <li key={item} className="flex gap-3 text-base leading-7">
                        <Check className="mt-1.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {guide.sections.map((section, index) => (
                  <section
                    key={section.id}
                    id={section.id}
                    aria-labelledby={`${section.id}-titulo`}
                    className="mt-16 scroll-mt-28 border-t border-light-text pt-10 sm:mt-20 lg:scroll-mt-32"
                  >
                    <p className="text-sm font-bold text-light-muted">{String(index + 1).padStart(2, "0")}</p>
                    <h2
                      id={`${section.id}-titulo`}
                      className="mt-4 max-w-[20ch] text-[clamp(2rem,3.6vw,3.4rem)] leading-[0.98] font-bold tracking-[-0.05em] text-light-text"
                    >
                      {section.title}
                    </h2>
                    <div className="mt-8 grid gap-8">
                      {section.blocks.map((block, blockIndex) => (
                        <GuideBlockView key={`${section.id}-${blockIndex}`} locale={locale} block={block} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </Container>
        </div>
      </article>

      {otherGuides.length > 0 ? (
        <section className="border-t border-border bg-background py-20 sm:py-28">
          <Container>
            <p className="section-kicker text-accent">{ui.moreGuidesEyebrow}</p>
            <nav className="mt-8 border-t border-border" aria-label={ui.moreGuidesEyebrow}>
              {otherGuides.map((other) => (
                <a
                  key={other.slug}
                  href={getGuidePath(locale, other.slug)}
                  className="group flex min-h-20 items-center justify-between gap-6 border-b border-border py-5 text-xl font-bold tracking-[-0.025em] text-text-primary transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  {other.title}
                  <ArrowRight className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </a>
              ))}
            </nav>
          </Container>
        </section>
      ) : null}

      <GuideServiceLinks locale={locale} services={guide.relatedServices} />
      <GuideQuoteCta locale={locale} />
    </main>
  );
}
