import type { MetadataRoute } from "next";
import { getBeerSlugs } from "@/lib/content";
import { getSiteUrl } from "@/lib/site-url";

const STATIC_ROUTES = [
  { path: "", priority: 1 },
  { path: "/cervezas", priority: 0.8 },
  { path: "/historia", priority: 0.8 },
  { path: "/contacto", priority: 0.8 },
  { path: "/politica-de-privacidad", priority: 0.3 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(
    ({ path, priority }) => ({
      url: `${baseUrl}${path}`,
      lastModified,
      changeFrequency: "weekly",
      priority,
    }),
  );

  const beerEntries: MetadataRoute.Sitemap = getBeerSlugs().map((slug) => ({
    url: `${baseUrl}/cervezas/${slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticEntries, ...beerEntries];
}
