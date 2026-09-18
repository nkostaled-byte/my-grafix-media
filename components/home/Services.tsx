"use client";

import { Kicker } from "@/components/ui/Kicker";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

const serviceCategories = [
  {
    id: "design",
    title: "Design",
    description:
      "Brand identity, graphic design, and campaigns. We create visuals that stick.",
    services: [
      {
        name: "Brand Identity",
        description: "Logo, colors, fonts, brand guidelines",
      },
      {
        name: "Graphic Design",
        description: "Marketing materials, presentations, print",
      },
      {
        name: "Campaign Creative",
        description: "Social content, ads, visual campaigns",
      },
      {
        name: "Packaging Design",
        description: "Product packaging, labels, retail",
      },
      {
        name: "Marketing Materials",
        description: "Brochures, flyers, business cards, signage",
      },
      {
        name: "Creative Direction",
        description: "Art direction, visual strategy, brand updates",
      },
    ],
  },
  {
    id: "digital",
    title: "Digital",
    description:
      "Websites and platforms that load fast and work reliably.",
    services: [
      {
        name: "Websites",
        description: "Custom websites built for speed and conversions",
      },
      {
        name: "E-commerce",
        description: "Online stores with working checkout",
      },
      {
        name: "Web Applications",
        description: "Custom apps, dashboards, internal tools",
      },
      {
        name: "Digital Platforms",
        description: "Content platforms, membership sites, portals",
      },
      {
        name: "Client Portals",
        description: "Secure client access, project management",
      },
      {
        name: "Website Management",
        description: "Updates, maintenance, performance work",
      },
    ],
  },
  {
    id: "intelligence",
    title: "Intelligence",
    description:
      "AI agents and automation that handle repetitive work.",
    services: [
      {
        name: "AI Agents",
        description: "AI for customer service, support, sales",
      },
      {
        name: "AI Assistants",
        description: "Internal AI for team productivity",
      },
      {
        name: "Business Automation",
        description: "Workflow automation, process optimization",
      },
      {
        name: "Intelligent Workflows",
        description: "Systems that handle repetitive tasks",
      },
      {
        name: "Business Systems",
        description: "CRM integration, data automation, connections",
      },
      {
        name: "Custom AI Solutions",
        description: "AI built for your specific needs",
      },
    ],
  },
];

/**
 * LEVEL 1/2 — service rows.
 *
 * Hover is a state change, not a performance: the index shifts to the
 * accent, the name nudges a pixel, and a rule travels in under the row.
 * Nothing scales, nothing bounces.
 */
export function Services() {
  return (
    <section className="section-spacing container-padding bg-background">
      <div className="mx-auto max-w-[1600px]">
        {/* Section Header */}
        <Reveal className="mb-16 max-w-3xl md:mb-20">
          <Kicker className="mb-5">What We Do</Kicker>
          <h2 className="display-lg mb-6 text-3xl md:text-4xl lg:text-5xl">
            Design. Websites. Automation.
          </h2>
          <p className="text-base leading-relaxed text-muted md:text-lg">
            Most businesses buy these from three different vendors. We do all three.
          </p>
        </Reveal>

        {/* Service Categories */}
        <div className="space-y-16 md:space-y-20">
          {serviceCategories.map((category, categoryIndex) => (
            <ServiceCategory
              key={category.id}
              category={category}
              categoryIndex={categoryIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCategory({
  category,
  categoryIndex,
}: {
  category: (typeof serviceCategories)[number];
  categoryIndex: number;
}) {
  return (
    <Reveal
      className="grid grid-cols-1 gap-8 border-t border-border pt-10 lg:grid-cols-12 lg:gap-16"
      distance={16}
    >
      {/* Category Header */}
      <div className="lg:col-span-4">
        <span className="mono-label mb-4 block text-subtle">
          {String(categoryIndex + 1).padStart(2, "0")}
        </span>
        <h3 className="display-lg mb-4 text-2xl md:text-3xl">{category.title}</h3>
        <p className="text-sm leading-relaxed text-muted">
          {category.description}
        </p>
      </div>

      {/* Service rows */}
      <div className="lg:col-span-8">
        <RevealGroup stagger={0.04}>
          {category.services.map((service, serviceIndex) => (
            <RevealItem key={service.name} distance={8}>
              <div
                className="group relative block w-full border-b border-border text-left last:border-b-0"
              >
                {/* Rule that travels in under the row on hover */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent-brand transition-transform duration-300 ease-out group-hover:scale-x-100"
                />
                <div className="flex items-center gap-4 py-4">
                  <span className="mono-label w-5 shrink-0 text-subtle transition-colors duration-200 group-hover:text-accent-brand">
                    {String(serviceIndex + 1).padStart(2, "0")}
                  </span>

                  <span className="text-base font-medium transition-colors duration-200 group-hover:text-accent-brand md:text-lg">
                    {service.name}
                  </span>

                  <span className="ml-auto hidden text-right text-sm text-subtle md:block md:max-w-md">
                    {service.description}
                  </span>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Reveal>
  );
}
