"use client";

import { useState } from "react";

const screenshots = [
  {
    label: "SCREENSHOT 01",
    caption: "Delve torch-lit halls of the restless dead",
  },
  {
    label: "SCREENSHOT 02",
    caption: "Face the wardens of the deep",
  },
  {
    label: "SCREENSHOT 03",
    caption: "Hoard on-chain loot that is truly yours",
  },
];

export function ScreenshotsCarousel() {
  const [index, setIndex] = useState(0);
  const total = screenshots.length;

  const go = (dir: number) => setIndex((i) => (i + dir + total) % total);
  const current = screenshots[index];

  return (
    <section className="relative border-t-2 border-line px-6 py-24">
      <h2 className="text-center font-display text-xl leading-relaxed text-foreground sm:text-3xl">
        Glimpses of the Depths
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-pretty text-center font-sans text-xl leading-relaxed text-muted">
        Screens dragged up from the dark. More surface as the dungeon grows.
      </p>

      <div className="mx-auto mt-12 max-w-3xl">
        <div className="pixel-box relative aspect-video overflow-hidden bg-background">
          {/* Placeholder frame — text + outline only */}
          <div className="flex h-full w-full flex-col items-center justify-center gap-3">
            <span className="font-display text-sm uppercase tracking-widest text-muted sm:text-lg">
              {current.label}
            </span>
            <span className="font-sans text-lg text-muted">[ placeholder ]</span>
          </div>

          <div className="absolute inset-x-0 bottom-0 border-t-2 border-line bg-background px-5 py-3">
            <p className="font-display text-[10px] uppercase tracking-widest text-foreground sm:text-xs">
              {current.caption}
            </p>
          </div>

          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous screenshot"
            className="pixel-btn-ghost absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center font-display text-xs"
          >
            {"<"}
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next screenshot"
            className="pixel-btn-ghost absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center font-display text-xs"
          >
            {">"}
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          {screenshots.map((s, i) => (
            <button
              key={s.label}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to screenshot ${i + 1}`}
              aria-current={i === index}
              className={`h-4 w-4 border-2 border-line transition-colors ${
                i === index ? "bg-foreground" : "bg-background hover:bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
