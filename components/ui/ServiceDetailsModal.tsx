"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Kicker } from "@/components/ui/Kicker";

type ServiceDetails = {
  name: string;
  description: string;
};

export function ServiceDetailsModal({
  service,
  onClose,
}: {
  service: ServiceDetails | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!service) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [service, onClose]);

  return (
    <AnimatePresence>
      {service && (
        <>
          <motion.button
            type="button"
            aria-label="Close service details"
            onClick={onClose}
            className="fixed inset-0 z-[70] cursor-default bg-foreground/20 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-dialog-title"
            className="fixed inset-x-4 bottom-4 z-[71] mx-auto max-w-xl overflow-hidden rounded-[12px] bg-background card-elevated md:inset-x-auto md:right-8 md:top-1/2 md:bottom-auto md:w-[min(540px,calc(100vw-4rem))] md:-translate-y-1/2"
            initial={{ opacity: 0, y: 12, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.985 }}
            transition={{ duration: 0.22, ease: [0.33, 1, 0.68, 1] }}
          >
            <div className="flex items-start justify-between gap-6 border-b border-border px-6 py-5">
              <div>
                <Kicker className="mb-3 text-subtle">Service Detail</Kicker>
                <h2 id="service-dialog-title" className="display-lg text-2xl md:text-3xl">
                  {service.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close service details"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted transition-colors duration-200 hover:bg-surface-raised hover:text-foreground"
              >
                <span aria-hidden="true" className="text-xl leading-none">×</span>
              </button>
            </div>
            <div className="px-6 py-6">
              <p className="text-base leading-relaxed text-muted md:text-lg">
                {service.description}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-7 rounded-full bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity duration-200 hover:opacity-85"
              >
                Continue exploring
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
