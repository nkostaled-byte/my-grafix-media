import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface KickerProps {
  children: ReactNode;
  className?: string;
}

/**
 * The monospace technical voice — small, uppercase, tracked-out.
 * Sits above headings to label the section like a console label.
 * Deliberately plain: no dot, no icon, no rule. Structure does the work.
 *
 * Colour defaults to muted; pass a text-* class to override for
 * inverted sections (e.g. "text-background/55").
 */
export function Kicker({ children, className }: KickerProps) {
  return <p className={cn("kicker text-muted", className)}>{children}</p>;
}
