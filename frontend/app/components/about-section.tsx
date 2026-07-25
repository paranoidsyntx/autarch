const features = [
  {
    title: "Endless Descent",
    body: "Every floor is procedurally forged from ancient stone. The deeper you crawl, the deadlier the halls — and the richer the reward.",
  },
  {
    title: "On-Chain Loot",
    body: "Blades, relics, and cursed trinkets are minted as true digital assets. What you earn in the dark is yours to keep, trade, or wield.",
  },
  {
    title: "Rule the Depths",
    body: "Stake your claim over conquered floors. Autarchs collect tribute from every adventurer who dares to pass through their domain.",
  },
];

export function AboutSection() {
  return (
    <section className="relative px-6 py-28">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-display text-2xl leading-relaxed text-torch drop-shadow-[3px_3px_0_#000] sm:text-4xl">
          Enter the Dungeon
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-pretty font-sans text-2xl leading-relaxed text-foreground sm:text-3xl">
          Autarch is a retro pixel art dungeon crawler built for the Web3 era.
          Grab a torch, ready your blade, and delve floor by floor into a
          crumbling underworld where every victory is written to the chain.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="pixel-border bg-stone/80 p-6 text-left"
          >
            <h3 className="font-display text-sm leading-relaxed text-torch">
              {f.title}
            </h3>
            <p className="mt-4 font-sans text-xl leading-relaxed text-muted">
              {f.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
