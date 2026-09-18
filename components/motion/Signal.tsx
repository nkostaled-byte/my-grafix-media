"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { DURATION, EASE } from "@/lib/motion";

/**
 * THE CONTINUITY MOTIF
 * ====================
 * A hairline that draws itself and then carries a signal.
 *
 * This is the one motif that travels the whole site:
 *   hero rail  →  system connector  →  living-system map  →  closing CTA
 * It is the visual through-line that makes the sections read as one
 * system rather than nine stacked layouts.
 *
 * Both effects are transform/stroke based, so they stay off the layout
 * and main-thread cost stays near zero.
 */

/**
 * LEVEL 2 — a horizontal rail that draws left-to-right when it enters
 * the viewport, then (optionally) carries a repeating light sweep.
 *
 * The sweep is a translated + scaled gradient rather than an animated
 * `left` value, so the browser can composite it without re-laying out.
 */
export function SignalRail({
  className,
  delay = 0,
  duration = DURATION.moment,
  flow = true,
  flowDuration = 3.6,
  endAt = "full", // "full" | "left" | "right" | number (percentage)
}: {
  className?: string;
  delay?: number;
  duration?: number;
  flow?: boolean;
  flowDuration?: number;
  endAt?: "full" | "left" | "right" | number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  // Calculate the endpoint for the line
  let scaleXEnd = 1;
  if (endAt === "left") {
    scaleXEnd = 0.15; // Stop at left marker
  } else if (endAt === "right") {
    scaleXEnd = 0.85; // Stop before right edge
  } else if (typeof endAt === "number") {
    scaleXEnd = endAt;
  }

  return (
    <div ref={ref} className={cn("relative h-px w-full bg-border", className)}>
      {/* the draw */}
      <motion.div
        className="absolute inset-0 origin-left bg-foreground/35"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: scaleXEnd } : { scaleX: 0 }}
        transition={{
          duration: reduce ? 0 : duration,
          ease: EASE.inOut,
          delay: reduce ? 0 : delay,
        }}
      />
      {/* the signal */}
      {flow && !reduce && inView && (
        <span
          aria-hidden="true"
          className="signal-sweep"
          style={
            {
              animationDuration: `${flowDuration}s`,
              maxWidth: `${scaleXEnd * 100}%`,
              /* Travel stops the sweep's leading edge exactly at the
                 drawn line's endpoint (keyframes scale the sweep to 0.7
                 of its 18% width = 0.126 of the rail). */
              "--sweep-travel": `${((scaleXEnd - 0.126) / 0.18) * 100}%`,
            } as React.CSSProperties
          }
        />
      )}
    </div>
  );
}

/**
 * LEVEL 2/3 — SVG variant, for connectors that are not straight lines.
 * Draws via pathLength, then optionally runs a dashed signal along the
 * same geometry so the travelling light follows the actual curve.
 */
export function SignalPath({
  d,
  viewBox,
  className,
  strokeWidth = 1,
  delay = 0,
  duration = 1.3,
  flow = true,
  flowDuration = 3.2,
  preserveAspectRatio = "none",
}: {
  d: string;
  viewBox: string;
  className?: string;
  strokeWidth?: number;
  delay?: number;
  duration?: number;
  flow?: boolean;
  flowDuration?: number;
  preserveAspectRatio?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  return (
    <svg
      ref={ref}
      viewBox={viewBox}
      fill="none"
      preserveAspectRatio={preserveAspectRatio}
      className={className}
      aria-hidden="true"
    >
      <motion.path
        d={d}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0.9 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{
          duration: reduce ? 0 : duration,
          ease: EASE.inOut,
          delay: reduce ? 0 : delay,
        }}
      />
      {flow && !reduce && inView && (
        <path
          d={d}
          className="signal-flow"
          stroke="rgb(var(--color-accent-brand))"
          strokeWidth={strokeWidth + 1}
          strokeLinecap="round"
          pathLength={1}
          style={{ animationDuration: `${flowDuration}s` }}
        />
      )}
    </svg>
  );
}
