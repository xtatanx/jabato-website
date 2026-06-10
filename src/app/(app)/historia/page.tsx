import type { Metadata } from "next";
import { getPage } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata";
import {
  getHistoriaPageSchema,
  getOrganizationSchema,
} from "@/lib/structured-data";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = await getPage("historia");
  return buildPageMetadata({
    path: "/historia",
    title: frontmatter.seo.title ?? frontmatter.title,
    description: frontmatter.seo.description,
    ogImage: frontmatter.seo.ogImage,
  });
}

export default async function HistoriaPage() {
  const { frontmatter, Component } = await getPage("historia");
  const organizationSchema = getOrganizationSchema();
  const pageSchema = getHistoriaPageSchema(frontmatter.seo.description);

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <Component />
    </>
  );
}
