"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { localizedPath } from "@/config/paths";
import type { Locale, SiteContent } from "@/data/i18n";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  locale: Locale;
  copy: SiteContent["header"];
};

export function MobileMenu({ open, onClose, locale, copy }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => closeRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = Array.from(
        menuRef.current?.querySelectorAll<HTMLElement>("button, a[href]") ?? [],
      ).filter((element) => element.tabIndex >= 0);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <div ref={menuRef} role="dialog" aria-modal="true" aria-label={copy.mobileDialogLabel} className={`fixed inset-0 z-[60] bg-background transition-opacity duration-300 lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`} aria-hidden={!open}>
      <div className="flex h-24 items-center justify-between border-b border-border px-5 sm:px-8">
        <span className="text-xl font-bold tracking-[-0.03em] text-text-primary">SERIFIL</span>
        <button ref={closeRef} type="button" onClick={onClose} className="grid size-12 place-items-center border border-border text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent" aria-label={copy.closeMenu}>
          <X aria-hidden="true" />
        </button>
      </div>
      <nav aria-label={copy.mobileNavigationLabel} className="flex h-[calc(100%-6rem)] flex-col justify-between px-5 py-8 sm:px-8">
        <ul className="divide-y divide-border border-y border-border">
          {copy.nav.map((link, index) => (
            <li key={link.href}>
              <a href={link.href} onClick={onClose} tabIndex={open ? 0 : -1} className="flex min-h-16 items-center justify-between py-3 text-[clamp(1.5rem,8vw,2.3rem)] font-bold tracking-[-0.04em] text-text-primary focus-visible:outline-2 focus-visible:outline-accent">
                {link.label}
                <span className="text-xs font-normal tracking-wider text-text-secondary">0{index + 1}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="grid gap-4">
          <div className="flex border border-border" aria-label={copy.languageLabel}>
            {(["pt", "en"] as const).map((language) => (
              <a
                key={language}
                href={localizedPath(language)}
                tabIndex={open ? 0 : -1}
                aria-current={locale === language ? "page" : undefined}
                className={`flex min-h-12 flex-1 items-center justify-center text-xs font-bold uppercase tracking-[0.1em] ${locale === language ? "bg-text-primary text-background" : "text-text-secondary"}`}
              >
                {language === "pt" ? "Português" : "English"}
              </a>
            ))}
          </div>
          <a href="#orcamento" onClick={onClose} tabIndex={open ? 0 : -1} className="flex min-h-14 items-center justify-center bg-accent px-5 font-bold uppercase tracking-wider text-light-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
            {copy.quote}
          </a>
        </div>
      </nav>
    </div>
  );
}
