"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/section-heading";

const SLIDES = [
  { id: 1, label: "The Descent" },
  { id: 2, label: "The Catacombs" },
  { id: 3, label: "The Throne" },
  { id: 4, label: "The Sovereign" },
];

const AUTOPLAY_MS = 4000;
const SWIPE_THRESHOLD = 40;

export function ScreenshotsCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = SLIDES.length;

  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  const goTo = useCallback(
    (i: number) => setIndex(((i % count) + count) % count),
    [count],
  );
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, next]);

  const onTouchStart = (e: React.TouchEvent) => {
    setPaused(true);
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const onTouchEnd = () => {
    if (Math.abs(touchDeltaX.current) > SWIPE_THRESHOLD) {
      goTo(index + (touchDeltaX.current < 0 ? 1 : -1));
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
    setPaused(false);
  };

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-24 sm:py-32">
      <div className="flex flex-col items-center text-center">
        <h2
          className={`font-display mt-5 text-6xl sm:text-8xl leading-none text-balance text-gold`}
        >
          Screenshots
        </h2>
        <div className="mt-6 flex items-center gap-3" aria-hidden="true">
          <span className="h-px w-12 bg-foreground/30 sm:w-24" />
          <span className={`h-2.5 w-2.5 rotate-45 bg-gold`} />
          <span className="h-px w-12 bg-foreground/30 sm:w-24" />
        </div>
      </div>

      {/* Framed viewer */}
      <div className="relative mt-8 border-2 border-foreground">
        {/* Slides */}
        <div
          className="overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {SLIDES.map((slide) => (
              <div
                key={slide.id}
                className="scanlines flex aspect-video w-full shrink-0 flex-col items-center justify-center gap-3 bg-background"
              >
                <span className="font-pixel text-sm uppercase tracking-[0.2em] text-foreground sm:text-lg">
                  {slide.label}
                </span>
                <span className="font-pixel text-[9px] uppercase tracking-[0.3em] text-muted-foreground sm:text-[10px]">
                  Screenshot coming soon
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="mt-8 flex items-center justify-center gap-3">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to ${slide.label}`}
            aria-current={i === index}
            className={`h-3.5 w-3.5 rotate-45 border-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
              i === index
                ? "border-gold bg-gold"
                : "border-foreground bg-background hover:border-gold"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
