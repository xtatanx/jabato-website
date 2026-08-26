"use client";

import L from "leaflet";
import Link from "next/link";
import { type RefObject, useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  buildLocationSlug,
  directionsUrl,
  type Location,
} from "@/lib/jabato-api";

const BOGOTA_CENTER: [number, number] = [4.66, -74.06];

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

function createPinIcon(selected: boolean) {
  const size = selected ? 42 : 30;
  return L.divIcon({
    html: pinHtml(selected),
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
  });
}

interface MapControllerProps {
  locations: Location[];
  selectedId: string | null;
  markerRefs: RefObject<Map<string, L.Marker>>;
}

function MapController({
  locations,
  selectedId,
  markerRefs,
}: MapControllerProps) {
  const map = useMap();
  const boundsKey = locations.map((l) => l.id).join(",");

  // biome-ignore lint/correctness/useExhaustiveDependencies: refit only when result set changes
  useEffect(() => {
    if (locations.length === 0) {
      map.setView(BOGOTA_CENTER, 12);
      return;
    }
    const pts = locations.map(
      (l) =>
        [l.location.coordinates.lat, l.location.coordinates.lng] as [
          number,
          number,
        ],
    );
    if (pts.length === 1) {
      map.setView(pts[0], 15);
      return;
    }
    map.fitBounds(L.latLngBounds(pts), { padding: [48, 48], maxZoom: 15 });
  }, [map, boundsKey]);

  useEffect(() => {
    if (!selectedId) return;
    const loc = locations.find((l) => l.id === selectedId);
    if (!loc) return;
    const { lat, lng } = loc.location.coordinates;
    map.flyTo([lat, lng], Math.max(map.getZoom(), 15), { animate: true });
    const marker = markerRefs.current?.get(selectedId);
    marker?.openPopup();
  }, [map, selectedId, locations, markerRefs]);

  return null;
}

interface StoreMapProps {
  locations: Location[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  singlePin?: boolean;
}

export function StoreMap({
  locations,
  selectedId = null,
  onSelect,
  singlePin = false,
}: StoreMapProps) {
  const markerRefs = useRef<Map<string, L.Marker>>(new Map());

  const center =
    locations.length === 1
      ? ([
          locations[0].location.coordinates.lat,
          locations[0].location.coordinates.lng,
        ] as [number, number])
      : BOGOTA_CENTER;

  const zoom = singlePin ? 15 : 12;

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapController
        locations={locations}
        selectedId={selectedId}
        markerRefs={markerRefs}
      />
      {locations.map((loc) => {
        const selected = loc.id === selectedId;
        const { lat, lng } = loc.location.coordinates;
        return (
          <Marker
            key={loc.id}
            position={[lat, lng]}
            icon={createPinIcon(selected)}
            zIndexOffset={selected ? 1000 : 0}
            ref={(ref) => {
              if (ref) markerRefs.current.set(loc.id, ref);
              else markerRefs.current.delete(loc.id);
            }}
            eventHandlers={{
              click: () => onSelect?.(loc.id),
            }}
          >
            <Popup>
              <div className="space-y-2 text-sm">
                <p className="font-semibold uppercase">{loc.name}</p>
                <p className="text-muted-foreground">
                  {loc.location.address} · {loc.location.neighborhood}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href={directionsUrl(loc)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand font-medium underline underline-offset-2"
                  >
                    Cómo llegar
                  </a>
                  <Link
                    href={`/donde-comprar/${buildLocationSlug(loc.id, loc.name)}`}
                    className="text-brand font-medium underline underline-offset-2"
                  >
                    Ver detalle
                  </Link>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
