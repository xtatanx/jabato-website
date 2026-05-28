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
  return {
    title: beer.seo.title ?? beer.title,
    description: beer.seo.description,
    openGraph: beer.seo.ogImage
      ? { images: [{ url: beer.seo.ogImage }] }
      : undefined,
  };
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

  const { Component, beer } = result;
  const galleryThumbnails = beer.images.map((img) => img.src);

  return (
    <>
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4">
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
                <BreadcrumbPage>{beer.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-8 lg:gap-16">
            <BeerProductGallery
              thumbnails={galleryThumbnails}
              beerName={beer.title}
            />
            <BeerProductInfo beer={toProductInfoData(beer)} />
          </div>
        </div>
      </section>

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

      <article className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="prose prose-lg max-w-3xl mx-auto dark:prose-invert">
            <h2 className="text-3xl font-bold mb-6">
              Experiencia {beer.title}
            </h2>
            <Component />
          </div>
        </div>
      </article>

      <section className="pb-12 lg:pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
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

            {beer.pairing.length > 0 && (
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
            )}
          </div>
        </div>
      </section>

      {beer.testimonialIds.length > 0 && (
        <Testimonials
          ids={beer.testimonialIds}
          title="Lo que dicen nuestros bebedores"
          highlight="bebedores"
        />
      )}

      <BusinessCtaSection />
    </>
  );
}
