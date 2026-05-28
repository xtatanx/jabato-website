import type { Metadata } from "next";
import { getPage } from "@/lib/content";
import {
  getHistoriaPageSchema,
  getOrganizationSchema,
} from "@/lib/structured-data";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = await getPage("historia");
  return {
    title: frontmatter.seo.title ?? frontmatter.title,
    description: frontmatter.seo.description,
    openGraph: frontmatter.seo.ogImage
      ? { images: [{ url: frontmatter.seo.ogImage }] }
      : undefined,
  };
}

export default async function HistoriaPage() {
  const { Component } = await getPage("historia");
  const organizationSchema = getOrganizationSchema();
  const pageSchema = getHistoriaPageSchema();

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
