"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Global motion policy.
 *
 * reducedMotion="user" makes framer-motion honour the OS
 * `prefers-reduced-motion` setting for every descendant: transform and
 * layout animations are skipped, while opacity changes are retained so
 * state changes remain legible.
 *
 * This is the single switch that keeps accessibility correct everywhere
 * without every component re-implementing the check. Components that
 * animate something decorative (drifting grids, flowing signals) still
 * check useReducedMotion explicitly, because those have no opacity
 * fallback and must be stopped outright.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
