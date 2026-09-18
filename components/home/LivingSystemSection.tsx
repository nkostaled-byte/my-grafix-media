"use client";

import { AmbientGrid } from "@/components/motion/AmbientGrid";
import { Kicker } from "@/components/ui/Kicker";
import { LivingSystem } from "@/components/motion/LivingSystem";
import { Reveal } from "@/components/motion/Reveal";

/**
 * LEVEL 3 — the section that carries the site's core claim:
 * systems keep working whether or not someone is watching them.
 *
 * Placed after Services so the reader meets the capabilities first and
 * then sees how they operate together.
 */
export function LivingSystemSection() {
  return (
    <section className="section-spacing container-padding bg-background relative overflow-hidden">
      <AmbientGrid className="opacity-60" duration={110} />

      <div className="relative z-10 mx-auto max-w-[1600px]">
        <Reveal className="mb-14 max-w-3xl md:mb-16">
          <Kicker className="mb-5">Systems That Work While You Work</Kicker>
          <h2 className="display-lg mb-6 text-3xl md:text-4xl lg:text-5xl">
            Intelligence, moving through the business.
          </h2>
          <p className="text-base leading-relaxed text-muted md:text-lg">
            A website, an AI agent, the systems behind it and the people who
            own the outcome — connected, so the routine handles itself and the
            important still reaches a human.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <LivingSystem />
        </Reveal>
      </div>
    </section>
  );
}
