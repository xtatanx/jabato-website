"use client";

// PROTOTYPE — throwaway. Small shared inputs/badges the variants compose in
// different layouts (like sharing a Button — layout stays per-variant).

import { LocateFixed, MapPin, Navigation, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  ALL,
  directionsUrl,
  type FinderFilters,
  type Location,
  locationPresentations,
  PRESENTATION_LABELS,
} from "./types";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SearchBox({ value, onChange, className }: SearchBoxProps) {
  return (
    <div className={cn("relative", className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar bar o restaurante…"
        className="pl-9"
        aria-label="Buscar por nombre"
      />
    </div>
  );
}

interface FilterSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  optionLabel?: (value: string) => string;
  className?: string;
}

export function FilterSelect({
  value,
  onChange,
  options,
  placeholder,
  optionLabel,
  className,
}: FilterSelectProps) {
  return (
    <Select
      value={value || ALL}
      onValueChange={(v) => onChange(v === ALL ? "" : v)}
    >
      <SelectTrigger
        className={cn("w-full", className)}
        aria-label={placeholder}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL}>{placeholder}</SelectItem>
        {options.map((opt) => (
          <SelectItem key={opt} value={opt}>
            {optionLabel ? optionLabel(opt) : opt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

interface NearMeButtonProps {
  active: boolean;
  loading: boolean;
  onClick: () => void;
  className?: string;
  variant?: "default" | "outline" | "secondary";
}

export function NearMeButton({
  active,
  loading,
  onClick,
  className,
  variant = "outline",
}: NearMeButtonProps) {
  return (
    <Button
      type="button"
      variant={active ? "default" : variant}
      onClick={onClick}
      disabled={loading}
      className={cn(active && "bg-brand hover:bg-brand/90", className)}
    >
      <LocateFixed className={cn("size-4", loading && "animate-pulse")} />
      {active ? "Cerca de mí" : "Cerca de mí"}
    </Button>
  );
}

export function PresentationBadges({ loc }: { loc: Location }) {
  const presentations = locationPresentations(loc);
  if (presentations.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {presentations.map((p) => (
        <Badge key={p} variant="secondary" className="font-medium">
          {PRESENTATION_LABELS[p]}
        </Badge>
      ))}
    </div>
  );
}

export function BeerStyleBadges({ loc }: { loc: Location }) {
  const styles = [...new Set(loc.beers.map((b) => b.style))];
  if (styles.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {styles.map((s) => (
        <Badge
          key={s}
          variant="outline"
          className="border-brand/40 text-brand font-medium"
        >
          {s}
        </Badge>
      ))}
    </div>
  );
}

export function AddressLine({ loc }: { loc: Location }) {
  return (
    <p className="flex items-start gap-1.5 text-sm text-muted-foreground">
      <MapPin className="mt-0.5 size-3.5 shrink-0" />
      <span>
        {loc.location.address} · {loc.location.neighborhood}
      </span>
    </p>
  );
}

export function DirectionsButton({
  loc,
  size = "sm",
  className,
}: {
  loc: Location;
  size?: "sm" | "default";
  className?: string;
}) {
  return (
    <Button
      asChild
      size={size}
      variant="outline"
      className={cn("gap-1.5", className)}
    >
      <a href={directionsUrl(loc)} target="_blank" rel="noopener noreferrer">
        <Navigation className="size-3.5" />
        Cómo llegar
      </a>
    </Button>
  );
}

export function activeChips(filters: FinderFilters): string[] {
  const chips: string[] = [];
  if (filters.buscar) chips.push(`"${filters.buscar}"`);
  if (filters.estilo) chips.push(filters.estilo);
  if (filters.presentacion) {
    chips.push(
      PRESENTATION_LABELS[
        filters.presentacion as keyof typeof PRESENTATION_LABELS
      ] ?? filters.presentacion,
    );
  }
  if (filters.barrio) chips.push(filters.barrio);
  return chips;
}
