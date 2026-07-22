import { processSteps } from "@/data/process";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Process() {
  return (
    <section id="processo" className="scroll-mt-20 bg-light-background py-20 sm:py-28 lg:py-36">
      <Container>
        <Reveal><SectionHeading eyebrow="COMO FUNCIONA" title="Da ideia à peça final." light /></Reveal>
        <div className="relative mt-16 grid gap-0 border-y border-[#c9c3b8] lg:mt-24 lg:grid-cols-5 lg:border-x">
          <div className="absolute left-[10%] right-[10%] top-[3.55rem] hidden h-px bg-[#b9b3a8] lg:block" aria-hidden="true" />
          {processSteps.map((step) => (
            <Reveal key={step.number}>
              <article className="relative min-h-full border-b border-[#c9c3b8] px-5 py-8 last:border-b-0 lg:border-b-0 lg:border-r lg:px-6 lg:py-10 lg:last:border-r-0">
                <span className="relative z-10 grid size-10 place-items-center bg-light-text text-xs font-bold text-light-background">{step.number}</span>
                <h3 className="mt-12 text-2xl font-bold tracking-[-0.04em] text-light-text">{step.title}</h3>
                <p className="mt-4 text-sm leading-6 text-[#555951]">{step.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
