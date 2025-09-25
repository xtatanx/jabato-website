import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground py-3 h-16 flex items-center">
      <div className="container mx-auto flex items-center gap-8 px-4">
        <Link href="https://jabato.com.co/">
          <Image
            src="/jabato-horizontal-logo.svg"
            title="Jabato Cervecería"
            alt="Jabato Cervecería"
            width={86}
            height={26}
            priority
          />
        </Link>
        <nav>
          <ul className="flex items-center">
            <li>
              <Link
                href="/cervezas"
                className="font-bold px-3 py-2 hover:text-primary-foreground/90"
              >
                Cervezas
              </Link>
            </li>
            <li>
              <Link
                href="/historia"
                className="font-bold px-3 py-2 hover:text-primary-foreground/90"
              >
                Historia
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="font-bold px-3 py-2 hover:text-primary-foreground/90"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/contacto"
                className="font-bold px-3 py-2 hover:text-primary-foreground/90"
              >
                Contacto
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
