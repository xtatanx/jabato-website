import { z } from "zod";

const SeoSchema = z.object({
  title: z.string().optional(),
  description: z.string(),
  ogImage: z.string().optional(),
});

export const PageFrontmatterSchema = z.object({
  title: z.string(),
  seo: SeoSchema,
});
export type PageFrontmatter = z.infer<typeof PageFrontmatterSchema>;

export const BeerImageSchema = z.object({
  src: z.string(),
  alt: z.string(),
});

export const BeerFrontmatterSchema = z.object({
  title: z.string(),
  style: z.string(),
  volume: z.string().default("330ml"),
  abv: z.number().min(0).max(20),
  ibu: z.number().min(0).max(120),
  pricePerBottle: z.number().positive(),
  packs: z.array(z.object({ units: z.number().int().positive() })).min(1),
  images: z.array(BeerImageSchema).min(1),
  ingredients: z.object({
    malts: z.array(z.string()),
    hops: z.array(z.string()),
    yeast: z.string().optional(),
  }),
  pairing: z.array(z.string()).default([]),
  testimonialIds: z.array(z.string()).default([]),
  available: z.boolean().default(true),
  seo: SeoSchema,
});
export type BeerFrontmatter = z.infer<typeof BeerFrontmatterSchema>;

export const PostCategorySchema = z.enum([
  "historias",
  "catas",
  "experiencias",
]);
export type PostCategory = z.infer<typeof PostCategorySchema>;

export const PostFrontmatterSchema = z.object({
  title: z.string(),
  category: PostCategorySchema,
  featured: z.boolean().default(false),
  excerpt: z.string(),
  publishedDate: z.iso.date(),
  featuredImage: z.object({ src: z.string(), alt: z.string() }),
  seo: SeoSchema,
});
export type PostFrontmatter = z.infer<typeof PostFrontmatterSchema>;

export const QuoteTypeSchema = z.enum([
  "general",
  "american amber ale",
  "west coast ipa",
  "belgian blond ale",
  "hard seltzer",
]);
export type QuoteType = z.infer<typeof QuoteTypeSchema>;

export const QuoteSchema = z.object({
  id: z.string(),
  type: QuoteTypeSchema,
  quote: z.string(),
  author: z.object({
    name: z.string(),
    position: z.string(),
    avatar: z.string().optional(),
  }),
});
export type Quote = z.infer<typeof QuoteSchema>;
