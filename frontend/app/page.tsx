import Image from "next/image";
import { ScreenshotsCarousel } from "@/components/screenshots-carousel";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col bg-background text-foreground">
      {/* Title section */}
      <section className="flex flex-col items-center">
        {/* Background image: full width, top-aligned, pixelated */}
        <Image
          src="/castle-landmark.png"
          alt="Pixel art castle perched on a rocky cliff above the sea"
          width={320}
          height={80}
          priority
          className="pixelated -mt-[8.3vw] w-full h-auto object-cover"
        />

        {/* Title */}
        <h1 className="font-display mt-12 text-center text-[9rem] sm:text-[16rem] leading-none text-balance text-gold">
          Autarch
        </h1>

        {/* Play button */}
        <a
          href="#play"
          className="font-pixel mt-10 inline-flex select-none items-center justify-center border-2 border-foreground bg-background px-10 py-5 text-sm sm:text-base uppercase tracking-wider text-foreground transition-colors hover:bg-foreground hover:text-background focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
        >
          Play
        </a>
      </section>

      {/* The World of Autarch section */}
      <section className="mx-auto w-full max-w-3xl px-6 py-24">
        <div className="flex items-center gap-5">
          <Image
            src="/reaper-portrait.png"
            alt="Pixel art portrait of a hooded reaper"
            width={64}
            height={64}
            className="pixelated h-16 w-16 shrink-0 sm:h-20 sm:w-20"
          />
          <h2 className="font-pixel text-xl sm:text-3xl tracking-wider text-balance">
            The World of Autarch
          </h2>
        </div>

        <p className="mt-8 text-sm sm:text-base leading-relaxed text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </section>

      {/* Screenshots carousel section */}
      <ScreenshotsCarousel />
    </main>
  );
}
