"use client";

import { Menu } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { brand } from "@/config/brand";
import { localizedPath } from "@/config/paths";
import type { Locale, SiteContent } from "@/data/i18n";
import { trackEvent } from "@/lib/analytics";
import { MobileMenu } from "./MobileMenu";
import { BrandMark } from "@/components/ui/BrandMark";

type HeaderProps = {
  locale: Locale;
  copy: SiteContent["header"];
  homeHref?: string;
  languageHrefs?: Record<Locale, string>;
};

export function Header({ locale, copy, homeHref, languageHrefs }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sectionHref = (href: string) => homeHref ? `${homeHref}${href}` : href;
  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    window.requestAnimationFrame(() => menuButtonRef.current?.focus({ preventScroll: true }));
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href="#conteudo-principal"
        className="fixed top-3 left-4 z-[80] -translate-y-[160%] bg-text-primary px-4 py-3 text-sm font-bold text-background shadow-[0_10px_28px_rgba(0,0,0,0.32)] transition-transform duration-200 focus:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {copy.skipToContent}
      </a>
      <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${scrolled ? "border-border bg-background/95" : "border-transparent bg-background/20"}`}>
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:h-24 lg:px-12">
          <a href={homeHref ?? "#inicio"} className="group flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:gap-4" aria-label={copy.homeLabel}>
            <BrandMark className="h-9 w-auto shrink-0 text-accent transition-transform duration-300 ease-out group-hover:-translate-y-0.5 sm:h-10" />
            <span className="text-xl font-black tracking-[-0.04em] text-text-primary sm:text-2xl">{brand.name}</span>
            <span className="hidden border-l border-border pl-4 text-[0.65rem] leading-4 uppercase tracking-[0.15em] text-text-secondary xl:block">{copy.descriptor}</span>
          </a>
          <nav className="hidden items-center gap-6 lg:flex" aria-label={copy.navigationLabel}>
            {copy.nav.map((link) => (
              <a key={link.href} href={sectionHref(link.href)} className="text-sm font-semibold text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                {link.label}
              </a>
            ))}
            <div role="group" className="flex items-center border border-border" aria-label={copy.languageLabel}>
              {(["pt", "en"] as const).map((language) => (
                <a
                  key={language}
                  href={languageHrefs?.[language] ?? localizedPath(language)}
                  onClick={() => {
                    if (locale !== language) {
                      trackEvent("language_change", {
                        language_from: locale,
                        language_to: language,
                        link_location: "header",
                      });
                    }
                  }}
                  aria-current={locale === language ? "page" : undefined}
                  className={`grid min-h-10 min-w-10 place-items-center text-[0.68rem] font-bold uppercase tracking-[0.08em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${locale === language ? "bg-text-primary text-background" : "text-text-secondary hover:text-text-primary"}`}
                >
                  {language}
                </a>
              ))}
            </div>
            <a href={sectionHref("#orcamento")} className="bg-accent px-5 py-3 text-sm font-bold uppercase tracking-[0.06em] text-light-text transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
              {copy.quote}
            </a>
          </nav>
          <button ref={menuButtonRef} type="button" onClick={() => setMenuOpen(true)} className="grid size-12 place-items-center border border-border text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:hidden" aria-label={copy.openMenu} aria-expanded={menuOpen} aria-controls="mobile-menu">
            <Menu aria-hidden="true" />
          </button>
        </div>
      </header>
      <div id="mobile-menu">
        <MobileMenu
          open={menuOpen}
          onClose={closeMenu}
          locale={locale}
          copy={copy}
          homeHref={homeHref}
          languageHrefs={languageHrefs}
        />
      </div>
    </>
  );
}
