import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BeerProductGallery } from "@/components/beer-product-gallery";
import {
  BeerProductInfo,
  type BeerProductInfoData,
} from "@/components/beer-product-info";
import { BusinessCtaSection } from "@/components/business-cta-section";
import { Testimonials } from "@/components/content/testimonials";
import { RelatedBeersSection } from "@/components/related-beers-section";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { type BeerData, getBeerBySlug, getBeerSlugs } from "@/lib/content";
import { buildPageMetadata, getBeerOgImage } from "@/lib/metadata";
import {
  getBeerBreadcrumbSchema,
  getBeerProductSchema,
} from "@/lib/structured-data";

interface BeerDetailPageProps {
  params: Promise<{ beerId: string }>;
}

export function generateStaticParams() {
  return getBeerSlugs().map((beerId) => ({ beerId }));
}

export async function generateMetadata({
  params,
}: BeerDetailPageProps): Promise<Metadata> {
  const { beerId } = await params;
  const result = await getBeerBySlug(beerId);
  if (!result) {
    return { title: "Cerveza no encontrada" };
  }
  const { beer } = result;
  return buildPageMetadata({
    path: `/cervezas/${beerId}`,
    title: beer.seo.title ?? beer.title,
    description: beer.seo.description,
    ogImage: getBeerOgImage(beerId, beer.seo.ogImage),
  });
}

function toProductInfoData(beer: BeerData): BeerProductInfoData {
  return {
    name: beer.title,
    description: beer.description,
    available: beer.available,
    volume: beer.volume,
    abv: beer.abv,
    ibu: beer.ibu,
    style: beer.style,
    packs: beer.packsByKey,
  };
}

export default async function BeerDetailPage({ params }: BeerDetailPageProps) {
  const { beerId } = await params;
  const result = await getBeerBySlug(beerId);
  if (!result) notFound();

  const { beer } = result;
  const productSchema = getBeerProductSchema(beer);
  const breadcrumbSchema = getBeerBreadcrumbSchema(beer);

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="py-6 lg:py-10 border-b">
        <div className="container mx-auto px-4">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Inicio</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/cervezas">Nuestras cervezas</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{beer.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <BeerProductGallery images={beer.images} beerName={beer.title} />
            </div>
            <div className="lg:sticky lg:top-24 lg:self-start">
              <BeerProductInfo
                beer={toProductInfoData(beer)}
                slug={beer.slug}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-8">
            Ingredientes
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-3">
                Maltas
              </h3>
              <p className="text-lg font-medium">
                {beer.ingredients.malts.join(", ")}
              </p>
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-3">
                Lúpulos
              </h3>
              <p className="text-lg font-medium">
                {beer.ingredients.hops.join(", ")}
              </p>
            </div>
            {beer.ingredients.yeast && (
              <div>
                <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-3">
                  Levadura
                </h3>
                <p className="text-lg font-medium">{beer.ingredients.yeast}</p>
              </div>
            )}
          </div>

          {beer.pairing.length > 0 && (
            <div className="mt-12 pt-12 border-t">
              <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
                Maridaje recomendado
              </h2>
              <div className="flex flex-wrap gap-2">
                {beer.pairing.map((item) => (
                  <Badge
                    key={item}
                    variant="secondary"
                    className="text-base px-4 py-1"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <RelatedBeersSection currentSlug={beer.slug} />

      {beer.testimonialIds.length > 0 && (
        <Testimonials
          ids={beer.testimonialIds}
          title="Lo que dicen nuestros clientes"
          highlight="clientes"
        />
      )}

      <BusinessCtaSection
        title="¿Quieres vender Jabato en tu bar o restaurante?"
        description="Lleva Jabato al parche de tus clientes. Escríbenos por WhatsApp para distribución y mayoristas."
      />
    </>
  );
}
