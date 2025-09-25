import Image from 'next/image';
import Link from 'next/link';
import {
  Instagram,
  Facebook,
  MessageCircle,
  MapPin,
  Mail,
  Phone,
  Music,
  Beer,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* First Column - Logo and Description */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Image
                src="/jabato-horizontal-logo.svg"
                alt="Jabato Logo"
                width={200}
                height={60}
                className="mb-4"
              />
              <p className="text-lg text-primary-foreground/80 max-w-md">
                Cerveza artesanal de principio a fin, sin atajos. Compartimos
                nuestra pasión por la cerveza con el mundo, creando experiencias
                únicas en cada sorbo.
              </p>
            </div>
          </div>

          {/* Second Column - Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-brand">Síguenos</h3>
            <div className="flex flex-col gap-4">
              <Link
                href="https://instagram.com/jabato"
                className="flex items-center gap-3 hover:text-brand transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-6 h-6" />
                Instagram
              </Link>

              <Link
                href="https://facebook.com/jabato"
                className="flex items-center gap-3 hover:text-brand transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="w-6 h-6" />
                Facebook
              </Link>

              <Link
                href="https://tiktok.com/@jabato"
                className="flex items-center gap-3 hover:text-brand transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Music className="w-6 h-6" />
                TikTok
              </Link>

              <Link
                href="https://untappd.com/jabato"
                className="flex items-center gap-3 hover:text-brand transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Beer className="w-6 h-6" />
                Untappd
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-6 text-brand">Contáctanos</h3>
            <div className="flex flex-col gap-4 text-primary-foreground/80">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Email</p>
                  <p>jabatocerveceria@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">WhatsApp</p>
                  <p>+57 333 7058517</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <p className="text-primary-foreground/60 text-sm text-center">
            © {new Date().getFullYear()} Jabato. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
