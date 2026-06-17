import { site } from "@content/site";
import Image from "next/image";
import { LandingFooter } from "@/components/b2b-landing/landing-footer";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="border-b border-white/10 bg-black px-4 py-4">
        <div className="container mx-auto">
          <Image
            src="/jabato-horizontal-logo.svg"
            alt={site.name}
            width={140}
            height={42}
            priority
          />
        </div>
      </header>
      <main>{children}</main>
      <LandingFooter />
    </>
  );
}
