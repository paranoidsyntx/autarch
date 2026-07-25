import Image from "next/image";
import { PixelButton } from "./pixel-button";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      {/* Dungeon entrance backdrop */}
      <Image
        src="/images/dungeon-entrance.png"
        alt="A torch-lit dungeon gateway descending into darkness"
        fill
        priority
        className="object-cover opacity-40"
      />
      {/* Darken toward the bottom to begin the descent */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-background" />

      <div className="relative z-10 flex flex-col items-center gap-8">
        <p className="font-display text-[10px] uppercase tracking-[0.4em] text-torch sm:text-xs">
          A Web3 Pixel Dungeon Crawler
        </p>

        <h1 className="font-display text-4xl leading-[1.4] text-foreground drop-shadow-[4px_4px_0_#000] sm:text-6xl md:text-7xl">
          AUTARCH
        </h1>

        <p className="max-w-xl text-pretty font-sans text-2xl leading-relaxed text-muted sm:text-3xl">
          Descend into the endless depths. Slay what lurks below, claim loot
          minted forever on-chain, and become the sole ruler of the dungeon.
        </p>

        <div className="mt-4 flex flex-col items-center gap-6">
          <PixelButton href="#play">▶ Play Now</PixelButton>
          <span className="animate-blink font-display text-[10px] uppercase tracking-widest text-muted">
            Scroll to descend
          </span>
        </div>
      </div>
    </section>
  );
}
