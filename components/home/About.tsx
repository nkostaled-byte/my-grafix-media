"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-spacing container-padding bg-background">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left: Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            className="lg:col-span-4"
          >
            <p className="text-sm uppercase tracking-wider text-subtle font-medium">
              About My Grafix Media
            </p>
          </motion.div>

          {/* Right: Content */}
          <div className="lg:col-span-8 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-tight mb-6">
                We believe ambitious businesses deserve a partner who can do more
                than one thing well.
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
              className="space-y-6 text-lg text-muted leading-relaxed"
            >
              <p>
                My Grafix Media combines design, digital development, and
                intelligent automation into one capable creative partner. We work
                with businesses that are ready to stand out, operate smarter, and
                grow confidently.
              </p>

              <p>
                Whether you need a complete brand system, a high-performance
                website, or AI agents that automate your workflows—we bring the
                expertise to make it happen without forcing you to manage multiple
                vendors.
              </p>

              <p>
                We're a South African agency building for businesses everywhere.
                That means world-class work, thoughtful execution, and the kind of
                partnership that helps you move forward.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.3 }}
              className="pt-6"
            >
              <div className="inline-flex items-center gap-3 text-subtle text-sm">
                <div className="w-2 h-2 bg-subtle rounded-full" />
                <span className="font-medium">
                  Built in South Africa. Designed for everywhere.
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.4 }}
              className="pt-8"
            >
              <Button href="/about" variant="secondary" size="large">
                Learn More About Us
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
