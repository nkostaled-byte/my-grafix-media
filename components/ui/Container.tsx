import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "default" | "large" | "full";
}

export function Container({
  children,
  className,
  size = "default",
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full",
        size === "default" && "max-w-7xl px-6 lg:px-8",
        size === "large" && "max-w-[1600px] px-6 lg:px-12",
        size === "full" && "max-w-none px-0",
        className
      )}
    >
      {children}
    </div>
  );
}
