"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-spacing container-padding bg-foreground text-background">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left: Main Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            className="lg:col-span-6"
          >
            <p className="text-sm uppercase tracking-wider opacity-70 font-medium mb-6">
              Creative Partnership
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight mb-8">
              One partner. From first impression to intelligent operation.
            </h2>
            <p className="text-lg md:text-xl opacity-80 leading-relaxed mb-10">
              Most businesses work with a designer for branding, a developer for
              their website, and someone else for automation. That creates gaps,
              delays, and inconsistency.
            </p>
            <Button
              href="/contact"
              variant="secondary"
              size="large"
              className="border-background/20 hover:border-background hover:bg-background/10 text-background"
            >
              Start a Conversation
            </Button>
          </motion.div>

          {/* Right: Benefits */}
          <div className="lg:col-span-6">
            <div className="space-y-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
                  }
                  transition={{
                    duration: 0.8,
                    ease: [0.33, 1, 0.68, 1],
                    delay: index * 0.1,
                  }}
                  className="border-l-2 border-background/20 pl-6 hover:border-background/60 transition-colors duration-300"
                >
                  <h3 className="text-xl md:text-2xl font-medium mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-[15px] opacity-80 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
