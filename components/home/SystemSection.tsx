"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

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

export function SystemSection() {
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
          className="mb-20 md:mb-32 text-center max-w-4xl mx-auto"
        >
          <p className="text-sm uppercase tracking-wider text-subtle font-medium mb-6">
            The My Grafix System
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight mb-8">
            Complete systems, not isolated assets.
          </h2>
          <p className="text-lg md:text-xl text-muted leading-relaxed">
            We help businesses build the infrastructure around how they present
            themselves, operate, and grow—from first impression to intelligent
            operation.
          </p>
        </motion.div>

        {/* System Flow */}
        <div className="relative">
          {/* Connection Lines - Desktop */}
          <div className="hidden lg:block absolute top-0 left-0 right-0 h-full pointer-events-none">
            <svg
              className="w-full h-full"
              viewBox="0 0 1200 400"
              fill="none"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M 150 200 Q 400 100, 450 200 T 750 200 T 1050 200"
                stroke="rgb(229 229 229)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
              />
            </svg>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative">
            {systemSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{
                  duration: 0.8,
                  ease: [0.33, 1, 0.68, 1],
                  delay: index * 0.15,
                }}
                className="relative"
              >
                {/* Number Badge */}
                <div className="w-16 h-16 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-medium mb-6 relative z-10">
                  {step.number}
                </div>

                {/* Content */}
                <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-4">
                  {step.title}
                </h3>
                <p className="text-[15px] text-muted leading-relaxed">
                  {step.description}
                </p>

                {/* Arrow - Mobile */}
                {index < systemSteps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-8">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-border"
                    >
                      <path
                        d="M12 5V19M12 19L5 12M12 19L19 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.8,
            ease: [0.33, 1, 0.68, 1],
            delay: 0.8,
          }}
          className="mt-20 md:mt-32 text-center"
        >
          <p className="text-lg md:text-xl text-muted mb-8">
            One partner. From first impression to intelligent operation.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
