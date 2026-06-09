import { IS_PRODUCTION } from "./constants";
import { AnalyticsEventName } from "./events";

export const trackEvent = async (
  eventName: AnalyticsEventName,
  metadata?: Record<string, string | number | boolean | null | undefined>
) => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...metadata,
    });
  }

  // Log to internal database
  if (typeof window !== "undefined") {
    try {
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_name: eventName,
          page_path: window.location.pathname,
          metadata,
        }),
      }).catch(() => {});
    } catch (e) {
      console.error('Failed to sync internal analytics', e);
    }
  }

  // Also log to console in dev mode
  if (!IS_PRODUCTION) {
    console.log(`[Analytics] Event Tracked: ${eventName}`, metadata);
  }
};

// Global types for GTM
declare global {
  interface Window {
    dataLayer: any[];
  }
}
