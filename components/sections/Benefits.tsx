import { Check } from "lucide-react";
import { benefits } from "@/data/benefits";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Benefits() {
  return (
    <section className="bg-background py-20 sm:py-28 lg:py-36">
      <Container>
        <Reveal><SectionHeading eyebrow="PORQUÊ A SERIFIL" title="Produção sem complicações." /></Reveal>
        <div className="mt-16 border-y border-border lg:mt-24">
          {benefits.map((benefit, index) => (
            <Reveal key={benefit.title}>
              <div className="grid gap-4 border-b border-border py-7 last:border-b-0 sm:grid-cols-[4rem_1fr_1.2fr] sm:items-center sm:gap-8 lg:py-9">
                <span className="grid size-9 place-items-center bg-accent text-light-text"><Check className="size-4" strokeWidth={3} aria-hidden="true" /></span>
                <h3 className="text-xl font-bold tracking-[-0.03em] text-text-primary sm:text-2xl">{benefit.title}</h3>
                <p className="max-w-[58ch] text-sm leading-6 text-text-secondary sm:text-base">{benefit.description}</p>
                <span className="sr-only">Vantagem {index + 1}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
