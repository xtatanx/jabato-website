"use client";

import Link from "next/link";
import {
  AddressLine,
  BeerStyleBadges,
  PresentationBadges,
} from "@/components/donde-comprar/finder-parts";
import {
  buildLocationSlug,
  formatDistance,
  type Location,
} from "@/lib/jabato-api";
import { cn } from "@/lib/utils";

interface StoreCardProps {
  loc: Location;
  selected: boolean;
  onSelect: (id: string) => void;
}

export function StoreCard({ loc, selected, onSelect }: StoreCardProps) {
  const distance = formatDistance(loc.distanceMeters);

  return (
    <article
      className={cn(
        "cursor-pointer rounded-lg border bg-card transition-colors",
        selected ? "border-brand ring-1 ring-brand" : "hover:border-brand/50",
      )}
    >
      <div className="flex items-start justify-between gap-2 p-3 pb-1">
        <Link
          href={`/donde-comprar/${buildLocationSlug(loc.id, loc.name)}`}
          className="cursor-pointer font-semibold uppercase leading-tight hover:text-brand"
        >
          {loc.name}
        </Link>
        {distance && (
          <span className="shrink-0 text-xs font-medium text-brand">
            {distance}
          </span>
        )}
      </div>
      <button
        type="button"
        onClick={() => onSelect(loc.id)}
        className="w-full cursor-pointer px-3 pb-3 pt-1 text-left"
      >
        <AddressLine loc={loc} />
        <div className="mt-2 space-y-1.5">
          <BeerStyleBadges loc={loc} />
          <PresentationBadges loc={loc} />
        </div>
      </button>
    </article>
  );
}
