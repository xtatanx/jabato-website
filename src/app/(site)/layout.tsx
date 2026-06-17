import { SiteShell } from "@/components/site-shell";
import { getOrganizationSchema, getWebSiteSchema } from "@/lib/structured-data";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteSchema = getWebSiteSchema();
  const organizationSchema = getOrganizationSchema();

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <SiteShell>{children}</SiteShell>
    </>
  );
}
