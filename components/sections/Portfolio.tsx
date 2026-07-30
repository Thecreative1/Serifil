import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { assetPath } from "@/config/paths";
import type { SiteContent } from "@/data/i18n";

export function Portfolio({ copy }: { copy: SiteContent["portfolio"] }) {
  return (
    <section id="trabalhos" className="scroll-mt-20 bg-surface py-20 sm:py-28 lg:scroll-mt-24 lg:py-36">
      <Container>
        <Reveal><SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} /></Reveal>
        <div className="mt-16 border-t border-border lg:mt-24">
          {copy.items.map((item, index) => (
            <Reveal key={item.name} className="border-b border-border">
              <article className="grid gap-10 py-12 md:py-16 lg:grid-cols-12 lg:gap-12 lg:py-20">
                <div className="lg:col-span-4 lg:pr-6">
                  <div className="flex items-center justify-between gap-6">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">{item.category}</p>
                    <p className="text-sm font-bold text-text-secondary">{String(index + 1).padStart(2, "0")}</p>
                  </div>
                  <h3 className="mt-10 max-w-[13ch] text-[clamp(2rem,3.3vw,3.7rem)] leading-[0.95] font-bold tracking-[-0.05em] text-text-primary">
                    {item.name}
                  </h3>
                  <p className="mt-6 max-w-[52ch] text-base leading-7 text-text-secondary">{item.description}</p>
                  <p className="mt-8 border-t border-border pt-4 text-xs font-semibold uppercase tracking-[0.1em] text-text-secondary">
                    {item.technique}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-px bg-border lg:col-span-8">
                  {item.images.map((image, imageIndex) => (
                    <figure key={image.src} className="relative aspect-[4/3] overflow-hidden bg-background">
                      <Image
                        src={assetPath(image.src)}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 45vw"
                        className="object-cover"
                      />
                      <figcaption className="sr-only">{image.alt}</figcaption>
                      <span
                        aria-hidden="true"
                        className="absolute right-0 bottom-0 bg-background/90 px-2.5 py-1.5 text-[0.625rem] font-bold tracking-[0.12em] text-text-secondary"
                      >
                        {String(imageIndex + 1).padStart(2, "0")}
                      </span>
                    </figure>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
