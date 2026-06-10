"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  readAnalyticsConsentFromDocument,
  setAnalyticsConsentCookie,
  type AnalyticsConsentValue,
} from "@/lib/cookie-consent";

interface CookieConsentBannerProps {
  isAgeVerified: boolean;
}

export function CookieConsentBanner({
  isAgeVerified,
}: CookieConsentBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const syncVisibility = () => {
      const consent = readAnalyticsConsentFromDocument();
      setIsVisible(isAgeVerified && consent === null);
    };

    syncVisibility();
    window.addEventListener("analytics-consent-changed", syncVisibility);
    return () =>
      window.removeEventListener("analytics-consent-changed", syncVisibility);
  }, [isAgeVerified]);

  const handleChoice = (value: AnalyticsConsentValue) => {
    setAnalyticsConsentCookie(value);
    setIsVisible(false);
    window.dispatchEvent(new Event("analytics-consent-changed"));
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
      className="fixed inset-x-0 bottom-0 z-[110] border-t border-primary-foreground/20 bg-primary p-4 text-primary-foreground shadow-lg sm:p-6"
    >
      <div className="container mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1 text-sm sm:max-w-2xl">
          <p id="cookie-consent-title" className="font-semibold">
            Usamos cookies de análisis
          </p>
          <p
            id="cookie-consent-description"
            className="text-primary-foreground/80"
          >
            Con tu permiso, usamos Google Analytics para entender cómo se usa el
            sitio y mejorar la experiencia.{" "}
            <Link
              href="/politica-de-privacidad"
              className="underline hover:text-brand"
            >
              Política de privacidad
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            onClick={() => handleChoice("denied")}
          >
            Rechazar
          </Button>
          <Button
            type="button"
            className="bg-brand hover:bg-brand/90"
            onClick={() => handleChoice("granted")}
          >
            Aceptar
          </Button>
        </div>
      </div>
    </div>
  );
}
