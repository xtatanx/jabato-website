import type { Metadata } from "next";
import { unstable_cache } from "next/cache";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BeerProductGallery } from "@/components/beer-product-gallery";
import { BeerProductInfo } from "@/components/beer-product-info";
import { BusinessCtaSection } from "@/components/business-cta-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getBeerBySlug } from "@/lib/payload";

function getCachedBeerBySlug(beerId: string) {
  return unstable_cache(() => getBeerBySlug(beerId), ["beer", beerId], {
    tags: ["beers", `beer-${beerId}`],
  })();
}

interface BeerDetailPageProps {
  params: Promise<{ beerId: string }>;
}

export async function generateMetadata({
  params,
}: BeerDetailPageProps): Promise<Metadata> {
  const { beerId } = await params;
  const beer = await getCachedBeerBySlug(beerId);

  if (!beer) {
    return {
      title: "Cerveza no encontrada",
    };
  }

  return {
    title: `${beer.name}`,
    description: beer.shortDescription,
  };
}

export default async function BeerDetailPage({ params }: BeerDetailPageProps) {
  const { beerId } = await params;
  const beer = await getCachedBeerBySlug(beerId);

  if (!beer) {
    notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <Breadcrumb className="mb-6">
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
                <BreadcrumbPage>{beer.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Product Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-8 lg:gap-16">
            {/* Product Gallery */}
            <BeerProductGallery
              thumbnails={beer.images.thumbnails}
              beerName={beer.name}
            />

            {/* Product Information */}
            <BeerProductInfo beer={beer} />
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="py-8 bg-primary text-primary-foreground overflow-hidden">
        <div className="animate-marquee">
          <div className="flex shrink-0">
            <span className="text-4xl font-bold whitespace-nowrap lg:text-6xl pr-8">
              #APulsoYFrentera · Cerveza Artesanal · Hecha en Colombia ·
              #APulsoYFrentera · Craft Your Life · La Máxima Calidad ·
              #APulsoYFrentera · Lotes Pequeños · Sabor Grande ·
              #APulsoYFrentera · Cerveza con Alma · Hechas a Mano
            </span>
          </div>
          <div className="flex shrink-0">
            <span className="text-4xl font-bold whitespace-nowrap lg:text-6xl pr-8">
              #APulsoYFrentera · Cerveza Artesanal · Hecha en Colombia ·
              #APulsoYFrentera · Craft Your Life · La Máxima Calidad ·
              #APulsoYFrentera · Lotes Pequeños · Sabor Grande ·
              #APulsoYFrentera · Cerveza con Alma · Hechas a Mano
            </span>
          </div>
        </div>
      </section>

      {/* Detailed Information */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Description */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  Experiencia {beer.name}
                </h2>
              </div>

              {beer.whyChoose && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">
                    ¿Por qué elegir {beer.name}?
                  </h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {beer.whyChoose}
                  </p>
                </div>
              )}

              {beer.servingAndStorage && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Servir y Conservar</h3>
                  <div className="text-sm space-y-2 text-muted-foreground whitespace-pre-line">
                    {beer.servingAndStorage}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Tasting Notes */}
            <div className="space-y-8">
              {/* Ingredients */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Ingredientes</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Maltas:</strong>{" "}
                    <span className="text-muted-foreground">
                      {beer.ingredients.malts.join(", ")}
                    </span>
                  </p>
                  <p>
                    <strong>Lúpulos:</strong>{" "}
                    <span className="text-muted-foreground">
                      {beer.ingredients.hops.join(", ")}
                    </span>
                  </p>
                  {beer.ingredients.yeast && (
                    <p>
                      <strong>Levadura:</strong>{" "}
                      <span className="text-muted-foreground">
                        {beer.ingredients.yeast}
                      </span>
                    </p>
                  )}
                </div>
              </div>

              {/* Pairing */}
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Maridaje Recomendado
                </h3>
                <div className="flex flex-wrap gap-2">
                  {beer.pairing.map((item) => (
                    <Badge key={item} variant="secondary">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection
        title={beer.testimonialsSectionTitle ?? undefined}
        testimonials={beer.testimonials}
      />

      {/* Business CTA Section */}
      <BusinessCtaSection />
    </>
  );
}
