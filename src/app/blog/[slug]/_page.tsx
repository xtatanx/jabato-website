import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BusinessCtaSection } from "@/components/business-cta-section";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getPostBySlug, getPostSlugs, getRelatedPosts } from "@/lib/content";
import { formatPostDate, getCategoryLabel } from "@/lib/post-format";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getPostBySlug(slug);
  if (!result) return { title: "Post no encontrado" };
  const { post } = result;
  return {
    title: post.seo.title ?? post.title,
    description: post.seo.description ?? post.excerpt,
    openGraph: post.seo.ogImage
      ? { images: [{ url: post.seo.ogImage }] }
      : {
          images: [
            { url: post.featuredImage.src, alt: post.featuredImage.alt },
          ],
        },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const result = await getPostBySlug(slug);
  if (!result) notFound();

  const { Component, post } = result;
  const relatedPosts = await getRelatedPosts(post.category, post.slug, 3);

  return (
    <>
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

      <section className="pb-8 lg:pb-12">
        <div className="container mx-auto px-4">
          <div className="relative aspect-video lg:aspect-[21/9] rounded-lg overflow-hidden mb-8 lg:mb-12">
            <Image
              src={post.featuredImage.src}
              alt={post.featuredImage.alt}
              fill
              loading="lazy"
              className="object-cover"
            />
          </div>

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
                {formatPostDate(post.publishedDate)}
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

      <section className="pb-12 lg:pb-20">
        <div className="container mx-auto px-4">
          <article className="prose prose-lg sm:prose-xl lg:prose-2xl mx-auto prose-headings:font-heading prose-headings:font-extrabold prose-headings:text-secondary-foreground prose-p:text-secondary-foreground/80 prose-p:leading-relaxed prose-a:text-brand prose-a:no-underline hover:prose-a:underline prose-strong:text-secondary-foreground prose-ul:text-secondary-foreground/80 prose-ol:text-secondary-foreground/80">
            <Component />
          </article>
        </div>
      </section>

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
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="group flex flex-col gap-3"
                  >
                    <div className="aspect-square relative rounded overflow-hidden">
                      <Image
                        src={relatedPost.featuredImage.src}
                        alt={relatedPost.featuredImage.alt}
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
                        {formatPostDate(relatedPost.publishedDate)}
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

      <BusinessCtaSection />
    </>
  );
}
