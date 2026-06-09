"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useEffect, useState } from "react";
import { hasAnalyticsConsent } from "@/lib/cookie-consent";

interface GoogleAnalyticsLoaderProps {
  gaId: string;
}

export function GoogleAnalyticsLoader({ gaId }: GoogleAnalyticsLoaderProps) {
  const [isGranted, setIsGranted] = useState(false);

  useEffect(() => {
    const syncConsent = () => {
      setIsGranted(hasAnalyticsConsent());
    };

    syncConsent();
    window.addEventListener("analytics-consent-changed", syncConsent);
    return () =>
      window.removeEventListener("analytics-consent-changed", syncConsent);
  }, []);

  if (!isGranted) {
    return null;
  }

  return <GoogleAnalytics gaId={gaId} />;
}
