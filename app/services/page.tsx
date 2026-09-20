"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { ServiceDetailsModal } from "@/components/ui/ServiceDetailsModal";

const serviceCategories = [
  {
    id: "design",
    title: "Design",
    description:
      "Visual identity and creative work that makes your business unmistakable. From brand strategy to finished assets, we create design systems that work across every touchpoint.",
    services: [
      {
        name: "Brand Identity",
        description:
          "Complete brand systems including logo design, color palettes, typography, brand guidelines, and visual language that tells your story.",
      },
      {
        name: "Graphic Design",
        description:
          "Marketing materials, presentations, social media graphics, and print design that maintains consistency and elevates your brand.",
      },
      {
        name: "Campaign Creative",
        description:
          "Visual campaigns, advertising creative, social content, and promotional materials designed to capture attention and drive results.",
      },
      {
        name: "Packaging Design",
        description:
          "Product packaging, labels, and retail presentation that stands out on shelves and creates memorable unboxing experiences.",
      },
      {
        name: "Marketing Materials",
        description:
          "Brochures, flyers, business cards, signage, and all the collateral your business needs to make a great impression.",
      },
      {
        name: "Creative Direction",
        description:
          "Strategic art direction, visual strategy, photo direction, and brand evolution guidance to keep your brand moving forward.",
      },
    ],
  },
  {
    id: "digital",
    title: "Digital",
    description:
      "Websites, platforms and digital experiences that work beautifully and perform flawlessly. We build digital products that serve your business and delight your customers.",
    services: [
      {
        name: "Websites",
        description:
          "Custom websites built for performance, conversion, and growth. Responsive, fast, accessible, and built with modern technology.",
      },
      {
        name: "E-commerce",
        description:
          "Online stores with seamless shopping experiences, secure checkout, inventory management, and the tools you need to sell online.",
      },
      {
        name: "Web Applications",
        description:
          "Custom web apps, dashboards, internal tools, and platforms built to solve your specific business challenges.",
      },
      {
        name: "Digital Platforms",
        description:
          "Content platforms, membership sites, client portals, and community spaces that bring your audience together.",
      },
      {
        name: "Website Management",
        description:
          "Ongoing updates, maintenance, optimization, security, and support to keep your website performing at its best.",
      },
      {
        name: "Technical Consulting",
        description:
          "Architecture planning, technology selection, performance optimization, and technical strategy for digital projects.",
      },
    ],
  },
  {
    id: "intelligence",
    title: "Intelligence",
    description:
      "AI agents, automation and intelligent systems that make your business work smarter. We build custom solutions that handle the repetitive so you can focus on what matters.",
    services: [
      {
        name: "AI Agents",
        description:
          "Custom AI agents for customer service, support, sales, and engagement. Natural conversations that feel human and solve real problems.",
      },
      {
        name: "AI Assistants",
        description:
          "Internal AI assistants that help your team work faster—answering questions, finding information, and automating routine tasks.",
      },
      {
        name: "Business Automation",
        description:
          "Workflow automation, process optimization, and system integration that eliminates manual work and reduces errors.",
      },
      {
        name: "Intelligent Workflows",
        description:
          "Smart systems that handle repetitive tasks, route information, manage approvals, and keep your operations running smoothly.",
      },
      {
        name: "Business Systems",
        description:
          "CRM integration, data automation, API connections, and system orchestration that makes your tools work together.",
      },
      {
        name: "Custom AI Solutions",
        description:
          "Tailored AI solutions for unique business needs—from document processing to predictive analytics and beyond.",
      },
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <main className="pt-20">
        {/* Hero Section */}
        <section className="section-spacing container-padding">
          <div className="max-w-[1600px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            >
              <p className="text-sm uppercase tracking-wider text-subtle font-medium mb-6">
                Services
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-tight mb-8 max-w-4xl">
                Design · Digital · Intelligence
              </h1>
              <p className="text-lg md:text-xl text-muted leading-relaxed max-w-3xl">
                From brand identity to intelligent automation, we bring together
                the creative and technical capabilities most businesses need from
                multiple agencies.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Sections */}
        <div className="space-y-0">
          {serviceCategories.map((category, index) => (
            <ServiceCategory
              key={category.id}
              category={category}
              index={index}
            />
          ))}
        </div>

        {/* How We Work Section */}
        <section className="section-spacing container-padding bg-foreground text-background">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-tight mb-6">
                  How we work
                </h2>
                <p className="text-lg opacity-80 leading-relaxed">
                  Whether you need one service or all three, we adapt to your
                  needs. Work with us on a single project, or partner with us for
                  ongoing creative and technical support.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
                className="space-y-8"
              >
                <div className="border-l-2 border-background/20 pl-6">
                  <h3 className="text-xl font-medium mb-3">Project-Based</h3>
                  <p className="opacity-80 text-[15px] leading-relaxed">
                    Defined scope, clear timeline, fixed deliverables. Perfect for
                    launches, redesigns, and one-time builds.
                  </p>
                </div>

                <div className="border-l-2 border-background/20 pl-6">
                  <h3 className="text-xl font-medium mb-3">Ongoing Partnership</h3>
                  <p className="opacity-80 text-[15px] leading-relaxed">
                    Monthly retainer for continuous support, updates, optimization,
                    and new work as your business grows.
                  </p>
                </div>

                <div className="border-l-2 border-background/20 pl-6">
                  <h3 className="text-xl font-medium mb-3">Custom Arrangement</h3>
                  <p className="opacity-80 text-[15px] leading-relaxed">
                    Something unique to your situation. Let&apos;s talk about what you
                    need and find the right structure.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-spacing container-padding">
          <div className="max-w-[1600px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              className="border border-border rounded-3xl p-12 md:p-16 lg:p-20 text-center"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight mb-8 max-w-4xl mx-auto">
                Let&apos;s talk about your project.
              </h2>
              <p className="text-lg md:text-xl text-muted leading-relaxed mb-12 max-w-2xl mx-auto">
                Whether you need design, development, automation, or all three—
                we&apos;re ready to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/contact" size="large">
                  Start a Project
                </Button>
                <Button href="/work" variant="secondary" size="large" className="group">
                  View Our Work
                  <span
                    aria-hidden="true"
                    className="ml-0.5 inline-block transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function ServiceCategory({
  category,
  index,
}: {
  category: (typeof serviceCategories)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedService, setSelectedService] = useState<(typeof category.services)[number] | null>(null);

  return (
    <section
      ref={ref}
      id={category.id}
      className={`section-spacing container-padding ${
        index % 2 === 0 ? "bg-background" : "bg-border/20"
      }`}
    >
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-tight mb-6">
            {category.title}
          </h2>
          <p className="text-lg md:text-xl text-muted leading-relaxed max-w-3xl">
            {category.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {category.services.map((service, serviceIndex) => (
            <motion.button
              type="button"
              key={service.name}
              onClick={() => setSelectedService(service)}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.6,
                ease: [0.33, 1, 0.68, 1],
                delay: serviceIndex * 0.1,
              }}
              className="group w-full rounded-[8px] bg-background p-8 text-left hairline transition-colors duration-300 hover:hairline-strong"
            >
              <h3 className="display-lg mb-4 text-xl transition-colors duration-200 group-hover:text-accent-brand md:text-2xl">
                {service.name}
              </h3>
              <p className="text-[15px] leading-relaxed text-muted">
                {service.description}
              </p>
            </motion.button>
          ))}
        </div>
        <ServiceDetailsModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      </div>
    </section>
  );
}
