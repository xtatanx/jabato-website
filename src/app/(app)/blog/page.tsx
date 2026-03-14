import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { createLoader, parseAsInteger, parseAsString } from 'nuqs/server';
import { BlogCategoryFilter } from '@/components/blog-category-filter';
import { BusinessCtaSection } from '@/components/business-cta-section';
import LexicalRenderer from '@/components/lexical-renderer';
import { Badge } from '@/components/ui/badge';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  getFeaturedPost,
  getPostsByCategory,
  getTotalPages,
} from '@/lib/blog-data';
import { getBlogPage } from '@/lib/pages-data';
import { getMediaUrl, isMediaPopulated } from '@/lib/media';

export const metadata: Metadata = {
  title: 'Nuestro Blog',
  description:
    'Descubre historias, catas y experiencias sobre cerveza artesanal Jabato.',
};

const BLOG_PAGE_TITLE = 'Nuestro Blog';
const DEFAULT_HERO_IMAGE = '/personas-tomando-jabato-amber-ale.png';
const DEFAULT_HERO_ALT = 'Personas tomando Jabato Amber Ale';
const DEFAULT_POSTS_PER_PAGE = 6;

const loadBlogSearchParams = createLoader({
  category: parseAsString.withDefault('todas'),
  page: parseAsInteger.withDefault(1),
});

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    historias: 'Historias',
    catas: 'Catas',
    experiencias: 'Experiencias',
  };
  return labels[category] || category;
}

function buildPaginationHref(
  category: string,
  page: number,
  totalPages: number,
  direction: 'prev' | 'next'
): string {
  if (direction === 'prev' && page <= 1) return '#';
  if (direction === 'next' && page >= totalPages) return '#';
  const targetPage = direction === 'prev' ? page - 1 : page + 1;
  const params = new URLSearchParams();
  if (category !== 'todas') params.set('category', category);
  params.set('page', String(targetPage));
  return `/blog?${params.toString()}`;
}

interface BlogPageProps {
  searchParams: Promise<{
    category?: string;
    page?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category, page } = await loadBlogSearchParams(searchParams);

  const block = await getBlogPage(BLOG_PAGE_TITLE);
  const postsPerPage =
    block?.postsPerPage ?? DEFAULT_POSTS_PER_PAGE;
  const showFeaturedPost = block?.showFeaturedPost ?? true;
  const showCategoryFilter = block?.showCategoryFilter ?? true;
  const showBusinessCta = block?.showBusinessCta ?? true;

  const featuredPost = showFeaturedPost ? await getFeaturedPost() : null;
  const posts = await getPostsByCategory(
    category === 'todas' ? null : category,
    page,
    postsPerPage
  );
  const totalPages = await getTotalPages(
    category === 'todas' ? null : category,
    postsPerPage
  );

  const heroImage = block?.hero?.heroImage;
  const populatedHeroImage =
    heroImage && isMediaPopulated(heroImage) ? heroImage : null;
  const heroImageUrl = populatedHeroImage ? getMediaUrl(populatedHeroImage) : null;
  const heroImageSrc = heroImageUrl ?? DEFAULT_HERO_IMAGE;
  const heroImageAlt =
    (populatedHeroImage && typeof populatedHeroImage === 'object' && 'alt' in populatedHeroImage
      ? (populatedHeroImage as { alt?: string }).alt
      : null) ?? DEFAULT_HERO_ALT;

  return (
    <>
      <section className="relative grid items-center gap-8 mb-12 min-h-[400px] lg:aspect-video lg:gap-12 lg:mb-20 lg:max-h-[400px] lg:w-full">
        <Image
          src={heroImageSrc}
          className="object-cover z-0"
          alt={heroImageAlt}
          fill
          priority
        />
        <div className="absolute inset-0 bg-black/30 z-0" />

        <div className="container mx-auto grid-area-1 relative z-10 px-4 text-center">
          {block?.hero?.title ? (
            <LexicalRenderer
              data={block.hero.title}
              className="text-4xl font-extrabold uppercase text-shadow-xs text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl"
              enableGutter={false}
              enableProse={false}
            />
          ) : (
            <h1 className="text-4xl font-extrabold uppercase text-shadow-xs text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Nuestro <span className="text-brand">Blog</span>
            </h1>
          )}
        </div>
      </section>

      {(block?.introSection?.text ?? true) && (
        <section className="pb-12 lg:pb-20">
          <div className="container mx-auto">
            {block?.introSection?.text ? (
              <LexicalRenderer
                data={block.introSection.text}
                className="text-center text-lg mb-6 sm:text-xl lg:mb-8 sm:max-w-1/2 mx-auto text-secondary-foreground"
                enableGutter={false}
                enableProse={false}
              />
            ) : (
              <p className="text-center text-lg mb-6 sm:text-xl lg:mb-8 sm:max-w-1/2 mx-auto">
                Explora nuestras historias, catas y experiencias sobre cerveza
                artesanal. Descubre consejos, guías y relatos de nuestra pasión
                por la cerveza #APulsoYFrentera.
              </p>
            )}
          </div>
        </section>
      )}

      {showFeaturedPost && featuredPost && (
        <section className="bg-primary py-12 lg:py-20">
          <div className="container mx-auto px-4">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group block w-full"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-8 lg:gap-16">
                <div className="relative aspect-video lg:aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src={featuredPost.featuredImage}
                    alt={featuredPost.title}
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
                      {formatDate(featuredPost.publishedDate)}
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

      {showCategoryFilter && (
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-8 items-center">
              {block?.categorySection?.title ? (
                <LexicalRenderer
                  data={block.categorySection.title}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-secondary-foreground text-center uppercase"
                  enableGutter={false}
                  enableProse={false}
                />
              ) : (
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-secondary-foreground text-center uppercase">
                  Explora por <span className="text-brand">Categoría</span>
                </h2>
              )}
              <BlogCategoryFilter />
            </div>
          </div>
        </section>
      )}

      <section className="pb-12 lg:pb-20">
        <div className="container mx-auto px-4">
          {posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col gap-3"
                  >
                    <div className="aspect-square relative rounded overflow-hidden">
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
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
                        {formatDate(post.publishedDate)}
                      </time>
                    </div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-secondary-foreground group-hover:text-brand transition-colors duration-200">
                      {post.title}
                    </h3>
                    <span className="sr-only">
                      {post.title} - {getCategoryLabel(post.category)}
                    </span>
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
                          href={buildPaginationHref(category, page, totalPages, 'prev')}
                          aria-disabled={page === 1}
                          tabIndex={page === 1 ? -1 : undefined}
                          className={
                            page === 1 ? 'pointer-events-none opacity-50' : ''
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
                          href={buildPaginationHref(category, page, totalPages, 'next')}
                          aria-disabled={page === totalPages}
                          tabIndex={page === totalPages ? -1 : undefined}
                          className={
                            page === totalPages
                              ? 'pointer-events-none opacity-50'
                              : ''
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

      {showBusinessCta && <BusinessCtaSection />}
    </>
  );
}
