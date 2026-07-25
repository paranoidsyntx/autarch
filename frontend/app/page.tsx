import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ScreenshotsCarousel } from "@/components/screenshots-carousel";
import { CtaSection } from "@/components/cta-section";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 border-x-2 border-line">
      <HeroSection />
      <AboutSection />
      <ScreenshotsCarousel />
      <CtaSection />
    </main>
  );
}
