import Link from "next/link";
import type { ComponentProps } from "react";

type PixelButtonProps = {
  children: React.ReactNode;
  size?: "md" | "lg";
} & ComponentProps<typeof Link>;

export function PixelButton({
  children,
  size = "md",
  className = "",
  ...props
}: PixelButtonProps) {
  const sizing =
    size === "lg"
      ? "px-8 py-5 text-sm sm:text-base"
      : "px-6 py-4 text-xs sm:text-sm";

  return (
    <Link
      className={`pixel-btn group inline-flex select-none items-center justify-center gap-3 uppercase tracking-wider focus:outline-none focus-visible:ring-4 focus-visible:ring-torch/70 ${sizing} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
