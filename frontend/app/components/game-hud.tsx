/* Pixel HUD icons — simple blocky SVGs rendered with crisp edges. */

function HeartIcon() {
  return (
    <svg viewBox="0 0 11 10" width={22} height={20} shapeRendering="crispEdges">
      <path
        fill="var(--hp)"
        d="M2 0h2v1h1v1h1V1h1V0h2v1h1v3h-1v1h-1v1h-1v1h-1v1H4V6H3V5H2V4H1V1h1z"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 10 11" width={20} height={22} shapeRendering="crispEdges">
      <path fill="var(--shield)" d="M1 1h8v5H8v2H7v1H6v1H4V9H3V8H2V6H1z" />
      <path fill="#bfe6c8" d="M3 3h4v2H6v1H4V5H3z" />
    </svg>
  );
}

function PotionIcon() {
  return (
    <svg viewBox="0 0 8 11" width={16} height={22} shapeRendering="crispEdges">
      <path fill="#1a1512" d="M3 0h2v3H3z" />
      <path fill="var(--mana)" d="M2 3h4v1h1v6H1V4h1z" />
      <path fill="#8fb0f0" d="M3 5h1v3H3z" />
    </svg>
  );
}

function Stat({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: string;
}) {
  return (
    <span className="flex items-center gap-1.5">
      {icon}
      <span className="font-sans text-lg leading-none text-foreground sm:text-xl">
        {value}
      </span>
    </span>
  );
}

/* Small item-slot with an optional pixel glyph. */
function ItemSlot({ glyph }: { glyph: "sword" | "coin" | "skull" }) {
  return (
    <span className="pixel-slot flex h-8 w-8 items-center justify-center sm:h-9 sm:w-9">
      {glyph === "sword" && (
        <svg viewBox="0 0 9 9" width={18} height={18} shapeRendering="crispEdges">
          <path fill="#d7d7d7" d="M6 0h2v2H7v1H6V2H5v1H4v1h1v1H4v1H3V5H2v1H0V4h2V3h1V2h1V1h1z" />
          <path fill="#8a5a2b" d="M2 6h1v1h1v1H3v1H1V8h1z" />
        </svg>
      )}
      {glyph === "coin" && (
        <svg viewBox="0 0 8 8" width={18} height={18} shapeRendering="crispEdges">
          <path fill="var(--gold)" d="M2 0h4v1h1v1h1v4H7v1H6v1H2V7H1V6H0V2h1V1h1z" />
          <path fill="#8a6414" d="M3 2h2v1h1v2H5v1H3V5H2V3h1z" />
        </svg>
      )}
      {glyph === "skull" && (
        <svg viewBox="0 0 8 8" width={18} height={18} shapeRendering="crispEdges">
          <path fill="#e6e0cf" d="M1 1h6v4H6v1H5v1H3V6H2V5H1z" />
          <path fill="#1a1512" d="M2 3h1v1H2zM5 3h1v1H5zM3 6h2v1H3z" />
        </svg>
      )}
    </span>
  );
}

export function GameHud() {
  return (
    <header className="sticky top-0 z-40 border-b-4 border-black bg-hud">
      <div className="flex items-center justify-between gap-3 px-3 py-2 sm:px-5 sm:py-3">
        {/* Left: character identity + vitals */}
        <div className="min-w-0">
          <p className="truncate font-display text-[10px] uppercase tracking-wide text-torch sm:text-xs">
            AUTARCH{" "}
            <span className="text-muted">the Sovereign</span>
          </p>
          <div className="mt-1.5 flex items-center gap-3 sm:gap-4">
            <Stat icon={<HeartIcon />} value="59" />
            <Stat icon={<ShieldIcon />} value="98" />
            <Stat icon={<PotionIcon />} value="44" />
          </div>
        </div>

        {/* Right: equipment slots */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <ItemSlot glyph="sword" />
          <ItemSlot glyph="coin" />
          <ItemSlot glyph="skull" />
        </div>
      </div>
    </header>
  );
}
