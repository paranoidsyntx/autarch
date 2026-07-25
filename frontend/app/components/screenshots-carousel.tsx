"use client";

import Image from "next/image";
import { useState } from "react";

const screenshots = [
  {
    src: "/images/screenshot-1.png",
    alt: "Top-down dungeon room with a knight, treasure chest and skeletons",
    caption: "Delve torch-lit halls of the restless dead",
  },
  {
    src: "/images/screenshot-2.png",
    alt: "Boss battle against a glowing dragon in a lava cavern",
    caption: "Face the wardens of the deep",
  },
  {
    src: "/images/screenshot-3.png",
    alt: "Inventory screen full of glowing weapons, armor and gold",
    caption: "Hoard on-chain loot that is truly yours",
  },
];

export function ScreenshotsCarousel() {
  const [index, setIndex] = useState(0);
  const total = screenshots.length;

  const go = (dir: number) => setIndex((i) => (i + dir + total) % total);
  const current = screenshots[index];

  return (
    <section className="relative px-6 py-24">
      <h2 className="text-center font-display text-xl leading-relaxed text-torch drop-shadow-[3px_3px_0_#000] sm:text-3xl">
        Glimpses of the Depths
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-pretty text-center font-sans text-xl leading-relaxed text-muted">
        Screens dragged up from the dark. More surface as the dungeon grows.
      </p>

      <div className="mx-auto mt-12 max-w-3xl">
        <div className="pixel-frame relative aspect-video overflow-hidden bg-black">
          <Image
            key={current.src}
            src={current.src}
            alt={current.alt}
            fill
            className="pixelated object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
          <div className="absolute inset-x-0 bottom-0 bg-hud/90 px-5 py-3">
            <p className="font-display text-[10px] uppercase tracking-widest text-torch sm:text-xs">
              {current.caption}
            </p>
          </div>

          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous screenshot"
            className="pixel-slot absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center font-display text-xs text-torch transition-colors hover:text-foreground focus:outline-none focus-visible:ring-4 focus-visible:ring-torch/60"
          >
            {"<"}
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next screenshot"
            className="pixel-slot absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center font-display text-xs text-torch transition-colors hover:text-foreground focus:outline-none focus-visible:ring-4 focus-visible:ring-torch/60"
          >
            {">"}
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          {screenshots.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to screenshot ${i + 1}`}
              aria-current={i === index}
              className={`h-4 w-4 border-2 border-black transition-colors ${
                i === index ? "bg-torch" : "bg-floor hover:bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
