"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const allProjects = [
  {
    id: "brand-identity-platform",
    title: "Brand Identity & Digital Platform",
    client: "Premium Retail Brand",
    category: "Design · Digital",
    categories: ["Design", "Digital"],
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
    categories: ["Digital"],
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
    categories: ["Intelligence"],
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
    categories: ["Digital"],
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
    categories: ["Design"],
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
    categories: ["Digital", "Intelligence"],
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
    categories: ["Digital"],
    description:
      "Conversion-optimized landing page with A/B testing, performance optimization, and strategic copywriting that increased conversions by 340%.",
    image: "/images/projects/landing-page.svg",
    year: "2025",
  },
];

const categories = ["All", "Design", "Digital", "Intelligence"];

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects =
    selectedCategory === "All"
      ? allProjects
      : allProjects.filter((project) =>
          project.categories.includes(selectedCategory)
        );

  return (
    <>
      <Header />
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
                Our Work
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-tight mb-8 max-w-4xl">
                Design, Digital, and Intelligence projects that make businesses
                impossible to ignore.
              </h1>
              <p className="text-lg md:text-xl text-muted leading-relaxed max-w-3xl">
                From brand identities to AI automation, we build complete systems
                that help ambitious businesses stand out and work smarter.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter Navigation */}
        <section className="container-padding border-t border-b border-border sticky top-20 bg-background z-10">
          <div className="max-w-[1600px] mx-auto">
            <nav className="flex gap-6 py-6 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? "text-foreground"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {category}
                  {selectedCategory === category && (
                    <motion.div
                      layoutId="activeCategory"
                      className="h-0.5 bg-foreground mt-1"
                      initial={false}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </button>
              ))}
            </nav>
          </div>
        </section>

        {/* Project Count */}
        <section className="container-padding pt-12">
          <div className="max-w-[1600px] mx-auto">
            <p className="text-sm text-muted">
              {filteredProjects.length}{" "}
              {filteredProjects.length === 1 ? "project" : "projects"}
            </p>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="section-spacing container-padding">
          <div className="max-w-[1600px] mx-auto">
            <div className="space-y-24 md:space-y-32 lg:space-y-40">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted text-lg">
                  No projects found in this category.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-spacing container-padding bg-foreground text-background">
          <div className="max-w-[1600px] mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight mb-8">
                Ready to start your project?
              </h2>
              <p className="text-lg md:text-xl opacity-80 leading-relaxed mb-12 max-w-2xl mx-auto">
                Let's build something brilliant together.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center h-14 px-8 text-base rounded-full border-2 border-background hover:bg-background hover:text-foreground transition-all duration-300 font-medium"
              >
                Start a Project
              </Link>
            </motion.div>
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
  project: (typeof allProjects)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });
  const [isHovered, setIsHovered] = useState(false);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
    >
      <Link
        href={`/work/${project.id}`}
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
            className={`lg:col-span-7 ${isEven ? "" : "lg:col-start-6"} relative overflow-hidden rounded-2xl bg-white border border-border`}
          >
            <div className="aspect-[16/10] relative">
              <motion.div
                animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
                transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                className="w-full h-full"
              >
                <Image
                  src={project.image}
                  alt={`${project.title} - ${project.description}`}
                  fill
                  className="object-contain p-8"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
                />
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

            <div className="flex items-center justify-between pt-4">
              <span className="text-sm text-subtle">{project.year}</span>
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
        </div>
      </Link>
    </motion.div>
  );
}
