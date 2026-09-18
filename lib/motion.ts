/**
 * MY GRAFIX MEDIA — MOTION LANGUAGE
 * =================================
 * One easing family. One duration scale. One set of distances.
 * Every animation on the site opts into these tokens so that movement
 * reads as a single product rather than per-section improvisation.
 *
 * Hierarchy:
 *   micro   — always present, barely noticed (hover, focus, borders)
 *   base    — occasional, reveals and state changes as content enters
 *   moment  — rare and memorable (hero system, living system map)
 *
 * Rule: animation must reward attention, never demand it.
 * The page has to look finished in a static screenshot.
 */

export type Bezier = [number, number, number, number];

/** Easing — decelerating, never bouncy, never elastic. */
export const EASE: Record<"out" | "inOut" | "snap" | "linear", Bezier> = {
  /** default for entrances — fast start, long settle */
  out: [0.33, 1, 0.68, 1],
  /** for symmetric movements (drawing, morphing) */
  inOut: [0.65, 0, 0.35, 1],
  /** for micro-interactions — near-instant response */
  snap: [0.16, 1, 0.3, 1],
  linear: [0, 0, 1, 1],
};

/** Duration scale (seconds). */
export const DURATION = {
  micro: 0.14,
  fast: 0.22,
  base: 0.45,
  slow: 0.75,
  moment: 1.1,
} as const;

/** Stagger offsets between siblings (seconds). */
export const STAGGER = {
  tight: 0.035,
  base: 0.07,
  loose: 0.12,
} as const;

/** Travel distances for reveals (px). Deliberately small. */
export const DISTANCE = {
  xs: 6,
  sm: 12,
  md: 20,
  lg: 30,
} as const;

/**
 * Shared viewport config for in-view triggers.
 * Negative margin means an element must be meaningfully on screen before
 * it animates, so the transition is seen rather than missed.
 */
export const VIEWPORT = {
  once: true,
  margin: "-8% 0px -8% 0px",
} as const;

/** Convenience transition presets. */
export const TRANSITION = {
  micro: { duration: DURATION.micro, ease: EASE.snap },
  fast: { duration: DURATION.fast, ease: EASE.out },
  base: { duration: DURATION.base, ease: EASE.out },
  slow: { duration: DURATION.slow, ease: EASE.out },
  draw: { duration: DURATION.moment, ease: EASE.inOut },
} as const;

/** Spring presets — used only where physical response is the point. */
export const SPRING = {
  /** pointer-following elements: quick, damped, no overshoot */
  pointer: { stiffness: 260, damping: 26, mass: 0.4 },
  /** layout/underline indicators */
  indicator: { stiffness: 500, damping: 35 },
} as const;

/** Motion level names, referenced in comments and component props. */
export type MotionLevel = "micro" | "base" | "moment";
