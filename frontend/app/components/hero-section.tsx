import { PixelButton } from "./pixel-button";
import { Sprite } from "./sprite";
import { Lantern } from "./lantern";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[92vh] flex-col items-center">
      {/* ---- Dungeon entrance: a maroon wall with a central gateway ---- */}
      <div className="dungeon-wall relative flex h-32 w-full items-end justify-center border-b-4 border-black sm:h-40">
        <div className="absolute left-4 bottom-3 sm:left-10">
          <Lantern scale={2} />
        </div>
        <div className="absolute right-4 bottom-3 sm:right-10">
          <Lantern scale={2} />
        </div>
        {/* the gateway you descend through */}
        <div className="relative translate-y-1">
          <Sprite name="gate" scale={4} priority alt="A stone dungeon gateway" />
          <div className="absolute inset-0 -z-0 bg-black/40 blur-[1px]" />
        </div>
      </div>

      {/* ---- Title, standing on the cobbled floor ---- */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-7 px-4 py-16 text-center">
        <p className="font-display text-[9px] uppercase tracking-[0.35em] text-torch sm:text-[11px]">
          A Web3 Pixel Dungeon Crawler
        </p>

        <h1 className="font-display text-5xl leading-[1.35] text-foreground drop-shadow-[4px_4px_0_#000] sm:text-7xl">
          AUTARCH
        </h1>

        <div className="pixel-frame max-w-lg bg-black/60 px-6 py-5">
          <p className="text-pretty font-sans text-xl leading-relaxed text-foreground sm:text-2xl">
            Descend into the endless depths. Slay what lurks below, claim loot
            minted forever on-chain, and become the sole ruler of the dungeon.
          </p>
        </div>

        <div className="mt-2 flex flex-col items-center gap-6">
          <PixelButton href="#play" size="lg">
            {"\u25B6"} Play Now
          </PixelButton>
          <span className="animate-blink font-display text-[9px] uppercase tracking-widest text-muted">
            {"\u25BC"} Scroll to descend {"\u25BC"}
          </span>
        </div>
      </div>
    </section>
  );
}
