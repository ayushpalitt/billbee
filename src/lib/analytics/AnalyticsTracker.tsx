"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackEvent } from "./track-event";

export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      // Track page view locally
      const url = pathname + searchParams.toString();
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_name: 'page_view',
          page_path: pathname,
          metadata: { full_url: url },
        }),
      }).catch(() => {});
    }
  }, [pathname, searchParams]);

  return null;
}
