import { PixelButton } from "./pixel-button";

export function CtaSection() {
  return (
    <section
      id="play"
      className="relative flex min-h-[70vh] flex-col items-center justify-center border-t-2 border-line px-6 py-28 text-center"
    >
      <div className="flex w-full max-w-2xl flex-col items-center">
        <h2 className="text-balance font-display text-2xl leading-[1.4] text-foreground sm:text-4xl">
          The Vault Door Awaits
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-pretty font-sans text-2xl leading-relaxed text-muted sm:text-3xl">
          You have reached the bottom of the shaft. Beyond lies loot, glory, and
          a permadeath that means something. Take up the torch and begin the
          descent for real.
        </p>

        <div className="mt-10">
          <PixelButton href="#" size="lg">
            Play Autarch
          </PixelButton>
        </div>
      </div>
    </section>
  );
}
