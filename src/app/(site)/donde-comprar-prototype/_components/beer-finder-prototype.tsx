"use client";

// PROTOTYPE — throwaway orchestrator. Owns shared filter + selection state and
// swaps between radically different layouts via ?variant=. Delete once a variant
// is folded into the real /donde-comprar page.

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { PrototypeSwitcher, type VariantMeta } from "./prototype-switcher";
import {
  type Coordinates,
  EMPTY_FILTERS,
  type FinderFilters,
  filterLocations,
  type Location,
  uniqueNeighborhoods,
  uniqueStyles,
} from "./types";
import { VariantDirectory } from "./variant-directory";
import { VariantImmersive } from "./variant-immersive";
import type { VariantProps } from "./variant-props";
import { VariantSplit } from "./variant-split";

const VARIANTS: VariantMeta[] = [
  { key: "A", name: "Split (lista + mapa)" },
  { key: "B", name: "Mapa inmersivo" },
  { key: "C", name: "Directorio por barrio" },
];

interface BeerFinderPrototypeProps {
  locations: Location[];
}

export function BeerFinderPrototype({ locations }: BeerFinderPrototypeProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const variant = (searchParams.get("variant") ?? "A").toUpperCase();

  const [filters, setFilters] = useState<FinderFilters>(EMPTY_FILTERS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [userCoords, setUserCoords] = useState<Coordinates | null>(null);
  const [nearLoading, setNearLoading] = useState(false);

  const styles = useMemo(() => uniqueStyles(locations), [locations]);
  const neighborhoods = useMemo(
    () => uniqueNeighborhoods(locations),
    [locations],
  );
  const results = useMemo(
    () => filterLocations(locations, filters, userCoords),
    [locations, filters, userCoords],
  );

  const setFilter = useCallback(
    (key: keyof FinderFilters, value: string) =>
      setFilters((prev) => ({ ...prev, [key]: value })),
    [],
  );
  const resetFilters = useCallback(() => setFilters(EMPTY_FILTERS), []);

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

  const changeVariant = useCallback(
    (key: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("variant", key);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  const variantProps: VariantProps = {
    results,
    totalCount: locations.length,
    filters,
    setFilter,
    resetFilters,
    styles,
    neighborhoods,
    selectedId,
    setSelectedId,
    nearActive: userCoords != null,
    nearLoading,
    onNearMe,
  };

  return (
    <>
      {variant === "B" ? (
        <VariantImmersive {...variantProps} />
      ) : variant === "C" ? (
        <VariantDirectory {...variantProps} />
      ) : (
        <VariantSplit {...variantProps} />
      )}
      <PrototypeSwitcher
        variants={VARIANTS}
        current={variant}
        onChange={changeVariant}
      />
    </>
  );
}
