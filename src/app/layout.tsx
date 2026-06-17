import { site } from "@content/site";
import type { Metadata } from "next";
import { Bebas_Neue, Montserrat } from "next/font/google";
import { cookies } from "next/headers";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";
import { AgeGate } from "@/components/age-gate";
import { CookieConsentBanner } from "@/components/cookie-consent-banner";
import Footer from "@/components/footer";
import { GoogleAnalyticsLoader } from "@/components/google-analytics-loader";
import Header from "@/components/header";
import { isAgeVerified } from "@/lib/age-gate-server";
import { isAnalyticsEnvironment } from "@/lib/analytics-env";
import { DEFAULT_SITE_TITLE, SITE_NAME } from "@/lib/metadata";
import { getSiteUrl } from "@/lib/site-url";
import { cn } from "@/lib/utils";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  subsets: ["latin"],
});

const defaultOgImage = new URL(site.defaultOgImage, getSiteUrl()).toString();

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: DEFAULT_SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: site.tagline,
  openGraph: {
    siteName: SITE_NAME,
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
    <html lang="es-CO" className="relative">
      <body
        className={cn(
          montserrat.variable,
          bebasNeue.variable,
          "relative antialiased min-h-screen",
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
          <CookieConsentBanner isAgeVerified={isVerified} />
          {isAnalyticsEnvironment() &&
            process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
              <GoogleAnalyticsLoader
                gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
              />
            )}
        </NuqsAdapter>
      </body>
    </html>
  );
}
