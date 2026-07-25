"use client";

import { useState } from "react";

const SLIDES = [
  { id: 1, label: "Screenshot 01" },
  { id: 2, label: "Screenshot 02" },
  { id: 3, label: "Screenshot 03" },
  { id: 4, label: "Screenshot 04" },
];

export function ScreenshotsCarousel() {
  const [index, setIndex] = useState(0);
  const count = SLIDES.length;

  const go = (dir: number) => setIndex((i) => (i + dir + count) % count);

  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-24">
      <div className="flex items-center gap-4">
        {/* Prev */}
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous screenshot"
          className="font-pixel shrink-0 select-none border-2 border-foreground bg-background px-4 py-6 text-foreground transition-colors hover:bg-foreground hover:text-background focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
        >
          {"<"}
        </button>

        {/* Frame */}
        <div className="relative flex-1 overflow-hidden border-2 border-foreground">
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {SLIDES.map((slide) => (
              <div
                key={slide.id}
                className="flex aspect-video w-full shrink-0 items-center justify-center bg-background"
              >
                <span className="font-pixel text-sm sm:text-lg uppercase tracking-wider text-muted-foreground">
                  {slide.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Next */}
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next screenshot"
          className="font-pixel shrink-0 select-none border-2 border-foreground bg-background px-4 py-6 text-foreground transition-colors hover:bg-foreground hover:text-background focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
        >
          {">"}
        </button>
      </div>

      {/* Dots */}
      <div className="mt-8 flex items-center justify-center gap-3">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to ${slide.label}`}
            aria-current={i === index}
            className={`h-4 w-4 border-2 border-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground ${
              i === index ? "bg-foreground" : "bg-background"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
