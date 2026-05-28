import Image from "next/image";
import Link from "next/link";
import { getAllBeers } from "@/lib/content";

export type BeerGridProps = {
  /** Show only beers with available=true. Defaults to false (show all). */
  onlyAvailable?: boolean;
};

export async function BeerGrid({ onlyAvailable = false }: BeerGridProps = {}) {
  const all = await getAllBeers();
  const beers = onlyAvailable ? all.filter((b) => b.available) : all;

  if (beers.length === 0) {
    return (
      <section className="pb-12 lg:pb-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg text-secondary-foreground/80">
            No hay cervezas disponibles por el momento.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-12 lg:pb-20">
      <div className="container mx-auto px-4">
        <div className="sm:max-w-8/12 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {beers.map((beer) => (
              <Link
                key={beer.slug}
                href={`/cervezas/${beer.slug}`}
                className="group block"
              >
                <div className="relative aspect-square overflow-hidden mb-4">
                  <Image
                    src={beer.images[0].src}
                    alt={beer.images[0].alt}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  {!beer.available && (
                    <div className="absolute top-4 right-4 bg-brand text-white px-3 py-1 text-sm font-semibold uppercase">
                      Próximamente
                    </div>
                  )}
                </div>
                <h3 className="text-2xl font-bold mb-1">{beer.title}</h3>
                <p className="text-lg text-brand">ABV: {beer.abv}%</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
