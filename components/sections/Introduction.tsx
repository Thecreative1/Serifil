import { brand } from "@/config/brand";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function Introduction() {
  return (
    <section id="introducao" className="scroll-mt-20 bg-light-background py-20 text-light-text sm:py-28 lg:scroll-mt-24 lg:py-36">
      <Container>
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[0.65fr_1.5fr] lg:gap-20">
            <p className="section-kicker text-light-muted">DA IDEIA À PRODUÇÃO</p>
            <div>
              <h2 className="max-w-[12ch] text-[clamp(3rem,8vw,7.4rem)] leading-[0.88] font-bold tracking-[-0.065em]">{brand.secondaryTagline}</h2>
              <p className="mt-8 max-w-[62ch] text-lg leading-8 text-[#555951] sm:text-xl">Trabalhamos sobretudo para o setor do calçado, imprimindo sacos em tecido, sacos plásticos e capas guarda-fatos com acompanhamento técnico e comunicação direta.</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
