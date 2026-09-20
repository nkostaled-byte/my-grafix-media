"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Kicker } from "@/components/ui/Kicker";
import { ThemeProjectImage } from "@/components/ui/ThemeProjectImage";
import { PointerShift } from "@/components/motion/Pointer";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { EASE, VIEWPORT } from "@/lib/motion";

// Featured projects on homepage
const projects = [
  {
    id: "brand-identity-platform",
    title: "Brand Identity & Digital Platform",
    client: "Featured Project",
    category: "Design · Digital",
    description:
      "Complete brand system and website. Logo design through a fully responsive site, all working together visually.",
    image: "/images/projects/brand-identity-website.svg",
    href: "/work/brand-identity-platform",
  },
  {
    id: "ecommerce-platform",
    title: "E-commerce Experience",
    client: "Featured Project",
    category: "Digital",
    description:
      "Online store built for speed and sales. Fast checkout, inventory management that works, built-in analytics.",
    image: "/images/projects/ecommerce-platform.svg",
    href: "/work/ecommerce-platform",
  },
  {
    id: "ai-automation-system",
    title: "AI Workflow Automation",
    client: "Featured Project",
    category: "Intelligence",
    description:
      "Automation system that handles repetitive work. AI agents for customer service, data processing, and reports. Saves hundreds of hours monthly.",
    image: "/images/projects/ai-automation-dashboard.svg",
    href: "/work/ai-automation-system",
  },
  {
    id: "crm-platform",
    title: "CRM Dashboard Platform",
    client: "Featured Project",
    category: "Digital · Intelligence",
    description:
      "Custom CRM with data visualization, customer insights, automated workflows, and lead scoring powered by machine learning.",
    image: "/images/projects/crm-dashboard.svg",
    href: "/work/crm-platform",
  },
];

/**
 * LEVEL 2 — the gallery.
 *
 * The work is the subject, so the motion stays out of its way: each
 * frame wipes open once as it enters, then sits still. On a pointer
 * device the artwork drifts a few pixels inside its frame, which reads
 * as depth without moving the composition.
 */
export function SelectedWork() {
  return (
    <section className="section-spacing container-padding bg-background">
      <div className="mx-auto max-w-[1600px]">
        {/* Section Header — label left, action right */}
        <Reveal
          className="mb-14 flex flex-col gap-6 border-b border-border pb-6 md:mb-20 md:flex-row md:items-end md:justify-between"
          distance={16}
        >
          <div>
            <Kicker className="mb-4">Selected Work</Kicker>
            <h2 className="display-lg text-3xl md:text-4xl lg:text-5xl">
              Recent Projects
            </h2>
          </div>
          <Link
            href="/work"
            className="mono-label group inline-flex items-center gap-2 text-muted transition-colors duration-200 hover:text-accent-brand"
          >
            <span className="relative">
              View All Work
              <span
                aria-hidden="true"
                className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent-brand transition-transform duration-300 ease-out group-hover:scale-x-100"
              />
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              <path
                d="M6 3L11 8L6 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </Reveal>

        {/* Projects */}
        <div className="space-y-20 md:space-y-28">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const isEven = index % 2 === 0;

  return (
    <Reveal distance={22}>
      <div>
        <Link
          href={project.href}
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
            {/* Product surface — framed as evidence */}
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

                {/* Curtain that wipes the frame open once, on entry */}
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

            {/* Content */}
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
                <div className="mono-label flex items-center gap-2 text-foreground">
                  <span>View Case Study</span>
                  <motion.svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    animate={isHovered ? { x: 3 } : { x: 0 }}
                    transition={{ duration: 0.25 }}
                    aria-hidden="true"
                  >
                    <path
                      d="M3 8H13M13 8L9 4M13 8L9 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </div>
              </RevealItem>
            </RevealGroup>
          </div>
        </Link>
      </div>
    </Reveal>
  );
}
