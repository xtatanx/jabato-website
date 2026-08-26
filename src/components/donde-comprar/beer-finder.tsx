"use client";

import { parseAsString, useQueryState } from "nuqs";
import { useCallback, useMemo, useState } from "react";
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
        radiusKm: 10,
      };
    }
    return base;
  }, [buscar, estilo, presentacion, barrio, userCoords]);

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

      {isValidating && (
        <p className="mb-2 text-xs text-muted-foreground">Actualizando…</p>
      )}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_3fr]">
        <StoreList
          results={results}
          selectedId={selectedId}
          onSelect={setSelectedId}
          totalCount={totalCount}
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
