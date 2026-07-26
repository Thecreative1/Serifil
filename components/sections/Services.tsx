import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Services() {
  return (
    <section id="servicos" className="scroll-mt-20 bg-background py-20 sm:py-28 lg:py-36">
      <Container>
        <Reveal><SectionHeading eyebrow="O QUE PRODUZIMOS" title="Soluções para dar presença à sua marca." description="Produção personalizada para diferentes materiais, necessidades, quantidades e tipos de projeto." /></Reveal>
        <div className="mt-16 border-t border-border lg:mt-24">
          {services.map((service) => (
            <Reveal key={service.number}>
              <article className="group grid gap-6 border-b border-border py-10 sm:py-12 lg:grid-cols-[5rem_minmax(0,1.05fr)_minmax(19rem,0.8fr)_auto] lg:items-start lg:gap-10 lg:py-16">
                <p className="text-sm font-bold text-accent">{service.number}</p>
                <h3 className="max-w-[15ch] text-[clamp(2rem,3.8vw,4.2rem)] leading-[0.95] font-bold tracking-[-0.05em] text-text-primary transition-colors duration-300 group-hover:text-accent">{service.title}</h3>
                <p className="max-w-[56ch] text-base leading-7 text-text-secondary sm:text-lg">{service.description}</p>
                <a href="#orcamento" aria-label={`Pedir orçamento para ${service.title}`} className="inline-flex min-h-11 items-center gap-2 border-b border-text-secondary py-2 text-sm font-bold uppercase tracking-[0.08em] text-text-primary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent lg:justify-self-end">
                  Orçamento <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
