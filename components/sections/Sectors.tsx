import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { SiteContent } from "@/data/i18n";

export function Sectors({ copy }: { copy: SiteContent["sectors"] }) {
  return (
    <section id="setores" className="scroll-mt-20 bg-background py-20 sm:py-28 lg:scroll-mt-24 lg:py-36">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
        </Reveal>
        <Reveal>
          <ul className="mt-16 grid border-t border-border sm:grid-cols-2 lg:mt-24 lg:grid-cols-3">
            {copy.items.map((item, index) => (
              <li
                key={item}
                className={`grid grid-cols-[3rem_1fr] items-center gap-4 border-b border-border py-6 sm:grid-cols-[4rem_1fr] sm:border-r sm:py-8 sm:even:border-r-0 lg:even:border-r lg:[&:nth-child(3n)]:border-r-0 ${
                  index === copy.items.length - 1 ? "sm:border-r-0!" : ""
                }`}
              >
                <span className="text-sm font-bold text-accent">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-xl font-bold tracking-[-0.025em] text-text-primary sm:text-2xl">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
