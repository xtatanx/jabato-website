import type { Metadata } from "next";
import { getPage } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = await getPage("home");
  return {
    title: frontmatter.seo.title ?? frontmatter.title,
    description: frontmatter.seo.description,
    openGraph: frontmatter.seo.ogImage
      ? { images: [{ url: frontmatter.seo.ogImage }] }
      : undefined,
  };
}

export default async function HomePage() {
  const { Component } = await getPage("home");
  return <Component />;
}
