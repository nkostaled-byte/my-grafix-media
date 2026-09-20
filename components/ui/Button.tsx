"use client";

import { useRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type PointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, type HTMLMotionProps } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SPRING } from "@/lib/motion";

type ButtonBaseProps = {
  variant?: "primary" | "secondary" | "ghost" | "inverse";
  size?: "default" | "large";
  children: React.ReactNode;
  className?: string;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: never;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const MotionLink = motion.create(Link);

export function Button({
  variant = "primary",
  size = "default",
  className,
  children,
  href,
  ...props
}: ButtonProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING.pointer);
  const sy = useSpring(y, SPRING.pointer);

  /* Engineered posture: compact, 6px radius, hairline structure.
     Transitions are short and mechanical — no ease-in-out theatre.
     active:scale gives a single frame of physical acknowledgement on
     press; there is deliberately no hover bounce or elastic overshoot. */
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 ease-out active:scale-[0.985] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-brand disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 whitespace-nowrap";

  const variants = {
    primary:
      "bg-foreground text-background hover:bg-foreground/88 active:bg-foreground/80",
    secondary:
      "bg-surface text-foreground hairline hover:hairline-strong hover:bg-surface-raised",
    ghost: "text-foreground hover:bg-foreground/[0.06]",
    /* For use on inverted (dark) sections: inverts with the theme,
       so it always reads as high-contrast against the section. */
    inverse:
      "bg-background text-foreground hover:bg-background/90 active:bg-background/80",
  };

  const sizes = {
    /* Both sizes share the About-page CTA geometry: h-11 with generous
       horizontal padding, so every button site-wide reads identically. */
    default: "h-11 px-5 text-sm rounded-[6px]",
    large: "h-11 px-5 text-sm rounded-[6px]",
  };

  /* Cursor tracking — the same magnetic response every button on the
     site shares. Pointer-only: touch and reduced-motion stay still. */
  function handleMove(event: PointerEvent<HTMLElement>) {
    if (reduce || event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2 || 1);
    const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2 || 1);
    x.set(Math.max(-1, Math.min(1, dx)) * 4);
    y.set(Math.max(-1, Math.min(1, dy)) * 4);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const magnetic = {
    ref: (node: HTMLElement | null) => {
      ref.current = node;
    },
    onPointerMove: handleMove,
    onPointerLeave: handleLeave,
    style: { x: sx, y: sy },
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  if (href) {
    return (
      <MotionLink
        href={href}
        className={classes}
        {...magnetic}
        {...(props as unknown as HTMLMotionProps<"a">)}
      >
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button
      className={classes}
      {...magnetic}
      {...(props as unknown as HTMLMotionProps<"button">)}
    >
      {children}
    </motion.button>
  );
}
