"use client";

import type { ComponentProps } from "react";
import {
  trackWhatsAppClick,
  type WhatsAppClickLocation,
} from "@/lib/analytics";

interface TrackedWhatsAppLinkProps extends ComponentProps<"a"> {
  intent: "b2b" | "b2c" | "general";
  location: WhatsAppClickLocation;
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
