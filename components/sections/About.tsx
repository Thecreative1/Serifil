import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { assetPath } from "@/config/paths";

export function About() {
  return (
    <section id="sobre" className="scroll-mt-20 bg-background py-20 sm:py-28 lg:py-36">
      <Container>
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-5">
              <p className="section-kicker text-accent">A SERIFIL</p>
              <h2 className="mt-8 text-[clamp(2.8rem,6vw,6rem)] leading-[0.9] font-bold tracking-[-0.06em] text-text-primary">Experiência de produção. Nova ambição.</h2>
              <p className="mt-8 text-base leading-7 text-text-secondary sm:text-lg">A Serifil é uma empresa de serigrafia e personalização em Guimarães, preparada para trabalhar com empresas, associações, eventos, equipas e marcas locais. Combinamos experiência prática de produção com acompanhamento próximo e comunicação direta.</p>
            </div>
            <div className="relative aspect-[5/4] overflow-hidden bg-surface lg:col-span-7">
              <Image src={assetPath("/images/workshop-serifil.webp")} alt="Vista geral representativa de uma oficina de serigrafia organizada" fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover" />
              <p className="absolute bottom-0 left-0 bg-background px-4 py-3 text-xs text-text-secondary">Imagem provisória. Fotografia real da oficina a adicionar.</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
