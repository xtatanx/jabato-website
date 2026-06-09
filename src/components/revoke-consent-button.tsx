"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { clearAnalyticsConsentCookie } from "@/lib/cookie-consent";

export function RevokeConsentButton() {
  const router = useRouter();

  const handleRevoke = () => {
    clearAnalyticsConsentCookie();
    window.dispatchEvent(new Event("analytics-consent-changed"));
    router.refresh();
  };

  return (
    <Button type="button" variant="outline" onClick={handleRevoke}>
      Revocar consentimiento de analítica
    </Button>
  );
}
