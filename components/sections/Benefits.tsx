import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { SiteContent } from "@/data/i18n";

// Também é a secção "Sobre" do menu (#sobre): a apresentação da empresa já está na introdução.
export function Benefits({ copy }: { copy: SiteContent["benefits"] }) {
  return (
    <section id="sobre" className="scroll-mt-20 bg-background py-20 sm:py-28 lg:scroll-mt-24 lg:py-36">
      <Container>
        <Reveal><SectionHeading eyebrow={copy.eyebrow} title={copy.title} /></Reveal>
        <Reveal>
        <ul className="mt-16 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3 lg:gap-y-14">
          {copy.items.map((benefit) => (
              <li key={benefit.title} className="border-t border-border pt-6">
                <h3 className="text-xl font-bold tracking-[-0.03em] text-text-primary sm:text-2xl">{benefit.title}</h3>
                <p className="mt-3 max-w-[40ch] text-sm leading-6 text-text-secondary sm:text-base sm:leading-7">{benefit.description}</p>
              </li>
          ))}
        </ul>
        </Reveal>
      </Container>
    </section>
  );
}
