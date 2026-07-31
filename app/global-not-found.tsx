import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import { ArrowUpRight } from "lucide-react";
import { brand } from "@/config/brand";
import { localizedPath } from "@/config/paths";
import { BrandMark } from "@/components/ui/BrandMark";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: `Página não encontrada | ${brand.name}`,
  description: "A página pedida não existe. The requested page does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="pt-PT" className={`${archivo.variable} ${inter.variable}`}>
      <body>
        <main className="relative grid min-h-screen overflow-hidden bg-background px-5 py-10 text-text-primary sm:px-8 lg:px-12">
          <div className="industrial-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />
          <div className="relative mx-auto flex w-full max-w-[1440px] flex-col">
            <a
              href={localizedPath("pt")}
              className="flex w-fit items-center gap-3 text-xl font-black tracking-[-0.04em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:text-2xl"
              aria-label="SERIFIL, voltar ao site"
            >
              <BrandMark className="h-10 w-auto text-accent" />
              <span>{brand.name}</span>
            </a>

            <div className="my-auto grid gap-12 py-20 lg:grid-cols-12 lg:items-end lg:gap-16">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-accent lg:col-span-3">Erro · Error 404</p>
              <div className="lg:col-span-8">
                <h1 className="max-w-[12ch] text-[clamp(3.5rem,9vw,9rem)] leading-[0.82] font-black tracking-[-0.075em]">
                  <span className="block">Página não encontrada.</span>
                  <span lang="en" className="mt-5 block text-text-secondary">Page not found.</span>
                </h1>
                <p className="mt-9 max-w-[62ch] text-base leading-7 text-text-secondary sm:text-lg">
                  O endereço pode ter sido alterado ou já não existir.
                  <span lang="en" className="mt-2 block">The address may have changed or may no longer exist.</span>
                </p>
                <nav className="mt-10 flex flex-col gap-3 sm:flex-row" aria-label="Regressar ao site · Return to the website">
                  <a
                    href={localizedPath("pt")}
                    className="inline-flex min-h-12 items-center justify-center gap-3 bg-accent px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-light-text transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    Continuar em português
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                  <a
                    href={localizedPath("en")}
                    lang="en"
                    className="inline-flex min-h-12 items-center justify-center gap-3 border border-border px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-text-primary transition-colors hover:border-text-secondary hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    Continue in English
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                </nav>
              </div>
            </div>

            <p className="border-t border-border pt-6 text-xs text-text-secondary">
              © {new Date().getFullYear()} {brand.name}
            </p>
          </div>
        </main>
      </body>
    </html>
  );
}
