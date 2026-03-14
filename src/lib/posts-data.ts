import { getPosts } from './payload';
import type { Post } from '@payload-types';

/**
 * Get recent posts from Payload CMS for homepage
 */
export async function getRecentPosts(limit: number = 4): Promise<Post[]> {
  try {
    const posts = await getPosts({
      limit,
      sort: '-publishedDate',
    });

    return posts;
  } catch (error) {
    console.error('Error fetching recent posts:', error);
    return [];
  }
}

/**
 * Format date for display
 */
export function formatPostDate(dateString: string): string {
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

/**
 * Get category label in Spanish
 */
export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    historias: 'Historias',
    catas: 'Catas',
    experiencias: 'Experiencias',
  };
  return labels[category] || category;
}

