"use client";

import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/motion/Reveal";

export function Introduction() {
  return (
    <section className="section-spacing container-padding">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-3" direction="up" distance={12}>
            <Kicker>Complete Creative Partner</Kicker>
          </Reveal>

          <div className="lg:col-span-9">
            <Reveal delay={0.06}>
              <h2 className="display-lg mb-6 max-w-4xl text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem]">
                Most businesses hire separate designers, developers, and automation specialists. It doesn't have to work that way.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="max-w-2xl text-base leading-relaxed text-muted md:text-lg">
                We handle all three. That means your brand, your website, and your systems actually talk to each other. Instead of gaps and delays, you get one team that understands your whole business.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
