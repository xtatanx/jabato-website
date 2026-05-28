import Image from "next/image";
import Link from "next/link";
import { getAllPosts, getRecentPosts } from "@/lib/content";
import type { PostCategory } from "@/lib/content/schemas";
import { formatPostDate } from "@/lib/post-format";

export type PostGridProps = {
  limit?: number;
  category?: PostCategory;
  tone?: "light" | "dark";
  emptyMessage?: string;
};

export async function PostGrid({
  limit = 4,
  category,
  tone = "light",
  emptyMessage = "No hay publicaciones disponibles.",
}: PostGridProps = {}) {
  const posts = category
    ? (await getAllPosts())
        .filter((p) => p.category === category)
        .slice(0, limit)
    : await getRecentPosts(limit);

  if (posts.length === 0) {
    return (
      <p
        className={
          tone === "light"
            ? "text-primary-foreground/80"
            : "text-muted-foreground"
        }
      >
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 lg:gap-12 w-full">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="flex flex-col gap-3 group cursor-pointer"
        >
          <div className="aspect-square relative rounded overflow-hidden">
            <Image
              src={post.featuredImage.src}
              className="object-cover rounded transition-transform duration-300 group-hover:scale-105"
              alt={post.featuredImage.alt}
              loading="lazy"
              fill
            />
          </div>
          <time
            dateTime={post.publishedDate}
            className="text-sm sm:text-md text-brand"
          >
            {formatPostDate(post.publishedDate)}
          </time>
          <h3
            className={
              tone === "light"
                ? "text-lg sm:text-xl lg:text-2xl font-extrabold text-primary-foreground group-hover:text-brand transition-colors duration-200"
                : "text-lg sm:text-xl lg:text-2xl font-extrabold text-secondary-foreground group-hover:text-brand transition-colors duration-200"
            }
          >
            {post.title}
          </h3>
        </Link>
      ))}
    </div>
  );
}
