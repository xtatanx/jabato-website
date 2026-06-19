"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { isAnalyticsEnvironment } from "@/lib/analytics-env";
import { hasAnalyticsConsent } from "@/lib/cookie-consent";
import { getUtmAttribution, type UtmAttribution } from "@/lib/utm-attribution";

const B2B_LANDING_PATH = "/distribucion";

type WhatsAppClickLocation =
  | "footer"
  | "business_cta"
  | "beer_pdp"
  | "landing_b2b"
  | "landing_b2b_hero"
  | "landing_b2b_sticky";

function isEnabled(): boolean {
  return (
    isAnalyticsEnvironment() &&
    !!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID &&
    hasAnalyticsConsent()
  );
}

function getB2BLandingConversionParams() {
  return {
    page_path: B2B_LANDING_PATH,
    ...getUtmAttribution(),
  };
}

function isB2BLandingLeadLocation(location: WhatsAppClickLocation): boolean {
  return (
    location === "landing_b2b" ||
    location === "landing_b2b_hero" ||
    location === "landing_b2b_sticky"
  );
}

export function trackAgeGateView() {
  if (!isEnabled()) return;
  sendGAEvent("event", "age_gate_view", {
    page_path: window.location.pathname,
  });
}

export function trackAgeGateComplete() {
  if (!isEnabled()) return;
  sendGAEvent("event", "age_gate_complete", {
    page_path: window.location.pathname,
  });
}

export function trackWholesaleFormStart() {
  if (!isEnabled()) return;
  sendGAEvent("event", "form_start", {
    form_name: "wholesale_lead",
    ...getB2BLandingConversionParams(),
  });
}

export function trackB2BLandingScrollDepth(depth: 75) {
  if (!isEnabled()) return;
  sendGAEvent("event", `scroll_${depth}`, {
    page_path: B2B_LANDING_PATH,
  });
}

export function trackWholesaleLeadSubmit() {
  if (!isEnabled()) return;
  sendGAEvent("event", "generate_lead", {
    form_name: "wholesale_lead",
    subject: "distribucion",
    lead_type: "form",
    ...getB2BLandingConversionParams(),
  });
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
  location: WhatsAppClickLocation;
  beerSlug?: string;
}) {
  if (!isEnabled()) return;

  const eventParams = {
    whatsapp_intent: params.intent,
    click_location: params.location,
    ...(params.beerSlug ? { item_id: params.beerSlug } : {}),
  };

  sendGAEvent("event", "whatsapp_click", eventParams);

  if (params.intent === "b2b" && isB2BLandingLeadLocation(params.location)) {
    sendGAEvent("event", "generate_lead", {
      form_name: "whatsapp_b2b",
      subject: "distribucion",
      lead_type: "whatsapp",
      click_location: params.location,
      ...getB2BLandingConversionParams(),
    });
  }
}

export type { UtmAttribution, WhatsAppClickLocation };
