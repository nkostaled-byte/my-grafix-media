"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DURATION, EASE } from "@/lib/motion";

/**
 * LEVEL 2 — one visual behaviour per capability.
 *
 * These are not three decorative illustrations. Each one animates the
 * idea the pillar stands for:
 *
 *   design        structure appearing, then type settling into alignment
 *   digital       a frame assembling, then interface regions filling in
 *   intelligence  nodes connecting, then a signal travelling between them
 *
 * All three share the same hairline/teal vocabulary and the same easing,
 * so they read as one system. Everything is SVG stroke/opacity — no
 * layout work, no per-frame JS. Reduced motion renders each in its
 * finished state.
 */

type Variant = "design" | "digital" | "intelligence";

const HAIRLINE = "rgb(var(--color-border))";
const EMPHASIS = "rgb(var(--color-foreground) / 0.32)";
const ACCENT = "rgb(var(--color-accent-brand))";

/**
 * Mini system map (intelligence variant) — driven by the same logic as
 * LivingSystem: one interval advances an integer, the signal grows from
 * the source node's centre to the destination node's centre, traversed
 * segments stay lit, and the destination square turns blue as the signal
 * arrives. Interval only runs while on screen; none under reduced motion
 * (which renders the connected finished state instead).
 */
const MINI_NODE_CENTERS = [76, 176, 276];
const MINI_STEP_INTERVAL = 1500;
const MINI_TRAVEL = 1.4;

/** A square is lit only from the moment the signal touches it: the origin
 *  when the signal first departs, destinations as they're reached — and it
 *  stays lit because `reached` never regresses in the loop. */
function reachedOrLit(index: number, step: number, reached: number) {
  return index === 0 ? step >= 1 || reached > 0 : index <= reached;
}

export function PillarVisual({
  variant,
  className,
}: {
  variant: Variant;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px -12% 0px" });

  /* One interval, advancing an integer — same model as LivingSystem.
     `reached` tracks the furthest node ever touched, so in the loop a
     connected square stays blue instead of cooling back to grey. */
  const [{ step, reached }, advance] = useState({ step: 0, reached: 0 });
  useEffect(() => {
    if (!inView || reduce) return;
    const id = window.setInterval(() => {
      advance((prev) => {
        const next = (prev.step + 1) % MINI_NODE_CENTERS.length;
        return { step: next, reached: Math.max(prev.reached, next) };
      });
    }, MINI_STEP_INTERVAL);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  const on = inView || reduce;
  /* Reduced motion holds the finished, fully-connected state. */
  const miniStep = reduce ? MINI_NODE_CENTERS.length - 1 : step;
  const miniReached = reduce ? MINI_NODE_CENTERS.length - 1 : reached;
  const t = (delay: number, duration: number = DURATION.slow) => ({
    duration: reduce ? 0 : duration,
    ease: EASE.out,
    delay: reduce ? 0 : delay,
  });

  return (
    <svg
      ref={ref}
      viewBox="0 0 320 180"
      fill="none"
      className={cn("h-full w-full", className)}
      aria-hidden="true"
    >
      {variant === "design" && (
        <>
          {/* Structure appearing */}
          {[40, 100, 160, 220, 280].map((x, i) => (
            <motion.line
              key={`v${x}`}
              x1={x}
              y1="24"
              x2={x}
              y2="156"
              stroke={HAIRLINE}
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={on ? { pathLength: 1, opacity: 1 } : { pathLength: 0 }}
              transition={t(0.05 * i, DURATION.base)}
            />
          ))}
          {[40, 90, 140].map((y, i) => (
            <motion.line
              key={`h${y}`}
              x1="24"
              y1={y}
              x2="296"
              y2={y}
              stroke={HAIRLINE}
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={on ? { pathLength: 1, opacity: 1 } : { pathLength: 0 }}
              transition={t(0.25 + 0.06 * i, DURATION.base)}
            />
          ))}

          {/* Type settling onto the grid */}
          <motion.rect
            x="40"
            y="52"
            width="120"
            height="10"
            fill={EMPHASIS}
            initial={{ opacity: 0, x: 52 }}
            animate={on ? { opacity: 1, x: 40 } : { opacity: 0 }}
            transition={t(0.5)}
          />
          <motion.rect
            x="40"
            y="70"
            width="84"
            height="7"
            fill={HAIRLINE}
            initial={{ opacity: 0, x: 52 }}
            animate={on ? { opacity: 1, x: 40 } : { opacity: 0 }}
            transition={t(0.58)}
          />
          <motion.rect
            x="40"
            y="100"
            width="52"
            height="7"
            fill={HAIRLINE}
            initial={{ opacity: 0, x: 52 }}
            animate={on ? { opacity: 1, x: 40 } : { opacity: 0 }}
            transition={t(0.66)}
          />

          {/* The one accent: alignment mark */}
          <motion.line
            x1="160"
            y1="44"
            x2="160"
            y2="86"
            stroke={ACCENT}
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={on ? { pathLength: 1, opacity: 1 } : { pathLength: 0 }}
            transition={t(0.8, DURATION.fast)}
          />
          <motion.circle
            cx="160"
            cy="40"
            r="2.5"
            fill={ACCENT}
            initial={{ opacity: 0 }}
            animate={on ? { opacity: 1 } : { opacity: 0 }}
            transition={t(0.9, DURATION.fast)}
          />
        </>
      )}

      {variant === "digital" && (
        <>
          {/* Frame */}
          <motion.rect
            x="32"
            y="30"
            width="256"
            height="120"
            rx="4"
            stroke={HAIRLINE}
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={on ? { pathLength: 1, opacity: 1 } : { pathLength: 0 }}
            transition={t(0, DURATION.moment)}
          />
          <motion.line
            x1="32"
            y1="52"
            x2="288"
            y2="52"
            stroke={HAIRLINE}
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={on ? { pathLength: 1, opacity: 1 } : { pathLength: 0 }}
            transition={t(0.35, DURATION.base)}
          />
          {[44, 54, 64].map((cx, i) => (
            <motion.circle
              key={cx}
              cx={cx}
              cy="41"
              r="2"
              fill={HAIRLINE}
              initial={{ opacity: 0 }}
              animate={on ? { opacity: 1 } : { opacity: 0 }}
              transition={t(0.45 + 0.04 * i, DURATION.fast)}
            />
          ))}

          {/* Interface regions filling in */}
          <motion.rect
            x="48"
            y="68"
            width="104"
            height="14"
            fill={EMPHASIS}
            initial={{ opacity: 0, y: 76 }}
            animate={on ? { opacity: 1, y: 68 } : { opacity: 0 }}
            transition={t(0.55)}
          />
          <motion.rect
            x="48"
            y="90"
            width="76"
            height="34"
            fill={HAIRLINE}
            initial={{ opacity: 0, y: 98 }}
            animate={on ? { opacity: 1, y: 90 } : { opacity: 0 }}
            transition={t(0.64)}
          />
          <motion.rect
            x="136"
            y="90"
            width="60"
            height="34"
            fill={HAIRLINE}
            initial={{ opacity: 0, y: 98 }}
            animate={on ? { opacity: 1, y: 90 } : { opacity: 0 }}
            transition={t(0.72)}
          />
          <motion.rect
            x="208"
            y="68"
            width="64"
            height="56"
            rx="2"
            fill={ACCENT}
            initial={{ opacity: 0, y: 76 }}
            animate={on ? { opacity: 0.18, y: 68 } : { opacity: 0 }}
            transition={t(0.8)}
          />
        </>
      )}

      {variant === "intelligence" && (
        <>
          {/* Grey rail — permanent structure, node-centre to node-centre */}
          {MINI_NODE_CENTERS.slice(0, -1).map((x, i) => (
            <motion.line
              key={x}
              x1={x}
              y1="90"
              x2={MINI_NODE_CENTERS[i + 1]}
              y2="90"
              stroke={HAIRLINE}
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={on ? { pathLength: 1 } : { pathLength: 0 }}
              transition={t(0.3 + 0.25 * i, DURATION.base)}
            />
          ))}

          {/* One continuous blue signal — painted behind the squares, which
              occlude it as it passes through. pathLength 0 → 0.5 → 1: grows
              to the 2nd square, stops, then the same line continues on to
              the 3rd. */}
          {!reduce && miniStep >= 1 && (
            <motion.line
              x1={MINI_NODE_CENTERS[0]}
              y1="90"
              x2={MINI_NODE_CENTERS[MINI_NODE_CENTERS.length - 1]}
              y2="90"
              stroke={ACCENT}
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: (miniStep - 1) / (MINI_NODE_CENTERS.length - 1) }}
              animate={{ pathLength: miniStep / (MINI_NODE_CENTERS.length - 1) }}
              transition={{ duration: reduce ? 0 : MINI_TRAVEL, ease: "easeInOut" }}
            />
          )}

          {/* Opaque bases — so neither rail nor signal reads "in front of"
              a square; both genuinely pass behind it */}
          {MINI_NODE_CENTERS.map((cx, i) => (
            <motion.rect
              key={`base-${cx}`}
              x={cx - 6}
              y="84"
              width="12"
              height="12"
              rx="2"
              fill="rgb(var(--color-surface-raised))"
              initial={{ opacity: 0 }}
              animate={{ opacity: on ? 1 : 0 }}
              transition={t(0.1 + 0.3 * i, DURATION.base)}
            />
          ))}

          {/* Nodes — every square starts grey; a square turns blue only as
              the signal reaches it (origin lights when the signal departs,
              destinations at 1.1s delay + 0.3s transition = 1.4s travel),
              and once reached it stays blue across the loop: connected
              remains connected */}
          {MINI_NODE_CENTERS.map((cx, i) => (
            <motion.rect
              key={cx}
              x={cx - 6}
              y="84"
              width="12"
              height="12"
              rx="2"
              initial={{
                fill: reachedOrLit(i, miniStep, miniReached) ? ACCENT : EMPHASIS,
                opacity: 0,
                scale: 0.6,
              }}
              animate={{
                fill: reachedOrLit(i, miniStep, miniReached) ? ACCENT : EMPHASIS,
                opacity: on ? 1 : 0,
                scale: on ? 1 : 0.6,
              }}
              style={{ transformOrigin: `${cx}px 90px` }}
              transition={{
                fill: {
                  duration: 0.3,
                  ease: "easeInOut",
                  delay: i === miniStep && miniStep > 0 ? 1.1 : 0,
                },
                opacity: t(0.1 + 0.3 * i, DURATION.base),
                scale: t(0.1 + 0.3 * i, DURATION.base),
              }}
            />
          ))}

          {/* Labels as hairlines — system nodes, not text */}
          {[70, 170, 270].map((cx, i) => (
            <motion.rect
              key={`l${cx}`}
              x={cx - 14}
              y="112"
              width="40"
              height="4"
              fill={HAIRLINE}
              initial={{ opacity: 0 }}
              animate={on ? { opacity: 1 } : { opacity: 0 }}
              transition={t(0.4 + 0.3 * i, DURATION.fast)}
            />
          ))}
        </>
      )}
    </svg>
  );
}
