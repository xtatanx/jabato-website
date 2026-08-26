import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AddressLine,
  BeerStyleBadges,
  PresentationBadges,
} from "@/components/donde-comprar/finder-parts";
import { StoreMapLazy } from "@/components/donde-comprar/store-map-lazy";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  buildLocationSlug,
  directionsUrl,
  getLocationById,
  getLocations,
  parseLocationId,
} from "@/lib/jabato-api";
import { buildPageMetadata } from "@/lib/metadata";
import {
  getLocationBreadcrumbSchema,
  getLocationBusinessSchema,
} from "@/lib/structured-data";

export const dynamicParams = true;
export const revalidate = 3600;

interface LocationDetailPageProps {
  params: Promise<{ locationId: string }>;
}

export async function generateStaticParams() {
  const locations = await getLocations({});
  return locations.map((loc) => ({
    locationId: buildLocationSlug(loc.id, loc.name),
  }));
}

export async function generateMetadata({
  params,
}: LocationDetailPageProps): Promise<Metadata> {
  const { locationId } = await params;
  const loc = await getLocationById(parseLocationId(locationId));
  if (!loc) {
    return { title: "Punto no encontrado" };
  }
  return buildPageMetadata({
    path: `/donde-comprar/${locationId}`,
    title: `${loc.name} — Dónde comprar`,
    description: `Encuentra ${loc.name} en ${loc.location.neighborhood}, ${loc.location.city}. Cerveza artesanal Jabato disponible en botella, lata o barril.`,
  });
}

export default async function LocationDetailPage({
  params,
}: LocationDetailPageProps) {
  const { locationId } = await params;
  const loc = await getLocationById(parseLocationId(locationId));
  if (!loc) notFound();

  const businessSchema = getLocationBusinessSchema(loc);
  const breadcrumbSchema = getLocationBreadcrumbSchema(loc);

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="border-b py-6 lg:py-10">
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
                  <Link href="/donde-comprar">Dónde comprar</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{loc.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h1 className="font-heading text-3xl uppercase sm:text-4xl">
                {loc.name}
              </h1>
              <div className="mt-3">
                <AddressLine loc={loc} />
              </div>
              {loc.description && (
                <p className="mt-3 text-muted-foreground">{loc.description}</p>
              )}
              <div className="mt-4 space-y-2">
                <BeerStyleBadges loc={loc} />
                <PresentationBadges loc={loc} />
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <a
                    href={directionsUrl(loc)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Cómo llegar
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/donde-comprar">Volver al mapa</Link>
                </Button>
              </div>
            </div>
            <div className="h-[50vh] overflow-hidden rounded-xl border lg:h-[400px]">
              <StoreMapLazy locations={[loc]} singlePin />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
