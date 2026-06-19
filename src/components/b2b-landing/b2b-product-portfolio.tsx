import { b2bLandingCopy } from "@content/data/b2b-landing";
import { site } from "@content/site";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { BeerData } from "@/lib/content";
import { cn } from "@/lib/utils";

interface B2BProductPortfolioProps {
  beers: BeerData[];
}

function getBeerImage(beer: BeerData): { src: string; alt: string } {
  const image = beer.images[0] ?? beer.images[1];
  return {
    src: image?.src ?? site.defaultOgImage,
    alt: image?.alt ?? beer.title,
  };
}

export function B2BProductPortfolio({ beers }: B2BProductPortfolioProps) {
  const availableBeers = beers.filter((beer) => beer.available);

  return (
    <section className="bg-muted/40 py-12 lg:py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 font-heading text-5xl uppercase sm:text-6xl lg:text-7xl">
          {b2bLandingCopy.portfolioTitle}
        </h2>

        <div className="space-y-16 lg:space-y-24">
          {availableBeers.map((beer, index) => {
            const imageOnLeft = index % 2 === 0;
            const beerImage = getBeerImage(beer);

            return (
              <article
                key={beer.slug}
                className={cn(
                  "flex flex-col gap-8 lg:items-center lg:gap-12",
                  imageOnLeft ? "lg:flex-row" : "lg:flex-row-reverse",
                )}
              >
                <figure className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-lg border border-border bg-muted lg:mx-0 lg:max-w-none lg:w-1/2">
                  <Image
                    src={beerImage.src}
                    alt={beerImage.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </figure>

                <div className="w-full lg:w-1/2">
                  <h3 className="font-heading text-4xl uppercase sm:text-5xl">
                    {beer.style}
                  </h3>
                  <p className="mt-3 text-base text-muted-foreground lg:text-lg">
                    ABV {beer.abv}% · IBU {beer.ibu}
                  </p>
                  <p className="mt-4 text-xl leading-relaxed lg:text-2xl">
                    {beer.description}
                  </p>
                  {beer.pairing.length > 0 && (
                    <div className="mt-10 border-t border-border pt-8">
                      <h4 className="mb-5 text-base font-semibold uppercase tracking-wide text-foreground lg:text-lg">
                        Maridaje recomendado
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {beer.pairing.map((item) => (
                          <Badge
                            key={item}
                            variant="secondary"
                            className="px-5 py-2 text-base font-medium lg:text-lg"
                          >
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
