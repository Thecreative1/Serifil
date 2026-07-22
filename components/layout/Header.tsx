"use client";

import { Menu } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { brand } from "@/config/brand";
import { MobileMenu } from "./MobileMenu";

const navLinks = [
  { href: "#servicos", label: "Serviços" },
  { href: "#trabalhos", label: "Trabalhos" },
  { href: "#processo", label: "Processo" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contacto", label: "Contacto" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${scrolled ? "border-border bg-background/95" : "border-transparent bg-background/20"}`}>
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:h-24 lg:px-12">
          <a href="#inicio" className="flex items-center gap-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent" aria-label="SERIFIL, voltar ao início">
            <span className="text-xl font-black tracking-[-0.04em] text-text-primary sm:text-2xl">{brand.name}</span>
            <span className="hidden border-l border-border pl-4 text-[0.65rem] leading-4 uppercase tracking-[0.15em] text-text-secondary sm:block">{brand.descriptor}</span>
          </a>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm font-semibold text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                {link.label}
              </a>
            ))}
            <a href="#orcamento" className="bg-accent px-5 py-3 text-sm font-bold uppercase tracking-[0.06em] text-light-text transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
              Pedir orçamento
            </a>
          </nav>
          <button type="button" onClick={() => setMenuOpen(true)} className="grid size-12 place-items-center border border-border text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:hidden" aria-label="Abrir menu" aria-expanded={menuOpen} aria-controls="mobile-menu">
            <Menu aria-hidden="true" />
          </button>
        </div>
      </header>
      <div id="mobile-menu">
        <MobileMenu open={menuOpen} onClose={closeMenu} links={navLinks} />
      </div>
    </>
  );
}
