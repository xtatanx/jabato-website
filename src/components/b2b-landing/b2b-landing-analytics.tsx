"use client";

import { useEffect, useRef } from "react";
import { trackB2BLandingScrollDepth } from "@/lib/analytics";
import { captureUtmFromUrl } from "@/lib/utm-attribution";

export function B2BLandingAnalytics() {
  const hasTrackedScrollRef = useRef(false);

  useEffect(() => {
    captureUtmFromUrl();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (hasTrackedScrollRef.current) {
        return;
      }

      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight <= 0) {
        return;
      }

      const scrollPercent = window.scrollY / scrollableHeight;
      if (scrollPercent >= 0.75) {
        hasTrackedScrollRef.current = true;
        trackB2BLandingScrollDepth(75);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null;
}
