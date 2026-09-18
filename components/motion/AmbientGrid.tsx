"use client";

import { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * LEVEL 1 — ambient background texture.
 *
 * The grid from the design system, drifting very slowly on a transform
 * so it composites instead of repainting. Oversized by one full tile so
 * the travel never exposes an edge.
 *
 * The drift only runs while the section is on screen — off-screen it is
 * paused outright, which keeps idle CPU and battery cost at zero on a
 * long page.
 */
export function AmbientGrid({
  className,
  duration = 90,
  opacity,
}: {
  className?: string;
  duration?: number;
  opacity?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-5% 0px -5% 0px" });

  const animate = inView && !reduce;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "hero-grid pointer-events-none absolute",
        animate && "grid-drift",
        className
      )}
      style={{
        /* one tile of bleed on every side so the drift never shows an edge */
        inset: "-48px",
        animationDuration: animate ? `${duration}s` : undefined,
        opacity,
      }}
    />
  );
}
