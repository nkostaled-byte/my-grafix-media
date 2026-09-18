"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { SPRING } from "@/lib/motion";

/**
 * LEVEL 1 — subtle pointer response.
 *
 * Moves its child a few pixels toward the cursor, spring-damped so it
 * reads as weight rather than jitter. Only a handful of pixels by
 * design: this should be felt more than seen.
 *
 * Deliberately inert when:
 *  - prefers-reduced-motion is set
 *  - the pointer is not a mouse (touch/pen) — mobile never gets this
 */
export function Magnetic({
  children,
  className,
  strength = 6,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING.pointer);
  const sy = useSpring(y, SPRING.pointer);

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduce || event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2 || 1);
    const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2 || 1);
    x.set(Math.max(-1, Math.min(1, dx)) * strength);
    y.set(Math.max(-1, Math.min(1, dy)) * strength);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ x: sx, y: sy }}
    >
      {children}
    </motion.div>
  );
}

/**
 * LEVEL 1 — ambient pointer parallax for larger surfaces (hero artwork,
 * portfolio frames). Same physics as Magnetic but tuned for a broader
 * area and a smaller, slower response.
 *
 * `max` is the viewport-share used to derive the offset, so the movement
 * scales with the surface instead of being a fixed pixel amount.
 */
export function PointerShift({
  children,
  className,
  strength = 14,
  max = 1,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  max?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 30, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 120, damping: 30, mass: 0.6 });

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduce || event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2 || 1);
    const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2 || 1);
    x.set(Math.max(-max, Math.min(max, dx)) * strength);
    y.set(Math.max(-max, Math.min(max, dy)) * strength);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ x: sx, y: sy }}
    >
      {children}
    </motion.div>
  );
}
