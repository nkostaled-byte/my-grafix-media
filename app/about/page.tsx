"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

const values = [
  {
    title: "Quality Over Quantity",
    description:
      "We'd rather do fewer projects exceptionally well than many projects adequately. Every project gets our full attention and expertise.",
  },
  {
    title: "Complete Solutions",
    description:
      "We believe businesses deserve partners who can handle more than one thing. That's why we bring design, development, and automation together.",
  },
  {
    title: "Long-Term Thinking",
    description:
      "We&apos;re not interested in quick wins that create problems later. We build systems and relationships designed to last.",
  },
  {
    title: "Human First",
    description:
      "Technology serves people, not the other way around. We build tools and experiences that make life better, not more complicated.",
  },
];

const capabilities = [
  {
    area: "Design",
    skills: [
      "Brand Strategy",
      "Visual Identity",
      "Graphic Design",
      "Creative Direction",
      "Print & Digital Design",
      "Packaging Design",
    ],
  },
  {
    area: "Digital",
    skills: [
      "Web Development",
      "E-commerce",
      "Web Applications",
      "Platform Development",
      "Technical Architecture",
      "Performance Optimization",
    ],
  },
  {
    area: "Intelligence",
    skills: [
      "AI Agents",
      "Automation Systems",
      "Workflow Optimization",
      "System Integration",
      "Custom AI Solutions",
      "Process Automation",
    ],
  },
];

export default function AboutPage() {
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
                About My Grafix Media
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-tight mb-12 max-w-5xl">
                We&apos;re a creative partner for ambitious businesses.
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="container-padding pb-32">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                className="lg:col-span-4"
              >
                <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-6">
                  Our Philosophy
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
                className="lg:col-span-8 space-y-6 text-lg text-muted leading-relaxed"
              >
                <p>
                  Most businesses need design work, a website, and systems to help
                  them operate efficiently. But those capabilities usually live in
                  different agencies, creating gaps, delays, and inconsistency.
                </p>

                <p>
                  My Grafix Media was built to solve that problem. We bring
                  together design, digital development, and intelligent automation
                  so businesses can work with one capable partner instead of
                  coordinating between multiple vendors.
                </p>

                <p>
                  We work with businesses that are ready to stand out, operate
                  smarter, and grow confidently. Whether you need a complete brand
                  system, a high-performance website, or AI agents that automate
                  your workflows—we have the expertise to make it happen.
                </p>

                <p>
                  We work with ambitious businesses everywhere. That means
                  world-class work, thoughtful execution, and the kind of
                  partnership that helps you move forward.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="section-spacing container-padding bg-border/20">
          <div className="max-w-[1600px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              className="mb-16 md:mb-24"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight mb-6">
                What We Believe
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {values.map((value, index) => (
                <ValueCard key={value.title} value={value} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="section-spacing container-padding">
          <div className="max-w-[1600px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              className="mb-16 md:mb-24"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight mb-6">
                What We Do
              </h2>
              <p className="text-lg md:text-xl text-muted leading-relaxed max-w-3xl">
                Three core capabilities that most businesses need, delivered by
                one partner who understands how they work together.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {capabilities.map((capability, index) => (
                <CapabilityCard
                  key={capability.area}
                  capability={capability}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="section-spacing container-padding bg-foreground text-background">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              >
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight mb-8">
                  Global reach,
                  <br />
                  local expertise.
                </h2>
                <p className="text-lg opacity-80 leading-relaxed mb-8">
                  We work with businesses across the globe. Location doesn&apos;t
                  limit capability—great work can come from anywhere, for anyone.
                </p>
                <p className="text-lg opacity-80 leading-relaxed">
                  Whether you&apos;re in New York, London, Tokyo, or anywhere
                  else, we bring the same level of quality, professionalism, and
                  partnership to every project.
                </p>
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
                Let&apos;s work together.
              </h2>
              <p className="text-lg md:text-xl text-muted leading-relaxed mb-12 max-w-2xl mx-auto">
                Whether you&apos;re starting from scratch or looking to elevate what
                you already have, we&apos;re ready to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/contact" size="large">
                  Start a Project
                </Button>
                <Button href="/services" variant="secondary" size="large">
                  View Services
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

function ValueCard({
  value,
  index,
}: {
  value: (typeof values)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.6,
        ease: [0.33, 1, 0.68, 1],
        delay: index * 0.1,
      }}
      className="border border-border rounded-2xl p-8 bg-background"
    >
      <h3 className="text-xl md:text-2xl font-medium mb-4">{value.title}</h3>
      <p className="text-[15px] text-muted leading-relaxed">
        {value.description}
      </p>
    </motion.div>
  );
}

function CapabilityCard({
  capability,
  index,
}: {
  capability: (typeof capabilities)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.6,
        ease: [0.33, 1, 0.68, 1],
        delay: index * 0.1,
      }}
    >
      <h3 className="text-3xl md:text-4xl font-medium mb-6">
        {capability.area}
      </h3>
      <ul className="space-y-3">
        {capability.skills.map((skill) => (
          <li key={skill} className="text-[15px] text-muted flex items-start">
            <span className="mr-3 mt-1.5">•</span>
            {skill}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
