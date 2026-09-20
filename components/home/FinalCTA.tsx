"use client";

import { Button } from "@/components/ui/Button";
import { Kicker } from "@/components/ui/Kicker";
import { AmbientGrid } from "@/components/motion/AmbientGrid";
import { Reveal } from "@/components/motion/Reveal";
import { SignalRail } from "@/components/motion/Signal";

/**
 * LEVEL 2 — the closing moment.
 *
 * The continuity motif returns one last time: the rail that opened the
 * hero closes the page, so the site ends where it started.
 */
export function FinalCTA() {
  return (
    <section className="section-spacing container-padding bg-background">
      <div className="mx-auto max-w-[1600px]">
        <Reveal direction="up" distance={18}>
          <div className="relative overflow-hidden rounded-[12px] card-elevated p-10 md:p-16 lg:p-20">
            <AmbientGrid className="opacity-60" duration={120} />

            <div className="relative z-10 text-center">
              <SignalRail
                className="mx-auto mb-10 max-w-md"
                flow={true}
                flowDuration={2.8}
                delay={0.2}
              />

              <Kicker className="mb-6">Ready to Start?</Kicker>

              <h2 className="display-lg mx-auto mb-6 max-w-3xl text-3xl md:text-5xl lg:text-6xl">
                Ready to start a project?
              </h2>

              <p className="mx-auto mb-9 max-w-xl text-base leading-relaxed text-muted md:text-lg">
                Tell us what you're building. We'll handle the design, the website, the automation, or all three.
              </p>

              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <Button href="/contact" size="large" className="group w-[min(260px,100%)] sm:w-auto">
                  Start a Project
                  <span
                    aria-hidden="true"
                    className="ml-0.5 inline-block transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </Button>
                <Button href="/work" variant="secondary" size="large" className="group w-[min(260px,100%)] self-start sm:w-auto">
                  View Our Work
                  <span
                    aria-hidden="true"
                    className="ml-0.5 inline-block transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
