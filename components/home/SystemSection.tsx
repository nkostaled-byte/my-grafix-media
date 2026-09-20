"use client";

import { Kicker } from "@/components/ui/Kicker";
import { AmbientGrid } from "@/components/motion/AmbientGrid";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SignalRail } from "@/components/motion/Signal";

const processSteps = [
  {
    number: "01",
    title: "Discover",
    description: "We learn how your business presents itself and operates today.",
  },
  {
    number: "02",
    title: "Design",
    description: "We shape the brand and experience customers respond to.",
  },
  {
    number: "03",
    title: "Build",
    description: "We build the website, product or platform that runs on it.",
  },
  {
    number: "04",
    title: "Connect",
    description: "We connect your tools and systems through APIs and shared data.",
  },
  {
    number: "05",
    title: "Automate",
    description: "We automate the routine so it handles itself, with intelligence added where it pays off.",
  },
  {
    number: "06",
    title: "Evolve",
    description: "The system improves with insights from running your business.",
  },
];

/**
 * The process. Uses the same connector motif as the rest of the site:
 * the rail draws itself and then carries a signal, so six steps read as
 * one continuous system rather than six cards.
 */
export function SystemSection() {
  return (
    <section className="section-spacing container-padding bg-background relative overflow-hidden">
      <AmbientGrid className="opacity-70" duration={100} />

      <div className="relative z-10 mx-auto max-w-[1600px]">
        {/* Section Header */}
        <Reveal className="mb-16 max-w-3xl md:mb-20">
          <Kicker className="mb-5">The My Grafix Process</Kicker>
          <h2 className="display-lg mb-6 text-3xl md:text-4xl lg:text-5xl">
            From idea to intelligent operation.
          </h2>
          <p className="text-base leading-relaxed text-muted md:text-lg">
            One team, one connected path — instead of handing design, build,
            and automation to three different vendors.
          </p>
        </Reveal>

        {/* Process Flow */}
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
            stagger={0.08}
            className="relative grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-6"
          >
            {processSteps.map((step) => (
              <RevealItem key={step.number} distance={14}>
                <div className="relative flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-surface mono-label text-foreground hairline relative z-10">
                    {step.number}
                  </span>
                  <span
                    className="node-pulse h-1.5 w-1.5 rounded-full bg-accent-brand"
                    style={{ animationDelay: `${Number(step.number) * 0.4}s` }}
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
