import { z } from "zod";

export type Presentation = "bottle" | "can" | "draft";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Address {
  address: string;
  neighborhood: string;
  district: string;
  city: string;
  country: string;
  coordinates: Coordinates;
}

export interface Beer {
  id: string;
  name: string;
  style: string;
  presentations: Presentation[];
}

export interface Location {
  id: string;
  name: string;
  description?: string | null;
  location: Address;
  beers: Beer[];
  active: boolean;
  updatedAt: string;
  distanceMeters?: number | null;
}

export interface LocationParams {
  buscar?: string;
  estilo?: string;
  presentacion?: string;
  barrio?: string;
  lat?: number;
  lng?: number;
  radiusKm?: number;
}

export const PRESENTATION_LABELS: Record<Presentation, string> = {
  bottle: "Botella",
  can: "Lata",
  draft: "Barril",
};

export const PRESENTATION_ORDER: Presentation[] = ["draft", "bottle", "can"];

const API_BASE =
  process.env.JABATO_API_BASE_URL ??
  "https://jabato-api-production.up.railway.app/v1";

const CoordinatesSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

const AddressSchema = z.object({
  address: z.string(),
  neighborhood: z.string(),
  district: z.string(),
  city: z.string(),
  country: z.string(),
  coordinates: CoordinatesSchema,
});

const BeerSchema = z.object({
  id: z.string(),
  name: z.string(),
  style: z.string(),
  presentations: z.array(z.enum(["bottle", "can", "draft"])),
});

const LocationSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable().optional(),
  location: AddressSchema,
  beers: z.array(BeerSchema),
  active: z.boolean(),
  updatedAt: z.string(),
  distanceMeters: z.number().nullable().optional(),
});

const LocationsResponseSchema = z.object({
  data: z.array(LocationSchema),
  meta: z.object({ count: z.number() }),
});

const BeersResponseSchema = z.object({
  data: z.array(BeerSchema),
  meta: z.object({ count: z.number() }),
});

function buildApiQuery(params: LocationParams): string {
  const apiParams = new URLSearchParams();
  if (params.buscar) apiParams.set("search", params.buscar);
  if (params.estilo) apiParams.set("beerStyle", params.estilo);
  if (params.presentacion) apiParams.set("presentation", params.presentacion);
  if (params.barrio) apiParams.set("neighborhood", params.barrio);
  if (params.lat != null) apiParams.set("lat", String(params.lat));
  if (params.lng != null) apiParams.set("lng", String(params.lng));
  if (params.radiusKm != null)
    apiParams.set("radiusKm", String(params.radiusKm));
  const qs = apiParams.toString();
  return qs ? `?${qs}` : "";
}

export function locationsQueryString(params: LocationParams): string {
  const ordered: (keyof LocationParams)[] = [
    "buscar",
    "estilo",
    "presentacion",
    "barrio",
    "lat",
    "lng",
    "radiusKm",
  ];
  const searchParams = new URLSearchParams();
  for (const key of ordered) {
    const value = params[key];
    if (value != null && value !== "") {
      searchParams.set(key, String(value));
    }
  }
  return searchParams.toString();
}

export function locationsKey(params: LocationParams): string {
  const qs = locationsQueryString(params);
  return qs ? `/api/locations?${qs}` : "/api/locations";
}

export function slugify(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function buildLocationSlug(id: string, name: string): string {
  return `${id}-${slugify(name)}`;
}

export function parseLocationId(slug: string): string {
  return slug.split("-")[0];
}

export function directionsUrl(loc: Location): string {
  const { lat, lng } = loc.location.coordinates;
  const label = encodeURIComponent(`${loc.name}, ${loc.location.address}`);
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=&travelmode=driving&query=${label}`;
}

export function locationPresentations(loc: Location): Presentation[] {
  const set = new Set<Presentation>();
  for (const beer of loc.beers) {
    for (const p of beer.presentations) set.add(p);
  }
  return PRESENTATION_ORDER.filter((p) => set.has(p));
}

export function formatDistance(meters?: number | null): string | null {
  if (meters == null) return null;
  if (meters < 1000) return `a ${Math.round(meters)} m`;
  return `a ${(meters / 1000).toFixed(1)} km`;
}

export async function getLocations(
  params: LocationParams = {},
): Promise<Location[]> {
  try {
    const res = await fetch(`${API_BASE}/locations${buildApiQuery(params)}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json = LocationsResponseSchema.parse(await res.json());
    return json.data;
  } catch {
    return [];
  }
}

export async function getLocationById(id: string): Promise<Location | null> {
  try {
    const res = await fetch(`${API_BASE}/locations/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return LocationSchema.parse(await res.json());
  } catch {
    return null;
  }
}

export async function getBeers(): Promise<Beer[]> {
  try {
    const res = await fetch(`${API_BASE}/beers`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json = BeersResponseSchema.parse(await res.json());
    return json.data;
  } catch {
    return [];
  }
}

export function parseLocationParamsFromSearchParams(
  sp: Record<string, string | string[] | undefined>,
): LocationParams {
  const get = (key: string): string | undefined => {
    const v = sp[key];
    if (Array.isArray(v)) return v[0];
    return v;
  };
  return {
    buscar: get("buscar"),
    estilo: get("estilo"),
    presentacion: get("presentacion"),
    barrio: get("barrio"),
  };
}
