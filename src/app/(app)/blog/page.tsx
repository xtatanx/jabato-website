import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { createLoader, parseAsInteger, parseAsString } from "nuqs/server";
import { BlogCategoryFilter } from "@/components/blog-category-filter";
import { BusinessCtaSection } from "@/components/business-cta-section";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  getFeaturedPost,
  getPage,
  getPostsByCategory,
  getTotalPages,
} from "@/lib/content";
import { PostCategorySchema } from "@/lib/content/schemas";
import { formatPostDate, getCategoryLabel } from "@/lib/post-format";

const POSTS_PER_PAGE = 6;

const loadBlogSearchParams = createLoader({
  category: parseAsString.withDefault("todas"),
  page: parseAsInteger.withDefault(1),
});

function parseCategory(value: string) {
  if (value === "todas") return null;
  const parsed = PostCategorySchema.safeParse(value);
  return parsed.success ? parsed.data : null;
}

function buildPaginationHref(
  category: string,
  page: number,
  totalPages: number,
  direction: "prev" | "next",
): string {
  if (direction === "prev" && page <= 1) return "#";
  if (direction === "next" && page >= totalPages) return "#";
  const targetPage = direction === "prev" ? page - 1 : page + 1;
  const params = new URLSearchParams();
  if (category !== "todas") params.set("category", category);
  params.set("page", String(targetPage));
  return `/blog?${params.toString()}`;
}

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = await getPage("blog");
  return {
    title: frontmatter.seo.title ?? frontmatter.title,
    description: frontmatter.seo.description,
    openGraph: frontmatter.seo.ogImage
      ? { images: [{ url: frontmatter.seo.ogImage }] }
      : undefined,
  };
}

interface BlogPageProps {
  searchParams: Promise<{
    category?: string;
    page?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category: categoryParam, page } =
    await loadBlogSearchParams(searchParams);
  const category = parseCategory(categoryParam);

  const { Component } = await getPage("blog");
  const featuredPost = await getFeaturedPost();
  const posts = await getPostsByCategory(category, page, POSTS_PER_PAGE);
  const totalPages = await getTotalPages(category, POSTS_PER_PAGE);

  return (
    <>
      <Component />

      {featuredPost && (
        <section className="bg-primary py-12 lg:py-20">
          <div className="container mx-auto px-4">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group block w-full"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-8 lg:gap-16">
                <div className="relative aspect-video lg:aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src={featuredPost.featuredImage.src}
                    alt={featuredPost.featuredImage.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                </div>
                <div className="flex flex-col justify-center gap-6 lg:gap-8">
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="default"
                      className="bg-brand text-white border-transparent text-sm sm:text-base px-3 py-1"
                    >
                      {getCategoryLabel(featuredPost.category)}
                    </Badge>
                    <time
                      dateTime={featuredPost.publishedDate}
                      className="text-sm sm:text-base lg:text-lg text-primary-foreground/90"
                    >
                      {formatPostDate(featuredPost.publishedDate)}
                    </time>
                  </div>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground group-hover:text-brand transition-colors duration-200 leading-tight">
                    {featuredPost.title}
                  </h3>
                  <p className="text-lg sm:text-xl lg:text-2xl text-primary-foreground/90 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 text-lg sm:text-xl lg:text-2xl font-semibold text-brand group-hover:text-brand/80 transition-colors duration-200">
                    Leer más
                    <svg
                      className="w-5 h-5 lg:w-6 lg:h-6 transition-transform duration-200 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <title>Leer más</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-8 items-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-secondary-foreground text-center uppercase">
              Explora por <span className="text-brand">Categoría</span>
            </h2>
            <BlogCategoryFilter />
          </div>
        </div>
      </section>

      <section className="pb-12 lg:pb-20">
        <div className="container mx-auto px-4">
          {posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col gap-3"
                  >
                    <div className="aspect-square relative rounded overflow-hidden">
                      <Image
                        src={post.featuredImage.src}
                        alt={post.featuredImage.alt}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="outline"
                        className="border-brand text-brand"
                      >
                        {getCategoryLabel(post.category)}
                      </Badge>
                      <time
                        dateTime={post.publishedDate}
                        className="text-sm sm:text-md text-brand"
                      >
                        {formatPostDate(post.publishedDate)}
                      </time>
                    </div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-secondary-foreground group-hover:text-brand transition-colors duration-200">
                      {post.title}
                    </h3>
                    <p className="text-base sm:text-lg text-secondary-foreground/80 line-clamp-2">
                      {post.excerpt}
                    </p>
                  </Link>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href={buildPaginationHref(
                            categoryParam,
                            page,
                            totalPages,
                            "prev",
                          )}
                          aria-disabled={page === 1}
                          tabIndex={page === 1 ? -1 : undefined}
                          className={
                            page === 1 ? "pointer-events-none opacity-50" : ""
                          }
                        />
                      </PaginationItem>
                      <PaginationItem>
                        <span className="px-4 py-2 text-sm">
                          Página {page} de {totalPages}
                        </span>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext
                          href={buildPaginationHref(
                            categoryParam,
                            page,
                            totalPages,
                            "next",
                          )}
                          aria-disabled={page === totalPages}
                          tabIndex={page === totalPages ? -1 : undefined}
                          className={
                            page === totalPages
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg sm:text-xl text-secondary-foreground/80">
                No se encontraron publicaciones en esta categoría.
              </p>
            </div>
          )}
        </div>
      </section>

      <BusinessCtaSection />
    </>
  );
}
