import Image from "next/image";
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
          {services.map((service, index) => (
            <Reveal key={service.number}>
              <article className={`group grid gap-8 border-b border-border py-10 lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-16 ${index % 2 ? "" : ""}`}>
                <p className="text-sm font-bold text-accent lg:col-span-1">{service.number}</p>
                <div className={`relative aspect-[16/10] overflow-hidden bg-surface lg:col-span-5 ${index % 2 ? "lg:order-3" : ""}`}>
                  <Image src={service.image} alt={service.imageAlt} fill sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]" />
                </div>
                <div className={`lg:col-span-6 ${index % 2 ? "lg:order-2" : ""}`}>
                  <h3 className="max-w-[15ch] text-[clamp(2rem,4vw,4.2rem)] leading-[0.95] font-bold tracking-[-0.05em] text-text-primary">{service.title}</h3>
                  <p className="mt-5 max-w-[56ch] text-base leading-7 text-text-secondary sm:text-lg">{service.description}</p>
                  <a href="#orcamento" aria-label={`Pedir orçamento para ${service.title}`} className="mt-7 inline-flex min-h-11 items-center gap-2 border-b border-text-secondary py-2 text-sm font-bold uppercase tracking-[0.08em] text-text-primary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                    Pedir orçamento <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
