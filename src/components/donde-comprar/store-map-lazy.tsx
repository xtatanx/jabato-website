"use client";

import dynamic from "next/dynamic";

export const StoreMapLazy = dynamic(
  () => import("./store-map").then((m) => m.StoreMap),
  {
    ssr: false,
    loading: () => (
      <div className="grid h-full w-full place-items-center bg-muted/40 text-sm text-muted-foreground">
        Cargando mapa…
      </div>
    ),
  },
);
