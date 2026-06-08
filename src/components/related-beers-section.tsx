import Image from "next/image";
import Link from "next/link";
import { getAllBeers } from "@/lib/content";

interface RelatedBeersSectionProps {
  currentSlug: string;
}

export async function RelatedBeersSection({
  currentSlug,
}: RelatedBeersSectionProps) {
  const beers = (await getAllBeers()).filter(
    (beer) => beer.slug !== currentSlug,
  );

  if (beers.length === 0) {
    return null;
  }

  return (
    <section className="py-16 border-t">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-extrabold uppercase mb-2">
          Otros parches, otras Jabatos
        </h2>
        <p className="text-muted-foreground mb-10 max-w-2xl">
          A cada parche le llega su Jabato — elige otra cerveza para otro
          momento.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {beers.map((beer) => (
            <Link
              key={beer.slug}
              href={`/cervezas/${beer.slug}`}
              className="group block"
            >
              <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
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
              <h3 className="text-xl font-bold mb-1">{beer.title}</h3>
              <p className="text-brand">ABV: {beer.abv}%</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
