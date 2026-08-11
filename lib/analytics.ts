import { analyticsConfig } from "@/config/analytics";

export type AnalyticsConsent = "granted" | "denied";
export type AnalyticsEventName =
  | "click_to_call"
  | "generate_lead"
  | "language_change"
  | "map_click"
  | "map_load"
  | "whatsapp_click";

type AnalyticsEventParameters = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: (...args: unknown[]) => void;
  }
}

export function ensureGoogleTagQueue() {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = window.gtag ?? ((...args: unknown[]) => {
    window.dataLayer?.push(args);
  });
}

export function readAnalyticsConsent(): AnalyticsConsent | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = window.localStorage.getItem(analyticsConfig.consentStorageKey);
    return stored === "granted" || stored === "denied" ? stored : null;
  } catch {
    return null;
  }
}

export function setAnalyticsConsent(consent: AnalyticsConsent) {
  if (typeof window === "undefined") return;

  ensureGoogleTagQueue();

  try {
    window.localStorage.setItem(analyticsConfig.consentStorageKey, consent);
  } catch {
    // Consent still applies to the current page when storage is unavailable.
  }

  window.gtag?.("consent", "update", {
    analytics_storage: consent,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

export function trackEvent(
  eventName: AnalyticsEventName,
  parameters: AnalyticsEventParameters = {},
) {
  if (typeof window === "undefined" || readAnalyticsConsent() !== "granted") return;

  ensureGoogleTagQueue();
  window.gtag?.("event", eventName, {
    ...parameters,
    page_language: document.documentElement.lang,
  });
}

export function openAnalyticsPreferences() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(analyticsConfig.preferencesEvent));
}
