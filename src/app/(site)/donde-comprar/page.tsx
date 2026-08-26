import type { Metadata } from "next";
import { SWRConfig } from "swr";
import { BeerFinder } from "@/components/donde-comprar/beer-finder";
import {
  getBeers,
  getLocations,
  locationsKey,
  parseLocationParamsFromSearchParams,
} from "@/lib/jabato-api";
import { buildPageMetadata } from "@/lib/metadata";
import { getDondeComprarItemListSchema } from "@/lib/structured-data";

const PAGE_DESCRIPTION =
  "Encuentra bares y restaurantes en Bogotá y alrededores donde puedes disfrutar cerveza artesanal Jabato. Filtra por estilo, presentación o barrio.";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: "/donde-comprar",
    title: "Dónde comprar",
    description: PAGE_DESCRIPTION,
  });
}

interface DondeComprarPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function DondeComprarPage({
  searchParams,
}: DondeComprarPageProps) {
  const sp = await searchParams;
  const params = parseLocationParamsFromSearchParams(sp);

  const [locations, allLocations, beers] = await Promise.all([
    getLocations(params),
    getLocations({}),
    getBeers(),
  ]);

  const styles = [...new Set(beers.map((b) => b.style))].sort((a, b) =>
    a.localeCompare(b, "es"),
  );
  const neighborhoods = [
    ...new Set(allLocations.map((l) => l.location.neighborhood)),
  ].sort((a, b) => a.localeCompare(b, "es"));

  const itemListSchema = getDondeComprarItemListSchema(locations);
  const fallback = { [locationsKey(params)]: locations };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <SWRConfig value={{ fallback }}>
        <BeerFinder
          styles={styles}
          neighborhoods={neighborhoods}
          totalCount={allLocations.length}
        />
      </SWRConfig>
    </>
  );
}
