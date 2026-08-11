import { ArrowDown } from "lucide-react";
import { assetPath } from "@/config/paths";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { SiteContent } from "@/data/i18n";

const heroSrcSet = [
  `${assetPath("/images/hero-serigrafia-480w.webp")} 480w`,
  `${assetPath("/images/hero-serigrafia-828w.webp")} 828w`,
  `${assetPath("/images/hero-serigrafia-960w.webp")} 960w`,
  `${assetPath("/images/hero-serigrafia-1280w.webp")} 1280w`,
  `${assetPath("/images/hero-serigrafia.webp")} 1672w`,
].join(", ");

export function Hero({ copy }: { copy: SiteContent["hero"] }) {
  return (
    <section id="inicio" className="relative min-h-[760px] overflow-hidden bg-background pt-20 lg:min-h-screen lg:pt-24">
      <img
        src={assetPath("/images/hero-serigrafia.webp")}
        srcSet={heroSrcSet}
        sizes="100vw"
        alt={copy.imageAlt}
        width={1672}
        height={941}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-[62%_center]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,13,11,0.98)_0%,rgba(12,13,11,0.92)_36%,rgba(12,13,11,0.38)_72%,rgba(12,13,11,0.3)_100%)]" aria-hidden="true" />
      <div className="absolute inset-0 industrial-grid opacity-20" aria-hidden="true" />
      <Container className="relative flex min-h-[680px] flex-col justify-end pb-9 pt-24 lg:min-h-[calc(100vh-6rem)] lg:pb-12">
        <div className="max-w-[1050px]">
          <p className="hero-enter text-xs font-bold uppercase tracking-[0.17em] text-accent sm:text-sm">{copy.eyebrow}</p>
          <h1 className="mt-6 max-w-[14ch] text-[clamp(3.25rem,9.8vw,9.2rem)] leading-[0.82] font-black uppercase tracking-[-0.075em] text-text-primary">
            <span className="block">{copy.lineOne}</span>
            <span className="block">{copy.lineTwo}</span>
          </h1>
          <div className="hero-enter hero-delay-2 mt-8 grid gap-7 lg:grid-cols-[minmax(0,46rem)_auto] lg:items-end lg:gap-12">
            <div>
              <p className="max-w-[65ch] text-base leading-7 text-text-on-media sm:text-lg">{copy.description}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button href="#orcamento">{copy.quote}</Button>
                <Button href="#trabalhos" variant="secondary">{copy.work}</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-enter hero-delay-3 mt-12 flex flex-col gap-5 border-t border-white/20 pt-6 text-xs font-semibold uppercase tracking-[0.12em] text-text-on-media-soft sm:flex-row sm:items-center sm:justify-between">
          <p>{copy.specialties}</p>
          <a href="#introducao" aria-label={copy.continueLabel} className="hidden size-11 place-items-center border border-white/30 transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:grid">
            <ArrowDown className="size-4" aria-hidden="true" />
          </a>
        </div>
      </Container>
    </section>
  );
}
