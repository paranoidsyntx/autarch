import { PixelButton } from "./pixel-button";
import { Sprite } from "./sprite";

export function CtaSection() {
  return (
    <section
      id="play"
      className="relative flex min-h-[80vh] flex-col items-center justify-center px-6 py-28 text-center"
    >
      {/* Deepest part of the dungeon — near total darkness */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-0 bg-gradient-to-b from-transparent via-black/70 to-black"
      />

      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-8 flex items-end justify-center gap-6">
          <Sprite name="rune" scale={2} tint="gold" />
          <Sprite name="tomb" scale={2} tint="stone" />
          <Sprite name="rune2" scale={2} tint="gold" />
        </div>

        <h2 className="max-w-2xl text-balance font-display text-2xl leading-[1.4] text-foreground drop-shadow-[4px_4px_0_#000] sm:text-4xl">
          The Vault Door Awaits
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-pretty font-sans text-2xl leading-relaxed text-muted sm:text-3xl">
          You have reached the bottom of the shaft. Beyond lies loot, glory, and
          a permadeath that means something. Take up the torch and begin the
          descent for real.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <PixelButton href="#" size="lg">
            {"\u25B6"} Play Autarch
          </PixelButton>
        </div>
      </div>
    </section>
  );
}
