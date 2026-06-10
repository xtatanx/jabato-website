import type { Metadata } from "next";
import { getPage } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = await getPage("politica-de-privacidad");
  return buildPageMetadata({
    path: "/politica-de-privacidad",
    title: frontmatter.seo.title ?? frontmatter.title,
    description: frontmatter.seo.description,
    ogImage: frontmatter.seo.ogImage,
  });
}

export default async function PoliticaDePrivacidadPage() {
  const { Component } = await getPage("politica-de-privacidad");
  return <Component />;
}
