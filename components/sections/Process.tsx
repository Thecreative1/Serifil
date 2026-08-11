import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { SiteContent } from "@/data/i18n";

export function Process({ copy }: { copy: SiteContent["process"] }) {
  return (
    <section id="processo" className="scroll-mt-20 bg-light-background py-20 sm:py-28 lg:scroll-mt-24 lg:py-36">
      <Container>
        <Reveal><SectionHeading eyebrow={copy.eyebrow} title={copy.title} light /></Reveal>
        <div className="relative mt-16 grid gap-0 border-y border-light-border lg:mt-24 lg:grid-cols-5 lg:border-x">
          <div className="absolute left-[10%] right-[10%] top-[3.55rem] hidden h-px bg-light-border-soft lg:block" aria-hidden="true" />
          {copy.items.map((step) => (
            <Reveal key={step.number}>
              <article className="relative min-h-full border-b border-light-border px-5 py-8 last:border-b-0 lg:border-b-0 lg:border-r lg:px-6 lg:py-10 lg:last:border-r-0">
                <span className="relative z-10 grid size-10 place-items-center bg-light-text text-xs font-bold text-light-background">{step.number}</span>
                <h3 className="mt-12 text-2xl font-bold tracking-[-0.04em] text-light-text">{step.title}</h3>
                <p className="mt-4 text-sm leading-6 text-light-body">{step.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
