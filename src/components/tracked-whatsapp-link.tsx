"use client";

import type { ComponentProps } from "react";
import { trackWhatsAppClick } from "@/lib/analytics";

interface TrackedWhatsAppLinkProps extends ComponentProps<"a"> {
  intent: "b2b" | "b2c" | "general";
  location: "footer" | "business_cta" | "beer_pdp";
  beerSlug?: string;
}

export function TrackedWhatsAppLink({
  intent,
  location,
  beerSlug,
  onClick,
  href,
  ...props
}: TrackedWhatsAppLinkProps) {
  return (
    // biome-ignore lint/a11y/useValidAnchor: external WhatsApp navigation requires an anchor
    <a
      href={href}
      {...props}
      onClick={(event) => {
        trackWhatsAppClick({ intent, location, beerSlug });
        onClick?.(event);
      }}
    />
  );
}
