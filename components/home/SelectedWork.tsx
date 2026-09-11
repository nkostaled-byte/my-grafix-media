"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";

// Project data with gradient placeholders
const projects = [
  {
    id: "project-1",
    title: "Brand Identity & Digital Platform",
    client: "Featured Project",
    category: "Design · Digital",
    description:
      "Complete brand system and digital presence for an ambitious business. From logo to website, creating a cohesive identity that stands out.",
    gradient: "from-blue-500/20 via-purple-500/20 to-pink-500/20",
    href: "/work/project-1",
  },
  {
    id: "project-2",
    title: "E-commerce Experience",
    client: "Featured Project",
    category: "Digital",
    description:
      "High-performance e-commerce platform built for scale and conversion. Custom shopping experience with seamless checkout.",
    gradient: "from-green-500/20 via-teal-500/20 to-blue-500/20",
    href: "/work/project-2",
  },
  {
    id: "project-3",
    title: "AI Workflow Automation",
    client: "Featured Project",
    category: "Intelligence",
    description:
      "Intelligent automation system that handles repetitive tasks and saves hundreds of hours monthly through smart workflows.",
    gradient: "from-orange-500/20 via-red-500/20 to-pink-500/20",
    href: "/work/project-3",
  },
];

export function SelectedWork() {
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
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div>
            <p className="text-sm uppercase tracking-wider text-subtle font-medium mb-4">
              Selected Work
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight">
              Recent Projects
            </h2>
          </div>
          <Link
            href="/work"
            className="text-[15px] text-muted hover:text-foreground transition-colors inline-flex items-center gap-2 group"
          >
            View All Work
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="group-hover:translate-x-1 transition-transform"
              aria-hidden="true"
            >
              <path
                d="M6 3L11 8L6 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-24 md:space-y-32 lg:space-y-48">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  isInView,
}: {
  project: (typeof projects)[0];
  index: number;
  isInView: boolean;
}) {
  const cardRef = useRef(null);
  const isCardInView = useInView(cardRef, { once: true, margin: "-150px" });
  const [isHovered, setIsHovered] = useState(false);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={
        isInView && isCardInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 60 }
      }
      transition={{
        duration: 1,
        ease: [0.33, 1, 0.68, 1],
        delay: index * 0.2,
      }}
    >
      <Link
        href={project.href}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="block group"
        aria-label={`View ${project.title} case study`}
      >
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
            isEven ? "" : "lg:grid-flow-dense"
          }`}
        >
          {/* Image */}
          <div
            className={`lg:col-span-7 ${isEven ? "" : "lg:col-start-6"} relative overflow-hidden rounded-2xl`}
          >
            <div className="aspect-[16/10] relative bg-gradient-to-br from-border to-background">
              <motion.div
                animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
                transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}
              >
                <div className="text-center p-8">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-foreground/5 backdrop-blur-sm flex items-center justify-center">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-foreground/40"
                    >
                      <path
                        d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-muted">Project Visual</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Content */}
          <div
            className={`lg:col-span-5 ${isEven ? "" : "lg:col-start-1 lg:row-start-1"} space-y-6`}
          >
            <div>
              <p className="text-sm text-subtle uppercase tracking-wider mb-3">
                {project.category}
              </p>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-tight mb-4 group-hover:text-muted transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-sm text-muted mb-2">{project.client}</p>
            </div>

            <p className="text-base md:text-lg text-muted leading-relaxed">
              {project.description}
            </p>

            <div className="flex items-center gap-2 text-[15px] text-foreground group-hover:gap-3 transition-all">
              <span>View Case Study</span>
              <motion.svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                animate={isHovered ? { x: 4 } : { x: 0 }}
                transition={{ duration: 0.3 }}
                aria-hidden="true"
              >
                <path
                  d="M3 8H13M13 8L9 4M13 8L9 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
