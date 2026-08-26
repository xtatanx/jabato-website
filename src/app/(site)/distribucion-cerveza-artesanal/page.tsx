import { b2bFaqItems } from "@content/data/b2b-faq";
import type { Metadata } from "next";
import { B2BLandingPage } from "@/components/b2b-landing/b2b-landing-page";
import { getAllBeers, getPage } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata";
import {
  getDistribucionBreadcrumbSchema,
  getDistribucionFaqSchema,
  getDistribucionServiceSchema,
} from "@/lib/structured-data";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = await getPage("distribucion-cerveza-artesanal");
  return buildPageMetadata({
    path: "/distribucion-cerveza-artesanal",
    title: frontmatter.seo.title ?? frontmatter.title,
    description: frontmatter.seo.description,
  });
}

export default async function DistribucionCervezaArtesanalPage() {
  const beers = await getAllBeers();
  const serviceSchema = getDistribucionServiceSchema();
  const faqSchema = getDistribucionFaqSchema(b2bFaqItems);
  const breadcrumbSchema = getDistribucionBreadcrumbSchema();

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <B2BLandingPage beers={beers} />
    </>
  );
}
