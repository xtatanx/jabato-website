import { site } from "@content/site";
import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";

export const SITE_NAME = "Jabato Cervecería";
export const HOME_TITLE = "Cerveza Artesanal";
export const DEFAULT_SITE_TITLE = `${HOME_TITLE} | ${SITE_NAME}`;

export function formatPageTitle(segmentTitle: string): string {
  return `${segmentTitle} | ${SITE_NAME}`;
}

export interface PageMetadataInput {
  path: string;
  title: string;
  description: string;
  ogImage?: string;
  noIndex?: boolean;
  useLayoutDefaultTitle?: boolean;
}

export function getBeerOgImage(slug: string, ogImage?: string): string {
  return ogImage ?? `/jabato-${slug}-botella-330ml.jpg`;
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
  useLayoutDefaultTitle,
}: PageMetadataInput): Metadata {
  const canonical = toAbsoluteUrl(path);
  const imageUrl = toAbsoluteUrl(ogImage ?? site.defaultOgImage);
  const fullTitle = formatPageTitle(title);

  return {
    ...(useLayoutDefaultTitle ? {} : { title }),
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "es_CO",
      type: "website",
      images: [
        {
          url: imageUrl,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    robots: getRobots(noIndex),
  };
}
