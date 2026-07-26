import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const principles = [
  ["01", "Produção local"],
  ["02", "Comunicação direta"],
  ["03", "Acompanhamento técnico"],
] as const;

export function About() {
  return (
    <section id="sobre" className="scroll-mt-20 bg-background py-20 sm:py-28 lg:py-36">
      <Container>
        <Reveal>
          <div className="grid gap-16 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-7">
              <p className="section-kicker text-accent">A SERIFIL</p>
              <h2 className="mt-8 max-w-[12ch] text-[clamp(2.8rem,6vw,6.5rem)] leading-[0.88] font-bold tracking-[-0.065em] text-text-primary">Experiência de produção. Nova ambição.</h2>
              <p className="mt-10 max-w-[62ch] text-base leading-7 text-text-secondary sm:text-lg">A Serifil é uma empresa de serigrafia e personalização em Guimarães, preparada para trabalhar com empresas, associações, eventos, equipas e marcas locais. Combinamos experiência prática de produção com acompanhamento próximo e comunicação direta.</p>
            </div>
            <div className="border-t border-border lg:col-span-5">
              {principles.map(([number, label]) => (
                <div key={number} className="grid grid-cols-[3rem_1fr] gap-5 border-b border-border py-6 sm:grid-cols-[4rem_1fr] sm:py-8">
                  <p className="text-sm font-bold text-accent">{number}</p>
                  <p className="text-xl font-bold tracking-[-0.025em] text-text-primary sm:text-2xl">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
