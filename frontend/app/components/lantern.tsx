import { Sprite } from "./sprite";

/**
 * A wall-mounted stone lantern niche (from the dungeon sheet) with a
 * warm, flickering torch glow behind it.
 */
export function Lantern({
  scale = 3,
  className = "",
}: {
  scale?: number;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {/* warm glow pool */}
      <div
        aria-hidden="true"
        className="animate-glow pointer-events-none absolute left-1/2 top-1/2 -z-0 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(231,169,56,0.55) 0%, rgba(181,102,26,0.25) 45%, transparent 70%)",
        }}
      />
      <div className="animate-flicker relative">
        <Sprite name="lantern" scale={scale} />
      </div>
    </div>
  );
}
