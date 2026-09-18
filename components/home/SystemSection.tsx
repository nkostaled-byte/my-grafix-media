"use client";

import { Kicker } from "@/components/ui/Kicker";
import { AmbientGrid } from "@/components/motion/AmbientGrid";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SignalRail } from "@/components/motion/Signal";

const systemSteps = [
  {
    number: "01",
    title: "Brand",
    description: "Create a visual identity that makes your business unmistakable.",
  },
  {
    number: "02",
    title: "Website",
    description: "Build digital experiences that convert visitors into customers.",
  },
  {
    number: "03",
    title: "Intelligence",
    description: "Automate workflows so you can focus on what matters.",
  },
  {
    number: "04",
    title: "Growth",
    description: "Scale confidently with systems built to grow with you.",
  },
];

/**
 * LEVEL 2 — the ecosystem.
 *
 * The connector is the site's continuity motif: it draws itself and then
 * carries a signal, so this reads as one system rather than four cards
 * on a background.
 */
export function SystemSection() {
  return (
    <section className="section-spacing container-padding bg-background relative overflow-hidden">
      <AmbientGrid className="opacity-70" duration={100} />

      <div className="relative z-10 mx-auto max-w-[1600px]">
        {/* Section Header */}
        <Reveal className="mb-16 max-w-3xl md:mb-20">
          <Kicker className="mb-5">The My Grafix System</Kicker>
          <h2 className="display-lg mb-6 text-3xl md:text-4xl lg:text-5xl">
            Complete systems, not isolated assets.
          </h2>
          <p className="text-base leading-relaxed text-muted md:text-lg">
            We help businesses build the infrastructure around how they present
            themselves, operate, and grow—from first impression to intelligent
            operation.
          </p>
        </Reveal>

        {/* System Flow */}
        <div className="relative">
          {/* Connector — draws, then carries the signal */}
          <SignalRail
            className="absolute left-5 right-5 top-5 hidden lg:block"
            flow={false}
            flowDuration={7}
            delay={0.35}
            endAt={0.95}
          />

          <RevealGroup
            stagger={0.09}
            className="relative grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8"
          >
            {systemSteps.map((step) => (
              <RevealItem key={step.number} distance={14}>
                <div className="relative flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-surface mono-label text-foreground hairline relative z-10">
                    {step.number}
                  </span>
                  <span
                    className="node-pulse h-1.5 w-1.5 rounded-full bg-accent-brand"
                    style={{ animationDelay: `${Number(step.number) * 0.5}s` }}
                    aria-hidden="true"
                  />
                </div>

                <h3 className="mb-3 mt-6 text-xl md:text-2xl">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* Bottom line */}
        <Reveal
          className="mt-16 border-t border-border pt-8 md:mt-20"
          delay={0.1}
        >
          <p className="text-base text-muted md:text-lg">
            One partner. From first impression to intelligent operation.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
