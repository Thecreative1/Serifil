import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { SiteContent } from "@/data/i18n";

export function WorkModes({ copy }: { copy: SiteContent["workModes"] }) {
  return (
    <section id="como-trabalhamos" className="scroll-mt-20 bg-light-background py-20 sm:py-28 lg:scroll-mt-24 lg:py-36">
      <Container>
        <Reveal><SectionHeading eyebrow={copy.eyebrow} title={copy.title} light /></Reveal>
        <div className="mt-16 grid border border-light-border lg:mt-24 lg:grid-cols-2">
          {copy.items.map((item, index) => (
            <Reveal key={item.title} className={index > 0 ? "border-t border-light-border lg:border-t-0 lg:border-l" : ""}>
              <article className="flex min-h-full flex-col p-7 sm:p-10 lg:p-14">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-accent">{item.label}</p>
                <h3 className="mt-14 max-w-[15ch] text-[clamp(2rem,3.6vw,3.6rem)] leading-[0.94] font-bold tracking-[-0.05em] text-light-text">{item.title}</h3>
                <p className="mt-6 max-w-[48ch] text-base leading-7 text-[#555951] sm:text-lg">{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-8 max-w-[74ch] border-l-2 border-accent pl-5 text-sm leading-6 text-[#555951] sm:text-base sm:leading-7">
            {copy.note}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
