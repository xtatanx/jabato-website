"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitVerifyAge } from "@/app/(app)/actions/age-gate";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  COLOMBIA_FOOTNOTE,
  DENIED_MESSAGE,
  DENIED_TITLE,
  LEGAL_DISCLAIMER,
  MIN_AGE,
} from "@/lib/age-gate";
import type { AgeGateFormState } from "@/lib/validations/age-gate";
import { cn } from "@/lib/utils";

const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 100 }, (_, i) => currentYear - i);
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size="lg"
      disabled={pending}
      className="w-full bg-brand hover:bg-brand/90"
    >
      {pending ? "Verificando..." : `Entrar — soy mayor de ${MIN_AGE} años`}
    </Button>
  );
}

function AgeGateForm({ onMinorExit }: { onMinorExit: () => void }) {
  const router = useRouter();
  const [state, formAction] = useActionState<AgeGateFormState | null, FormData>(
    submitVerifyAge,
    null,
  );

  useEffect(() => {
    if (state?.success) {
      router.refresh();
    }
  }, [state?.success, router]);

  if (state?.denied) {
    return (
      <div className="space-y-4 py-4 text-center">
        <h1 id="age-gate-title" className="text-2xl font-bold sm:text-3xl">
          {DENIED_TITLE}
        </h1>
        <p id="age-gate-denied-description" className="text-muted-foreground">
          {DENIED_MESSAGE}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3 text-center">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <h1 id="age-gate-title" className="text-2xl font-bold sm:text-3xl">
            Verificación de edad
          </h1>
          <span className="rounded-full bg-brand px-3 py-1 text-sm font-bold text-white">
            18+
          </span>
        </div>
        <p id="age-gate-description" className="text-sm text-muted-foreground">
          {LEGAL_DISCLAIMER}
        </p>
      </div>

      <form
        action={formAction}
        className="space-y-4"
        key={`${state?.data?.day ?? ""}-${state?.data?.month ?? ""}-${state?.data?.year ?? ""}`}
      >
        <fieldset className="space-y-3">
          <legend className="text-sm font-medium">
            Ingresa tu fecha de nacimiento
          </legend>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="age-gate-day">Día</Label>
              <Select name="day" defaultValue={state?.data?.day} required>
                <SelectTrigger
                  id="age-gate-day"
                  className={cn(
                    "h-12 w-full text-base",
                    state?.errors?.day && "border-destructive",
                  )}
                >
                  <SelectValue placeholder="DD" />
                </SelectTrigger>
                <SelectContent className="z-[120]">
                  {DAYS.map((d) => (
                    <SelectItem key={d} value={String(d)}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {state?.errors?.day && (
                <p className="text-sm text-destructive">
                  {state.errors.day[0]}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="age-gate-month">Mes</Label>
              <Select name="month" defaultValue={state?.data?.month} required>
                <SelectTrigger
                  id="age-gate-month"
                  className={cn(
                    "h-12 w-full text-base",
                    state?.errors?.month && "border-destructive",
                  )}
                >
                  <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent className="z-[120]">
                  {MONTHS.map((name, index) => (
                    <SelectItem key={name} value={String(index + 1)}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {state?.errors?.month && (
                <p className="text-sm text-destructive">
                  {state.errors.month[0]}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="age-gate-year">Año</Label>
              <Select name="year" defaultValue={state?.data?.year} required>
                <SelectTrigger
                  id="age-gate-year"
                  className={cn(
                    "h-12 w-full text-base",
                    state?.errors?.year && "border-destructive",
                  )}
                >
                  <SelectValue placeholder="AAAA" />
                </SelectTrigger>
                <SelectContent className="z-[120] max-h-48">
                  {YEARS.map((y) => (
                    <SelectItem key={y} value={String(y)}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {state?.errors?.year && (
                <p className="text-sm text-destructive">
                  {state.errors.year[0]}
                </p>
              )}
            </div>
          </div>
        </fieldset>

        {state?.message && (
          <p className="text-sm text-destructive" role="alert">
            {state.message}
          </p>
        )}

        <SubmitButton />
      </form>

      <p className="text-center text-sm text-muted-foreground">
        {COLOMBIA_FOOTNOTE}
      </p>

      <p className="text-center">
        <button
          type="button"
          onClick={onMinorExit}
          className="text-sm text-muted-foreground underline-offset-4 hover:underline"
        >
          No soy mayor de edad
        </button>
      </p>
    </>
  );
}

export function AgeGateClient() {
  const [showMinorExit, setShowMinorExit] = useState(false);

  if (showMinorExit) {
    return (
      <div className="space-y-4 py-4 text-center">
        <h1 id="age-gate-title" className="text-2xl font-bold sm:text-3xl">
          {DENIED_TITLE}
        </h1>
        <p id="age-gate-denied-description" className="text-muted-foreground">
          {DENIED_MESSAGE}
        </p>
      </div>
    );
  }

  return <AgeGateForm onMinorExit={() => setShowMinorExit(true)} />;
}
