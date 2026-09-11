import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type ButtonBaseProps = {
  variant?: "primary" | "secondary" | "ghost";
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
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4";

  const variants = {
    primary:
      "bg-foreground text-background hover:bg-accent-muted focus-visible:outline-foreground",
    secondary:
      "border border-border hover:border-foreground focus-visible:outline-foreground",
    ghost: "hover:bg-border/50 focus-visible:outline-foreground",
  };

  const sizes = {
    default: "h-12 px-6 text-[15px] rounded-full",
    large: "h-14 px-8 text-base rounded-full",
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
