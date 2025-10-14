'use client';

import { useState } from 'react';
import { Beer, Flame, Droplet, Award, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { BeerData } from '@/lib/beers-data';

interface BeerProductInfoProps {
  beer: BeerData;
}

type PackSize = '6-bottles' | '12-bottles' | '24-bottles';

export function BeerProductInfo({ beer }: BeerProductInfoProps) {
  const [selectedPack, setSelectedPack] = useState<PackSize>('6-bottles');

  const whatsappMessage = encodeURIComponent(
    `¡Hola! Me interesa comprar ${beer.name} (${
      selectedPack === '6-bottles'
        ? '6 botellas'
        : selectedPack === '12-bottles'
        ? '12 botellas'
        : '24 botellas'
    }). ¿Podrían darme más información sobre disponibilidad y precios?`
  );
  const whatsappUrl = `https://wa.me/573337058517?text=${whatsappMessage}`;

  const packOptions: { key: PackSize; label: string }[] = [
    { key: '6-bottles', label: '6 botellas' },
    { key: '12-bottles', label: '12 botellas' },
    { key: '24-bottles', label: '24 botellas' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-start gap-3 mb-4 flex-wrap">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase">
            {beer.name}
          </h1>
          {!beer.available && (
            <Badge
              variant="default"
              className="bg-brand text-primary-foreground uppercase tracking-wide mt-2 sm:mt-3 lg:mt-4"
            >
              Próximamente
            </Badge>
          )}
        </div>
        <p className="text-base text-muted-foreground leading-relaxed mb-6">
          {beer.description}
        </p>
      </div>

      {/* Pack Options */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Pack:</h3>
        <div className="flex gap-3">
          {packOptions.map((pack) => (
            <Button
              key={pack.key}
              variant={selectedPack === pack.key ? 'default' : 'outline'}
              size="lg"
              onClick={() => setSelectedPack(pack.key)}
              className={
                selectedPack === pack.key
                  ? 'bg-primary text-primary-foreground'
                  : ''
              }
            >
              {pack.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          COP ${beer.packs[selectedPack].unitPrice.toLocaleString('es-CO')} por
          botella de {beer.volume}
        </p>
        <p className="text-3xl font-bold">
          COP ${beer.packs[selectedPack].price.toLocaleString('es-CO')}
        </p>
      </div>

      {/* Age Restriction */}
      {beer.available && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <span>
            prohíbase el expendio de bebidas embriagantes a menores de edad
          </span>
        </div>
      )}

      {/* Purchase Button */}
      {beer.available ? (
        <Button asChild className="w-full bg-brand hover:bg-brand/90">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            Quiero comprar
          </a>
        </Button>
      ) : (
        <Button disabled className="w-full bg-brand hover:bg-brand/90">
          Próximamente disponible
        </Button>
      )}

      {/* Specifications */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-5">
        <div className="flex items-center gap-2.5 px-3 sm:px-4 lg:px-5 py-2.5 rounded-lg bg-secondary/20 min-w-0">
          <div className="flex-shrink-0">
            <Beer className="w-5 h-5 text-brand" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground truncate">Volumen</p>
            <p className="text-sm font-semibold truncate">{beer.volume}</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 px-3 sm:px-4 lg:px-5 py-2.5 rounded-lg bg-secondary/20 min-w-0">
          <div className="flex-shrink-0">
            <Flame className="w-5 h-5 text-brand" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground truncate">Alcohol</p>
            <p className="text-sm font-semibold truncate">{beer.abv}% ABV</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 px-3 sm:px-4 lg:px-5 py-2.5 rounded-lg bg-secondary/20 min-w-0">
          <div className="flex-shrink-0">
            <Droplet className="w-5 h-5 text-brand" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground truncate">Amargor</p>
            <p className="text-sm font-semibold truncate">{beer.ibu} IBU</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 px-3 sm:px-4 lg:px-5 py-2.5 rounded-lg bg-secondary/20 min-w-0">
          <div className="flex-shrink-0">
            <Award className="w-5 h-5 text-brand" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground truncate">Estilo</p>
            <p className="text-sm font-semibold truncate">{beer.style}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
