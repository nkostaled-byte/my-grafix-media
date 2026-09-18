"use client";

import { Button } from "@/components/ui/Button";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

export function About() {
  return (
    <section className="section-spacing container-padding bg-background">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-3" direction="up" distance={12}>
            <Kicker>About My Grafix Media</Kicker>
          </Reveal>

          <div className="space-y-6 lg:col-span-9">
            <Reveal>
              <h2 className="display-lg mb-6 max-w-4xl text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem]">
                We're a design, development, and automation studio. All three. Under one roof.
              </h2>
            </Reveal>

            <RevealGroup
              stagger={0.07}
              className="max-w-2xl space-y-5 text-base leading-relaxed text-muted md:text-lg"
            >
              <RevealItem>
                <p>
                  Most businesses need all three services. But they get them from different vendors, which means nothing connects properly. We handle design, websites, and automation as one complete system.
                </p>
              </RevealItem>
              <RevealItem>
                <p>
                  That means your brand guides your website, your website connects to your systems, and your automation does the work your team shouldn't have to do by hand.
                </p>
              </RevealItem>
              <RevealItem>
                <p>
                  We work with businesses that want to grow. We bring the skills to do the work without forcing you to manage multiple vendors or watch projects fall apart between teams.
                </p>
              </RevealItem>
            </RevealGroup>

            <Reveal delay={0.1}>
              <Button href="/about" variant="secondary" size="large" className="group">
                Learn More About Us
                <span
                  aria-hidden="true"
                  className="ml-0.5 inline-block transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
