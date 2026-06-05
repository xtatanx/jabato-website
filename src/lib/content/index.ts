import { readdirSync } from "node:fs";
import path from "node:path";
import { quotes as allQuotes } from "@content/data/quotes";
import type { ComponentType } from "react";
import {
  type BeerFrontmatter,
  BeerFrontmatterSchema,
  type PageFrontmatter,
  PageFrontmatterSchema,
  type PostCategory,
  type PostFrontmatter,
  PostFrontmatterSchema,
  type Quote,
} from "./schemas";

const CONTENT_DIR = path.join(process.cwd(), "content");

function listSlugs(subdir: string): string[] {
  try {
    return readdirSync(path.join(CONTENT_DIR, subdir))
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => f.replace(/\.mdx$/, ""))
      .sort();
  } catch {
    return [];
  }
}

type LoadedMdx<F> = {
  Component: ComponentType;
  frontmatter: F;
};

export async function getPage(
  slug: string,
): Promise<LoadedMdx<PageFrontmatter>> {
  const mod = await import(`../../../content/pages/${slug}.mdx`);
  const frontmatter = PageFrontmatterSchema.parse(mod.frontmatter);
  return { Component: mod.default, frontmatter };
}

export type PackKey = "6-bottles" | "12-bottles" | "24-bottles";

export type BeerData = BeerFrontmatter & {
  slug: string;
  packsByKey: Record<PackKey, { price: number; unitPrice: number }>;
};

const PACK_KEY_BY_UNITS: Record<number, PackKey> = {
  6: "6-bottles",
  12: "12-bottles",
  24: "24-bottles",
};

function buildPacksByKey(
  pricePerBottle: number,
  packs: BeerFrontmatter["packs"],
): BeerData["packsByKey"] {
  const result: BeerData["packsByKey"] = {
    "6-bottles": { price: pricePerBottle * 6, unitPrice: pricePerBottle },
    "12-bottles": { price: pricePerBottle * 12, unitPrice: pricePerBottle },
    "24-bottles": { price: pricePerBottle * 24, unitPrice: pricePerBottle },
  };
  for (const pack of packs) {
    const key = PACK_KEY_BY_UNITS[pack.units];
    if (key) {
      result[key] = {
        price: pricePerBottle * pack.units,
        unitPrice: pricePerBottle,
      };
    }
  }
  return result;
}

function toBeerData(slug: string, fm: BeerFrontmatter): BeerData {
  return {
    ...fm,
    slug,
    packsByKey: buildPacksByKey(fm.pricePerBottle, fm.packs),
  };
}

export function getBeerSlugs(): string[] {
  return listSlugs("beers");
}

export async function getBeerBySlug(slug: string): Promise<
  | (LoadedMdx<BeerFrontmatter> & {
      beer: BeerData;
    })
  | null
> {
  try {
    const mod = await import(`../../../content/beers/${slug}.mdx`);
    const frontmatter = BeerFrontmatterSchema.parse(mod.frontmatter);
    return {
      Component: mod.default,
      frontmatter,
      beer: toBeerData(slug, frontmatter),
    };
  } catch {
    return null;
  }
}

export async function getAllBeers(): Promise<BeerData[]> {
  const slugs = getBeerSlugs();
  const beers = await Promise.all(
    slugs.map(async (slug) => {
      const mod = await import(`../../../content/beers/${slug}.mdx`);
      const frontmatter = BeerFrontmatterSchema.parse(mod.frontmatter);
      return toBeerData(slug, frontmatter);
    }),
  );
  return beers.sort((a, b) => a.title.localeCompare(b.title));
}

export type PostMeta = PostFrontmatter & { slug: string };

export function getPostSlugs(): string[] {
  return listSlugs("posts");
}

async function loadPostMeta(slug: string): Promise<PostMeta> {
  const mod = await import(`../../../content/posts/${slug}.mdx`);
  const frontmatter = PostFrontmatterSchema.parse(mod.frontmatter);
  return { ...frontmatter, slug };
}

export async function getPostBySlug(slug: string): Promise<
  | (LoadedMdx<PostFrontmatter> & {
      post: PostMeta;
    })
  | null
> {
  try {
    const mod = await import(`../../../content/posts/${slug}.mdx`);
    const frontmatter = PostFrontmatterSchema.parse(mod.frontmatter);
    return {
      Component: mod.default,
      frontmatter,
      post: { ...frontmatter, slug },
    };
  } catch {
    return null;
  }
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const slugs = getPostSlugs();
  const posts = await Promise.all(slugs.map(loadPostMeta));
  return posts.sort((a, b) => b.publishedDate.localeCompare(a.publishedDate));
}

export async function getFeaturedPost(): Promise<PostMeta | null> {
  const all = await getAllPosts();
  return all.find((p) => p.featured) ?? null;
}

export async function getRecentPosts(limit = 4): Promise<PostMeta[]> {
  const all = await getAllPosts();
  return all.slice(0, limit);
}

function filterForGrid(
  posts: PostMeta[],
  category: PostCategory | null,
): PostMeta[] {
  return posts
    .filter((p) => !p.featured)
    .filter((p) => (category ? p.category === category : true));
}

export async function getPostsByCategory(
  category: PostCategory | null,
  page = 1,
  perPage = 6,
): Promise<PostMeta[]> {
  const all = await getAllPosts();
  const filtered = filterForGrid(all, category);
  const start = (page - 1) * perPage;
  return filtered.slice(start, start + perPage);
}

export async function getTotalPages(
  category: PostCategory | null,
  perPage = 6,
): Promise<number> {
  const all = await getAllPosts();
  const filtered = filterForGrid(all, category);
  return Math.max(1, Math.ceil(filtered.length / perPage));
}

export async function getRelatedPosts(
  category: PostCategory,
  excludeSlug: string,
  limit = 3,
): Promise<PostMeta[]> {
  const all = await getAllPosts();
  return all
    .filter((p) => p.category === category && p.slug !== excludeSlug)
    .slice(0, limit);
}

export function getQuotesByIds(ids: readonly string[]): Quote[] {
  return ids
    .map((id) => allQuotes.find((q) => q.id === id))
    .filter((q): q is Quote => q !== undefined);
}

export function getAllQuotes(): readonly Quote[] {
  return allQuotes;
}
