import Link from "next/link";
import type { ComponentProps } from "react";

type PixelButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
} & ComponentProps<typeof Link>;

export function PixelButton({
  children,
  variant = "primary",
  className = "",
  ...props
}: PixelButtonProps) {
  const base =
    "group relative inline-flex items-center justify-center gap-3 font-display text-xs sm:text-sm uppercase tracking-wide select-none transition-transform active:translate-y-1 focus:outline-none focus-visible:ring-4 focus-visible:ring-torch/60";

  const styles =
    variant === "primary"
      ? "bg-torch text-black px-8 py-5 border-4 border-black shadow-[0_6px_0_0_#7c2d12,0_6px_0_4px_#000] hover:bg-torch-deep hover:text-foreground active:shadow-[0_2px_0_0_#7c2d12,0_2px_0_4px_#000]"
      : "bg-stone text-foreground px-8 py-5 border-4 border-black shadow-[0_6px_0_0_#000,0_6px_0_4px_#000] hover:bg-stone-light active:shadow-[0_2px_0_0_#000]";

  return (
    <Link className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </Link>
  );
}
