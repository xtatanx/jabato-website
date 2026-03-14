import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';
import type { Where } from 'payload';
import { getPayloadClient } from './payload';
import { getMediaUrl, isMediaPopulated } from './media';
import type { Post } from '@payload-types';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: 'historias' | 'catas' | 'experiencias';
  featured: boolean;
  excerpt: string;
  content: DefaultTypedEditorState;
  featuredImage: string;
  publishedDate: string;
}

/**
 * Transform Payload Post to BlogPost format
 */
function transformPost(post: Post): BlogPost {
  // Handle featuredImage - convert Media object to URL string
  let featuredImageUrl = '';
  if (post.featuredImage && isMediaPopulated(post.featuredImage)) {
    const url = getMediaUrl(post.featuredImage);
    featuredImageUrl = url || '';
  }

  return {
    id: String(post.id),
    title: post.title,
    slug: post.slug,
    category: post.category,
    featured: post.featured ?? false,
    excerpt: post.excerpt,
    content: post.content,
    featuredImage: featuredImageUrl,
    publishedDate: post.publishedDate,
  };
}

/**
 * Get the featured post (most recent one if multiple exist)
 */
export async function getFeaturedPost(): Promise<BlogPost | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'posts',
      where: {
        featured: {
          equals: true,
        },
      },
      sort: '-publishedDate',
      limit: 1,
      depth: 2,
    });

    if (result.docs.length === 0) {
      return null;
    }

    return transformPost(result.docs[0]);
  } catch (error) {
    console.error('Error fetching featured post:', error);
    return null;
  }
}

/**
 * Get posts by category with pagination (excluding featured post)
 */
export async function getPostsByCategory(
  category: string | null,
  page: number = 1,
  limit: number = 6,
): Promise<BlogPost[]> {
  try {
    const payload = await getPayloadClient();

    // First, get the featured post ID to exclude it
    const featuredResult = await payload.find({
      collection: 'posts',
      where: {
        featured: {
          equals: true,
        },
      },
      limit: 1,
      depth: 0, // We only need the ID
    });

    const featuredPostId =
      featuredResult.docs.length > 0 ? featuredResult.docs[0].id : null;

    const whereClause: Where = {
      featured: {
        not_equals: true,
      },
      ...(category &&
        category !== 'todas' && {
          category: { equals: category },
        }),
      ...(featuredPostId && { id: { not_equals: featuredPostId } }),
    };

    const result = await payload.find({
      collection: 'posts',
      where: whereClause,
      sort: '-publishedDate',
      page,
      limit,
      depth: 2,
    });

    return result.docs.map(transformPost);
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    return [];
  }
}

/**
 * Get total count of posts by category (excluding featured post)
 */
async function getPostsCount(category: string | null): Promise<number> {
  try {
    const payload = await getPayloadClient();

    const whereClause: Where = {
      featured: {
        not_equals: true,
      },
      ...(category &&
        category !== 'todas' && {
          category: { equals: category },
        }),
    };

    const result = await payload.find({
      collection: 'posts',
      where: whereClause,
      limit: 0, // We only need the count
      depth: 0,
    });

    return result.totalDocs;
  } catch (error) {
    console.error('Error fetching posts count:', error);
    return 0;
  }
}

/**
 * Get total number of pages for pagination
 */
export async function getTotalPages(
  category: string | null,
  limit: number = 6,
): Promise<number> {
  const count = await getPostsCount(category);
  return Math.ceil(count / limit);
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'posts',
      where: {
        slug: {
          equals: slug,
        },
      },
      depth: 2,
      limit: 1,
    });

    if (result.docs.length === 0) {
      return null;
    }

    return transformPost(result.docs[0]);
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return null;
  }
}

/**
 * Get all posts (for backward compatibility if needed)
 * Note: This excludes featured posts
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'posts',
      where: {
        featured: {
          not_equals: true,
        },
      },
      sort: '-publishedDate',
      depth: 2,
    });

    return result.docs.map(transformPost);
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return [];
  }
}
