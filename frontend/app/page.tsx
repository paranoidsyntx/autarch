import Image from "next/image";
import { HeroSection } from "./components/hero-section";
import { AboutSection } from "./components/about-section";
import { ScreenshotsCarousel } from "./components/screenshots-carousel";
import { CtaSection } from "./components/cta-section";
import { Torch } from "./components/torch";

export default function Home() {
  return (
    <main className="relative flex-1 overflow-hidden bg-background">
      {/* ---- Dungeon side walls (cobblestone) ---- */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-repeat sm:w-20 md:w-28"
        style={{
          backgroundImage: "url(/images/cobble-wall.png)",
          backgroundSize: "128px",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/10" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-repeat sm:w-20 md:w-28"
        style={{
          backgroundImage: "url(/images/cobble-wall.png)",
          backgroundSize: "128px",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-black/10" />
      </div>

      {/* ---- Torches mounted down the descent ---- */}
      <Torch side="left" className="top-[22%]" />
      <Torch side="right" className="top-[34%]" />
      <Torch side="left" className="top-[52%]" />
      <Torch side="right" className="top-[68%]" />
      <Torch side="left" className="top-[84%]" />

      {/* ---- Spider webs in the corners ---- */}
      <Image
        src="/images/web.png"
        alt=""
        aria-hidden="true"
        width={160}
        height={160}
        className="pointer-events-none absolute left-8 top-[8%] h-24 w-24 opacity-70 mix-blend-screen sm:left-20 sm:h-32 sm:w-32"
      />
      <Image
        src="/images/web.png"
        alt=""
        aria-hidden="true"
        width={160}
        height={160}
        className="pointer-events-none absolute right-8 top-[58%] h-24 w-24 -scale-x-100 opacity-70 mix-blend-screen sm:right-20 sm:h-32 sm:w-32"
      />

      {/* ---- Overall descent darkening overlay ---- */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-background/20 to-black"
      />

      {/* ---- Content ---- */}
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ScreenshotsCarousel />
        <CtaSection />
      </div>
    </main>
  );
}
