import { site } from "@content/site";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { getSiteUrl } from "@/lib/site-url";

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
    "Cervezas artesanales hechas en Colombia. ¡Somos la cervecería que nació grande desde pequeña!",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CO">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <NuqsAdapter>
          <Header />
          <main>{children}</main>
          <Footer />
        </NuqsAdapter>
      </body>
    </html>
  );
}
