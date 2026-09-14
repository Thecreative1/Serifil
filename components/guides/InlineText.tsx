import type { ReactNode } from "react";
import { inlineLinkPattern } from "@/data/guides";

const defaultLinkClassName =
  "font-semibold text-light-text underline decoration-[#171916]/40 underline-offset-4 transition-colors hover:decoration-[#171916] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function InlineText({ text, linkClassName = defaultLinkClassName }: { text: string; linkClassName?: string }) {
  const parts: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(inlineLinkPattern)) {
    const index = match.index ?? 0;
    if (index > lastIndex) parts.push(text.slice(lastIndex, index));
    parts.push(
      <a key={index} href={match[2]} className={linkClassName}>
        {match[1]}
      </a>,
    );
    lastIndex = index + match[0].length;
  }

  if (lastIndex < text.length) parts.push(text.slice(lastIndex));

  return <>{parts}</>;
}
