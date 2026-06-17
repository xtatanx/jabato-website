"use client";

import { useEffect } from "react";
import { captureUtmFromUrl } from "@/lib/utm-attribution";

export function B2BLandingAnalytics() {
  useEffect(() => {
    captureUtmFromUrl();
  }, []);

  return null;
}
