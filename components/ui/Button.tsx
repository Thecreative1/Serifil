import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "dark";
  className?: string;
  ariaLabel?: string;
};

const variants = {
  primary: "bg-accent text-light-text hover:bg-accent-hover",
  secondary: "border border-border bg-background/50 text-text-primary hover:border-text-secondary hover:bg-surface",
  dark: "bg-light-text text-text-primary hover:bg-ink-hover",
};

export function Button({ href, children, variant = "primary", className = "", ariaLabel }: ButtonProps) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className={`group inline-flex min-h-12 items-center justify-center gap-3 px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${variants[variant]} ${className}`}
    >
      {children}
      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
    </a>
  );
}
