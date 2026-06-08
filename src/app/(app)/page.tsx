import type { Metadata } from "next";
import { getPage } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata";
import {
  getOrganizationSchema,
  getWebSiteSchema,
} from "@/lib/structured-data";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = await getPage("home");
  return buildPageMetadata({
    path: "/",
    title: frontmatter.seo.title ?? frontmatter.title,
    description: frontmatter.seo.description,
    ogImage: frontmatter.seo.ogImage,
  });
}

export default async function HomePage() {
  const { Component } = await getPage("home");
  const websiteSchema = getWebSiteSchema();
  const organizationSchema = getOrganizationSchema();

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <Component />
    </>
  );
}
