import type { ReactNode } from "react";

export function renderHighlight(
  title: string,
  highlight: string | undefined,
): ReactNode {
  if (!highlight) return title;

  const idx = title.toLowerCase().indexOf(highlight.toLowerCase());
  if (idx === -1) return title;

  const before = title.slice(0, idx);
  const match = title.slice(idx, idx + highlight.length);
  const after = title.slice(idx + highlight.length);

  return (
    <>
      {before}
      <span className="text-brand">{match}</span>
      {after}
    </>
  );
}
