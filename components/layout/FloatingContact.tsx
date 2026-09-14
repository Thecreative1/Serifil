import { MessageCircle, Phone } from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { brand } from "@/config/brand";
import type { SiteContent } from "@/data/i18n";
import { whatsappUrl } from "@/lib/whatsapp";

export function FloatingContact({ copy }: { copy: SiteContent["contact"] }) {
  if (!brand.phone && !brand.whatsapp) return null;

  return (
    <div className="fixed right-4 bottom-4 z-40 flex items-center border border-border bg-background shadow-[0_10px_32px_rgba(0,0,0,0.28)] sm:right-5 sm:bottom-5">
      {brand.phone ? (
        <TrackedLink
          href={`tel:${brand.phone.replace(/\s/g, "")}`}
          eventName="click_to_call"
          eventParameters={{ link_location: "floating_contact" }}
          aria-label={`${copy.call} ${brand.phone}`}
          title={`${copy.call} ${brand.phone}`}
          className="inline-flex min-h-12 min-w-12 items-center justify-center gap-2 px-3 text-sm font-bold text-text-primary transition-colors duration-300 hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:px-4"
        >
          <Phone className="size-4" aria-hidden="true" />
          <span className="hidden sm:inline">{copy.call}</span>
        </TrackedLink>
      ) : null}
      {brand.whatsapp ? (
        <TrackedLink
          href={whatsappUrl(copy.whatsappMessageFloating)}
          eventName="whatsapp_click"
          eventParameters={{ link_location: "floating_contact" }}
          target="_blank"
          rel="noreferrer"
          aria-label={`WhatsApp ${brand.whatsapp}`}
          title={`WhatsApp ${brand.whatsapp}`}
          className="inline-flex min-h-12 min-w-12 items-center justify-center gap-2 bg-accent px-3 text-sm font-bold text-light-text transition-colors duration-300 hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:px-4"
        >
          <MessageCircle className="size-4" aria-hidden="true" />
          <span className="hidden sm:inline">WhatsApp</span>
        </TrackedLink>
      ) : null}
    </div>
  );
}
