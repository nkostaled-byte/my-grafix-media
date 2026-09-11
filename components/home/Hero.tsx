"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center container-padding pt-32 pb-20">
      <div className="max-w-[1600px] mx-auto w-full">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-5xl"
        >
          {/* Brand Statement */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            className="mb-8"
          >
            <p className="text-muted text-sm md:text-base font-medium tracking-wider uppercase">
              Design · Digital · Intelligence
            </p>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.05] mb-8"
          >
            Make your business impossible to ignore.
          </motion.h1>

          {/* Supporting Copy */}
          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            className="text-lg md:text-xl lg:text-2xl text-muted leading-relaxed max-w-3xl mb-12"
          >
            My Grafix Media combines design, digital experiences and intelligent
            systems to help ambitious businesses stand out, work smarter and
            move forward.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button href="/contact" size="large">
              Start a Project
            </Button>
            <Button href="/work" variant="secondary" size="large">
              Explore Our Work
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-muted rounded-full flex items-start justify-center p-2"
          >
            <motion.div className="w-1.5 h-1.5 bg-muted rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
