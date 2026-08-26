"use client";

// PROTOTYPE — throwaway floating variant switcher. Hidden in production builds.

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";

export interface VariantMeta {
  key: string;
  name: string;
}

interface PrototypeSwitcherProps {
  variants: VariantMeta[];
  current: string;
  onChange: (key: string) => void;
}

export function PrototypeSwitcher({
  variants,
  current,
  onChange,
}: PrototypeSwitcherProps) {
  const index = Math.max(
    0,
    variants.findIndex((v) => v.key === current),
  );
  const active = variants[index];

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      const el = document.activeElement;
      if (
        el instanceof HTMLInputElement ||
        el instanceof HTMLTextAreaElement ||
        (el instanceof HTMLElement && el.isContentEditable)
      ) {
        return;
      }
      if (e.key === "ArrowLeft") {
        onChange(variants[(index - 1 + variants.length) % variants.length].key);
      } else if (e.key === "ArrowRight") {
        onChange(variants[(index + 1) % variants.length].key);
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [index, variants, onChange]);

  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-[1000] -translate-x-1/2">
      <div className="flex items-center gap-1 rounded-full border-2 border-brand bg-background px-1.5 py-1.5 shadow-2xl">
        <button
          type="button"
          aria-label="Variante anterior"
          onClick={() =>
            onChange(
              variants[(index - 1 + variants.length) % variants.length].key,
            )
          }
          className="grid size-9 place-items-center rounded-full hover:bg-muted"
        >
          <ChevronLeft className="size-5" />
        </button>
        <div className="min-w-44 px-2 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-brand">
            Prototipo · {active.key}
          </p>
          <p className="text-sm font-medium leading-tight">{active.name}</p>
        </div>
        <button
          type="button"
          aria-label="Variante siguiente"
          onClick={() => onChange(variants[(index + 1) % variants.length].key)}
          className="grid size-9 place-items-center rounded-full hover:bg-muted"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
