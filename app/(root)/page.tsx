"use client";

import { useEffect } from "react";
import { localizedPath } from "@/config/paths";
import type { Locale } from "@/data/i18n";

const preferenceKey = "serifil_locale";

function getPreferredLocale(): Locale {
  const stored = window.localStorage.getItem(preferenceKey);
  if (stored === "pt" || stored === "en") return stored;

  const cookie = document.cookie
    .split("; ")
    .find((value) => value.startsWith(`${preferenceKey}=`))
    ?.split("=")[1];
  if (cookie === "pt" || cookie === "en") return cookie;

  return navigator.languages.some((language) => language.toLowerCase().startsWith("pt"))
    ? "pt"
    : "en";
}

export default function LocaleRedirect() {
  useEffect(() => {
    const locale = getPreferredLocale();
    window.location.replace(
      `${localizedPath(locale)}${window.location.search}${window.location.hash}`,
    );
  }, []);

  return (
    <main className="grid min-h-screen place-items-center bg-background px-5 text-text-primary">
      <div className="text-center">
        <p className="text-2xl font-black tracking-[-0.04em]">SERIFIL</p>
        <p className="mt-4 text-sm text-text-secondary">A escolher o idioma · Choosing your language</p>
        <nav className="mt-7 flex justify-center gap-3" aria-label="Escolher idioma · Choose language">
          <a className="border border-border px-5 py-3 font-bold hover:border-accent" href={localizedPath("pt")}>Português</a>
          <a className="border border-border px-5 py-3 font-bold hover:border-accent" href={localizedPath("en")}>English</a>
        </nav>
      </div>
    </main>
  );
}
