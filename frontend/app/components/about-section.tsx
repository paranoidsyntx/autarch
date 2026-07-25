import { Sprite } from "./sprite";

const features = [
  {
    glyph: "arch" as const,
    title: "Endless Descent",
    body: "Every floor is procedurally forged from ancient stone. The deeper you crawl, the deadlier the halls — and the richer the reward.",
  },
  {
    glyph: "rune" as const,
    title: "On-Chain Loot",
    body: "Blades, relics, and cursed trinkets are minted as true digital assets. What you earn in the dark is yours to keep, trade, or wield.",
  },
  {
    glyph: "tomb" as const,
    title: "Rule the Depths",
    body: "Stake your claim over conquered floors. Autarchs collect tribute from every adventurer who dares pass through their domain.",
  },
];

export function AboutSection() {
  return (
    <section className="relative px-4 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-8 flex items-center justify-center gap-4">
          <Sprite name="tomb_bars" scale={2} tint="stone" />
          <h2 className="font-display text-xl leading-relaxed text-torch drop-shadow-[3px_3px_0_#000] sm:text-3xl">
            Enter the Dungeon
          </h2>
          <Sprite name="tomb_bars" scale={2} tint="stone" className="-scale-x-100" />
        </div>
        <div className="pixel-frame bg-black/60 px-6 py-6">
          <p className="text-pretty font-sans text-xl leading-relaxed text-foreground sm:text-2xl">
            Autarch is a retro pixel-art dungeon crawler built for the Web3 era.
            Grab a torch, ready your blade, and delve floor by floor into a
            crumbling underworld where every victory is written to the chain.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-14 grid max-w-3xl gap-6 md:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="pixel-frame bg-black/55 p-5 text-left"
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="pixel-slot flex h-11 w-11 items-center justify-center">
                <Sprite
                  name={f.glyph}
                  scale={1}
                  tint={f.glyph === "rune" ? "gold" : "stone"}
                />
              </span>
              <h3 className="font-display text-[11px] leading-relaxed text-torch">
                {f.title}
              </h3>
            </div>
            <p className="font-sans text-lg leading-relaxed text-muted">
              {f.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
