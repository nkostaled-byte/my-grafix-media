"use client";

import { Kicker } from "@/components/ui/Kicker";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

/**
 * A quiet, intentional pointer to the Maya that already lives in the
 * site chrome. No second chat interface, no fake messages — the button
 * opens the existing MayaAssistant via a tiny custom event.
 */
export function MeetMaya() {
  function openMaya() {
    window.dispatchEvent(new Event("maya:open"));
  }

  return (
    <section className="section-spacing container-padding bg-border/20">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4" direction="up" distance={12}>
            <Kicker>Meet Maya</Kicker>
          </Reveal>
          <Reveal delay={0.06} className="lg:col-span-8">
            <h2 className="display-lg mb-6 max-w-4xl text-2xl md:text-3xl lg:text-4xl">
              Your first conversation with My Grafix.
            </h2>
            <p className="mb-8 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              Maya is our live AI concierge — she&apos;s already here, in the corner
              of this page. Ask her about our services, what&apos;s possible for
              your business, or how to start a project.
            </p>
            <Button type="button" variant="secondary" size="large" onClick={openMaya} className="group">
              Talk to Maya
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
    </section>
  );
}
