import Image from "next/image";

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
          className="pixelated w-full h-auto object-cover"
        />

        {/* Title */}
        <h1 className="font-pixel mt-16 text-center text-4xl sm:text-6xl tracking-wider text-balance">
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
    </main>
  );
}
