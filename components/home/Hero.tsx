"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Magnetic, PointerShift } from "@/components/motion/Pointer";
import { AmbientGrid } from "@/components/motion/AmbientGrid";
import { DURATION, EASE } from "@/lib/motion";

/**
 * LEVEL 3 — the hero.
 *
 * The first impression has to establish the whole motion language in
 * under a second, without delaying anything the visitor came for.
 *
 * What happens, in order:
 *   1. three concept nodes come online in sequence (DESIGN · DIGITAL ·
 *      INTELLIGENCE) — the same node+signal motif the Intelligence
 *      section later pays off
 *   2. the headline rises out of its own mask, line by line
 *   3. copy and CTAs settle
 *   4. ambient motion continues quietly forever after: a drifting grid,
 *      a breathing accent, one signal crossing an arc
 *
 * Everything that continues is transform/opacity only, and every
 * continuing effect stops under reduced motion.
 */

const concepts = ["Design", "Digital", "Intelligence"];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE.out },
  },
};

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="container-padding relative flex items-center overflow-hidden pt-40 pb-28 md:pt-44 md:pb-32">
      {/* Ambient accent — breathes slowly, drifts with the pointer */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <PointerShift
          className="absolute -right-16 top-8 h-[820px] w-[1020px] md:-right-10 md:h-[900px] md:w-[1120px]"
          strength={18}
        >
          <div className="ambient-breathe h-full w-full opacity-90">
            <Image
              src="/images/hero-accent.svg"
              alt=""
              fill
              className="object-contain"
              priority
            />
          </div>
        </PointerShift>
      </div>

      {/* Grid — drifts one tile per cycle while on screen */}
      <AmbientGrid duration={80} />

      {/* One signal crossing the hero, foreshadowing the system map */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full text-border"
        viewBox="0 0 1440 700"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <motion.path
          d="M-40 620 C 260 560, 520 500, 820 470 S 1300 420, 1480 380"
          stroke="currentColor"
          strokeWidth="1"
          initial={{ pathLength: reduce ? 1 : 0, opacity: 1 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: reduce ? 0 : 1.6, ease: EASE.inOut, delay: reduce ? 0 : 0.3 }}
        />
        {!reduce && (
          <path
            className="signal-flow"
            d="M-40 620 C 260 560, 520 500, 820 470 S 1300 420, 1480 380"
            stroke="rgb(var(--color-accent-brand))"
            strokeWidth="2"
            strokeLinecap="round"
            pathLength={1}
            style={{ animationDuration: "7s", animationDelay: "1.9s" }}
          />
        )}
      </svg>

      <div className="relative z-10 mx-auto w-full max-w-[1600px]">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-5xl"
        >
          {/* Concept nodes — the three ideas, coming online in sequence */}
          <motion.div variants={item} className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-2">
            {concepts.map((concept, index) => (
              <div key={concept} className="flex items-center gap-3">
                <span
                  className="node-pulse h-1.5 w-1.5 rounded-full bg-accent-brand"
                  style={{ animationDelay: `${index * 0.55}s` }}
                  aria-hidden="true"
                />
                <span className="kicker text-muted">{concept}</span>
                {index < concepts.length - 1 && (
                  <span className="h-px w-6 bg-border md:w-10" aria-hidden="true" />
                )}
              </div>
            ))}
          </motion.div>

          {/* Headline — rises out of its own mask, line by line */}
          <h1 className="display-xl mb-7 max-w-4xl text-[2.5rem] sm:text-6xl md:text-7xl lg:text-[5.25rem]">
            <span className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
              <motion.span
                className="block"
                initial={{ y: "0.85em", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: DURATION.slow, ease: EASE.out, delay: 0.14 }}
              >
                Make your business
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
              <motion.span
                className="block"
                initial={{ y: "0.85em", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: DURATION.slow, ease: EASE.out, delay: 0.24 }}
              >
                impossible to ignore.
              </motion.span>
            </span>
          </h1>

          {/* Supporting copy */}
          <motion.p
            variants={item}
            className="mb-10 max-w-2xl text-lg leading-relaxed text-muted md:text-xl"
          >
            We handle design, websites, and automation. That means you get one
            partner instead of juggling three agencies.
          </motion.p>

          {/* CTAs — subtly magnetic on pointer devices */}
          <motion.div variants={item} className="flex flex-col gap-3 sm:flex-row">
            <Magnetic strength={4} className="inline-flex">
              <Button href="/contact" size="large" className="group">
                Start a Project
                <span
                  aria-hidden="true"
                  className="ml-0.5 inline-block transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Button>
            </Magnetic>
            <Button href="/work" variant="secondary" size="large">
              Explore Our Work
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Hairline rail closing the hero — the motif leaves with the fold */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="relative h-px w-full bg-border">
          <motion.div
            className="absolute inset-0 origin-left bg-foreground/25"
            initial={{ scaleX: reduce ? 1 : 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: reduce ? 0 : DURATION.moment, ease: EASE.inOut, delay: reduce ? 0 : 0.5 }}
          />
          {!reduce && (
            <span
              aria-hidden="true"
              className="signal-sweep hidden md:block"
              style={{ animationDuration: "8s", animationDelay: "1.8s" }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
