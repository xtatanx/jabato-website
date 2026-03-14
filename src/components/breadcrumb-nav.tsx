import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
}

export default function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol
        itemScope
        itemType="https://schema.org/BreadcrumbList"
        className="flex items-center gap-2 text-sm"
      >
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link
            itemProp="item"
            href="/"
            className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
          >
            <span itemProp="name">Inicio</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>
        {items.map((item, index) => (
          <li
            key={item.href}
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
            className="flex items-center gap-2"
          >
            <ChevronRight className="w-4 h-4 text-primary-foreground/50" />
            {index === items.length - 1 ? (
              <span
                itemProp="name"
                className="text-brand font-semibold"
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <Link
                itemProp="item"
                href={item.href}
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                <span itemProp="name">{item.label}</span>
              </Link>
            )}
            <meta itemProp="position" content={`${index + 2}`} />
          </li>
        ))}
      </ol>
    </nav>
  );
}
