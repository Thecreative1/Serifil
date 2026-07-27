import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { SiteContent } from "@/data/i18n";

export function QuoteCTA({ copy }: { copy: SiteContent["quoteCta"] }) {
  return (
    <section className="bg-light-background py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[1.5fr_auto] lg:items-end">
            <div className="min-w-0">
              <p className="section-kicker text-light-muted">{copy.eyebrow}</p>
              <h2 className="mt-8 max-w-[12ch] text-[clamp(2.5rem,8vw,7.6rem)] leading-[0.86] font-bold tracking-[-0.07em] text-light-text">{copy.title}</h2>
              <p className="mt-7 max-w-[56ch] text-lg leading-8 text-[#555951]">{copy.description}</p>
            </div>
            <Button href="#orcamento" variant="dark" className="lg:mb-2">{copy.button}</Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
