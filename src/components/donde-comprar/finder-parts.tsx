"use client";

import { LocateFixed, MapPin, Search } from "lucide-react";
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
import {
  type Location,
  locationPresentations,
  PRESENTATION_LABELS,
} from "@/lib/jabato-api";
import { cn } from "@/lib/utils";

export const ALL = "__all__";

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
  /** Filter category shown as a prefix on the trigger, e.g. "Estilo" */
  label: string;
  /** Full label for the "all" option inside the open menu, e.g. "Todos los estilos" */
  allLabel: string;
  /** Short word for the "all" state on the trigger, e.g. "todos" / "todas" */
  allShort: string;
  optionLabel?: (value: string) => string;
  className?: string;
}

export function FilterSelect({
  value,
  onChange,
  options,
  label,
  allLabel,
  allShort,
  optionLabel,
  className,
}: FilterSelectProps) {
  const isAll = !value;
  const displayValue = isAll ? allShort : (optionLabel?.(value) ?? value);

  return (
    <Select
      value={value || ALL}
      onValueChange={(v) => onChange(v === ALL ? "" : v)}
    >
      <SelectTrigger
        className={cn("w-full min-w-0", className)}
        aria-label={`Filtrar por ${label.toLowerCase()}`}
      >
        <SelectValue>
          <span className="text-muted-foreground">{label}:</span> {displayValue}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL}>{allLabel}</SelectItem>
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
      className={cn(
        "h-9 rounded-md px-3 text-sm has-[>svg]:px-3 [&_svg:not([class*='size-'])]:size-4",
        active && "bg-brand hover:bg-brand/90",
        className,
      )}
    >
      <LocateFixed className={cn("size-4", loading && "animate-pulse")} />
      Cerca de mí
    </Button>
  );
}

export function PresentationBadges({ loc }: { loc: Location }) {
  const presentations = locationPresentations(loc);
  if (presentations.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1">
      {presentations.map((p) => (
        <Badge key={p} variant="secondary" className="px-1.5 py-0 text-xs">
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
    <div className="flex flex-wrap gap-1">
      {styles.map((s) => (
        <Badge
          key={s}
          variant="outline"
          className="border-brand/40 px-1.5 py-0 text-xs text-brand"
        >
          {s}
        </Badge>
      ))}
    </div>
  );
}

export function AddressLine({ loc }: { loc: Location }) {
  return (
    <p className="flex items-start gap-1 text-xs text-muted-foreground">
      <MapPin className="mt-0.5 size-3 shrink-0" />
      <span>
        {loc.location.address} · {loc.location.neighborhood}
      </span>
    </p>
  );
}
