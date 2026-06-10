import { site } from "@content/site";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface AgeGateShellProps {
  children: React.ReactNode;
}

export function AgeGateShell({ children }: AgeGateShellProps) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="age-gate-title"
        className={cn(
          "w-full max-w-xl overflow-hidden rounded-xl border-2 border-brand/20 bg-card shadow-2xl ring-4 ring-brand/10",
        )}
      >
        <div className="bg-brand px-6 py-5 text-white sm:px-8">
          <Image
            src="/jabato-horizontal-logo.svg"
            alt={`${site.name} Cervecería`}
            width={140}
            height={42}
            className="brightness-0 invert"
            priority
          />
        </div>
        <div className="space-y-6 p-6 sm:p-8">{children}</div>
      </div>
    </div>
  );
}
