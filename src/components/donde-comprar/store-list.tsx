"use client";

import { StoreCard } from "@/components/donde-comprar/store-card";
import { Empty, EmptyDescription, EmptyTitle } from "@/components/ui/empty";
import type { Location } from "@/lib/jabato-api";

interface StoreListProps {
  results: Location[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  totalCount: number;
}

export function StoreList({
  results,
  selectedId,
  onSelect,
  totalCount,
}: StoreListProps) {
  return (
    <div>
      <p className="mb-3 text-sm text-muted-foreground">
        {results.length} de {totalCount} puntos
      </p>
      {results.length === 0 ? (
        <Empty className="border border-dashed">
          <EmptyTitle>Sin resultados</EmptyTitle>
          <EmptyDescription>
            No encontramos puntos con esos filtros.
          </EmptyDescription>
        </Empty>
      ) : (
        <ul className="flex max-h-[70vh] flex-col gap-2 overflow-y-auto px-1.5 py-1 pr-2 [scrollbar-gutter:stable]">
          {results.map((loc) => (
            <li key={loc.id}>
              <StoreCard
                loc={loc}
                selected={loc.id === selectedId}
                onSelect={onSelect}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
