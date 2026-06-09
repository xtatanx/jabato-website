"use client";

import { site } from "@content/site";
import { AlertTriangle, MessageCircle } from "lucide-react";
import { useState } from "react";
import {
  trackBeerBuyClick,
  trackBeerPackSelect,
  trackWhatsAppClick,
} from "@/lib/analytics";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type BeerProductInfoData = {
  name: string;
  description: string;
  available: boolean;
  volume: string;
  abv: number;
  ibu: number;
  style: string;
  packs: Record<PackSize, { price: number; unitPrice: number }>;
};

type PackSize = "6-bottles" | "12-bottles" | "24-bottles";

const PACK_LABELS: Record<PackSize, string> = {
  "6-bottles": "6 botellas",
  "12-bottles": "12 botellas",
  "24-bottles": "24 botellas",
};

function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

interface BeerProductInfoProps {
  beer: BeerProductInfoData;
  slug: string;
}

export function BeerProductInfo({ beer, slug }: BeerProductInfoProps) {
  const [selectedPack, setSelectedPack] = useState<PackSize>("6-bottles");

  const buyMessage = `¡Hola! Me interesa comprar ${beer.name} (${PACK_LABELS[selectedPack]}). ¿Podrían darme más información sobre disponibilidad y precios?`;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-brand font-semibold uppercase tracking-wide mb-1">
          {beer.style}
        </p>
        <div className="flex items-start gap-3 flex-wrap">
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase">
            {beer.name}
          </h1>
          {!beer.available && (
            <Badge className="bg-brand text-primary-foreground mt-1">
              Próximamente
            </Badge>
          )}
        </div>

        <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-3 border-b border-border/60 pb-4">
          <div>
            <dt className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Volumen
            </dt>
            <dd className="mt-0.5 text-sm font-semibold">{beer.volume}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              ABV
            </dt>
            <dd className="mt-0.5 text-sm font-semibold">{beer.abv}%</dd>
          </div>
          <div>
            <dt className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              IBU
            </dt>
            <dd className="mt-0.5 text-sm font-semibold">{beer.ibu}</dd>
          </div>
        </dl>

        <p className="text-muted-foreground mt-4 leading-relaxed">
          {beer.description}
        </p>
      </div>

      <div>
        <p className="text-sm font-semibold mb-2">Selecciona tu pack</p>
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(PACK_LABELS) as PackSize[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                if (selectedPack === key) return;
                setSelectedPack(key);
                trackBeerPackSelect({
                  beerSlug: slug,
                  beerName: beer.name,
                  packSize: key,
                  price: beer.packs[key].price,
                });
              }}
              className={cn(
                "rounded-lg border-2 px-3 py-3 text-sm font-medium transition-colors",
                selectedPack === key
                  ? "border-brand bg-brand/5 text-foreground"
                  : "border-border hover:border-brand/50",
              )}
            >
              {PACK_LABELS[key]}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border bg-secondary/20 p-4">
        <p className="text-sm text-muted-foreground">
          COP ${beer.packs[selectedPack].unitPrice.toLocaleString("es-CO")} por
          botella
        </p>
        <p className="text-4xl font-bold mt-1">
          COP ${beer.packs[selectedPack].price.toLocaleString("es-CO")}
        </p>
      </div>

      {beer.available ? (
        <Button asChild size="lg" className="w-full bg-brand hover:bg-brand/90">
          <a
            href={buildWhatsAppUrl(buyMessage)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackBeerBuyClick({
                beerSlug: slug,
                beerName: beer.name,
                packSize: selectedPack,
                price: beer.packs[selectedPack].price,
              });
              trackWhatsAppClick({
                intent: "b2c",
                location: "beer_pdp",
                beerSlug: slug,
              });
            }}
          >
            <MessageCircle className="size-5" />
            Comprar por WhatsApp
          </a>
        </Button>
      ) : (
        <Button size="lg" disabled className="w-full bg-brand">
          Próximamente disponible
        </Button>
      )}

      <div
        role="note"
        className="rounded-lg border border-amber-500/50 bg-amber-500/10 px-4 py-3"
      >
        <p className="flex items-start gap-2.5 text-sm font-semibold leading-snug text-foreground">
          <AlertTriangle className="size-4 shrink-0 text-amber-600 mt-0.5" />
          <span>
            Prohíbase el expendio de bebidas embriagantes a menores de edad. El
            exceso de alcohol es perjudicial para la salud.
          </span>
        </p>
      </div>
    </div>
  );
}
