import { Plus } from "lucide-react";
import { brand } from "@/config/brand";
import { CookiePreferencesButton } from "@/components/analytics/CookiePreferencesButton";
import { Container } from "@/components/ui/Container";
import type { SiteContent } from "@/data/i18n";
import { BrandMark } from "@/components/ui/BrandMark";

export function Footer({
  copy,
  headerCopy,
  homeHref,
}: {
  copy: SiteContent["footer"];
  headerCopy: SiteContent["header"];
  homeHref?: string;
}) {
  const legalDetails: Array<{ label: string; value: string; href?: string }> = [
    { label: copy.legal.commercialName, value: brand.name },
    { label: copy.legal.owner, value: brand.legalOwner },
    { label: copy.legal.taxId, value: brand.taxId },
    { label: copy.legal.activity, value: copy.legal.activityValue },
    { label: copy.legal.address, value: `${brand.address}, ${brand.location}` },
    ...(brand.email
      ? [{ label: copy.legal.email, value: brand.email, href: `mailto:${brand.email}` }]
      : []),
    ...(brand.phone
      ? [{ label: copy.legal.phone, value: brand.phone, href: `tel:${brand.phone.replace(/\s/g, "")}` }]
      : []),
  ];
  const sectionHref = (href: string) => homeHref ? `${homeHref}${href}` : href;

  return (
    <footer className="border-t border-border bg-background-deep py-12 sm:py-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.7fr_0.7fr]">
          <div>
            <div className="flex items-center gap-4">
              <BrandMark className="h-14 w-auto text-accent" />
              <p className="text-3xl font-black tracking-[-0.05em] text-text-primary">{brand.name}</p>
            </div>
            <p className="mt-2 text-sm uppercase tracking-[0.12em] text-text-secondary">{headerCopy.descriptor}</p>
            <p className="mt-8 max-w-md text-xl font-semibold leading-snug text-text-primary">{copy.tagline}</p>
            <p className="mt-3 text-sm text-text-secondary">{brand.location}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-text-secondary">{copy.navigation}</p>
            <ul className="mt-5 grid gap-3">
              {headerCopy.nav.map((link) => <li key={link.href}><a className="text-sm text-text-primary underline-offset-4 hover:underline" href={sectionHref(link.href)}>{link.label}</a></li>)}
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-text-secondary">{copy.information}</p>
            <ul className="mt-5 grid gap-3 text-sm text-text-primary">
              <li>{brand.location}</li>
              {brand.email ? (
                <li>
                  <a className="underline decoration-border underline-offset-4 transition-colors hover:decoration-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent" href={`mailto:${brand.email}`}>
                    {brand.email}
                  </a>
                </li>
              ) : null}
              {brand.instagram ? (
                <li>
                  <a
                    className="underline decoration-border underline-offset-4 transition-colors hover:decoration-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                    href={brand.instagram}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Instagram ${brand.instagramHandle}`}
                  >
                    {brand.instagramHandle}
                  </a>
                </li>
              ) : null}
              <li>{copy.formRequests}</li>
            </ul>
          </div>
        </div>
        <details className="group mt-12 border-y border-border">
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-6 py-4 text-xs font-bold uppercase tracking-[0.12em] text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
            {copy.legal.title}
            <Plus className="size-4 shrink-0 transition-transform duration-300 group-open:rotate-45" aria-hidden="true" />
          </summary>
          <dl className="grid gap-x-12 gap-y-6 border-t border-border py-6 sm:grid-cols-2 lg:grid-cols-3">
            {legalDetails.map((item) => (
              <div key={item.label}>
                <dt className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-text-secondary">
                  {item.label}
                </dt>
                <dd className="mt-2 text-sm leading-6 text-text-primary">
                  {item.href ? (
                    <a
                      className="underline decoration-border underline-offset-4 transition-colors hover:decoration-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                      href={item.href}
                    >
                      {item.value}
                    </a>
                  ) : item.value}
                </dd>
              </div>
            ))}
          </dl>
        </details>
        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-text-secondary sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {brand.name}. {copy.rights}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <CookiePreferencesButton label={copy.cookiePreferences} />
            <p>{copy.production}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
