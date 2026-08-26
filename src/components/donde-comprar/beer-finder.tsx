"use client";

import { parseAsString, useQueryState } from "nuqs";
import { useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { FiltersBar } from "@/components/donde-comprar/filters-bar";
import { StoreList } from "@/components/donde-comprar/store-list";
import { StoreMapLazy } from "@/components/donde-comprar/store-map-lazy";
import {
  type Location,
  type LocationParams,
  locationsKey,
} from "@/lib/jabato-api";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const NEAR_RADIUS_KM = 2;
const NEAR_RADIUS_MAX_KM = 4;

interface BeerFinderProps {
  styles: string[];
  neighborhoods: string[];
  totalCount: number;
}

export function BeerFinder({
  styles,
  neighborhoods,
  totalCount,
}: BeerFinderProps) {
  const [buscar, setBuscar] = useQueryState(
    "buscar",
    parseAsString.withDefault(""),
  );
  const [estilo, setEstilo] = useQueryState(
    "estilo",
    parseAsString.withDefault(""),
  );
  const [presentacion, setPresentacion] = useQueryState(
    "presentacion",
    parseAsString.withDefault(""),
  );
  const [barrio, setBarrio] = useQueryState(
    "barrio",
    parseAsString.withDefault(""),
  );

  const [userCoords, setUserCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [nearLoading, setNearLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [nearRadius, setNearRadius] = useState(NEAR_RADIUS_KM);

  const params = useMemo<LocationParams>(() => {
    const base: LocationParams = {
      buscar: buscar || undefined,
      estilo: estilo || undefined,
      presentacion: presentacion || undefined,
      barrio: barrio || undefined,
    };
    if (userCoords) {
      return {
        ...base,
        lat: userCoords.lat,
        lng: userCoords.lng,
        radiusKm: nearRadius,
      };
    }
    return base;
  }, [buscar, estilo, presentacion, barrio, userCoords, nearRadius]);

  const key = locationsKey(params);

  const { data: results = [], isValidating } = useSWR<Location[]>(
    key,
    fetcher,
    {
      revalidateOnFocus: false,
      keepPreviousData: true,
      dedupingInterval: 60000,
      revalidateOnMount: false,
    },
  );

  // Restart from the tight walking radius whenever the location or the active
  // filters change, so each new near-me search begins at NEAR_RADIUS_KM.
  // biome-ignore lint/correctness/useExhaustiveDependencies: reset on new search inputs
  useEffect(() => {
    setNearRadius(NEAR_RADIUS_KM);
  }, [userCoords, buscar, estilo, presentacion, barrio]);

  // Opportunistically widen the radius when a near-me search finds nothing at
  // the tight radius, up to NEAR_RADIUS_MAX_KM.
  useEffect(() => {
    if (!userCoords || isValidating) return;
    if (results.length > 0) return;
    if (nearRadius >= NEAR_RADIUS_MAX_KM) return;
    setNearRadius(NEAR_RADIUS_MAX_KM);
  }, [userCoords, isValidating, results.length, nearRadius]);

  const nearExpanded = userCoords != null && nearRadius > NEAR_RADIUS_KM;

  const onNearMe = useCallback(() => {
    if (userCoords) {
      setUserCoords(null);
      return;
    }
    if (!("geolocation" in navigator)) return;
    setNearLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setNearLoading(false);
      },
      () => setNearLoading(false),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }, [userCoords]);

  return (
    <section className="mx-auto max-w-7xl px-4 pt-12 pb-8 sm:px-6 sm:pt-16">
      <header className="mb-10 text-center sm:mb-14">
        <h1 className="font-heading text-4xl uppercase sm:text-5xl">
          Dónde comprar cerveza <span className="text-brand">Jabato</span>
        </h1>
        <p className="mx-auto mt-3 max-w-3xl text-pretty text-muted-foreground">
          Encuentra los bares, restaurantes y tiendas de Bogotá y sus
          alrededores donde puedes disfrutar y comprar nuestra cerveza artesanal
          Jabato. Filtra por estilo, presentación o barrio, usa el mapa para ver
          los puntos de venta más cercanos y activa{" "}
          <span className="whitespace-nowrap">“Cerca de mí”</span> para
          descubrir en cuáles locales a distancia caminable ya sirven Jabato
          bien fría.
        </p>
      </header>

      <FiltersBar
        buscar={buscar}
        estilo={estilo}
        presentacion={presentacion}
        barrio={barrio}
        onBuscarChange={setBuscar}
        onEstiloChange={setEstilo}
        onPresentacionChange={setPresentacion}
        onBarrioChange={setBarrio}
        styles={styles}
        neighborhoods={neighborhoods}
        nearActive={userCoords != null}
        nearLoading={nearLoading}
        onNearMe={onNearMe}
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_3fr]">
        <StoreList
          results={results}
          selectedId={selectedId}
          onSelect={setSelectedId}
          totalCount={totalCount}
          note={
            !isValidating && nearExpanded
              ? `radio ampliado a ${NEAR_RADIUS_MAX_KM} km`
              : undefined
          }
        />
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="h-[70vh] overflow-hidden rounded-xl border">
            <StoreMapLazy
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
