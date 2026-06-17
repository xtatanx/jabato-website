import { site } from "@content/site";
import { b2bLandingCopy } from "@content/data/b2b-landing";
import Image from "next/image";
import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="border-t bg-primary px-4 py-10 text-primary-foreground">
      <div className="container mx-auto flex flex-col items-center gap-4 text-center text-base lg:text-lg">
        <Image
          src="/jabato-horizontal-logo.svg"
          alt={site.name}
          width={160}
          height={48}
          loading="lazy"
        />
        <p className="text-primary-foreground/70">
          {b2bLandingCopy.alcoholWarning}
        </p>
        <p className="text-primary-foreground/60">
          © {new Date().getFullYear()} {site.name}.{" "}
          <Link
            href="/politica-de-privacidad"
            className="underline hover:text-brand"
          >
            Privacidad
          </Link>
        </p>
      </div>
    </footer>
  );
}
