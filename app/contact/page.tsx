"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

const projectTypes = [
  "Brand Identity",
  "Website",
  "E-commerce",
  "Web Application",
  "AI Automation",
  "Multiple Services",
  "Other",
];

const budgetRanges = [
  "Under $5,000",
  "$5,000 - $15,000",
  "$15,000 - $30,000",
  "$30,000 - $50,000",
  "$50,000+",
  "Not sure yet",
];

const timelines = [
  "ASAP",
  "1-2 months",
  "3-6 months",
  "6+ months",
  "Flexible",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    projectType: "",
    details: "",
    budget: "",
    timeline: "",
  });

  const [status, setStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message: string;
  }>({
    type: "idle",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Sending..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.success) {
        throw new Error(result?.error || "Submission failed");
      }

      setStatus({
        type: "success",
        message:
          "Thanks for reaching out! Your enquiry has been received and we’ll get back to you within 24 hours.",
      });

      setFormData({
        name: "",
        company: "",
        email: "",
        projectType: "",
        details: "",
        budget: "",
        timeline: "",
      });
    } catch {
      setStatus({
        type: "error",
        message: "We couldn’t send your enquiry. Please try again or email us directly.",
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <main className="pt-20">
        {/* Hero Section */}
        <section className="section-spacing container-padding">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              {/* Left: Intro */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                className="lg:col-span-5"
              >
                <p className="text-sm uppercase tracking-wider text-subtle font-medium mb-6">
                  Contact
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight mb-8">
                  Let&apos;s build something brilliant.
                </h1>
                <p className="text-lg text-muted leading-relaxed mb-12">
                  Whether you need design, development, automation, or all
                  three—we&apos;re ready to help. Tell us about your project and we&apos;ll
                  get back to you within 24 hours.
                </p>

                {/* Contact Info */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-sm font-medium uppercase tracking-wider mb-2">
                      Email
                    </h2>
                    <a
                      href="mailto:hello@mygrafixmedia.com"
                      className="text-lg text-muted hover:text-foreground transition-colors"
                    >
                      hello@mygrafixmedia.com
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Right: Form */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.33, 1, 0.68, 1],
                  delay: 0.1,
                }}
                className="lg:col-span-7"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent transition-all bg-background"
                      placeholder="John Smith"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium mb-2"
                    >
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent transition-all bg-background"
                      placeholder="Your Company"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent transition-all bg-background"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Project Type */}
                  <div>
                    <label
                      htmlFor="projectType"
                      className="block text-sm font-medium mb-2"
                    >
                      What do you need? *
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      required
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent transition-all bg-background"
                    >
                      <option value="">Select a project type</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label
                      htmlFor="details"
                      className="block text-sm font-medium mb-2"
                    >
                      Project Details *
                    </label>
                    <textarea
                      id="details"
                      name="details"
                      required
                      rows={6}
                      value={formData.details}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent transition-all bg-background resize-none"
                      placeholder="Tell us about your project, goals, and what you&apos;re hoping to achieve..."
                    />
                  </div>

                  {/* Budget & Timeline */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="budget"
                        className="block text-sm font-medium mb-2"
                      >
                        Budget Range
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent transition-all bg-background"
                      >
                        <option value="">Select range</option>
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="timeline"
                        className="block text-sm font-medium mb-2"
                      >
                        Timeline
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent transition-all bg-background"
                      >
                        <option value="">Select timeline</option>
                        {timelines.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Status Message */}
                  {status.type !== "idle" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-lg ${
                        status.type === "success"
                          ? "bg-green-500/10 text-green-700 dark:text-green-400"
                          : status.type === "error"
                            ? "bg-red-500/10 text-red-700 dark:text-red-400"
                            : "bg-blue-500/10 text-blue-700 dark:text-blue-400"
                      }`}
                    >
                      {status.message}
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="large"
                    className="w-full"
                    disabled={status.type === "loading"}
                  >
                    {status.type === "loading" ? "Sending..." : "Send Message"}
                  </Button>

                  <p className="text-sm text-muted text-center">
                    We&apos;ll get back to you within 24 hours
                  </p>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Alternative Contact */}
        <section className="pb-32 container-padding">
          <div className="max-w-[1600px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              className="border border-border rounded-2xl p-8 md:p-12 text-center"
            >
              <h2 className="text-2xl md:text-3xl font-medium mb-4">
                Prefer email?
              </h2>
              <p className="text-muted mb-6 max-w-2xl mx-auto">
                You can also reach us directly at{" "}
                <a
                  href="mailto:hello@mygrafixmedia.com"
                  className="text-foreground hover:underline"
                >
                  hello@mygrafixmedia.com
                </a>
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
