import { brand } from "@/config/brand";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function Introduction() {
  return (
    <section id="introducao" className="bg-light-background py-20 text-light-text sm:py-28 lg:py-36">
      <Container>
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[0.65fr_1.5fr] lg:gap-20">
            <p className="section-kicker text-[#6a6d67]">DA IDEIA À PRODUÇÃO</p>
            <div>
              <h2 className="max-w-[12ch] text-[clamp(3rem,8vw,7.4rem)] leading-[0.88] font-bold tracking-[-0.065em]">{brand.secondaryTagline}</h2>
              <p className="mt-8 max-w-[62ch] text-lg leading-8 text-[#555951] sm:text-xl">Transformamos ideias, logótipos e projetos em peças produzidas com acompanhamento técnico, comunicação direta e atenção ao resultado final.</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
