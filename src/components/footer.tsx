import { site } from "@content/site";
import {
  Beer,
  Facebook,
  Instagram,
  Mail,
  MessageCircle,
  Music,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  { href: site.socials.instagram, label: "Instagram", Icon: Instagram },
  { href: site.socials.facebook, label: "Facebook", Icon: Facebook },
  { href: site.socials.tiktok, label: "TikTok", Icon: Music },
  { href: site.socials.untappd, label: "Untappd", Icon: Beer },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                />
              </Link>
              <p className="text-lg text-primary-foreground/80 max-w-md">
                {site.tagline}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 text-brand">Síguenos</h3>
            <div className="flex flex-col gap-4">
              {socialLinks.map(({ href, label, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex items-center gap-3 hover:text-brand transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="w-6 h-6" />
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 text-brand">Contáctanos</h3>
            <div className="flex flex-col gap-4 text-primary-foreground/80">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Email</p>
                  <p>{site.contact.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">WhatsApp</p>
                  <p>{site.contact.whatsappDisplay}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <p className="text-primary-foreground/60 text-sm text-center">
            © {new Date().getFullYear()} {site.name}. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
