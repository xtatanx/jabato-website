"use client";

// PROTOTYPE — throwaway. Loads Leaflet from a CDN so the prototype needs no new
// dependencies. When a variant wins, replace this with react-leaflet (see plan).

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { Location } from "./types";

const LEAFLET_VERSION = "1.9.4";
const LEAFLET_CSS = `https://unpkg.com/leaflet@${LEAFLET_VERSION}/dist/leaflet.css`;
const LEAFLET_JS = `https://unpkg.com/leaflet@${LEAFLET_VERSION}/dist/leaflet.js`;

const BOGOTA_CENTER: [number, number] = [4.66, -74.06];

interface LeafletMap {
  setView(
    center: [number, number],
    zoom: number,
    options?: Record<string, unknown>,
  ): LeafletMap;
  getZoom(): number;
  fitBounds(bounds: unknown, options?: Record<string, unknown>): void;
  invalidateSize(): void;
  remove(): void;
}
interface LeafletLayer {
  addTo(target: LeafletMap | LeafletLayerGroup): LeafletLayer;
}
interface LeafletLayerGroup {
  addTo(map: LeafletMap): LeafletLayerGroup;
  clearLayers(): void;
}
interface LeafletMarker {
  addTo(group: LeafletLayerGroup): LeafletMarker;
  bindPopup(html: string): LeafletMarker;
  openPopup(): LeafletMarker;
  on(event: string, handler: () => void): LeafletMarker;
}
interface LeafletStatic {
  map(el: HTMLElement, opts?: Record<string, unknown>): LeafletMap;
  tileLayer(url: string, opts?: Record<string, unknown>): LeafletLayer;
  layerGroup(): LeafletLayerGroup;
  divIcon(opts: Record<string, unknown>): unknown;
  marker(
    latlng: [number, number],
    opts?: Record<string, unknown>,
  ): LeafletMarker;
  latLngBounds(latlngs: [number, number][]): unknown;
}

let leafletPromise: Promise<LeafletStatic> | null = null;

function loadLeaflet(): Promise<LeafletStatic> {
  const w = window as unknown as { L?: LeafletStatic };
  if (w.L) return Promise.resolve(w.L);
  if (leafletPromise) return leafletPromise;

  leafletPromise = new Promise<LeafletStatic>((resolve, reject) => {
    if (!document.querySelector(`link[data-leaflet="1"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = LEAFLET_CSS;
      link.dataset.leaflet = "1";
      document.head.appendChild(link);
    }
    const script = document.createElement("script");
    script.src = LEAFLET_JS;
    script.async = true;
    script.onload = () => {
      const loaded = (window as unknown as { L?: LeafletStatic }).L;
      if (loaded) resolve(loaded);
      else reject(new Error("Leaflet failed to load"));
    };
    script.onerror = () => reject(new Error("Leaflet failed to load"));
    document.body.appendChild(script);
  });
  return leafletPromise;
}

function pinHtml(selected: boolean): string {
  const size = selected ? 42 : 30;
  const shadow = selected
    ? "filter: drop-shadow(0 4px 6px rgba(0,0,0,0.4));"
    : "filter: drop-shadow(0 2px 3px rgba(0,0,0,0.3));";
  return `<div style="width:${size}px;height:${size}px;${shadow}transform:translate(-50%,-100%);transition:all .12s ease;">
    <svg viewBox="0 0 24 24" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="var(--brand)" stroke="white" stroke-width="1.5"/>
      <circle cx="12" cy="9" r="2.6" fill="white"/>
    </svg>
  </div>`;
}

interface PrototypeMapProps {
  locations: Location[];
  selectedId: string | null;
  onSelect?: (id: string) => void;
  className?: string;
  scrollWheelZoom?: boolean;
}

export function PrototypeMap({
  locations,
  selectedId,
  onSelect,
  className,
  scrollWheelZoom = false,
}: PrototypeMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const groupRef = useRef<LeafletLayerGroup | null>(null);
  const leafletRef = useRef<LeafletStatic | null>(null);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadLeaflet()
      .then((L) => {
        if (cancelled || !containerRef.current || mapRef.current) return;
        const map = L.map(containerRef.current, {
          zoomControl: true,
          scrollWheelZoom,
        }).setView(BOGOTA_CENTER, 12);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 19,
        }).addTo(map);
        leafletRef.current = L;
        mapRef.current = map;
        groupRef.current = L.layerGroup().addTo(map);
        setReady(true);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        groupRef.current = null;
      }
    };
  }, [scrollWheelZoom]);

  // Rebuild markers when data or selection changes.
  useEffect(() => {
    const L = leafletRef.current;
    const group = groupRef.current;
    if (!ready || !L || !group) return;
    group.clearLayers();
    for (const loc of locations) {
      const { lat, lng } = loc.location.coordinates;
      const selected = loc.id === selectedId;
      const size = selected ? 42 : 30;
      const icon = L.divIcon({
        html: pinHtml(selected),
        className: "",
        iconSize: [size, size],
        iconAnchor: [size / 2, size],
      });
      const marker = L.marker([lat, lng], {
        icon,
        zIndexOffset: selected ? 1000 : 0,
      }).addTo(group);
      marker.bindPopup(
        `<strong>${loc.name}</strong><br/>${loc.location.address} · ${loc.location.neighborhood}`,
      );
      marker.on("click", () => onSelectRef.current?.(loc.id));
      if (selected) marker.openPopup();
    }
  }, [ready, locations, selectedId]);

  // Fit bounds when the result set changes.
  const boundsKey = locations.map((l) => l.id).join(",");
  // biome-ignore lint/correctness/useExhaustiveDependencies: refit only when the result set (boundsKey) changes, not on every locations identity change
  useEffect(() => {
    const L = leafletRef.current;
    const map = mapRef.current;
    if (!ready || !L || !map) return;
    const pts = locations.map(
      (l) =>
        [l.location.coordinates.lat, l.location.coordinates.lng] as [
          number,
          number,
        ],
    );
    map.invalidateSize();
    if (pts.length === 0) {
      map.setView(BOGOTA_CENTER, 12);
      return;
    }
    if (pts.length === 1) {
      map.setView(pts[0], 15);
      return;
    }
    map.fitBounds(L.latLngBounds(pts), { padding: [48, 48], maxZoom: 15 });
  }, [ready, boundsKey]);

  // Pan to a selected location without refitting the whole set.
  useEffect(() => {
    const map = mapRef.current;
    if (!ready || !map || !selectedId) return;
    const loc = locations.find((l) => l.id === selectedId);
    if (!loc) return;
    map.setView(
      [loc.location.coordinates.lat, loc.location.coordinates.lng],
      Math.max(map.getZoom(), 15),
      { animate: true },
    );
  }, [ready, selectedId, locations]);

  return (
    <div className={cn("relative h-full w-full", className)}>
      <div ref={containerRef} className="h-full w-full" />
      {!ready && (
        <div className="absolute inset-0 grid place-items-center bg-muted/40 text-sm text-muted-foreground">
          Cargando mapa…
        </div>
      )}
    </div>
  );
}
