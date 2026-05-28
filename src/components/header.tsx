import { site } from "@content/site";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground py-3 h-16 flex items-center">
      <div className="container mx-auto flex items-center gap-8 px-4">
        <Link href="/">
          <Image
            src="/jabato-horizontal-logo.svg"
            title={`${site.name} Cervecería`}
            alt={`${site.name} Cervecería`}
            width={86}
            height={26}
            priority
          />
        </Link>
        <nav>
          <ul className="flex items-center">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-bold px-3 py-2 hover:text-primary-foreground/90"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
