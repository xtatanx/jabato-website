import { site } from "@content/site";
import { Beer, Mail, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
} from "@/components/brand-icons";
import { TrackedWhatsAppLink } from "@/components/tracked-whatsapp-link";

const socialLinks = [
  { href: site.socials.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: site.socials.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: site.socials.tiktok, label: "TikTok", Icon: TikTokIcon },
  { href: site.socials.untappd, label: "Untappd", Icon: Beer },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Link
                href="/"
                className="mb-4 inline-block"
                aria-label="Ir al inicio"
              >
                <Image
                  src="/jabato-horizontal-logo.svg"
                  alt={`${site.name} Logo`}
                  width={200}
                  height={60}
                  loading="lazy"
                />
              </Link>
              <p className="text-lg text-primary-foreground/80 max-w-md">
                {site.tagline}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 text-brand">Navegación</h3>
            <nav aria-label="Navegación del pie de página">
              <ul className="flex flex-col gap-4">
                {site.nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="hover:text-brand transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 text-brand">Síguenos</h3>
            <nav aria-label="Redes sociales">
              <ul className="flex flex-col gap-4">
                {socialLinks.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="flex items-center gap-3 hover:text-brand transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className="w-6 h-6" aria-hidden="true" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 text-brand">Contáctanos</h3>
            <address className="not-italic flex flex-col gap-4 text-primary-foreground/80">
              <div className="flex items-start gap-3">
                <Mail
                  className="w-5 h-5 mt-1 flex-shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-medium">Email</p>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="hover:text-brand transition-colors"
                  >
                    {site.contact.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle
                  className="w-5 h-5 mt-1 flex-shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-medium">WhatsApp</p>
                  <TrackedWhatsAppLink
                    href={`https://wa.me/${site.contact.whatsapp}`}
                    intent="general"
                    location="footer"
                    className="hover:text-brand transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {site.contact.whatsappDisplay}
                  </TrackedWhatsAppLink>
                </div>
              </div>
            </address>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <p className="text-primary-foreground/60 text-sm text-center">
            <small>
              © {new Date().getFullYear()} {site.name}. Todos los derechos
              reservados.{" "}
              <Link
                href="/politica-de-privacidad"
                className="underline hover:text-brand"
              >
                Privacidad
              </Link>
            </small>
          </p>
        </div>
      </div>
    </footer>
  );
}
