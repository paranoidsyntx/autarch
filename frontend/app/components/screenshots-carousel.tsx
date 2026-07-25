"use client";

import Image from "next/image";
import { useState } from "react";

const screenshots = [
  {
    src: "/images/screenshot-1.png",
    alt: "Top-down dungeon room with a knight, treasure chest and skeletons",
    caption: "Explore torch-lit halls",
  },
  {
    src: "/images/screenshot-2.png",
    alt: "Boss battle against a glowing dragon in a lava cavern",
    caption: "Battle towering bosses",
  },
  {
    src: "/images/screenshot-3.png",
    alt: "Inventory screen full of glowing weapons, armor and gold",
    caption: "Collect on-chain loot",
  },
];

export function ScreenshotsCarousel() {
  const [index, setIndex] = useState(0);
  const total = screenshots.length;

  const go = (dir: number) => setIndex((i) => (i + dir + total) % total);
  const current = screenshots[index];

  return (
    <section className="relative px-6 py-28">
      <h2 className="text-center font-display text-2xl leading-relaxed text-torch drop-shadow-[3px_3px_0_#000] sm:text-4xl">
        Glimpses of the Depths
      </h2>

      <div className="mx-auto mt-14 max-w-4xl">
        <div className="pixel-border relative aspect-video overflow-hidden bg-black">
          <Image
            key={current.src}
            src={current.src}
            alt={current.alt}
            fill
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-6 pt-16">
            <p className="font-display text-xs uppercase tracking-widest text-torch sm:text-sm">
              {current.caption}
            </p>
          </div>

          {/* Prev / Next controls */}
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous screenshot"
            className="absolute left-3 top-1/2 -translate-y-1/2 border-4 border-black bg-stone/90 px-3 py-4 font-display text-foreground transition-colors hover:bg-torch hover:text-black focus:outline-none focus-visible:ring-4 focus-visible:ring-torch/60"
          >
            {"<"}
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next screenshot"
            className="absolute right-3 top-1/2 -translate-y-1/2 border-4 border-black bg-stone/90 px-3 py-4 font-display text-foreground transition-colors hover:bg-torch hover:text-black focus:outline-none focus-visible:ring-4 focus-visible:ring-torch/60"
          >
            {">"}
          </button>
        </div>

        {/* Dots */}
        <div className="mt-8 flex items-center justify-center gap-4">
          {screenshots.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to screenshot ${i + 1}`}
              aria-current={i === index}
              className={`h-4 w-4 border-2 border-black transition-colors ${
                i === index ? "bg-torch" : "bg-stone-light hover:bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
