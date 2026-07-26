import { portfolio } from "@/data/portfolio";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Portfolio() {
  return (
    <section id="trabalhos" className="scroll-mt-20 bg-surface py-20 sm:py-28 lg:py-36">
      <Container>
        <Reveal><SectionHeading eyebrow="APLICAÇÕES" title="Soluções pensadas para diferentes setores." description="Cada projeto é acompanhado desde o ficheiro inicial até à produção final, com atenção ao material, à técnica e ao resultado pretendido." /></Reveal>
        <div className="mt-16 grid border-t border-border md:grid-cols-2 lg:mt-24">
          {portfolio.map((item, index) => (
            <Reveal key={item.name} className={`border-b border-border ${index % 2 === 0 ? "md:border-r" : ""}`}>
              <article className="group flex min-h-full flex-col px-0 py-9 md:px-8 md:py-12 lg:px-12 lg:py-14">
                <div className="flex items-center justify-between gap-6">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-accent">{item.category}</p>
                  <p className="text-sm font-bold text-text-secondary">{String(index + 1).padStart(2, "0")}</p>
                </div>
                <div className="mt-14 sm:mt-20">
                  <h3 className="max-w-[15ch] text-[clamp(2rem,3.3vw,3.7rem)] leading-[0.95] font-bold tracking-[-0.05em] text-text-primary transition-transform duration-300 ease-out group-hover:translate-x-2">{item.name}</h3>
                  <p className="mt-6 max-w-[55ch] text-base leading-7 text-text-secondary">{item.description}</p>
                </div>
                <div className="mt-auto pt-10">
                  <p className="border-t border-border pt-4 text-xs font-semibold uppercase tracking-[0.1em] text-text-secondary">{item.technique}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
