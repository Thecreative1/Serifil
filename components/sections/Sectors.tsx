import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { SiteContent } from "@/data/i18n";

export function Sectors({ copy }: { copy: SiteContent["sectors"] }) {
  return (
    <section id="setores" className="scroll-mt-20 bg-background py-20 sm:py-28 lg:scroll-mt-24 lg:py-36">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <SectionHeading title={copy.title} description={copy.description} />
          </Reveal>
          <Reveal className="lg:col-span-7 lg:pt-3">
            <ul className="flex flex-wrap gap-3" aria-label={copy.eyebrow}>
              {copy.items.map((item) => (
                <li
                  key={item}
                  className="border border-border px-5 py-3 text-lg font-bold tracking-[-0.02em] text-text-primary sm:px-6 sm:py-4 sm:text-2xl"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
