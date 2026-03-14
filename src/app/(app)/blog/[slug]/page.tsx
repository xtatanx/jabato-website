import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { BusinessCtaSection } from '@/components/business-cta-section';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { getPostBySlug, getPostsByCategory } from '@/lib/blog-data';
import LexicalRenderer from '@/components/lexical-renderer';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

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

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post no encontrado',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Get related posts (same category, excluding current post, limit 3)
  const allRelatedPosts = await getPostsByCategory(post.category, 1, 100);
  const relatedPosts = allRelatedPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      {/* Breadcrumbs */}
      <section className="pt-8 lg:pt-12 pb-6">
        <div className="container mx-auto px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Inicio</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/blog">Blog</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{post.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* Hero Image Section */}
      <section className="pb-8 lg:pb-12">
        <div className="container mx-auto px-4">
          <div className="relative aspect-video lg:aspect-[21/9] rounded-lg overflow-hidden mb-8 lg:mb-12">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Post Header */}
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Badge
                variant="default"
                className="bg-brand text-white border-transparent text-sm sm:text-base px-3 py-1"
              >
                {getCategoryLabel(post.category)}
              </Badge>
              <time
                dateTime={post.publishedDate}
                className="text-sm sm:text-base lg:text-lg text-secondary-foreground/80"
              >
                {formatDate(post.publishedDate)}
              </time>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-secondary-foreground mb-6 lg:mb-8 leading-tight">
              {post.title}
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-secondary-foreground/80 leading-relaxed mb-8 lg:mb-12">
              {post.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* Post Content Section */}
      <section className="pb-12 lg:pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <article className="prose prose-lg sm:prose-xl lg:prose-2xl prose-headings:font-extrabold prose-headings:text-secondary-foreground prose-p:text-secondary-foreground/80 prose-p:leading-relaxed prose-a:text-brand prose-a:no-underline hover:prose-a:underline prose-strong:text-secondary-foreground prose-ul:text-secondary-foreground/80 prose-ol:text-secondary-foreground/80">
              <LexicalRenderer
                data={post.content}
                enableProse={true}
                enableGutter={false}
              />
            </article>
          </div>
        </div>
      </section>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <section className="bg-primary py-12 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-8 lg:gap-12">
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground uppercase">
                  Posts <span className="text-brand">Relacionados</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="group flex flex-col gap-3"
                  >
                    <div className="aspect-square relative rounded overflow-hidden">
                      <Image
                        src={relatedPost.featuredImage}
                        alt={relatedPost.title}
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
                        {getCategoryLabel(relatedPost.category)}
                      </Badge>
                      <time
                        dateTime={relatedPost.publishedDate}
                        className="text-sm sm:text-md text-brand"
                      >
                        {formatDate(relatedPost.publishedDate)}
                      </time>
                    </div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-primary-foreground group-hover:text-brand transition-colors duration-200">
                      {relatedPost.title}
                    </h3>
                    <p className="text-base sm:text-lg text-primary-foreground/80 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </Link>
                ))}
              </div>

              <div className="text-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-lg sm:text-xl font-semibold text-brand hover:text-brand/80 transition-colors duration-200 group"
                >
                  Ver todos los posts
                  <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Business CTA Section */}
      <BusinessCtaSection />
    </>
  );
}
