import type { SiteContent } from "@/data/i18n";

export function Marquee({ copy }: { copy: SiteContent["marquee"] }) {
  return (
    <div className="overflow-hidden border-y border-border bg-surface py-4" aria-label={copy.label}>
      <div className="marquee-track flex w-max text-sm font-bold uppercase tracking-[0.16em] text-text-primary" aria-hidden="true">
        <span className="pr-8">{copy.line}</span>
        <span className="pr-8">{copy.line}</span>
      </div>
    </div>
  );
}
