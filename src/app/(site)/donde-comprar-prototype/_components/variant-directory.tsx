"use client";

// PROTOTYPE — Variant C: SEO-dense directory. No dominant interactive map;
// results grouped by neighborhood as readable sections, each store a rich card
// with its own static map thumbnail. Optimised for reading + crawlability.

import { Button } from "@/components/ui/button";
import {
  AddressLine,
  activeChips,
  BeerStyleBadges,
  DirectionsButton,
  FilterSelect,
  NearMeButton,
  PresentationBadges,
  SearchBox,
} from "./finder-parts";
import {
  formatDistance,
  type Location,
  osmEmbedUrl,
  PRESENTATION_LABELS,
  type Presentation,
} from "./types";
import type { VariantProps } from "./variant-props";

const PRESENTATIONS: Presentation[] = ["draft", "bottle", "can"];

function groupByNeighborhood(
  locations: Location[],
): { neighborhood: string; items: Location[] }[] {
  const map = new Map<string, Location[]>();
  for (const loc of locations) {
    const key = loc.location.neighborhood;
    const arr = map.get(key) ?? [];
    arr.push(loc);
    map.set(key, arr);
  }
  return [...map.entries()]
    .map(([neighborhood, items]) => ({ neighborhood, items }))
    .sort((a, b) => a.neighborhood.localeCompare(b.neighborhood, "es"));
}

export function VariantDirectory({
  results,
  totalCount,
  filters,
  setFilter,
  resetFilters,
  styles,
  neighborhoods,
  setSelectedId,
  nearActive,
  nearLoading,
  onNearMe,
}: VariantProps) {
  const groups = groupByNeighborhood(results);
  const chips = activeChips(filters);

  return (
    <div>
      <section className="border-b bg-secondary/20">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <h1 className="font-heading text-4xl uppercase sm:text-6xl">
            Dónde comprar cerveza artesanal Jabato
          </h1>
          <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
            Nuestras cervezas están en {totalCount} bares y restaurantes de
            Bogotá y alrededores. Encuentra el punto más cercano por barrio,
            estilo o presentación y ve a disfrutar tu Jabato de barril, en
            botella o en lata.
          </p>
        </div>
      </section>

      <div className="sticky top-16 z-40 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:px-6 lg:flex-row lg:items-center">
          <SearchBox
            value={filters.buscar}
            onChange={(v) => setFilter("buscar", v)}
            className="lg:max-w-xs"
          />
          <div className="grid grid-cols-3 gap-2 lg:flex">
            <FilterSelect
              value={filters.estilo}
              onChange={(v) => setFilter("estilo", v)}
              options={styles}
              placeholder="Estilo"
              className="lg:w-40"
            />
            <FilterSelect
              value={filters.presentacion}
              onChange={(v) => setFilter("presentacion", v)}
              options={PRESENTATIONS}
              optionLabel={(v) => PRESENTATION_LABELS[v as Presentation]}
              placeholder="Presentación"
              className="lg:w-40"
            />
            <FilterSelect
              value={filters.barrio}
              onChange={(v) => setFilter("barrio", v)}
              options={neighborhoods}
              placeholder="Barrio"
              className="lg:w-40"
            />
          </div>
          <div className="flex items-center gap-2 lg:ml-auto">
            <NearMeButton
              active={nearActive}
              loading={nearLoading}
              onClick={onNearMe}
            />
          </div>
        </div>
        {chips.length > 0 && (
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 pb-3 text-sm sm:px-6">
            <span className="text-muted-foreground">Filtros:</span>
            {chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-medium text-brand"
              >
                {chip}
              </span>
            ))}
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs font-medium text-muted-foreground underline"
            >
              Limpiar
            </button>
          </div>
        )}
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <p className="mb-8 text-sm text-muted-foreground">
          {results.length} de {totalCount} puntos de venta
        </p>

        {groups.length === 0 && (
          <div className="rounded-xl border border-dashed p-12 text-center text-muted-foreground">
            No encontramos puntos con esos filtros.
          </div>
        )}

        <div className="space-y-12">
          {groups.map((group) => (
            <section key={group.neighborhood}>
              <h2 className="mb-4 flex items-baseline gap-3 font-heading text-2xl uppercase">
                {group.neighborhood}
                <span className="text-sm font-normal text-muted-foreground">
                  {group.items.length}{" "}
                  {group.items.length === 1 ? "punto" : "puntos"}
                </span>
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((loc) => {
                  const distance = formatDistance(loc.distanceMeters);
                  return (
                    <article
                      key={loc.id}
                      className="flex flex-col overflow-hidden rounded-xl border bg-card"
                    >
                      <iframe
                        title={`Mapa de ${loc.name}`}
                        src={osmEmbedUrl(loc)}
                        loading="lazy"
                        className="h-40 w-full border-0 bg-muted"
                      />
                      <div className="flex flex-1 flex-col p-4">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold uppercase leading-tight">
                            {loc.name}
                          </h3>
                          {distance && (
                            <span className="shrink-0 text-xs font-medium text-brand">
                              {distance}
                            </span>
                          )}
                        </div>
                        <div className="mt-1.5">
                          <AddressLine loc={loc} />
                        </div>
                        {loc.description && (
                          <p className="mt-2 text-sm text-muted-foreground">
                            {loc.description}
                          </p>
                        )}
                        <div className="mt-3 space-y-2">
                          <BeerStyleBadges loc={loc} />
                          <PresentationBadges loc={loc} />
                        </div>
                        <div className="mt-4 flex gap-2 pt-2">
                          <DirectionsButton loc={loc} />
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => setSelectedId(loc.id)}
                          >
                            Ver detalle
                          </Button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
