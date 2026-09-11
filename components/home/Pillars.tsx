"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const pillars = [
  {
    id: "design",
    title: "Design",
    description:
      "Shape how your business looks and communicates. From brand identity to creative campaigns, we create visual systems that make you unmistakable.",
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
      "Build your digital presence and experiences. From websites to platforms, we create digital products that work beautifully and perform flawlessly.",
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
      "Make your business work smarter. From AI agents to automation, we build intelligent systems that handle the repetitive so you can focus on what matters.",
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });

  return (
    <section ref={ref} className="section-spacing container-padding bg-background">
      <div className="max-w-[1600px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="mb-20 md:mb-32"
        >
          <p className="text-sm uppercase tracking-wider text-subtle font-medium mb-6">
            Three Capabilities. One Partner.
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight max-w-4xl">
            Design · Digital · Intelligence
          </h2>
        </motion.div>

        {/* Pillars Grid */}
        <div className="space-y-0">
          {pillars.map((pillar, index) => (
            <PillarItem
              key={pillar.id}
              pillar={pillar}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PillarItem({
  pillar,
  index,
  isInView,
}: {
  pillar: (typeof pillars)[0];
  index: number;
  isInView: boolean;
}) {
  const itemRef = useRef(null);
  const isItemInView = useInView(itemRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 40 }}
      animate={
        isInView && isItemInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
      }
      transition={{
        duration: 0.8,
        ease: [0.33, 1, 0.68, 1],
        delay: index * 0.2,
      }}
      className="border-t border-border group"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 py-16 md:py-20 lg:py-24 transition-colors duration-500 hover:bg-border/20">
        {/* Left: Title & Number */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-baseline gap-4">
            <span className="text-[80px] md:text-[100px] lg:text-[120px] font-medium leading-none text-border group-hover:text-subtle transition-colors duration-500">
              0{index + 1}
            </span>
          </div>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight">
            {pillar.title}
          </h3>
        </div>

        {/* Right: Description & Services */}
        <div className="lg:col-span-8 space-y-8">
          <p className="text-lg md:text-xl text-muted leading-relaxed max-w-2xl">
            {pillar.description}
          </p>

          {/* Services Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
            {pillar.services.map((service, serviceIndex) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, x: -10 }}
                animate={
                  isItemInView
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -10 }
                }
                transition={{
                  duration: 0.5,
                  delay: index * 0.2 + serviceIndex * 0.05,
                }}
                className="text-[15px] text-subtle group-hover:text-muted transition-colors duration-300"
              >
                {service}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
