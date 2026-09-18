"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { DISTANCE, DURATION, EASE, STAGGER, VIEWPORT } from "@/lib/motion";

type Direction = "up" | "down" | "left" | "right" | "none";

/** Translates a direction into an initial offset. */
function offsetFor(direction: Direction, distance: number) {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    default:
      return {};
  }
}

/**
 * LEVEL 2 — section reveal.
 * The workhorse for content entering the viewport. Small travel distance
 * on purpose: the content should feel like it settles into place, not
 * fly in. Reduced motion keeps the fade and drops the movement.
 */
export function Reveal({
  children,
  className,
  direction = "up",
  distance = DISTANCE.md,
  delay = 0,
  duration = DURATION.base,
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  distance?: number;
  delay?: number;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  const from = reduce ? {} : offsetFor(direction, distance);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...from }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={VIEWPORT}
      transition={{
        duration: reduce ? DURATION.micro : duration,
        ease: EASE.out,
        delay: reduce ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * LEVEL 2 — stagger parent. Pair with RevealItem children so a set of
 * related elements arrives as a sequence rather than all at once.
 */
export function RevealGroup({
  children,
  className,
  stagger = STAGGER.base,
  delayChildren = 0,
  amount,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  amount?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...VIEWPORT, amount }}
      variants={{
        visible: {
          transition: {
            staggerChildren: reduce ? 0 : stagger,
            delayChildren: reduce ? 0 : delayChildren,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  direction = "up",
  distance = DISTANCE.sm,
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  distance?: number;
}) {
  const reduce = useReducedMotion();
  const from = reduce ? {} : offsetFor(direction, distance);

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, ...from },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration: reduce ? DURATION.micro : DURATION.base,
            ease: EASE.out,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * LEVEL 3 — display-type curtain reveal, used sparingly on the hero and
 * major section headings.
 *
 * The negative margin cancels the padding that keeps descenders (g, y, p)
 * from being clipped by the mask — without it, tight line-heights cut
 * the tails off the type.
 */
export function LineReveal({
  children,
  className,
  delay = 0,
  duration = DURATION.slow,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <span className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
      <motion.span
        className={cn("block", className)}
        initial={reduce ? { opacity: 0 } : { y: "0.85em", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={VIEWPORT}
        transition={{
          duration: reduce ? DURATION.fast : duration,
          ease: EASE.out,
          delay: reduce ? 0 : delay,
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}
