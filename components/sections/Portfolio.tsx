import Image from "next/image";
import { portfolio } from "@/data/portfolio";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const sizeClasses = {
  wide: "md:col-span-7",
  tall: "md:col-span-5",
  standard: "md:col-span-6",
};

export function Portfolio() {
  return (
    <section id="trabalhos" className="scroll-mt-20 bg-surface py-20 sm:py-28 lg:py-36">
      <Container>
        <Reveal><SectionHeading eyebrow="PROJETOS" title="Trabalho que se vê. Qualidade que se sente." description="Cada projeto é acompanhado desde o ficheiro inicial até à produção final. As imagens abaixo são demonstrativas e serão substituídas por trabalhos reais." /></Reveal>
        <div className="mt-16 grid gap-x-6 gap-y-12 md:grid-cols-12 lg:mt-24 lg:gap-x-8 lg:gap-y-20">
          {portfolio.map((item, index) => (
            <Reveal key={item.name} className={sizeClasses[item.size]}>
              <article className={`group ${index % 3 === 1 ? "md:mt-16" : ""}`}>
                <div className={`relative overflow-hidden bg-surface-light ${item.size === "tall" ? "aspect-[4/5]" : item.size === "wide" ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
                  <Image src={item.image} alt={item.alt} fill sizes="(max-width: 768px) 100vw, 55vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
                  <span className="absolute left-4 top-4 bg-background/90 px-3 py-2 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-text-primary">Projeto demonstrativo</span>
                </div>
                <div className="mt-5 flex items-start justify-between gap-5 border-t border-border pt-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-accent">{item.category}</p>
                    <h3 className="mt-2 text-2xl font-bold tracking-[-0.035em] text-text-primary sm:text-3xl">{item.name}</h3>
                    <p className="mt-3 max-w-[55ch] text-sm leading-6 text-text-secondary">{item.description}</p>
                  </div>
                  <p className="shrink-0 text-xs text-text-secondary">{item.technique}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
