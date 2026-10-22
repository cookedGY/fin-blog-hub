import { isValidElement, type ReactNode } from "react";

// Read static article children without executing embedded components.
export function articleText(content: ReactNode): string {
  if (typeof content === "string" || typeof content === "number") return String(content);
  if (Array.isArray(content)) return content.map(articleText).join(" ");
  if (isValidElement<{ children?: ReactNode }>(content)) {
    return articleText(content.props.children);
  }
  return "";
}
