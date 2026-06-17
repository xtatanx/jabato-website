import type { Metadata } from "next";
import { B2BLandingPage } from "@/components/b2b-landing/b2b-landing-page";
import { getAllBeers, getPage } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = await getPage("distribucion");
  return buildPageMetadata({
    path: "/distribucion",
    title: frontmatter.seo.title ?? frontmatter.title,
    description: frontmatter.seo.description,
    noIndex: true,
  });
}

export default async function DistribucionPage() {
  const beers = await getAllBeers();

  return <B2BLandingPage beers={beers} />;
}
