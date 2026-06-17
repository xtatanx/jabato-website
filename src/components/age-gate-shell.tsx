interface AgeGateShellProps {
  children: React.ReactNode;
}

export function AgeGateShell({ children }: AgeGateShellProps) {
  return (
    <div
      className="fixed inset-0 z-[100] flex min-h-screen flex-col items-center justify-center bg-white px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
    >
      {children}
    </div>
  );
}
