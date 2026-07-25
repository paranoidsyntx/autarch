import Link from "next/link";
import type { ComponentProps } from "react";

type PixelButtonProps = {
  children: React.ReactNode;
  size?: "md" | "lg";
  variant?: "solid" | "ghost";
} & ComponentProps<typeof Link>;

export function PixelButton({
  children,
  size = "md",
  variant = "solid",
  className = "",
  ...props
}: PixelButtonProps) {
  const sizing =
    size === "lg"
      ? "px-8 py-5 text-sm sm:text-base"
      : "px-6 py-4 text-xs sm:text-sm";
  const base = variant === "ghost" ? "pixel-btn-ghost" : "pixel-btn";

  return (
    <Link
      className={`${base} inline-flex select-none items-center justify-center gap-3 uppercase tracking-wider focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground ${sizing} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
