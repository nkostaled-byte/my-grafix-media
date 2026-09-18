import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

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

export function Button({
  variant = "primary",
  size = "default",
  className,
  children,
  href,
  ...props
}: ButtonProps) {
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
    default: "h-10 px-4 text-sm rounded-[6px]",
    large: "h-11 px-5 text-sm rounded-[6px]",
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
