"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

/**
 * LEVEL 3 — the living system.
 *
 * Six nodes. Four scenarios. A signal that travels the path the current
 * scenario describes, so the visitor watches a process actually run
 * rather than reading a list of steps.
 *
 * COST MODEL
 * One interval advances an integer. Everything visual is then a CSS
 * colour/opacity transition on already-painted elements — no per-frame
 * JS, no layout, no reflow. The interval only exists while the section
 * is on screen, and never starts at all under reduced motion (which
 * renders the full sequence statically instead, with no active step).
 *
 * HONESTY
 * This is labelled as a conceptual map in the UI. It demonstrates how
 * the pieces fit together; it is not a live environment, and no step
 * implies a production integration that does not exist.
 */

const NODES = [
  "Website",
  "AI Agent",
  "Business Systems",
  "Automation",
  "Human",
  "Customer",
] as const;

type Scenario = {
  id: string;
  label: string;
  caption: string;
  /** One entry per step: the label, and which node it happens at. */
  steps: { text: string; node: number }[];
};

const SCENARIOS: Scenario[] = [
  {
    id: "lead",
    label: "Lead",
    caption: "An enquiry arrives and is qualified before it goes cold.",
    steps: [
      { text: "New enquiry", node: 0 },
      { text: "Maya opens the conversation", node: 1 },
      { text: "Need and fit assessed", node: 2 },
      { text: "Logged for follow-up", node: 3 },
      { text: "Human takes it forward", node: 4 },
    ],
  },
  {
    id: "customer",
    label: "Customer",
    caption: "A question is answered without anyone stopping what they are doing.",
    steps: [
      { text: "Question received", node: 0 },
      { text: "Maya reads the intent", node: 1 },
      { text: "Knowledge matched", node: 2 },
      { text: "Reply prepared", node: 3 },
      { text: "Customer answered", node: 5 },
    ],
  },
  {
    id: "business",
    label: "Business",
    caption: "Routine operations run themselves in the background.",
    steps: [
      { text: "Order placed", node: 0 },
      { text: "Stock checked", node: 2 },
      { text: "Invoice raised", node: 2 },
      { text: "Team notified", node: 3 },
      { text: "Complete", node: 5 },
    ],
  },
  {
    id: "escalation",
    label: "Human",
    caption: "When it matters, a person steps in — and knows why.",
    steps: [
      { text: "Complex request", node: 0 },
      { text: "Maya reaches its limit", node: 1 },
      { text: "Routed with full context", node: 4 },
      { text: "Human responds", node: 4 },
      { text: "Customer informed", node: 5 },
    ],
  },
];

const STEP_INTERVAL = 1500;

export function LivingSystem({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px -15% 0px" });
  const userSelected = useRef(false);

  const [state, setState] = useState({ scenario: 0, step: 0 });

  /* One interval, advancing an integer. Paused off-screen, absent under
     reduced motion. */
  useEffect(() => {
    if (!inView || reduce) return;

    const id = window.setInterval(() => {
      setState((prev) => {
        const total = SCENARIOS[prev.scenario].steps.length;
        if (prev.step + 1 < total) {
          return { scenario: prev.scenario, step: prev.step + 1 };
        }
        /* Restart the current scenario if the visitor chose it,
           otherwise move on to the next one. */
        return {
          scenario: userSelected.current
            ? prev.scenario
            : (prev.scenario + 1) % SCENARIOS.length,
          step: 0,
        };
      });
    }, STEP_INTERVAL);

    return () => window.clearInterval(id);
  }, [inView, reduce]);

  const scenario = SCENARIOS[state.scenario];
  const activeStep = reduce ? -1 : state.step;
  const current = activeStep >= 0 ? scenario.steps[activeStep] : null;
  const next = activeStep >= 0 ? scenario.steps[activeStep + 1] : null;

  /* Nodes touched so far in this scenario — only nodes that are actual
     steps, never the numeric range between them. */
  const visited = new Set(
    scenario.steps.slice(0, Math.max(activeStep, 0) + 1).map((s) => s.node)
  );

  /* The one transition the signal is making right now, expressed as the
     span of rail segments it crosses. Self-transitions (a node processing
     internally) cross no rail. Intermediate nodes of a long transition
     are passed over, not activated. */
  const activeTransition =
    current && next && current.node !== next.node
      ? {
          from: Math.min(current.node, next.node),
          to: Math.max(current.node, next.node),
        }
      : null;

  /* Segments already crossed by earlier transitions in this scenario.
      Built from the explicit step sequence (step[i].node → step[i+1].node),
      so a skipped node never reads as a visited relationship. */
  const traversedSegments = new Set<number>();
  for (let i = 0; i < activeStep; i += 1) {
    const a = scenario.steps[i].node;
    const b = scenario.steps[i + 1].node;
    for (let s = Math.min(a, b); s < Math.max(a, b); s += 1) {
      traversedSegments.add(s);
    }
  }

  function selectScenario(index: number) {
    userSelected.current = true;
    setState({ scenario: index, step: 0 });
  }

  return (
    <div ref={ref} className={className}>
      {/* Scenario selector */}
      <div className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-border pb-4">
        <span className="kicker text-subtle">Scenario</span>
        <div className="flex flex-wrap gap-1">
          {SCENARIOS.map((item, index) => {
            const isActive = index === state.scenario;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => selectScenario(index)}
                aria-pressed={isActive}
                className={cn(
                  "rounded-[6px] px-3 py-1.5 text-sm transition-colors duration-200",
                  isActive
                    ? "bg-foreground text-background"
                    : "text-muted hover:text-foreground"
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Node rail — desktop. One continuous grey rail running through the
          centre of every node; squares sit on top of it (grey rail → blue
          → square). Active segments run node-centre to node-centre, so the
          square itself occludes the endpoint — the blue genuinely ends at
          the destination square, nothing floats past it. */}
      <div className="relative hidden items-start lg:flex" aria-hidden="true">
        {/* Permanent grey rail, first-centre to last-centre */}
        <div
          className="absolute top-[5px] h-px bg-border"
          style={{ left: `${100 / (NODES.length * 2)}%`, right: `${100 / (NODES.length * 2)}%` }}
        />

        {/* Completed connector segments — blue only where a real transition
            actually crossed the rail */}
        {Array.from({ length: NODES.length - 1 }, (_, i) => (
          <div
            key={`segment-${i}`}
            className={cn(
              "absolute top-[5px] h-px transition-colors duration-300",
              traversedSegments.has(i) ? "bg-accent-brand/45" : "bg-transparent"
            )}
            style={{
              left: `${((i + 0.5) / NODES.length) * 100}%`,
              width: `${100 / NODES.length}%`,
            }}
          />
        ))}

        {/* Active signal — one bright line growing from the source node's
            centre to the destination node's centre over ~1.4s, so it
            physically arrives at the square as the step completes. Keyed on
            the step so each transition restarts the travel. */}
        {activeTransition && (
          <motion.div
            key={`${state.scenario}-${state.step}`}
            className="absolute top-[4px] h-[3px] origin-left bg-gradient-to-r from-accent-brand/50 via-accent-brand/85 to-accent-brand"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            style={{
              left: `${((activeTransition.from + 0.5) / NODES.length) * 100}%`,
              width: `${((activeTransition.to - activeTransition.from) / NODES.length) * 100}%`,
            }}
          />
        )}

        {NODES.map((node, index) => {
          const isActive = current?.node === index;
          const isVisited = visited.has(index);
          /* Only the transition's actual endpoints light up — an
             intermediate node of a long transition stays quiet. */
          const isTransitTo =
            activeTransition !== null && next?.node === index;

          return (
            <div
              key={node}
              className="relative z-10 flex flex-1 basis-0 flex-col items-center gap-2.5"
            >
              {/* Node indicator — becomes active as the signal arrives
                  (colour transition is delayed to match travel time) */}
              <motion.div
                className={cn(
                  "h-2.5 w-2.5 rounded-[2px] transition-colors duration-300",
                  isActive || isTransitTo
                    ? "bg-accent-brand shadow-[0_0_8px_rgba(var(--color-accent-brand))]"
                    : isVisited
                      ? "bg-foreground/45"
                      : "bg-border"
                )}
                style={isTransitTo ? { transitionDelay: "1.1s" } : undefined}
                animate={isActive ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                  repeat: isActive ? Infinity : 0,
                  repeatDelay: 0.3,
                }}
              />
              <span
                className={cn(
                  "mono-label whitespace-nowrap transition-colors duration-300",
                  isActive || isTransitTo ? "text-accent-brand" : "text-subtle"
                )}
                style={isTransitTo ? { transitionDelay: "1.1s" } : undefined}
              >
                {node}
              </span>
            </div>
          );
        })}
      </div>

      {/* Steps — the primary read on every screen size */}
      <div className="mt-10 lg:mt-12">
        <p className="mb-6 max-w-2xl text-sm text-muted md:text-base">
          {scenario.caption}
        </p>

        <ol className="border-t border-border">
          {scenario.steps.map((step, index) => {
            const isActive = index === activeStep;
            return (
              <motion.li
                key={step.text}
                className={cn(
                  "flex items-center gap-4 border-b border-border px-1 py-3.5 transition-colors",
                  isActive && "bg-surface-raised"
                )}
                animate={isActive ? { scale: 1 } : { scale: 1 }}
              >
                {/* Step number — accent and scale up when active */}
                <motion.span
                  className={cn(
                    "mono-label w-6 shrink-0 transition-colors duration-300",
                    isActive ? "text-accent-brand" : "text-subtle"
                  )}
                  animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ duration: 0.3, ease: EASE.snap }}
                >
                  {String(index + 1).padStart(2, "0")}
                </motion.span>

                {/* Step text */}
                <span
                  className={cn(
                    "text-sm transition-colors duration-300 md:text-[15px]",
                    isActive ? "text-foreground font-medium" : "text-muted"
                  )}
                >
                  {step.text}
                </span>

                {/* Node label — right side */}
                <span
                  className={cn(
                    "mono-label ml-auto hidden shrink-0 transition-colors duration-300 sm:block",
                    isActive ? "text-accent-brand" : "text-subtle"
                  )}
                >
                  {NODES[step.node]}
                </span>
              </motion.li>
            );
          })}
        </ol>
      </div>

      {/* Honesty note — required: this is not a live environment. */}
      <p className="mono-label mt-6 text-subtle">
        Illustrative system map · a conceptual demonstration of how these
        components fit together, not a live environment
      </p>
    </div>
  );
}
