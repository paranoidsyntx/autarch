import Image from "next/image";

type SpriteName =
  | "lantern"
  | "gate"
  | "columns"
  | "tomb"
  | "tomb_bars"
  | "arch"
  | "rune"
  | "rune2"
  | "web"
  | "pebbles"
  | "sparkle";

/** Native pixel dimensions of each extracted sprite. */
const DIMS: Record<SpriteName, { w: number; h: number }> = {
  lantern: { w: 80, h: 46 },
  gate: { w: 80, h: 44 },
  columns: { w: 80, h: 42 },
  tomb: { w: 24, h: 24 },
  tomb_bars: { w: 24, h: 24 },
  arch: { w: 24, h: 24 },
  rune: { w: 24, h: 24 },
  rune2: { w: 24, h: 24 },
  web: { w: 24, h: 24 },
  pebbles: { w: 24, h: 24 },
  sparkle: { w: 24, h: 24 },
};

/** Tint presets applied via CSS filters to the white terrain masks. */
const TINT: Record<string, string> = {
  stone: "brightness(0.55) contrast(1.1)",
  darkstone: "brightness(0.4)",
  gold: "brightness(0.9) sepia(1) saturate(6) hue-rotate(-6deg)",
  bone: "brightness(0.95)",
  none: "none",
};

export function Sprite({
  name,
  scale = 3,
  tint = "none",
  className = "",
  alt = "",
  priority = false,
}: {
  name: SpriteName;
  scale?: number;
  tint?: keyof typeof TINT;
  className?: string;
  alt?: string;
  priority?: boolean;
}) {
  const { w, h } = DIMS[name];
  return (
    <Image
      src={`/sprites/x/${name}.png`}
      alt={alt}
      aria-hidden={alt === "" ? true : undefined}
      width={w * scale}
      height={h * scale}
      priority={priority}
      className={`pixelated ${className}`}
      style={{ filter: TINT[tint], imageRendering: "pixelated" }}
    />
  );
}
