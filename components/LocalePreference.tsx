"use client";

import { useEffect } from "react";
import type { Locale } from "@/data/i18n";

const preferenceKey = "serifil_locale";

export function LocalePreference({ locale }: { locale: Locale }) {
  useEffect(() => {
    window.localStorage.setItem(preferenceKey, locale);
    document.cookie = `${preferenceKey}=${locale}; Max-Age=31536000; Path=/; SameSite=Lax`;
  }, [locale]);

  return null;
}
