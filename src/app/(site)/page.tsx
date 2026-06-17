import type { Metadata } from "next";
import { getPage } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = await getPage("home");
  return buildPageMetadata({
    path: "/",
    title: frontmatter.seo.title ?? frontmatter.title,
    description: frontmatter.seo.description,
    ogImage: frontmatter.seo.ogImage,
    useLayoutDefaultTitle: true,
  });
}

export default async function HomePage() {
  const { Component } = await getPage("home");

  return <Component />;
}
