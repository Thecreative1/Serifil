import { brand } from "@/config/brand";
import { Container } from "@/components/ui/Container";
import type { SiteContent } from "@/data/i18n";

export function Footer({ copy, headerCopy }: { copy: SiteContent["footer"]; headerCopy: SiteContent["header"] }) {
  return (
    <footer className="border-t border-border bg-[#0c0d0b] py-12 sm:py-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.7fr_0.7fr]">
          <div>
            <p className="text-3xl font-black tracking-[-0.05em] text-text-primary">{brand.name}</p>
            <p className="mt-2 text-sm uppercase tracking-[0.12em] text-text-secondary">{headerCopy.descriptor}</p>
            <p className="mt-8 max-w-md text-xl font-semibold leading-snug text-text-primary">{copy.tagline}</p>
            <p className="mt-3 text-sm text-text-secondary">{brand.location}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-text-secondary">{copy.navigation}</p>
            <ul className="mt-5 grid gap-3">
              {headerCopy.nav.map((link) => <li key={link.href}><a className="text-sm text-text-primary underline-offset-4 hover:underline" href={link.href}>{link.label}</a></li>)}
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-text-secondary">{copy.information}</p>
            <ul className="mt-5 grid gap-3 text-sm text-text-primary">
              <li>{brand.location}</li>
              <li>{copy.formRequests}</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-text-secondary sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {brand.name}. {copy.rights}</p>
          <p>{copy.production}</p>
        </div>
      </Container>
    </footer>
  );
}
