import Footer from "@/components/footer";
import Header from "@/components/header";
import Link from "next/link";

interface SiteShellProps {
  children: React.ReactNode;
}

export function SiteShell({ children }: SiteShellProps) {
  return (
    <>
      <Link
        href="#main-content"
        className="sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:block focus:h-auto focus:w-auto focus:overflow-visible focus:rounded-sm focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:shadow-md focus:outline-none focus:ring-2 focus:ring-ring focus:[clip:auto] focus:whitespace-normal"
      >
        Saltar al contenido principal
      </Link>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
