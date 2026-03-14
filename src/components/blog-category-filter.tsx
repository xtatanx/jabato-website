'use client';

import Link from 'next/link';
import { parseAsString, useQueryState } from 'nuqs';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const CATEGORIES = [
  { value: 'todas', label: 'Todas las categorías' },
  { value: 'historias', label: 'Historias' },
  { value: 'catas', label: 'Catas' },
  { value: 'experiencias', label: 'Experiencias' },
] as const;

export function BlogCategoryFilter() {
  const [category, setCategory] = useQueryState(
    'category',
    parseAsString.withDefault('todas')
  );

  return (
    <div className="flex flex-wrap items-center gap-3">
      {CATEGORIES.map((cat) => {
        const isActive =
          category === cat.value || (cat.value === 'todas' && !category);

        return (
          <Link
            key={cat.value}
            href={`/blog${cat.value === 'todas' ? '' : `?category=${cat.value}`}`}
            onClick={(e) => {
              e.preventDefault();
              setCategory(cat.value === 'todas' ? null : cat.value);
            }}
          >
            <Badge
              variant={isActive ? 'default' : 'outline'}
              className={cn(
                'cursor-pointer transition-colors text-base sm:text-lg px-4 py-2 sm:px-5 sm:py-2.5',
                isActive &&
                  'bg-brand text-white hover:bg-brand/90 border-transparent'
              )}
            >
              {cat.label}
            </Badge>
          </Link>
        );
      })}
    </div>
  );
}
