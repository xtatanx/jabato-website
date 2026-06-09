import { site } from "@content/site";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";
import { AgeGate } from "@/components/age-gate";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { isAgeVerified } from "@/lib/age-gate-server";
import { getSiteUrl } from "@/lib/site-url";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const defaultOgImage = new URL(site.defaultOgImage, getSiteUrl()).toString();

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Cerveza Artesanal | Jabato Cervecería",
    template: "%s | Jabato Cervecería",
  },
  description:
    "A cada parche le llega su Jabato. Cervezas artesanales hechas en Colombia, elaboradas en lotes pequeños. Descubre tu estilo.",
  openGraph: {
    siteName: "Jabato Cervecería",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: defaultOgImage,
        alt: "Jabato Cervecería",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [defaultOgImage],
  },
  robots:
    process.env.VERCEL_ENV === "preview"
      ? { index: false, follow: false }
      : { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const isVerified = isAgeVerified(cookieStore);

  return (
    <html lang="es-CO">
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "antialiased min-h-screen",
          !isVerified && "overflow-hidden",
        )}
      >
        <NuqsAdapter>
          <div
            className={cn(!isVerified && "pointer-events-none select-none")}
            aria-hidden={!isVerified}
          >
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
          {!isVerified && <AgeGate />}
        </NuqsAdapter>
      </body>
    </html>
  );
}
