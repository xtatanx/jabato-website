export function isAnalyticsEnvironment(): boolean {
  return (
    process.env.NODE_ENV === "production" &&
    process.env.VERCEL_ENV !== "preview"
  );
}
