import { PixelButton } from "./pixel-button";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[92vh] flex-col items-center justify-center px-4 py-20 text-center">
      <div className="flex w-full max-w-2xl flex-col items-center gap-8">
        <p className="font-display text-[9px] uppercase tracking-[0.35em] text-muted sm:text-[11px]">
          A Web3 Pixel Dungeon Crawler
        </p>

        <h1 className="font-display text-5xl leading-[1.35] text-foreground sm:text-7xl">
          AUTARCH
        </h1>

        <div className="pixel-box w-full max-w-lg px-6 py-5">
          <p className="text-pretty font-sans text-xl leading-relaxed text-foreground sm:text-2xl">
            Descend into the endless depths. Slay what lurks below, claim loot
            minted forever on-chain, and become the sole ruler of the dungeon.
          </p>
        </div>

        <div className="mt-2 flex flex-col items-center gap-6">
          <PixelButton href="#play" size="lg">
            Play Now
          </PixelButton>
          <span className="animate-blink font-display text-[9px] uppercase tracking-widest text-muted">
            Scroll to descend
          </span>
        </div>
      </div>
    </section>
  );
}
