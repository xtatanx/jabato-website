"use client";

// PROTOTYPE — Variant A: classic split view. Scrollable store list on the left,
// sticky synced map on the right (Brewdog / Brooklyn Brewery style).

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

export function VariantSplit({
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
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <header className="mb-6">
        <h1 className="font-heading text-4xl uppercase sm:text-5xl">
          Dónde comprar
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Encuentra los bares y restaurantes de Bogotá y alrededores donde
          puedes disfrutar una Jabato.
        </p>
      </header>

      <div className="mb-6 grid gap-3 rounded-xl border bg-card p-4 sm:grid-cols-2 lg:grid-cols-5">
        <SearchBox
          value={filters.buscar}
          onChange={(v) => setFilter("buscar", v)}
          className="lg:col-span-2"
        />
        <FilterSelect
          value={filters.estilo}
          onChange={(v) => setFilter("estilo", v)}
          options={styles}
          placeholder="Estilo"
        />
        <FilterSelect
          value={filters.presentacion}
          onChange={(v) => setFilter("presentacion", v)}
          options={PRESENTATIONS}
          optionLabel={(v) => PRESENTATION_LABELS[v as Presentation]}
          placeholder="Presentación"
        />
        <div className="flex gap-2">
          <FilterSelect
            value={filters.barrio}
            onChange={(v) => setFilter("barrio", v)}
            options={neighborhoods}
            placeholder="Barrio"
          />
        </div>
        <NearMeButton
          active={nearActive}
          loading={nearLoading}
          onClick={onNearMe}
          className="lg:col-span-5 lg:w-fit"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_1.1fr]">
        <div>
          <p className="mb-3 text-sm text-muted-foreground">
            {results.length} de {totalCount} puntos
          </p>
          <ul className="flex max-h-[70vh] flex-col gap-3 overflow-y-auto pr-1">
            {results.map((loc) => {
              const selected = loc.id === selectedId;
              const distance = formatDistance(loc.distanceMeters);
              return (
                <li key={loc.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setSelectedId(loc.id)}
                    onFocus={() => setSelectedId(loc.id)}
                    onClick={() => setSelectedId(loc.id)}
                    className={cn(
                      "w-full rounded-xl border bg-card p-4 text-left transition-colors",
                      selected
                        ? "border-brand ring-1 ring-brand"
                        : "hover:border-brand/50",
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="font-semibold uppercase leading-tight">
                        {loc.name}
                      </h2>
                      {distance && (
                        <span className="shrink-0 text-xs font-medium text-brand">
                          {distance}
                        </span>
                      )}
                    </div>
                    <div className="mt-1.5">
                      <AddressLine loc={loc} />
                    </div>
                    <div className="mt-3 space-y-2">
                      <BeerStyleBadges loc={loc} />
                      <PresentationBadges loc={loc} />
                    </div>
                    <div className="mt-3">
                      <DirectionsButton loc={loc} />
                    </div>
                  </button>
                </li>
              );
            })}
            {results.length === 0 && (
              <li className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
                No encontramos puntos con esos filtros.
              </li>
            )}
          </ul>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="h-[70vh] overflow-hidden rounded-xl border">
            <PrototypeMap
              locations={results}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
