"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  links: readonly { href: string; label: string }[];
};

export function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <div className={`fixed inset-0 z-[60] bg-background transition-[visibility,opacity] duration-300 lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`} aria-hidden={!open}>
      <div className="flex h-24 items-center justify-between border-b border-border px-5 sm:px-8">
        <span className="text-xl font-bold tracking-[-0.03em] text-text-primary">SERIFIL</span>
        <button ref={closeRef} type="button" onClick={onClose} className="grid size-12 place-items-center border border-border text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent" aria-label="Fechar menu">
          <X aria-hidden="true" />
        </button>
      </div>
      <nav aria-label="Navegação móvel" className="flex h-[calc(100%-6rem)] flex-col justify-between px-5 py-10 sm:px-8">
        <ul className="divide-y divide-border border-y border-border">
          {links.map((link, index) => (
            <li key={link.href}>
              <a href={link.href} onClick={onClose} tabIndex={open ? 0 : -1} className="flex min-h-16 items-center justify-between py-3 text-[clamp(1.5rem,8vw,2.3rem)] font-bold tracking-[-0.04em] text-text-primary focus-visible:outline-2 focus-visible:outline-accent">
                {link.label}
                <span className="text-xs font-normal tracking-wider text-text-secondary">0{index + 1}</span>
              </a>
            </li>
          ))}
        </ul>
        <a href="#orcamento" onClick={onClose} tabIndex={open ? 0 : -1} className="flex min-h-14 items-center justify-center bg-accent px-5 font-bold uppercase tracking-wider text-light-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
          Pedir orçamento
        </a>
      </nav>
    </div>
  );
}
