"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Kicker } from "@/components/ui/Kicker";
import { Button } from "@/components/ui/Button";
import { ThemeProjectImage } from "@/components/ui/ThemeProjectImage";
import { PointerShift } from "@/components/motion/Pointer";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { EASE, VIEWPORT } from "@/lib/motion";

const allProjects = [
  {
    id: "brand-identity-platform",
    title: "Brand Identity & Digital Platform",
    client: "Premium Retail Brand",
    category: "Design · Digital",
    description:
      "Complete brand system and digital presence. From logo design to fully responsive website, creating a cohesive identity that stands out in a competitive market.",
    image: "/images/projects/brand-identity-website.svg",
    year: "2026",
  },
  {
    id: "ecommerce-platform",
    title: "E-commerce Experience",
    client: "Online Retailer",
    category: "Digital",
    description:
      "High-performance e-commerce platform built for scale and conversion. Custom shopping experience with seamless checkout, inventory management, and analytics.",
    image: "/images/projects/ecommerce-platform.svg",
    year: "2026",
  },
  {
    id: "ai-automation-system",
    title: "AI Workflow Automation",
    client: "Technology Company",
    category: "Intelligence",
    description:
      "Intelligent automation system that handles repetitive tasks and saves hundreds of hours monthly. Custom AI agents for customer service, data processing, and reporting.",
    image: "/images/projects/ai-automation-dashboard.svg",
    year: "2026",
  },
  {
    id: "mobile-app-development",
    title: "Mobile Application",
    client: "Tech Startup",
    category: "Digital",
    description:
      "Native mobile application with seamless user experience. Built for iOS and Android with offline capabilities, push notifications, and real-time sync.",
    image: "/images/projects/mobile-app.svg",
    year: "2026",
  },
  {
    id: "brand-guidelines-system",
    title: "Brand Guidelines & Identity System",
    client: "Growing Business",
    category: "Design",
    description:
      "Comprehensive brand guidelines system covering logo usage, typography, color palette, imagery style, and application examples across all touchpoints.",
    image: "/images/projects/brand-guidelines.svg",
    year: "2026",
  },
  {
    id: "crm-platform",
    title: "CRM Dashboard Platform",
    client: "Sales Organization",
    category: "Digital · Intelligence",
    description:
      "Custom CRM platform with data visualization, customer insights, automated workflows, and intelligent lead scoring powered by machine learning.",
    image: "/images/projects/crm-dashboard.svg",
    year: "2025",
  },
  {
    id: "landing-page-optimization",
    title: "High-Converting Landing Page",
    client: "B2B Software Company",
    category: "Digital",
    description:
      "Conversion-optimized landing page with A/B testing, performance optimization, and strategic copywriting that increased conversions by 340%.",
    image: "/images/projects/landing-page.svg",
    year: "2025",
  },
];

export default function WorkPage() {
  return (
    <>
      <main className="pt-20">
        <section className="section-spacing container-padding">
          <div className="mx-auto max-w-[1600px]">
            <Reveal className="max-w-4xl">
              <Kicker className="mb-5">Our Work</Kicker>
              <h1 className="display-lg mb-7 text-3xl md:text-5xl lg:text-6xl">
                Design, Digital, and Intelligence projects that make businesses
                impossible to ignore.
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-muted md:text-xl">
                From brand identities to AI automation, we build complete systems
                that help ambitious businesses stand out and work smarter.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section-spacing container-padding">
          <div className="mx-auto max-w-[1600px]">
            <Reveal className="mb-14 flex flex-col gap-6 border-b border-border pb-6 md:mb-20 md:flex-row md:items-end md:justify-between">
              <div>
                <Kicker className="mb-4">Selected Work</Kicker>
                <h2 className="display-lg text-3xl md:text-4xl lg:text-5xl">
                  Recent Projects
                </h2>
              </div>
              <span className="mono-label text-subtle">{allProjects.length} projects</span>
            </Reveal>

            <div className="space-y-20 md:space-y-28">
              {allProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="section-spacing container-padding bg-foreground text-background">
          <div className="mx-auto max-w-[1600px]">
            <Reveal className="max-w-2xl">
              <Kicker className="mb-5 text-background/55">Ready to Start?</Kicker>
              <h2 className="display-lg mb-6 text-3xl md:text-5xl">
                Let&apos;s build something brilliant together.
              </h2>
              <p className="mb-8 max-w-xl text-base leading-relaxed opacity-75 md:text-lg">
                Tell us what you are building and we&apos;ll help you find the right
                combination of design, digital and intelligence.
              </p>
              <Button href="/contact" variant="inverse" size="large">
                Start a Project
              </Button>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof allProjects)[number];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <Reveal distance={22}>
      <Link
        href={`/work/${project.id}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group block"
        aria-label={`View ${project.title} case study`}
      >
        <div
          className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12 ${
            isEven ? "" : "lg:grid-flow-dense"
          }`}
        >
          <div
            className={`relative overflow-hidden rounded-[8px] bg-surface-raised hairline card-hover lg:col-span-7 ${
              isEven ? "" : "lg:col-start-6"
            }`}
          >
            <div className="relative aspect-[16/10]">
              <PointerShift className="absolute inset-0" strength={10}>
                <motion.div
                  className="relative h-full w-full"
                  animate={{ scale: isHovered ? 1.03 : 1 }}
                  transition={{ duration: 0.5, ease: EASE.out }}
                >
                  <ThemeProjectImage
                    src={project.image}
                    alt={`${project.title} - ${project.description}`}
                    className="object-contain p-6"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
                  />
                </motion.div>
              </PointerShift>
              <motion.div
                aria-hidden="true"
                className="absolute inset-0 origin-top bg-background"
                initial={{ scaleY: 1 }}
                whileInView={{ scaleY: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.85, ease: EASE.inOut, delay: 0.05 }}
              />
            </div>
          </div>

          <RevealGroup
            stagger={0.06}
            className={`space-y-5 lg:col-span-5 ${
              isEven ? "" : "lg:col-start-1 lg:row-start-1"
            }`}
          >
            <RevealItem>
              <p className="mono-label mb-3 text-subtle">{project.category}</p>
              <h3 className="display-lg mb-3 text-2xl transition-colors duration-300 group-hover:text-accent-brand md:text-3xl lg:text-4xl">
                {project.title}
              </h3>
              <p className="mono-label text-subtle">{project.client}</p>
            </RevealItem>

            <RevealItem>
              <p className="text-sm leading-relaxed text-muted md:text-base">
                {project.description}
              </p>
            </RevealItem>

            <RevealItem>
              <div className="flex items-center gap-4 pt-1">
                <span className="mono-label text-subtle">{project.year}</span>
                <span className="mono-label flex items-center gap-2 text-foreground transition-colors duration-200 group-hover:text-accent-brand">
                  View Case Study
                  <motion.span
                    aria-hidden="true"
                    animate={isHovered ? { x: 3 } : { x: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    →
                  </motion.span>
                </span>
              </div>
            </RevealItem>
          </RevealGroup>
        </div>
      </Link>
    </Reveal>
  );
}
