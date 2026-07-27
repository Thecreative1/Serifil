import { ArrowUpRight, AtSign, Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { brand } from "@/config/brand";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { SiteContent } from "@/data/i18n";

export function ContactSection({ copy }: { copy: SiteContent["contact"] }) {
  const contactItems = [
    { label: copy.phone, value: brand.phone, href: brand.phone ? `tel:${brand.phone.replace(/\s/g, "")}` : "", icon: Phone },
    { label: copy.email, value: brand.email, href: brand.email ? `mailto:${brand.email}` : "", icon: Mail },
    { label: copy.whatsapp, value: brand.whatsapp, href: brand.whatsapp ? `https://wa.me/${brand.whatsapp.replace(/\D/g, "")}` : "", icon: MessageCircle },
    { label: copy.hours, value: brand.openingHours, href: "", icon: Clock3 },
    { label: copy.instagram, value: brand.instagram, href: brand.instagram, icon: AtSign },
  ];
  const available = contactItems.filter((item) => item.value);

  return (
    <section id="contacto" className="scroll-mt-20 border-t border-border bg-surface py-20 sm:py-28 lg:scroll-mt-24">
      <Container>
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20">
            <div>
              <p className="section-kicker text-accent">{copy.eyebrow}</p>
              <h2 className="mt-8 text-[clamp(2.8rem,6vw,5.8rem)] leading-[0.92] font-bold tracking-[-0.06em] text-text-primary">{copy.title}</h2>
              <p className="mt-7 text-lg leading-8 text-text-secondary">{copy.descriptionPrefix} {brand.location}. {copy.descriptionSuffix}</p>
            </div>
            <div className="border-y border-border">
              <div className="flex items-start gap-5 py-7">
                <MapPin className="mt-1 size-5 shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-text-secondary">{copy.location}</p>
                  <p className="mt-2 max-w-[34ch] text-xl font-bold text-text-primary">{brand.address}</p>
                  <p className="mt-1 text-sm text-text-secondary">{brand.location}</p>
                </div>
              </div>
              {available.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-start gap-5 border-t border-border py-7">
                    <Icon className="mt-1 size-5 shrink-0 text-accent" aria-hidden="true" />
                    <div><p className="text-xs font-bold uppercase tracking-[0.12em] text-text-secondary">{item.label}</p>{item.href ? <a className="mt-2 inline-block text-xl font-bold text-text-primary underline-offset-4 hover:underline" href={item.href}>{item.value}</a> : <p className="mt-2 text-xl font-bold text-text-primary">{item.value}</p>}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
        <Reveal className="mt-16 lg:mt-24">
          <div className="grid overflow-hidden border border-border bg-background lg:grid-cols-[0.55fr_1.45fr]">
            <div className="flex min-h-72 flex-col justify-between p-7 sm:p-10 lg:min-h-[28rem] lg:p-12">
              <div>
                <p className="section-kicker text-accent">{copy.visit}</p>
                <p className="mt-8 max-w-[18ch] text-[clamp(2rem,4vw,4.2rem)] leading-[0.94] font-bold tracking-[-0.05em] text-text-primary">
                  {brand.address}
                </p>
                <p className="mt-5 text-base text-text-secondary">{brand.location}</p>
              </div>
              <a
                href={brand.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-10 inline-flex min-h-12 w-fit items-center gap-3 border-b border-text-secondary py-3 text-sm font-bold uppercase tracking-[0.08em] text-text-primary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {copy.directions}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </div>
            <div className="relative min-h-[24rem] overflow-hidden bg-surface lg:min-h-[28rem]">
              <div className="industrial-grid absolute inset-0 grid place-items-center opacity-45" aria-hidden="true">
                <div className="grid place-items-center gap-3 text-center">
                  <span className="grid size-12 place-items-center bg-accent text-light-text">
                    <MapPin className="size-5" />
                  </span>
                  <span className="text-xs font-bold tracking-[0.12em] text-text-secondary">
                    {brand.latitude}, {brand.longitude}
                  </span>
                </div>
              </div>
              <iframe
                title={copy.mapTitle}
                src={brand.mapEmbedUrl}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
