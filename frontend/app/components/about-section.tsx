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
    body: "Stake your claim over conquered floors. Autarchs collect tribute from every adventurer who dares pass through their domain.",
  },
];

export function AboutSection() {
  return (
    <section className="relative border-t-2 border-line px-4 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-8 font-display text-xl leading-relaxed text-foreground sm:text-3xl">
          Enter the Dungeon
        </h2>
        <div className="pixel-box px-6 py-6">
          <p className="text-pretty font-sans text-xl leading-relaxed text-foreground sm:text-2xl">
            Autarch is a retro pixel-art dungeon crawler built for the Web3 era.
            Grab a torch, ready your blade, and delve floor by floor into a
            crumbling underworld where every victory is written to the chain.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-14 grid max-w-3xl gap-6 md:grid-cols-3">
        {features.map((f, i) => (
          <div key={f.title} className="pixel-box p-5 text-left">
            <div className="mb-3 flex items-center gap-3">
              <span className="pixel-box flex h-9 w-9 items-center justify-center font-display text-[10px] text-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-[11px] leading-relaxed text-foreground">
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
