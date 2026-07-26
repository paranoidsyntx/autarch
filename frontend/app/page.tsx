import Image from "next/image";
import { ScreenshotsCarousel } from "@/components/screenshots-carousel";
import { SectionHeading } from "@/components/section-heading";

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
          className="pixelated -mt-32 w-full h-auto object-cover"
        />

        {/* Title */}
        <h1 className="font-display text-center text-[9rem] sm:text-[16rem] leading-none text-balance text-gold -mt-12">
          Autarch
        </h1>

        {/* Play button */}
        <a
          href="/play"
          className="font-pixel inline-flex select-none items-center justify-center border-2 border-white bg-transparent px-12 py-3 text-sm uppercase tracking-[0.3em] text-white transition-colors hover:bg-white hover:text-background focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-base"
        >
          Play
        </a>
      </section>

      {/* The Gameplay section */}
      <section className="mx-auto w-full max-w-5xl px-6 py-24">
        <div className="flex flex-col items-center text-center">
          <h2
            className={`font-display mt-5 text-6xl sm:text-8xl leading-none text-balance text-[#FF0000]`}
          >
            Gameplay
          </h2>
          <div className="mt-6 flex items-center gap-3" aria-hidden="true">
            <span className="h-px w-12 bg-foreground/30 sm:w-24" />
            <span className={`h-2.5 w-2.5 rotate-45 bg-[#FF0000]`} />
            <span className="h-px w-12 bg-foreground/30 sm:w-24" />
          </div>
        </div>

        <div className="mt-8 grid items-start gap-10 sm:grid-cols-[auto_1fr] sm:gap-14">
          {/* Swords sprite */}
          <div className="mx-auto flex items-center justify-center sm:mx-0">
            <Image
              src="/swords.png"
              alt="Pixel art crossed swords"
              width={64}
              height={64}
              className="pixelated h-36 w-36 sm:h-44 sm:w-44"
            />
          </div>

          {/* Body copy */}
          <div>
            <p className="text-sm leading-relaxed text-muted-foreground first-letter:mr-3 first-letter:float-left first-letter:font-display first-letter:text-6xl first-letter:leading-none first-letter:text-[#FF0000] sm:text-base">
              Choose from four classes — Apprentice, Knight, Magician, or
              Rogue — each with distinct strengths forged for a different
              style of survival. Equip a weapon and up to four artifacts,
              then descend into one of three dungeons of escalating danger.
              Every encounter is resolved fully on-chain: your fate is
              sealed in the transaction.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Each dungeon presents a series of encounters drawn at random —
              rest at a campfire to recover your strength, battle monsters
              whose abilities can poison, stun, and shatter your armor, or
              discover powerful relics hidden in the depths. Items you find
              are yours to keep forever, carried as tokens in your wallet
              from one expedition to the next. Die, and you leave with
              nothing. Survive, and grow stronger.
            </p>
          </div>
        </div>
      </section>

      {/* The Lore section */}
      <section className="mx-auto w-full max-w-5xl px-6 py-24">
        <div className="flex flex-col items-center text-center">
          <h2
            className={`font-display mt-5 text-6xl sm:text-8xl leading-none text-balance text-[#00eeff]`}
          >
            The Lore
          </h2>
          <div className="mt-6 flex items-center gap-3" aria-hidden="true">
            <span className="h-px w-12 bg-foreground/30 sm:w-24" />
            <span className={`h-2.5 w-2.5 rotate-45 bg-[#00eeff]`} />
            <span className="h-px w-12 bg-foreground/30 sm:w-24" />
          </div>
        </div>

        <div className="mt-8 grid items-start gap-10 sm:grid-cols-[auto_1fr] sm:gap-14">
          {/* Book sprite */}
          <div className="mx-auto flex items-center justify-center sm:mx-0">
            <Image
              src="/book.png"
              alt="Pixel art open book"
              width={64}
              height={64}
              className="pixelated h-36 w-36 sm:h-44 sm:w-44"
            />
          </div>

          {/* Body copy */}
          <div>
            <p className="text-sm leading-relaxed text-muted-foreground first-letter:mr-3 first-letter:float-left first-letter:font-display first-letter:text-6xl first-letter:leading-none first-letter:text-[#00eeff] sm:text-base">
              The world turns beneath a dying sun. The great cities of the
              Commonwealth have crumbled into vine and silence, and the
              throne of the Autarch sits empty. In the wilds beyond the
              fallen walls, ancient dungeons stir with creatures older
              than memory — the shape-stealing Alzabo, the shadow-haunting
              Deodand, and worse things that have no name.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Scattered through the ruins lie relics of a forgotten age:
              Terminus Est, the executioner&apos;s blade balanced with mercury;
              the Fuligin Cloak, darker than black; the IOUN Stone, humming
              with the last light of a dead star. Those brave or desperate
              enough to venture into the Vennelen Glades, the Mines of
              Saltus, and the arcane depths of Iucounu&apos;s Manse may claim
              these treasures — or join the bones that litter their halls.
              The world awaits its next Autarch. Will you rise, or will
              you be forgotten?
            </p>
          </div>
        </div>
      </section>

      {/* Screenshots carousel section */}
      <ScreenshotsCarousel />
    </main>
  );
}
