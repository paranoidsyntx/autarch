"use client";

import { useState } from "react";
import { Character } from "@/lib/actions/character";
import { CLASSES } from "@/lib/data/classes";
import { ITEMS, Item, EFFECT_COLORS, ItemType } from "@/lib/data/items";
import Image from "next/image";

function formatEffect(effect: Item["effects"][number]): { text: string; color: string } {
  const target = effect.self ? "self" : "enemy";
  const trigger = effect.trigger.replace("_", " ").toLowerCase();
  const type = effect.type.replace("_", " ").toLowerCase();
  return {
    text: `${trigger}: ${type} ${effect.value} (${target})`,
    color: EFFECT_COLORS[effect.type],
  };
}

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

export interface Equipment {
  weapon: string | null;
  items: (string | null)[];
}

export function GameMenu({ character }: GameMenuProps) {
  const charClass = CLASSES.find((c) => c.id === Number(character.classIndex));

  const inventoryItems = (character.balances ?? []).map((b) => {
    const itemKey = hexToUtf8(b.item.itemId);
    const itemData = ITEMS[itemKey];
    return { ...b, itemData, itemKey };
  });

  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [equipment, setEquipment] = useState<Equipment>({
    weapon: null,
    items: [null, null, null, null],
  });

  const handleInventoryClick = (itemKey: string) => {
    if (selectedItem === itemKey) {
      setSelectedItem(null);
    } else {
      setSelectedItem(itemKey);
    }
  };

  const handleWeaponSlotClick = () => {
    if (!selectedItem) return;
    const itemData = ITEMS[selectedItem];
    if (!itemData || itemData.itemType !== ItemType.WEAPON) return;

    if (equipment.weapon === selectedItem) {
      setEquipment((prev) => ({ ...prev, weapon: null }));
    } else {
      setEquipment((prev) => ({ ...prev, weapon: selectedItem }));
    }
    setSelectedItem(null);
  };

  const handleItemSlotClick = (slotIndex: number) => {
    if (!selectedItem) {
      // Clicking an occupied slot with nothing selected unequips it
      if (equipment.items[slotIndex]) {
        setEquipment((prev) => {
          const items = [...prev.items];
          items[slotIndex] = null;
          return { ...prev, items };
        });
      }
      return;
    }

    const itemData = ITEMS[selectedItem];
    if (!itemData || itemData.itemType !== ItemType.ITEM) return;

    // Don't allow equipping the same item in multiple slots
    if (equipment.items.includes(selectedItem) || equipment.weapon === selectedItem) {
      setSelectedItem(null);
      return;
    }

    setEquipment((prev) => {
      const items = [...prev.items];
      items[slotIndex] = selectedItem;
      return { ...prev, items };
    });
    setSelectedItem(null);
  };

  const isEquipped = (itemKey: string) => {
    return equipment.weapon === itemKey || equipment.items.includes(itemKey);
  };

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
          {/* Weapon slot */}
          <div
            onClick={handleWeaponSlotClick}
            className={`relative h-[84px] w-[84px] border-2 bg-foreground/5 flex items-center justify-center cursor-pointer transition group ${
              equipment.weapon
                ? "border-white"
                : selectedItem && ITEMS[selectedItem]?.itemType === ItemType.WEAPON
                  ? "border-gold animate-pulse"
                  : "border-gold/40"
            }`}
          >
            {equipment.weapon && ITEMS[equipment.weapon] ? (
              <>
                <Image
                  src={ITEMS[equipment.weapon].image}
                  alt={ITEMS[equipment.weapon].name}
                  width={72}
                  height={72}
                  className="h-[72px] w-[72px] pixelated object-contain"
                />
                {/* Tooltip */}
                <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50">
                  <div className="whitespace-nowrap border-2 border-foreground/20 bg-background px-3 py-2 font-pixel text-[11px]">
                    <p style={{ color: ITEMS[equipment.weapon].color }} className="font-bold">{ITEMS[equipment.weapon].name}</p>
                    <p className="text-foreground/50 mt-0.5">WEAPON</p>
                    {ITEMS[equipment.weapon].effects.length > 0 && (
                      <ul className="mt-1 flex flex-col gap-0.5">
                        {ITEMS[equipment.weapon].effects.map((eff, idx) => {
                          const { color } = formatEffect(eff);
                          const trigger = eff.trigger.replace("_", " ").toLowerCase();
                          const type = eff.type.replace("_", " ").toLowerCase();
                          const target = eff.self ? "self" : "enemy";
                          return (
                            <li key={idx}>
                              <span className="text-foreground">{trigger}: </span>
                              <span style={{ color }}>{eff.value} {type} ({target})</span>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <span className="font-pixel text-[10px] text-foreground/30">WEAPON</span>
            )}
          </div>

          {/* 4 item slots in 2x2 grid */}
          <div className="grid grid-cols-2 gap-2">
            {[0, 1, 2, 3].map((slot) => {
              const equippedKey = equipment.items[slot];
              const equippedData = equippedKey ? ITEMS[equippedKey] : null;
              return (
                <div
                  key={slot}
                  onClick={() => handleItemSlotClick(slot)}
                  className={`relative h-[84px] w-[84px] border-2 bg-foreground/5 flex items-center justify-center cursor-pointer transition group ${
                    equippedData
                      ? "border-white"
                      : selectedItem && ITEMS[selectedItem]?.itemType === ItemType.ITEM
                        ? "border-gold animate-pulse"
                        : "border-foreground/20"
                  }`}
                >
                  {equippedData ? (
                    <>
                      <Image
                        src={equippedData.image}
                        alt={equippedData.name}
                        width={72}
                        height={72}
                        className="h-[72px] w-[72px] pixelated object-contain"
                      />
                      {/* Tooltip */}
                      <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50">
                        <div className="whitespace-nowrap border-2 border-foreground/20 bg-background px-3 py-2 font-pixel text-[11px]">
                          <p style={{ color: equippedData.color }} className="font-bold">{equippedData.name}</p>
                          <p className="text-foreground/50 mt-0.5">ITEM</p>
                          {equippedData.effects.length > 0 && (
                            <ul className="mt-1 flex flex-col gap-0.5">
                              {equippedData.effects.map((eff, idx) => {
                                const { color } = formatEffect(eff);
                                const trigger = eff.trigger.replace("_", " ").toLowerCase();
                                const type = eff.type.replace("_", " ").toLowerCase();
                                const target = eff.self ? "self" : "enemy";
                                return (
                                  <li key={idx}>
                                    <span className="text-foreground">{trigger}: </span>
                                    <span style={{ color }}>{eff.value} {type} ({target})</span>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>
              );
            })}
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
              const isSelected = item && selectedItem === item.itemKey;
              const equipped = item && isEquipped(item.itemKey);
              return (
                <div
                  key={i}
                  onClick={() => item?.itemData && handleInventoryClick(item.itemKey)}
                  className={`relative h-[84px] w-[84px] border-2 bg-foreground/5 flex items-center justify-center group transition ${
                    isSelected
                      ? "border-gold"
                      : equipped
                        ? "border-white"
                        : "border-foreground/20"
                  } ${item?.itemData ? "cursor-pointer hover:border-foreground/50" : ""}`}
                >
                  {item?.itemData ? (
                    <>
                      <Image
                        src={item.itemData.image}
                        alt={item.itemData.name}
                        width={72}
                        height={72}
                        className={`h-[72px] w-[72px] pixelated object-contain`}
                      />
                      <span className="absolute -top-0.5 -left-0.5 font-pixel text-[9px] bg-background border border-foreground/20 px-0.5 text-foreground/70">
                        {item.itemData.itemType}
                      </span>
                      <span className="absolute -bottom-0.5 -right-0.5 font-pixel text-[9px] bg-background border border-foreground/20 px-0.5 text-foreground/70">
                        {Math.floor(Number(item.amount) / 1e18)}
                      </span>
                      {/* Tooltip */}
                      <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50">
                        <div className="whitespace-nowrap border-2 border-foreground/20 bg-background px-3 py-2 font-pixel text-[11px]">
                          <p style={{ color: item.itemData.color }} className="font-bold">{item.itemData.name}</p>
                          <p className="text-foreground/50 mt-0.5">{item.itemData.itemType}</p>
                          {item.itemData.effects.length > 0 && (
                            <ul className="mt-1 flex flex-col gap-0.5">
                              {item.itemData.effects.map((eff, idx) => {
                                const { color } = formatEffect(eff);
                                const trigger = eff.trigger.replace("_", " ").toLowerCase();
                                const type = eff.type.replace("_", " ").toLowerCase();
                                const target = eff.self ? "self" : "enemy";
                                return (
                                  <li key={idx}>
                                    <span className="text-foreground">{trigger}: </span>
                                    <span style={{ color }}>{eff.value} {type} ({target})</span>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </div>
                      </div>
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
