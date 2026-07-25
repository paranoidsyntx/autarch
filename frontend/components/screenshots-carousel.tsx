"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SLIDES = [
  { id: 1, label: "Screenshot 01" },
  { id: 2, label: "Screenshot 02" },
  { id: 3, label: "Screenshot 03" },
  { id: 4, label: "Screenshot 04" },
];

const AUTOPLAY_MS = 4000;
const SWIPE_THRESHOLD = 40;

export function ScreenshotsCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = SLIDES.length;

  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  const goTo = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);
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
    <section className="mx-auto w-full max-w-4xl px-6 py-24">
      {/* Frame */}
      <div
        className="relative overflow-hidden border-2 border-foreground"
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
              className="flex aspect-video w-full shrink-0 items-center justify-center bg-background"
            >
              <span className="font-pixel text-sm sm:text-lg uppercase tracking-wider text-muted-foreground">
                {slide.label}
              </span>
            </div>
          ))}
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
            className={`h-4 w-4 border-2 border-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground ${
              i === index ? "bg-foreground" : "bg-background"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
