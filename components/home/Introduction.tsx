"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function Introduction() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-spacing container-padding">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left: Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            className="lg:col-span-4"
          >
            <p className="text-sm uppercase tracking-wider text-subtle font-medium">
              Complete Creative Partner
            </p>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
            className="lg:col-span-8"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-tight mb-6">
              A business shouldn&apos;t have to work with one company for branding,
              another for its website, and another for automation.
            </h2>
            <p className="text-lg md:text-xl text-muted leading-relaxed">
              My Grafix Media brings those capabilities together. We help
              businesses build complete systems—from how they look and
              communicate, to how they operate and grow.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
