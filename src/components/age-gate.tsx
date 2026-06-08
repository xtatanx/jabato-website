import { AgeGateClient } from "@/components/age-gate-client";
import { AgeGateShell } from "@/components/age-gate-shell";

export function AgeGate() {
  return (
    <AgeGateShell>
      <AgeGateClient />
    </AgeGateShell>
  );
}
