import type { Metadata } from "next";
import { getAllBeers, getPage } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata";
import { getCervezasItemListSchema } from "@/lib/structured-data";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = await getPage("cervezas");
  return buildPageMetadata({
    path: "/cervezas",
    title: frontmatter.seo.title ?? frontmatter.title,
    description: frontmatter.seo.description,
    ogImage: frontmatter.seo.ogImage,
  });
}

export default async function CervezasPage() {
  const [{ Component }, beers] = await Promise.all([
    getPage("cervezas"),
    getAllBeers(),
  ]);
  const itemListSchema = getCervezasItemListSchema(beers);

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <Component />
    </>
  );
}
