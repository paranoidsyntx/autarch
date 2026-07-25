import { GameHud } from "./components/game-hud";
import { HeroSection } from "./components/hero-section";
import { AboutSection } from "./components/about-section";
import { ScreenshotsCarousel } from "./components/screenshots-carousel";
import { CtaSection } from "./components/cta-section";
import { Lantern } from "./components/lantern";
import { Sprite } from "./components/sprite";

/** A vertical strip of maroon brick wall that flanks the descending shaft. */
function WallColumn({ side }: { side: "left" | "right" }) {
  return (
    <div
      aria-hidden="true"
      className={`dungeon-wall relative hidden w-16 shrink-0 md:block lg:w-24 ${
        side === "left" ? "wall-cap-right" : "wall-cap-left"
      }`}
    >
      {/* lanterns spaced down the wall */}
      <div className="sticky top-24 flex flex-col items-center gap-[55vh] py-24">
        <Lantern scale={1} />
        <Lantern scale={1} />
        <Lantern scale={1} />
      </div>

      {/* a cobweb tucked into the top corner */}
      <div
        className={`absolute top-2 ${
          side === "left" ? "left-1" : "right-1 -scale-x-100"
        }`}
      >
        <Sprite name="web" scale={1} tint="bone" />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <GameHud />

      {/* The dungeon shaft: two brick walls with the descending floor between */}
      <div className="flex flex-1 justify-center bg-frame">
        <WallColumn side="left" />

        <main className="dungeon-floor relative w-full max-w-5xl flex-1 border-x-4 border-black">
          {/* Progressive darkening overlay — deeper = darker */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-transparent via-background/40 to-black"
          />

          <div className="relative z-10">
            <HeroSection />
            <AboutSection />
            <ScreenshotsCarousel />
            <CtaSection />
          </div>
        </main>

        <WallColumn side="right" />
      </div>
    </>
  );
}
