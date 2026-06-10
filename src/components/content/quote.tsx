import { site } from "@content/site";
import Image from "next/image";
import { getQuotesByIds } from "@/lib/content";

export type QuoteProps = {
  id: string;
};

export function Quote({ id }: QuoteProps) {
  if (!site.showQuotes) return null;

  const [quote] = getQuotesByIds([id]);
  if (!quote) return null;

  return (
    <figure className="my-8 mx-auto max-w-2xl border-l-4 border-brand bg-secondary/20 px-6 py-4 rounded">
      <blockquote className="text-lg sm:text-xl italic font-medium leading-snug">
        &ldquo;{quote.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        {quote.author.avatar ? (
          <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={quote.author.avatar}
              alt={quote.author.name}
              fill
              loading="lazy"
              className="object-cover"
            />
          </div>
        ) : null}
        <div>
          <p className="font-bold text-sm">{quote.author.name}</p>
          <p className="text-xs text-muted-foreground">
            {quote.author.position}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
