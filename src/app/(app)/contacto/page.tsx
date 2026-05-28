import type { Metadata } from "next";
import ContactForm from "@/components/contact-form";
import { getPage } from "@/lib/content";
import {
  getContactPageSchema,
  getOrganizationSchema,
} from "@/lib/structured-data";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = await getPage("contacto");
  return {
    title: frontmatter.seo.title ?? frontmatter.title,
    description: frontmatter.seo.description,
    openGraph: frontmatter.seo.ogImage
      ? { images: [{ url: frontmatter.seo.ogImage }] }
      : undefined,
  };
}

export default async function ContactoPage() {
  const { Component } = await getPage("contacto");
  const organizationSchema = getOrganizationSchema();
  const pageSchema = getContactPageSchema();

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

      <section className="bg-primary py-12 lg:py-20">
        <div className="container mx-auto px-4 max-w-xl">
          <div className="bg-card p-10 rounded-lg">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
