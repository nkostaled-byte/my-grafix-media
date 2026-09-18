"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { DURATION, DISTANCE, EASE } from "@/lib/motion";

/**
 * LEVEL 2 — page transitions.
 *
 * Next.js remounts template.tsx on every navigation, which is the right
 * hook for a route change. Two rules govern it:
 *
 *  1. It must never delay content. The fade is 180ms and the page is
 *     fully interactive and fully painted from the first frame — the
 *     only thing animating is opacity and 4px of travel.
 *  2. There is no exit animation. Nothing is ever held back waiting for
 *     a previous page to leave.
 *
 * Reduced motion collapses the travel and keeps a quick fade, so route
 * changes stay legible without movement.
 */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : DISTANCE.xs * 0.6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduce ? DURATION.fast : 0.18,
        ease: EASE.snap,
      }}
    >
      {children}
    </motion.div>
  );
}
