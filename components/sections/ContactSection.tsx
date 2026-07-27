import { AtSign, Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { brand } from "@/config/brand";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { SiteContent } from "@/data/i18n";

export function ContactSection({ copy }: { copy: SiteContent["contact"] }) {
  const contactItems = [
    { label: copy.phone, value: brand.phone, href: brand.phone ? `tel:${brand.phone.replace(/\s/g, "")}` : "", icon: Phone },
    { label: copy.email, value: brand.email, href: brand.email ? `mailto:${brand.email}` : "", icon: Mail },
    { label: copy.whatsapp, value: brand.whatsapp, href: brand.whatsapp ? `https://wa.me/${brand.whatsapp.replace(/\D/g, "")}` : "", icon: MessageCircle },
    { label: copy.address, value: brand.address, href: "", icon: MapPin },
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
                <div><p className="text-xs font-bold uppercase tracking-[0.12em] text-text-secondary">{copy.location}</p><p className="mt-2 text-xl font-bold text-text-primary">{brand.location}</p></div>
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
      </Container>
    </section>
  );
}
