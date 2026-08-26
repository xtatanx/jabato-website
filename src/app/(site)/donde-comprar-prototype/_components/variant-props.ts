// PROTOTYPE — throwaway.

import type { FinderFilters, Location } from "./types";

export interface VariantProps {
  results: Location[];
  totalCount: number;
  filters: FinderFilters;
  setFilter: (key: keyof FinderFilters, value: string) => void;
  resetFilters: () => void;
  styles: string[];
  neighborhoods: string[];
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  nearActive: boolean;
  nearLoading: boolean;
  onNearMe: () => void;
}
