import { Character } from "@/lib/actions/character";
import { CLASSES } from "@/lib/data/classes";
import { ITEMS } from "@/lib/data/items";
import Image from "next/image";

interface GameMenuProps {
  character: Character;
}

function hexToUtf8(hex: string): string {
  const clean = hex.startsWith("0x") ? hex.slice(2) : hex;
  const bytes = [];
  for (let i = 0; i < clean.length; i += 2) {
    const byte = parseInt(clean.slice(i, i + 2), 16);
    if (byte === 0) break;
    bytes.push(byte);
  }
  return String.fromCharCode(...bytes);
}

export function GameMenu({ character }: GameMenuProps) {
  const charClass = CLASSES.find((c) => c.id === Number(character.classIndex));

  const inventoryItems = (character.balances ?? []).map((b) => {
    const itemKey = hexToUtf8(b.item.itemId);
    const itemData = ITEMS[itemKey];
    return { ...b, itemData, itemKey };
  });

  return (
    <main className="flex flex-1 bg-background text-foreground h-full">
      {/* Left Sidebar */}
      <aside className="flex w-64 flex-col border-r-2 border-foreground/10 p-6 gap-6">
        {/* Character name */}
        <h1 className="font-display text-4xl text-gold leading-none">
          {character.name}
        </h1>

        {/* Portrait & class */}
        {charClass && (
          <div className="flex items-center gap-4">
            <div className="h-28 w-28 pixelated border-2 border-foreground/20 shrink-0">
              <Image
                src={charClass.portrait}
                alt={charClass.name}
                width={112}
                height={112}
                className="h-full w-full pixelated object-cover"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-pixel text-xs uppercase tracking-[0.2em] text-foreground/70">
                {charClass.name}
              </span>
              <span className="text-[#22c55e] font-pixel text-xs">HP: {charClass.stats.maxHp}</span>
              <span className="text-[#06b6d4] font-pixel text-xs">Armor: {charClass.stats.armor}</span>
              <span className="text-[#ef4444] font-pixel text-xs">Attack: {charClass.stats.attack}</span>
              <span className="text-[#eab308] font-pixel text-xs">Speed: {charClass.stats.speed}</span>
            </div>
          </div>
        )}

        {/* Equipment slots */}
        <div className="flex flex-col items-center gap-3">
          {/* Weapon slot (centered on top) */}
          <div className="h-[84px] w-[84px] border-2 border-gold/40 bg-foreground/5 flex items-center justify-center">
            <span className="font-pixel text-[10px] text-foreground/30">Weapon</span>
          </div>

          {/* 4 item slots in 2x2 grid */}
          <div className="grid grid-cols-2 gap-2">
            {[0, 1, 2, 3].map((slot) => (
              <div
                key={slot}
                className="h-[84px] w-[84px] border-2 border-foreground/20 bg-foreground/5 flex items-center justify-center"
              >
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Right content: dungeon area + inventory bottom */}
      <div className="flex flex-1 flex-col">
        {/* Main content area - Dungeon selection */}
        <div className="flex flex-1 flex-col items-center justify-center p-8">
          <h2 className="font-display text-4xl sm:text-6xl text-[#FF0000]">
            Dungeons
          </h2>
          <div className="mt-4 flex items-center gap-3" aria-hidden="true">
            <span className="h-px w-12 bg-foreground/30 sm:w-24" />
            <span className="h-2.5 w-2.5 rotate-45 bg-[#FF0000]" />
            <span className="h-px w-12 bg-foreground/30 sm:w-24" />
          </div>
          <p className="mt-6 font-pixel text-sm text-foreground/40">
            Coming soon...
          </p>
        </div>

        {/* Bottom bar - Inventory */}
        <div className="border-t-2 border-foreground/10 p-4">
          <span className="font-pixel text-xs uppercase tracking-[0.2em] text-foreground/70 mb-2 block">
            Inventory
          </span>
          <div className="grid grid-cols-[repeat(auto-fill,84px)] gap-2">
            {Array.from({ length: 16 }).map((_, i) => {
              const item = inventoryItems[i];
              return (
                <div
                  key={i}
                  className="relative h-[84px] w-[84px] border-2 border-foreground/20 bg-foreground/5 flex items-center justify-center"
                  title={item?.itemData ? `${item.itemData.name} (${Math.floor(Number(item.amount) / 1e18)})` : ""}
                >
                  {item?.itemData ? (
                    <>
                      <Image
                        src={item.itemData.image}
                        alt={item.itemData.name}
                        width={72}
                        height={72}
                        className="h-[72px] w-[72px] pixelated object-contain"
                      />
                      <span className="absolute -top-0.5 -left-0.5 font-pixel text-[9px] bg-background border border-foreground/20 px-0.5 text-foreground/70">
                        {item.itemData.itemType}
                      </span>
                      <span className="absolute -bottom-0.5 -right-0.5 font-pixel text-[9px] bg-background border border-foreground/20 px-0.5 text-foreground/70">
                        {Math.floor(Number(item.amount) / 1e18)}
                      </span>
                    </>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
