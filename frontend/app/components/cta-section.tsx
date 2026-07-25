import { PixelButton } from "./pixel-button";

export function CtaSection() {
  return (
    <section
      id="play"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 py-32 text-center"
    >
      {/* Deepest part of the dungeon — near total darkness */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-black to-black" />

      <div className="relative z-10 flex flex-col items-center gap-8">
        <p className="font-display text-[10px] uppercase tracking-[0.4em] text-torch sm:text-xs">
          The Floor Is Yours
        </p>
        <h2 className="max-w-3xl text-balance font-display text-3xl leading-[1.4] text-foreground drop-shadow-[4px_4px_0_#000] sm:text-5xl">
          Will You Rule The Dark?
        </h2>
        <p className="max-w-xl text-pretty font-sans text-2xl leading-relaxed text-muted sm:text-3xl">
          The dungeon has swallowed every hero before you. Take up the torch,
          descend into Autarch, and carve your name into the deep.
        </p>
        <PixelButton href="#" className="mt-4">
          ▶ Play Autarch
        </PixelButton>
      </div>
    </section>
  );
}
