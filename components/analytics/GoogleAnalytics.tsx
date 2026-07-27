"use client";

import Script from "next/script";
import { useCallback, useEffect, useState } from "react";
import { analyticsConfig } from "@/config/analytics";
import type { SiteContent } from "@/data/i18n";
import {
  ensureGoogleTagQueue,
  readAnalyticsConsent,
  setAnalyticsConsent,
  type AnalyticsConsent,
} from "@/lib/analytics";

type ConsentState = AnalyticsConsent | null | undefined;

export function GoogleAnalytics({ copy }: { copy: SiteContent["analytics"] }) {
  const [consent, setConsent] = useState<ConsentState>(undefined);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    ensureGoogleTagQueue();
    const storedConsent = readAnalyticsConsent();

    window.gtag?.("consent", "default", {
      analytics_storage: storedConsent === "granted" ? "granted" : "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      wait_for_update: 500,
    });

    const consentFrame = window.requestAnimationFrame(() => setConsent(storedConsent));

    const openPreferences = () => setPreferencesOpen(true);
    window.addEventListener(analyticsConfig.preferencesEvent, openPreferences);
    return () => {
      window.cancelAnimationFrame(consentFrame);
      window.removeEventListener(analyticsConfig.preferencesEvent, openPreferences);
    };
  }, []);

  const configureAnalytics = useCallback(() => {
    ensureGoogleTagQueue();
    window.gtag?.("js", new Date());
    window.gtag?.("config", analyticsConfig.measurementId, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      send_page_view: true,
    });
  }, []);

  function chooseConsent(nextConsent: AnalyticsConsent) {
    setAnalyticsConsent(nextConsent);
    setConsent(nextConsent);
    setPreferencesOpen(false);
  }

  const showConsentPanel = consent === null || preferencesOpen;

  return (
    <>
      {consent === "granted" ? (
        <Script
          id="serifil-google-analytics"
          src={`https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.measurementId}`}
          strategy="afterInteractive"
          onReady={configureAnalytics}
        />
      ) : null}

      {showConsentPanel ? (
        <section
          className="fixed inset-x-0 bottom-0 z-[80] border-t border-border bg-background shadow-[0_-18px_45px_rgba(0,0,0,0.32)]"
          aria-label={copy.ariaLabel}
        >
          <div className="mx-auto grid max-w-[1440px] gap-5 px-5 py-5 sm:px-8 sm:py-6 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10 lg:px-12">
            <div>
              <h2 className="text-lg font-bold tracking-[-0.02em] text-text-primary">
                {copy.title}
              </h2>
              <p className="mt-2 max-w-[72ch] text-sm leading-6 text-text-secondary">
                {copy.description}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:flex">
              <button
                type="button"
                onClick={() => chooseConsent("denied")}
                className="min-h-12 border border-border px-4 py-3 text-sm font-bold text-text-primary transition-colors hover:border-text-secondary hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {copy.reject}
              </button>
              <button
                type="button"
                onClick={() => chooseConsent("granted")}
                className="min-h-12 bg-accent px-4 py-3 text-sm font-bold text-light-text transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {copy.accept}
              </button>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
