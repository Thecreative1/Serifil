"use client";

import { openAnalyticsPreferences } from "@/lib/analytics";

export function CookiePreferencesButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={openAnalyticsPreferences}
      className="text-xs text-text-secondary underline-offset-4 transition-colors hover:text-text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      {label}
    </button>
  );
}
