"use client";

// PROTOTYPE — Variant B: map-immersive. Full-bleed map surface with a floating
// glass search bar, an overlaid results drawer, and a floating detail card for
// the selected point (Google-Maps-app feel).

import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  AddressLine,
  BeerStyleBadges,
  DirectionsButton,
  FilterSelect,
  NearMeButton,
  PresentationBadges,
  SearchBox,
} from "./finder-parts";
import { PrototypeMap } from "./prototype-map";
import {
  formatDistance,
  PRESENTATION_LABELS,
  type Presentation,
} from "./types";
import type { VariantProps } from "./variant-props";

const PRESENTATIONS: Presentation[] = ["draft", "bottle", "can"];

export function VariantImmersive({
  results,
  totalCount,
  filters,
  setFilter,
  styles,
  neighborhoods,
  selectedId,
  setSelectedId,
  nearActive,
  nearLoading,
  onNearMe,
}: VariantProps) {
  const [listOpen, setListOpen] = useState(true);
  const selected = results.find((l) => l.id === selectedId) ?? null;

  return (
    <section className="relative h-[calc(100vh-4rem)] w-full overflow-hidden">
      <PrototypeMap
        locations={results}
        selectedId={selectedId}
        onSelect={setSelectedId}
        scrollWheelZoom
        className="absolute inset-0"
      />

      {/* Floating search + filters */}
      <div className="pointer-events-none absolute inset-x-0 top-4 z-[500] flex justify-center px-3">
        <div className="pointer-events-auto w-full max-w-3xl rounded-2xl border bg-background/85 p-3 shadow-lg backdrop-blur-md">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <SearchBox
              value={filters.buscar}
              onChange={(v) => setFilter("buscar", v)}
              className="flex-1"
            />
            <div className="grid grid-cols-3 gap-2 sm:flex sm:gap-2">
              <FilterSelect
                value={filters.estilo}
                onChange={(v) => setFilter("estilo", v)}
                options={styles}
                placeholder="Estilo"
                className="sm:w-36"
              />
              <FilterSelect
                value={filters.presentacion}
                onChange={(v) => setFilter("presentacion", v)}
                options={PRESENTATIONS}
                optionLabel={(v) => PRESENTATION_LABELS[v as Presentation]}
                placeholder="Presentación"
                className="sm:w-36"
              />
              <FilterSelect
                value={filters.barrio}
                onChange={(v) => setFilter("barrio", v)}
                options={neighborhoods}
                placeholder="Barrio"
                className="sm:w-36"
              />
            </div>
            <NearMeButton
              active={nearActive}
              loading={nearLoading}
              onClick={onNearMe}
              variant="secondary"
            />
          </div>
        </div>
      </div>

      {/* Results drawer */}
      <div
        className={cn(
          "absolute bottom-0 left-0 top-24 z-[500] flex w-full flex-col transition-transform sm:w-96",
          listOpen ? "translate-x-0" : "-translate-x-[calc(100%-2.5rem)]",
        )}
      >
        <div className="m-3 flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border bg-background/90 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <p className="text-sm font-semibold">
              {results.length} de {totalCount} puntos
            </p>
            <button
              type="button"
              onClick={() => setListOpen((o) => !o)}
              className="text-xs font-medium text-brand"
            >
              {listOpen ? "Ocultar" : "Mostrar"}
            </button>
          </div>
          <ul className="min-h-0 flex-1 divide-y overflow-y-auto">
            {results.map((loc) => {
              const isSel = loc.id === selectedId;
              const distance = formatDistance(loc.distanceMeters);
              return (
                <li key={loc.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(loc.id)}
                    className={cn(
                      "w-full px-4 py-3 text-left transition-colors",
                      isSel ? "bg-brand/10" : "hover:bg-muted",
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm font-semibold uppercase leading-tight">
                        {loc.name}
                      </span>
                      {distance && (
                        <span className="shrink-0 text-xs font-medium text-brand">
                          {distance}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {loc.location.address} · {loc.location.neighborhood}
                    </p>
                  </button>
                </li>
              );
            })}
            {results.length === 0 && (
              <li className="p-8 text-center text-sm text-muted-foreground">
                No encontramos puntos con esos filtros.
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Floating detail card for the selected point */}
      {selected && (
        <div className="absolute bottom-4 right-4 z-[500] w-[calc(100%-2rem)] max-w-sm rounded-2xl border bg-background p-4 shadow-2xl sm:w-96">
          <div className="flex items-start justify-between gap-2">
            <h2 className="font-heading text-2xl uppercase leading-none">
              {selected.name}
            </h2>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-7 shrink-0"
              onClick={() => setSelectedId(null)}
            >
              <X className="size-4" />
            </Button>
          </div>
          <div className="mt-2">
            <AddressLine loc={selected} />
          </div>
          <div className="mt-3 space-y-2">
            <BeerStyleBadges loc={selected} />
            <PresentationBadges loc={selected} />
          </div>
          <div className="mt-4">
            <DirectionsButton loc={selected} className="w-full" />
          </div>
        </div>
      )}
    </section>
  );
}
