import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function QuoteCTA() {
  return (
    <section className="bg-light-background py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[1.5fr_auto] lg:items-end">
            <div>
              <p className="section-kicker text-light-muted">VAMOS PRODUZIR</p>
              <h2 className="mt-8 max-w-[12ch] text-[clamp(3.2rem,8vw,7.6rem)] leading-[0.86] font-bold tracking-[-0.07em] text-light-text">Tem uma ideia para imprimir?</h2>
              <p className="mt-7 max-w-[56ch] text-lg leading-8 text-[#555951]">Envie os detalhes do projeto e receba uma análise inicial do trabalho.</p>
            </div>
            <Button href="#orcamento" variant="dark" className="lg:mb-2">Pedir orçamento</Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
