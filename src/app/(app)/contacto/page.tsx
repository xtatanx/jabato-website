import type { Metadata } from "next";
import { getPage } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata";
import {
  getContactPageSchema,
  getOrganizationSchema,
} from "@/lib/structured-data";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = await getPage("contacto");
  return buildPageMetadata({
    path: "/contacto",
    title: frontmatter.seo.title ?? frontmatter.title,
    description: frontmatter.seo.description,
    ogImage: frontmatter.seo.ogImage,
  });
}

export default async function ContactoPage() {
  const { frontmatter, Component } = await getPage("contacto");
  const organizationSchema = getOrganizationSchema();
  const pageSchema = getContactPageSchema(frontmatter.seo.description);

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
