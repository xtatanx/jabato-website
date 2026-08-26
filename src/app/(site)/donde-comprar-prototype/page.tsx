// PROTOTYPE — throwaway route. Three radically different layouts for the beer
// finder, switchable via ?variant= (A/B/C), on the real (site) shell with real
// API data. Question: which layout for /donde-comprar? Delete after deciding.

import type { Metadata } from "next";
import { Suspense } from "react";
import { BeerFinderPrototype } from "./_components/beer-finder-prototype";
import type { Location, LocationsResponse } from "./_components/types";

const API_BASE =
  process.env.JABATO_API_BASE_URL ??
  "https://jabato-api-production.up.railway.app/v1";

export const metadata: Metadata = {
  title: "Prototipo — Dónde comprar",
  robots: { index: false, follow: false },
};

async function fetchLocations(): Promise<Location[]> {
  try {
    const res = await fetch(`${API_BASE}/locations`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json = (await res.json()) as LocationsResponse;
    return json.data ?? [];
  } catch {
    return [];
  }
}

export default async function DondeComprarPrototypePage() {
  const locations = await fetchLocations();
  return (
    <Suspense fallback={null}>
      <BeerFinderPrototype locations={locations} />
    </Suspense>
  );
}
