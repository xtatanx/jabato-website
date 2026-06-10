import { site } from "@content/site";
import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";

export interface PageMetadataInput {
  path: string;
  title: string;
  description: string;
  ogImage?: string;
  noIndex?: boolean;
}

function toAbsoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, getSiteUrl()).toString();
}

function getRobots(noIndex?: boolean): Metadata["robots"] {
  if (noIndex || process.env.VERCEL_ENV === "preview") {
    return { index: false, follow: false };
  }
  return { index: true, follow: true };
}

export function buildPageMetadata({
  path,
  title,
  description,
  ogImage,
  noIndex,
}: PageMetadataInput): Metadata {
  const canonical = toAbsoluteUrl(path);
  const imageUrl = toAbsoluteUrl(ogImage ?? site.defaultOgImage);

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Jabato Cervecería",
      locale: "es_CO",
      type: "website",
      images: [
        {
          url: imageUrl,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: getRobots(noIndex),
  };
}
