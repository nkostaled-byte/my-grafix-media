"use client";

import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

const benefits = [
  {
    title: "One Point of Contact",
    description:
      "No more coordinating between multiple agencies. One partner who understands your entire business.",
  },
  {
    title: "Faster Execution",
    description:
      "When design, development, and automation live under one roof, projects move faster.",
  },
  {
    title: "Cohesive Results",
    description:
      "Your brand, website, and systems work together as one integrated experience.",
  },
  {
    title: "Strategic Continuity",
    description:
      "We understand your business deeply and can advise on what comes next.",
  },
];

export function Partnership() {
  return (
    <section className="section-spacing container-padding bg-foreground text-background">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Left: Main Message */}
          <Reveal className="lg:col-span-6" direction="up" distance={16}>
            <p className="kicker mb-5 text-background/55">Creative Partnership</p>
            <h2 className="display-lg mb-6 text-3xl md:text-4xl lg:text-5xl">
              One partner who gets the whole picture.
            </h2>
            <p className="mb-8 max-w-xl text-base leading-relaxed opacity-75 md:text-lg">
              When design, development, and automation are spread across three different vendors, nothing connects. We bring it all together under one roof.
            </p>
            <Button href="/contact" variant="inverse" size="large" className="group">
              Start a Conversation
              <span
                aria-hidden="true"
                className="ml-0.5 inline-block transition-transform duration-200 ease-out group-hover:translate-x-0.5"
              >
                →
              </span>
            </Button>
          </Reveal>

          {/* Right: Benefits — hairline rows, no accent rails */}
          <RevealGroup
            stagger={0.07}
            className="border-t border-background/15 lg:col-span-6 lg:col-start-8"
          >
            {benefits.map((benefit, index) => (
              <RevealItem key={benefit.title} distance={10}>
                <div className="group border-b border-background/15 py-6 transition-colors duration-300 last:border-b-0 hover:border-background/35">
                  <div className="flex items-baseline gap-5">
                    <span className="mono-label shrink-0 text-background/45 transition-colors duration-300 group-hover:text-background/80">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="mb-2 text-base font-medium transition-transform duration-300 ease-out group-hover:translate-x-0.5 md:text-lg">
                        {benefit.title}
                      </h3>
                      <p className="text-sm leading-relaxed opacity-70">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
