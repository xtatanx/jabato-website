"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { isAnalyticsEnvironment } from "@/lib/analytics-env";
import { hasAnalyticsConsent } from "@/lib/cookie-consent";

function isEnabled(): boolean {
  return (
    isAnalyticsEnvironment() &&
    !!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID &&
    hasAnalyticsConsent()
  );
}

export function trackContactFormSubmit(subject: string) {
  if (!isEnabled()) return;
  sendGAEvent("event", "generate_lead", {
    form_name: "contact",
    subject,
  });
}

export function trackBeerPackSelect(params: {
  beerSlug: string;
  beerName: string;
  packSize: string;
  price: number;
}) {
  if (!isEnabled()) return;
  sendGAEvent("event", "select_item", {
    item_list_id: "beer_packs",
    item_list_name: "Beer packs",
    items: [
      {
        item_id: params.beerSlug,
        item_name: params.beerName,
        item_category: "beer",
        item_variant: params.packSize,
        price: params.price,
      },
    ],
  });
}

export function trackBeerBuyClick(params: {
  beerSlug: string;
  beerName: string;
  packSize: string;
  price: number;
}) {
  if (!isEnabled()) return;
  sendGAEvent("event", "begin_checkout", {
    currency: "COP",
    value: params.price,
    items: [
      {
        item_id: params.beerSlug,
        item_name: params.beerName,
        item_category: "beer",
        item_variant: params.packSize,
        price: params.price,
        quantity: 1,
      },
    ],
  });
}

export function trackWhatsAppClick(params: {
  intent: "b2b" | "b2c" | "general";
  location: "footer" | "business_cta" | "beer_pdp";
  beerSlug?: string;
}) {
  if (!isEnabled()) return;
  sendGAEvent("event", "whatsapp_click", {
    whatsapp_intent: params.intent,
    click_location: params.location,
    ...(params.beerSlug ? { item_id: params.beerSlug } : {}),
  });
}
