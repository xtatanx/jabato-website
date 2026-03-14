import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export const metadata: Metadata = {
  title: "404 - Página No Encontrada",
  description:
    "La página que buscas no existe. Vuelve al inicio para explorar nuestras cervezas artesanales.",
};

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 flex-1 flex items-center justify-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia>
            <Image
              src="/jabato-horizontal-logo.svg"
              alt="Jabato Cervecería"
              width={172}
              height={52}
              priority
            />
          </EmptyMedia>
          <EmptyTitle>404 - Página No Encontrada</EmptyTitle>
          <EmptyDescription>
            ¡Oops! Parece que esta página se fue de fiesta como nuestras
            cervezas. No te preocupes, todavía puedes disfrutar de todo lo que
            tenemos para ofrecerte.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
            <Button asChild className="flex-1">
              <Link href="/">Volver al Inicio</Link>
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <Link href="/cervezas">Ver Cervezas</Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            ¿Necesitas ayuda?{" "}
            <Link
              href="/contacto"
              className="underline hover:text-primary transition-colors"
            >
              Contáctanos
            </Link>
          </p>
        </EmptyContent>
      </Empty>
    </div>
  );
}
