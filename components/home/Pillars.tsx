"use client";

import { Kicker } from "@/components/ui/Kicker";
import { PillarVisual } from "@/components/motion/PillarVisual";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

type Variant = "design" | "digital" | "intelligence";

const pillars: {
  id: Variant;
  title: string;
  description: string;
  services: string[];
}[] = [
  {
    id: "design",
    title: "Design",
    description:
      "How your business looks matters. We create brand identities, graphic design, campaigns, and marketing materials that people actually notice.",
    services: [
      "Brand Identity",
      "Graphic Design",
      "Campaign Creative",
      "Marketing Materials",
      "Packaging Design",
      "Creative Direction",
    ],
  },
  {
    id: "digital",
    title: "Digital",
    description:
      "A website that works. We build fast, reliable websites and platforms that your customers actually enjoy using.",
    services: [
      "Websites",
      "E-commerce",
      "Web Applications",
      "Digital Platforms",
      "Client Portals",
      "Website Management",
    ],
  },
  {
    id: "intelligence",
    title: "Intelligence",
    description:
      "Automation saves time. We build AI agents and systems that handle your repetitive tasks, so your team can focus on what actually needs a person.",
    services: [
      "AI Agents",
      "AI Assistants",
      "Business Automation",
      "Intelligent Workflows",
      "Business Systems",
      "Custom AI Solutions",
    ],
  },
];

export function Pillars() {
  return (
    <section className="section-spacing container-padding bg-background">
      <div className="mx-auto max-w-[1600px]">
        {/* Section Header */}
        <Reveal className="mb-16 md:mb-20">
          <Kicker className="mb-5">Three Capabilities. One Partner.</Kicker>
          <h2 className="display-lg max-w-3xl text-3xl md:text-4xl lg:text-5xl">
            Design · Digital · Intelligence
          </h2>
        </Reveal>

        {/* Pillars — hairline-ruled rows */}
        <div className="border-b border-border">
          {pillars.map((pillar, index) => (
            <PillarRow key={pillar.id} pillar={pillar} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PillarRow({
  pillar,
  index,
}: {
  pillar: (typeof pillars)[number];
  index: number;
}) {
  return (
    <div className="group border-t border-border">
      <div className="grid grid-cols-1 gap-8 py-12 transition-colors duration-300 md:py-16 lg:grid-cols-12 lg:gap-16">
        {/* Index, title, and this capability's own visual behaviour */}
        <Reveal className="lg:col-span-4" direction="up" distance={16}>
          <span className="mono-label mb-4 block text-subtle transition-colors duration-300 group-hover:text-accent-brand">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="display-lg mb-6 text-3xl transition-colors duration-300 group-hover:text-accent-brand md:text-4xl lg:text-5xl">
            {pillar.title}
          </h3>

          <div className="aspect-[16/9] max-w-[320px] overflow-hidden rounded-[8px] bg-surface-raised p-4 hairline transition-shadow duration-300 group-hover:shadow-[0_0_0_1px_rgb(var(--color-foreground)/0.14)]">
            <PillarVisual variant={pillar.id} />
          </div>
        </Reveal>

        {/* Description and capabilities */}
        <div className="lg:col-span-8">
          <Reveal delay={0.06}>
            <p className="mb-7 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              {pillar.description}
            </p>
          </Reveal>

          <RevealGroup
            stagger={0.04}
            className="grid grid-cols-2 gap-px overflow-hidden rounded-[8px] border border-border bg-border md:grid-cols-3"
          >
            {pillar.services.map((service) => (
              <RevealItem key={service} distance={8}>
                <div className="mono-label h-full bg-surface px-4 py-3 text-muted transition-colors duration-200 hover:text-foreground">
                  {service}
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </div>
  );
}
