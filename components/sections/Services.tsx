import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Services() {
  const primaryService = services.find((service) => service.emphasis === "primary");
  const supportingServices = services.filter((service) => service.emphasis === "supporting");
  const complementaryServices = services.filter((service) => service.emphasis === "complementary");

  if (!primaryService) return null;

  return (
    <section id="servicos" className="scroll-mt-20 bg-background py-20 sm:py-28 lg:scroll-mt-24 lg:py-36">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="ESPECIALIDADE PRINCIPAL"
            title="Sacos personalizados para o setor do calçado."
            description="A maior parte do nosso trabalho concentra-se na impressão de sacos em tecido, sacos plásticos e capas guarda-fatos."
          />
        </Reveal>

        <div className="mt-16 grid border border-border lg:mt-24 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal className="lg:border-r lg:border-border">
            <article className="flex min-h-full flex-col bg-accent p-7 text-light-text sm:p-10 lg:p-14">
              <div className="flex items-center justify-between gap-5">
                <p className="text-xs font-black uppercase tracking-[0.14em]">{primaryService.label}</p>
                <p className="text-sm font-black">{primaryService.number}</p>
              </div>
              <h3 className="mt-20 max-w-[12ch] text-[clamp(3rem,6vw,6.8rem)] leading-[0.88] font-black tracking-[-0.065em]">
                {primaryService.title}
              </h3>
              <p className="mt-8 max-w-[52ch] text-base leading-7 text-[#3a2017] sm:text-lg">{primaryService.description}</p>
              <a href="#orcamento" aria-label={`Pedir orçamento para ${primaryService.title}`} className="mt-12 inline-flex min-h-12 w-fit items-center gap-3 border border-light-text/40 bg-light-text px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-text-primary transition-colors hover:bg-[#2a2d28] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-light-text">
                Pedir orçamento <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </article>
          </Reveal>

          <div className="grid">
            {supportingServices.map((service, index) => (
              <Reveal key={service.number} className={index > 0 ? "border-t border-border" : ""}>
                <article className="flex min-h-full flex-col bg-surface p-7 sm:p-9 lg:p-10">
                  <div className="flex items-center justify-between gap-5">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-accent">{service.label}</p>
                    <p className="text-sm font-bold text-text-secondary">{service.number}</p>
                  </div>
                  <h3 className="mt-12 max-w-[14ch] text-[clamp(2rem,3.6vw,3.8rem)] leading-[0.94] font-bold tracking-[-0.05em] text-text-primary">{service.title}</h3>
                  <p className="mt-6 max-w-[48ch] text-base leading-7 text-text-secondary">{service.description}</p>
                  <a href="#orcamento" aria-label={`Pedir orçamento para ${service.title}`} className="mt-9 inline-flex min-h-11 w-fit items-center gap-2 border-b border-text-secondary py-2 text-sm font-bold uppercase tracking-[0.08em] text-text-primary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                    Orçamento <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-20 lg:mt-28">
          <Reveal><p className="section-kicker text-text-secondary">OUTROS SERVIÇOS</p></Reveal>
          <div className="mt-7 border-t border-border">
            {complementaryServices.map((service) => (
              <Reveal key={service.number}>
                <article className="grid gap-5 border-b border-border py-9 sm:grid-cols-[4rem_minmax(0,1fr)_minmax(18rem,0.8fr)_auto] sm:items-start sm:gap-8 lg:py-12">
                  <p className="text-sm font-bold text-accent">{service.number}</p>
                  <h3 className="max-w-[18ch] text-[clamp(1.7rem,2.8vw,3.1rem)] leading-[0.98] font-bold tracking-[-0.045em] text-text-primary">{service.title}</h3>
                  <p className="max-w-[56ch] text-base leading-7 text-text-secondary">{service.description}</p>
                  <a href="#orcamento" aria-label={`Pedir orçamento para ${service.title}`} className="inline-flex min-h-11 w-fit items-center gap-2 border-b border-text-secondary py-2 text-sm font-bold uppercase tracking-[0.08em] text-text-primary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:justify-self-end">
                    Orçamento <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
