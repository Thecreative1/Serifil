import { Mail, MessageCircle, Phone } from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { brand } from "@/config/brand";
import { localizedPath } from "@/config/paths";
import { guidesUi, type GuideLocale } from "@/data/guides";
import { translations } from "@/data/i18n";
import { whatsappUrl } from "@/lib/whatsapp";

const contactLinkClassName =
  "flex min-h-12 items-center gap-3 border-b border-[#171916]/25 py-2 text-sm font-bold text-light-text transition-colors hover:border-[#171916] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-light-text";

export function GuideQuoteCta({ locale }: { locale: GuideLocale }) {
  const ui = guidesUi[locale];
  const contact = translations[locale].contact;

  return (
    <section className="bg-accent py-16 text-light-text sm:py-20" aria-labelledby="guia-pedir-orcamento">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <h2
              id="guia-pedir-orcamento"
              className="max-w-[15ch] text-[clamp(2.7rem,5vw,5.8rem)] leading-[0.9] font-black tracking-[-0.06em]"
            >
              {ui.quoteTitle}
            </h2>
            <p className="mt-6 max-w-[52ch] text-base leading-7 sm:text-lg sm:leading-8">{ui.quoteDescription}</p>
          </div>
          <div className="grid gap-6 lg:col-span-5">
            <Button href={localizedPath(locale, "#orcamento")} variant="dark" className="w-full sm:w-fit">
              {ui.quote}
            </Button>
            <ul className="border-t border-[#171916]/25">
              {brand.phone ? (
                <li>
                  <TrackedLink
                    href={`tel:${brand.phone.replace(/\s/g, "")}`}
                    eventName="click_to_call"
                    eventParameters={{ link_location: "guide_cta" }}
                    aria-label={`${contact.call} ${brand.phone}`}
                    className={contactLinkClassName}
                  >
                    <Phone className="size-4 shrink-0" aria-hidden="true" />
                    {brand.phone}
                  </TrackedLink>
                </li>
              ) : null}
              {brand.email ? (
                <li>
                  <a href={`mailto:${brand.email}`} className={contactLinkClassName}>
                    <Mail className="size-4 shrink-0" aria-hidden="true" />
                    {brand.email}
                  </a>
                </li>
              ) : null}
              {brand.whatsapp ? (
                <li>
                  <TrackedLink
                    href={whatsappUrl(contact.whatsappMessage)}
                    eventName="whatsapp_click"
                    eventParameters={{ link_location: "guide_cta" }}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`WhatsApp ${brand.whatsapp}`}
                    className={contactLinkClassName}
                  >
                    <MessageCircle className="size-4 shrink-0" aria-hidden="true" />
                    {contact.whatsapp}
                  </TrackedLink>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
