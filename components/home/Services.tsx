"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const serviceCategories = [
  {
    id: "design",
    title: "Design",
    description:
      "Visual identity and creative work that makes your business unmistakable.",
    services: [
      {
        name: "Brand Identity",
        description: "Logo, color systems, typography, brand guidelines",
      },
      {
        name: "Graphic Design",
        description: "Marketing materials, presentations, print design",
      },
      {
        name: "Campaign Creative",
        description: "Visual campaigns, advertising creative, social content",
      },
      {
        name: "Packaging Design",
        description: "Product packaging, labels, retail presentation",
      },
      {
        name: "Marketing Materials",
        description: "Brochures, flyers, business cards, signage",
      },
      {
        name: "Creative Direction",
        description: "Art direction, visual strategy, brand evolution",
      },
    ],
  },
  {
    id: "digital",
    title: "Digital",
    description:
      "Websites, platforms and digital experiences that work beautifully and perform flawlessly.",
    services: [
      {
        name: "Websites",
        description: "Custom websites built for performance and conversion",
      },
      {
        name: "E-commerce",
        description: "Online stores with seamless shopping experiences",
      },
      {
        name: "Web Applications",
        description: "Custom web apps, dashboards, internal tools",
      },
      {
        name: "Digital Platforms",
        description: "Content platforms, membership sites, portals",
      },
      {
        name: "Client Portals",
        description: "Secure client access, project management interfaces",
      },
      {
        name: "Website Management",
        description: "Ongoing updates, maintenance, optimization",
      },
    ],
  },
  {
    id: "intelligence",
    title: "Intelligence",
    description:
      "AI agents, automation and intelligent systems that make your business work smarter.",
    services: [
      {
        name: "AI Agents",
        description: "Custom AI agents for customer service, support, sales",
      },
      {
        name: "AI Assistants",
        description: "Internal AI assistants for team productivity",
      },
      {
        name: "Business Automation",
        description: "Workflow automation, process optimization",
      },
      {
        name: "Intelligent Workflows",
        description: "Smart systems that handle repetitive tasks",
      },
      {
        name: "Business Systems",
        description: "CRM integration, data automation, system connections",
      },
      {
        name: "Custom AI Solutions",
        description: "Tailored AI solutions for unique business needs",
      },
    ],
  },
];

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
            What We Do
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight max-w-4xl mb-8">
            Complete creative and technical capabilities.
          </h2>
          <p className="text-lg md:text-xl text-muted leading-relaxed max-w-3xl">
            From brand identity to intelligent automation, we bring together the
            skills most businesses need from multiple agencies.
          </p>
        </motion.div>

        {/* Service Categories */}
        <div className="space-y-24 md:space-y-32">
          {serviceCategories.map((category, categoryIndex) => (
            <ServiceCategory
              key={category.id}
              category={category}
              categoryIndex={categoryIndex}
              isInView={isInView}
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
  isInView,
}: {
  category: (typeof serviceCategories)[0];
  categoryIndex: number;
  isInView: boolean;
}) {
  const categoryRef = useRef(null);
  const isCategoryInView = useInView(categoryRef, {
    once: true,
    margin: "-100px",
  });

  return (
    <motion.div
      ref={categoryRef}
      initial={{ opacity: 0, y: 40 }}
      animate={
        isInView && isCategoryInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 40 }
      }
      transition={{
        duration: 0.8,
        ease: [0.33, 1, 0.68, 1],
        delay: categoryIndex * 0.1,
      }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16"
    >
      {/* Category Header */}
      <div className="lg:col-span-4">
        <h3 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
          {category.title}
        </h3>
        <p className="text-[15px] text-muted leading-relaxed">
          {category.description}
        </p>
      </div>

      {/* Services List */}
      <div className="lg:col-span-8">
        <div className="space-y-8">
          {category.services.map((service, serviceIndex) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, x: -20 }}
              animate={
                isCategoryInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
              }
              transition={{
                duration: 0.6,
                ease: [0.33, 1, 0.68, 1],
                delay: categoryIndex * 0.1 + serviceIndex * 0.05,
              }}
              className="border-b border-border pb-8 last:border-0 last:pb-0 group hover:border-foreground transition-colors duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                <h4 className="text-lg md:text-xl font-medium group-hover:text-muted transition-colors duration-300">
                  {service.name}
                </h4>
                <p className="text-[15px] text-subtle md:text-right md:max-w-md">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
