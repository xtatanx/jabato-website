"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
  }, [error]);

  return (
    <SiteShell>
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
          <EmptyTitle>Algo salió mal</EmptyTitle>
          <EmptyDescription>
            Tuvimos un problema al cargar esta página. Puedes reintentar o
            volver al inicio mientras lo resolvemos.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
            <Button className="flex-1" onClick={reset}>
              Reintentar
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href="/">Volver al Inicio</Link>
            </Button>
          </div>
          <Button asChild variant="link" className="mt-4">
            <Link href="/cervezas">Ver cervezas</Link>
          </Button>
        </EmptyContent>
      </Empty>
      </div>
    </SiteShell>
  );
}
