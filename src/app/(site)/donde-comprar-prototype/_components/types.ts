// PROTOTYPE — throwaway. Delete once a variant wins and is folded into the real
// /donde-comprar page (see plan: Beer Finder "Dónde comprar").

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

export interface LocationsResponse {
  data: Location[];
  meta: { count: number };
}

export interface FinderFilters {
  buscar: string;
  estilo: string;
  presentacion: string;
  barrio: string;
}

export const EMPTY_FILTERS: FinderFilters = {
  buscar: "",
  estilo: "",
  presentacion: "",
  barrio: "",
};

export const ALL = "__all__";

export const PRESENTATION_LABELS: Record<Presentation, string> = {
  bottle: "Botella",
  can: "Lata",
  draft: "Barril",
};

export const PRESENTATION_ORDER: Presentation[] = ["draft", "bottle", "can"];

export function uniqueStyles(locations: Location[]): string[] {
  const set = new Set<string>();
  for (const loc of locations) {
    for (const beer of loc.beers) set.add(beer.style);
  }
  return [...set].sort((a, b) => a.localeCompare(b, "es"));
}

export function uniqueNeighborhoods(locations: Location[]): string[] {
  const set = new Set<string>();
  for (const loc of locations) set.add(loc.location.neighborhood);
  return [...set].sort((a, b) => a.localeCompare(b, "es"));
}

export function locationPresentations(loc: Location): Presentation[] {
  const set = new Set<Presentation>();
  for (const beer of loc.beers) {
    for (const p of beer.presentations) set.add(p);
  }
  return PRESENTATION_ORDER.filter((p) => set.has(p));
}

function haversineMeters(a: Coordinates, b: Coordinates): number {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function filterLocations(
  locations: Location[],
  filters: FinderFilters,
  userCoords: Coordinates | null,
): Location[] {
  const buscar = filters.buscar.trim().toLowerCase();
  const filtered = locations.filter((loc) => {
    if (buscar && !loc.name.toLowerCase().includes(buscar)) return false;
    if (filters.barrio && loc.location.neighborhood !== filters.barrio) {
      return false;
    }
    if (filters.estilo && !loc.beers.some((b) => b.style === filters.estilo)) {
      return false;
    }
    if (
      filters.presentacion &&
      !loc.beers.some((b) =>
        b.presentations.includes(filters.presentacion as Presentation),
      )
    ) {
      return false;
    }
    return true;
  });

  if (!userCoords) return filtered;

  return filtered
    .map((loc) => ({
      ...loc,
      distanceMeters: haversineMeters(userCoords, loc.location.coordinates),
    }))
    .sort((a, b) => (a.distanceMeters ?? 0) - (b.distanceMeters ?? 0));
}

export function activeFilterCount(filters: FinderFilters): number {
  return Object.values(filters).filter(Boolean).length;
}

export function formatDistance(meters?: number | null): string | null {
  if (meters == null) return null;
  if (meters < 1000) return `a ${Math.round(meters)} m`;
  return `a ${(meters / 1000).toFixed(1)} km`;
}

export function directionsUrl(loc: Location): string {
  const { lat, lng } = loc.location.coordinates;
  const label = encodeURIComponent(`${loc.name}, ${loc.location.address}`);
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=&travelmode=driving&query=${label}`;
}

export function osmEmbedUrl(loc: Location): string {
  const { lat, lng } = loc.location.coordinates;
  const dLat = 0.004;
  const dLng = 0.005;
  const bbox = `${lng - dLng},${lat - dLat},${lng + dLng},${lat + dLat}`;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
}
