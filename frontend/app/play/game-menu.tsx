"use client";

import { useState, useRef, useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { createPublicClient, encodeFunctionData, http, parseEventLogs } from "viem";
import { arbitrumSepolia } from "viem/chains";
import { Character } from "@/lib/actions/character";
import { CLASSES } from "@/lib/data/classes";
import { ITEMS, Item, EFFECT_COLORS, ItemType } from "@/lib/data/items";
import { DUNGEONS, Dungeon } from "@/lib/data/dungeons";
import { MONSTERS } from "@/lib/data/monsters";
import { AUTARCH_ADDRESS } from "@/lib/data/autarch";
import { AUTARCH_ABI } from "@/lib/abi/autarch";
import { simulateCombat, applyPassiveStats } from "@/lib/combat";
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
  onRefresh?: () => Promise<void>;
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

function utf8ToBytes32(str: string): `0x${string}` {
  const hex = Array.from(new TextEncoder().encode(str))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `0x${hex.padEnd(64, "0")}` as `0x${string}`;
}

type EncounterOption =
  | { type: "rest"; encounterIndex: number }
  | { type: "monster"; encounterIndex: number; monsterId: string }
  | { type: "item"; encounterIndex: number; itemId: string };

function resolveEncounterIndex(
  encounterIndex: number,
  dungeon: Dungeon
): EncounterOption {
  if (encounterIndex === 0) {
    return { type: "rest", encounterIndex };
  }
  if (encounterIndex <= dungeon.monsters.length) {
    const monster = dungeon.monsters[encounterIndex - 1];
    return { type: "monster", encounterIndex, monsterId: monster.monsterId };
  }
  const itemIdx = encounterIndex - dungeon.monsters.length - 1;
  const item = dungeon.items[itemIdx];
  return { type: "item", encounterIndex, itemId: item.itemId };
}

export interface Equipment {
  weapon: string | null;
  items: (string | null)[];
}

function EncounterCard({ option, onClick, disabled }: { option: EncounterOption; onClick?: () => void; disabled?: boolean }) {
  if (option.type === "rest") {
    return (
      <div onClick={onClick} className={`w-56 border-2 border-foreground/20 bg-background p-5 flex flex-col items-center gap-3 transition cursor-pointer hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] ${disabled ? "opacity-40 pointer-events-none" : ""}`}>
        <div className="h-24 w-24 border-2 border-foreground/20 flex items-center justify-center">
          <span className="text-5xl">🔥</span>
        </div>
        <p className="font-pixel text-sm uppercase tracking-[0.2em] text-[#22c55e]">Rest</p>
        <p className="font-pixel text-[10px] text-foreground/50 text-center">
          Restore 10 HP
        </p>
      </div>
    );
  }

  if (option.type === "monster") {
    const monster = MONSTERS[option.monsterId];
    if (!monster) return null;
    return (
      <div onClick={onClick} className={`w-56 border-2 border-foreground/20 bg-background p-5 flex flex-col items-center gap-3 transition cursor-pointer hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] ${disabled ? "opacity-40 pointer-events-none" : ""}`}>
        <div className="h-24 w-24 border-2 border-foreground/20 flex items-center justify-center">
          <span
            className="font-display text-3xl leading-none text-center"
            style={{ color: monster.color }}
          >
            {monster.name.charAt(0)}
          </span>
        </div>
        <p className="font-pixel text-sm uppercase tracking-[0.2em]" style={{ color: monster.color }}>
          {monster.name}
        </p>
        <div className="flex flex-col gap-1 font-pixel text-[10px] w-full">
          <span className="text-[#22c55e]">HP: {monster.stats.maxHp}</span>
          <span className="text-[#06b6d4]">Armor: {monster.stats.armor}</span>
          <span className="text-[#eab308]">Speed: {monster.stats.speed}</span>
          <span className="text-[#a855f7]">EXP: {monster.exp}</span>
        </div>
        {monster.effects.length > 0 && (
          <ul className="w-full flex flex-col gap-0.5 font-pixel text-[10px]">
            {monster.effects.map((eff, idx) => {
              const color = EFFECT_COLORS[eff.type];
              const trigger = eff.trigger.replace("_", " ").toLowerCase();
              const type = eff.type.replace("_", " ").toLowerCase();
              const target = eff.self ? "self" : "enemy";
              return (
                <li key={idx}>
                  <span className="text-foreground/60">{trigger}: </span>
                  <span style={{ color }}>
                    {eff.value} {type} ({target})
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }

  // Item encounter
  const item = ITEMS[option.itemId];
  if (!item) return null;
  return (
    <div onClick={onClick} className={`w-56 border-2 border-foreground/20 bg-background p-5 flex flex-col items-center gap-3 transition cursor-pointer hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] ${disabled ? "opacity-40 pointer-events-none" : ""}`}>
      <div className="h-24 w-24 border-2 border-foreground/20 flex items-center justify-center">
        <Image
          src={item.image}
          alt={item.name}
          width={80}
          height={80}
          className="h-20 w-20 pixelated object-contain"
        />
      </div>
      <p className="font-pixel text-sm uppercase tracking-[0.2em]" style={{ color: item.color }}>
        {item.name}
      </p>
      <p className="font-pixel text-[10px] text-foreground/50 uppercase">
        {item.itemType}
      </p>
      {item.effects.length > 0 && (
        <ul className="w-full flex flex-col gap-0.5 font-pixel text-[10px]">
          {item.effects.map((eff, idx) => {
            const color = EFFECT_COLORS[eff.type];
            const trigger = eff.trigger.replace("_", " ").toLowerCase();
            const type = eff.type.replace("_", " ").toLowerCase();
            const target = eff.self ? "self" : "enemy";
            return (
              <li key={idx}>
                <span className="text-foreground/60">{trigger}: </span>
                <span style={{ color }}>
                  {eff.value} {type} ({target})
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export function GameMenu({ character, onRefresh }: GameMenuProps) {
  const { sendTransaction } = usePrivy();
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
  const [encounterOptions, setEncounterOptions] = useState<EncounterOption[] | null>(null);
  const [activeDungeon, setActiveDungeon] = useState<Dungeon | null>(null);
  const [entering, setEntering] = useState(false);
  const [resolving, setResolving] = useState(false);
  const [dungeonError, setDungeonError] = useState<string | null>(null);
  const [encounterResult, setEncounterResult] = useState<{ text: string; color: string } | null>(null);
  const [dungeonComplete, setDungeonComplete] = useState(false);
  const [dungeonHp, setDungeonHp] = useState(0);
  const [dungeonMaxHp, setDungeonMaxHp] = useState(0);
  const [dungeonStats, setDungeonStats] = useState<{ maxHp: number; armor: number; attack: number; speed: number } | null>(null);
  const [dungeonItemKeys, setDungeonItemKeys] = useState<string[]>([]);
  const [dungeonLog, setDungeonLog] = useState<{ text: string; color: string }[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [dungeonLog, resolving]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function parseNextEncounterIndexes(logs: any[]) {
    const restLogs = parseEventLogs({ abi: AUTARCH_ABI, logs, eventName: "DungeonRest" });
    const monsterLogs = parseEventLogs({ abi: AUTARCH_ABI, logs, eventName: "DungeonMonster" });
    const itemLogs = parseEventLogs({ abi: AUTARCH_ABI, logs, eventName: "DungeonItem" });

    let nextIndexes: readonly bigint[] = [];
    let result: { text: string; color: string } | null = null;

    if (restLogs.length > 0) {
      nextIndexes = restLogs[0].args.encounterIndexes;
      const prev = Number(restLogs[0].args.prevHp);
      const next = Number(restLogs[0].args.newHp);
      result = { text: `Rested — HP ${prev} → ${next}`, color: "#22c55e" };
    } else if (monsterLogs.length > 0) {
      nextIndexes = monsterLogs[0].args.encounterIndexes;
      const resolution = Number(monsterLogs[0].args.resolution);
      const exp = Number(monsterLogs[0].args.gainedExp);
      if (resolution === 0) {
        result = { text: "Your character has fallen...", color: "#ef4444" };
      } else if (resolution === 1) {
        result = { text: `Monster slain! +${exp} EXP`, color: "#a855f7" };
      } else {
        result = { text: "Monster fled!", color: "#eab308" };
      }
    } else if (itemLogs.length > 0) {
      nextIndexes = itemLogs[0].args.encounterIndexes;
      const foundItemId = hexToUtf8(itemLogs[0].args.itemId);
      const foundItem = ITEMS[foundItemId];
      result = {
        text: `Found ${foundItem?.name ?? "an item"}!`,
        color: foundItem?.color ?? "#fbbf24",
      };
    }

    return { nextIndexes: nextIndexes.map(Number), result };
  }

  const handleEncounterClick = async (option: EncounterOption) => {
    if (!activeDungeon || resolving) return;
    setResolving(true);
    setDungeonError(null);

    try {
      const data = encodeFunctionData({
        abi: AUTARCH_ABI,
        functionName: "continueDungeon",
        args: [BigInt(character.characterId), BigInt(option.encounterIndex)],
      });

      const publicClient = createPublicClient({
        chain: arbitrumSepolia,
        transport: http(),
      });

      const { hash } = await sendTransaction(
        { to: AUTARCH_ADDRESS, data },
        { sponsor: true }
      );

      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      if (receipt.status !== "success") throw new Error("Transaction failed");

      const { nextIndexes, result } = parseNextEncounterIndexes(receipt.logs);
      setEncounterResult(result);

      if (option.type === "rest") {
        const newHp = Math.min(dungeonMaxHp, dungeonHp + 10);
        setDungeonHp(newHp);
        setDungeonLog((prev) => [...prev, { text: `> Rested. HP ${dungeonHp} → ${newHp}`, color: "#22c55e" }]);
      } else if (option.type === "monster" && dungeonStats) {
        const monster = MONSTERS[option.monsterId];
        if (monster) {
          const combatResult = simulateCombat(dungeonHp, dungeonStats, dungeonItemKeys, monster);
          setDungeonHp(combatResult.characterHp);
          if (combatResult.resolution === "kill") {
            setDungeonLog((prev) => [...prev, { text: `> Killed ${monster.name}. HP ${dungeonHp} → ${combatResult.characterHp}`, color: "#a855f7" }]);
          } else if (combatResult.resolution === "fled") {
            setDungeonLog((prev) => [...prev, { text: `> ${monster.name} fled. HP ${dungeonHp} → ${combatResult.characterHp}`, color: "#eab308" }]);
          } else {
            setDungeonLog((prev) => [...prev, { text: `> Slain by ${monster.name}.`, color: "#ef4444" }]);
          }
        }
      } else if (option.type === "item") {
        const foundItem = ITEMS[option.itemId];
        setDungeonLog((prev) => [...prev, { text: `> Picked up ${foundItem?.name ?? "an item"}.`, color: foundItem?.color ?? "#fbbf24" }]);
      }

      if (nextIndexes.length === 0) {
        setEncounterOptions(null);
        setDungeonComplete(true);
        const isDeath = result?.text.includes("fallen");
        if (!isDeath) {
          setDungeonLog((prev) => [...prev, { text: `> Dungeon complete.`, color: "#fbbf24" }]);
        }
      } else {
        const options = nextIndexes.map((idx) =>
          resolveEncounterIndex(idx, activeDungeon)
        );
        setEncounterOptions(options);
      }
    } catch (err) {
      setDungeonError(err instanceof Error ? err.message : "Encounter failed");
    } finally {
      setResolving(false);
    }
  };

  const handleReturnToMenu = async () => {
    setActiveDungeon(null);
    setEncounterOptions(null);
    setEncounterResult(null);
    setDungeonComplete(false);
    setDungeonHp(0);
    setDungeonMaxHp(0);
    setDungeonStats(null);
    setDungeonItemKeys([]);
    setDungeonLog([]);
    onRefresh?.();
  };

  const handleDungeonClick = async (dungeon: Dungeon) => {
    if (!equipment.weapon) {
      setDungeonError("Equip a weapon first!");
      return;
    }
    setDungeonError(null);
    setEntering(true);

    try {
      const itemIds: `0x${string}`[] = [utf8ToBytes32(equipment.weapon)];
      for (const slot of equipment.items) {
        if (slot) itemIds.push(utf8ToBytes32(slot));
      }

      const data = encodeFunctionData({
        abi: AUTARCH_ABI,
        functionName: "startDungeon",
        args: [
          utf8ToBytes32(dungeon.id),
          BigInt(character.characterId),
          itemIds,
        ],
      });

      const publicClient = createPublicClient({
        chain: arbitrumSepolia,
        transport: http(),
      });

      const { hash } = await sendTransaction(
        { to: AUTARCH_ADDRESS, data },
        { sponsor: true }
      );

      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      if (receipt.status !== "success") {
        throw new Error("Transaction failed");
      }

      const logs = parseEventLogs({
        abi: AUTARCH_ABI,
        logs: receipt.logs,
        eventName: "DungeonStarted",
      });

      if (logs.length === 0) {
        throw new Error("DungeonStarted event not found");
      }

      const encounterIndexes = logs[0].args.encounterIndexes;
      const options = encounterIndexes.map((idx) =>
        resolveEncounterIndex(Number(idx), dungeon)
      );

      const equippedKeys: string[] = [equipment.weapon!];
      for (const slot of equipment.items) {
        if (slot) equippedKeys.push(slot);
      }
      const stats = applyPassiveStats(charClass!.stats, equippedKeys);
      setDungeonStats(stats);
      setDungeonHp(stats.maxHp);
      setDungeonMaxHp(stats.maxHp);
      setDungeonItemKeys(equippedKeys);

      setDungeonLog([{ text: `> Entered ${dungeon.name}`, color: "#fbbf24" }]);
      setActiveDungeon(dungeon);
      setEncounterOptions(options);
    } catch (err) {
      setDungeonError(err instanceof Error ? err.message : "Failed to start dungeon");
    } finally {
      setEntering(false);
    }
  };

  const [escaping, setEscaping] = useState(false);

  const handleDebugEscape = async () => {
    setEscaping(true);
    setDungeonError(null);

    try {
      const publicClient = createPublicClient({
        chain: arbitrumSepolia,
        transport: http(),
      });

      const charId = BigInt(character.characterId);
      const walletAddr = character.id as `0x${string}`;
      let currentIndexes: number[] | null = null;

      for (let round = 0; round < 20; round++) {
        let encounterIndex: number;

        if (currentIndexes && currentIndexes.length > 0) {
          encounterIndex = currentIndexes[0];
        } else if (currentIndexes !== null) {
          break;
        } else {
          let found = false;
          encounterIndex = 0;
          for (let idx = 0; idx <= 10; idx++) {
            try {
              await publicClient.simulateContract({
                address: AUTARCH_ADDRESS,
                abi: AUTARCH_ABI,
                functionName: "continueDungeon",
                args: [charId, BigInt(idx)],
                account: walletAddr,
              });
              encounterIndex = idx;
              found = true;
              break;
            } catch {
              continue;
            }
          }
          if (!found) break;
        }

        const data = encodeFunctionData({
          abi: AUTARCH_ABI,
          functionName: "continueDungeon",
          args: [charId, BigInt(encounterIndex)],
        });

        const { hash } = await sendTransaction(
          { to: AUTARCH_ADDRESS, data },
          { sponsor: true }
        );

        const receipt = await publicClient.waitForTransactionReceipt({ hash });
        if (receipt.status !== "success") throw new Error("Transaction failed");

        const restLogs = parseEventLogs({ abi: AUTARCH_ABI, logs: receipt.logs, eventName: "DungeonRest" });
        const monsterLogs = parseEventLogs({ abi: AUTARCH_ABI, logs: receipt.logs, eventName: "DungeonMonster" });
        const itemLogs = parseEventLogs({ abi: AUTARCH_ABI, logs: receipt.logs, eventName: "DungeonItem" });

        let nextIndexes: readonly bigint[] = [];
        if (restLogs.length > 0) nextIndexes = restLogs[0].args.encounterIndexes;
        else if (monsterLogs.length > 0) nextIndexes = monsterLogs[0].args.encounterIndexes;
        else if (itemLogs.length > 0) nextIndexes = itemLogs[0].args.encounterIndexes;

        currentIndexes = nextIndexes.map(Number);
        if (currentIndexes.length === 0) break;
      }

      setEncounterOptions(null);
      setActiveDungeon(null);
    } catch (err) {
      setDungeonError(err instanceof Error ? err.message : "Debug escape failed");
    } finally {
      setEscaping(false);
    }
  };

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
    <main className="flex flex-1 bg-background text-foreground h-full overflow-hidden">
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
      <div className="flex flex-1 flex-col min-h-0">
        {/* Main content area */}
        <div className="flex flex-1 flex-col items-center justify-center overflow-auto min-h-0">
          {activeDungeon && (encounterOptions || dungeonComplete) ? (
            <>
              <h2 className="font-pixel text-2xl text-gold mb-2 uppercase tracking-[0.2em]">
                {activeDungeon.name}
              </h2>

              {/* HP bar */}
              <div className="flex items-center gap-3 mb-4">
                <span className="font-pixel text-xs text-foreground/50">HP</span>
                <div className="w-48 h-4 border border-foreground/20 bg-foreground/5 relative">
                  <div
                    className="h-full transition-all duration-500"
                    style={{
                      width: `${dungeonMaxHp > 0 ? (dungeonHp / dungeonMaxHp) * 100 : 0}%`,
                      backgroundColor: dungeonHp > dungeonMaxHp / 2 ? "#22c55e" : dungeonHp > dungeonMaxHp / 4 ? "#eab308" : "#ef4444",
                    }}
                  />
                </div>
                <span className="font-pixel text-xs text-foreground/70">
                  {dungeonHp}/{dungeonMaxHp}
                </span>
              </div>

              {encounterResult && (
                <p
                  className="font-pixel text-sm mb-4"
                  style={{ color: encounterResult.color }}
                >
                  {encounterResult.text}
                </p>
              )}

              {resolving && (
                <p className="font-pixel text-sm text-gold mb-4 animate-pulse">
                  Resolving...
                </p>
              )}

              {dungeonComplete ? (
                <div className="flex flex-col items-center gap-6">
                  {dungeonHp === 0 ? (
                    <h2 className="font-display text-7xl text-[#FF0000]">
                      YOU DIED
                    </h2>
                  ) : (
                    <h2 className="font-display text-7xl text-gold">
                      VICTORY
                    </h2>
                  )}
                  <button
                    onClick={handleReturnToMenu}
                    className="font-pixel text-sm border-2 border-foreground/20 bg-background px-8 py-3 uppercase tracking-[0.2em] text-foreground transition cursor-pointer hover:border-white hover:text-white"
                  >
                    Return
                  </button>
                </div>
              ) : encounterOptions ? (
                <>
                  <p className="font-pixel text-xs text-foreground/50 mb-8 uppercase tracking-[0.2em]">
                    Choose your path
                  </p>
                  <div className="flex flex-wrap justify-center gap-6">
                    {encounterOptions.map((option, i) => (
                      <EncounterCard
                        key={i}
                        option={option}
                        onClick={() => handleEncounterClick(option)}
                        disabled={resolving}
                      />
                    ))}
                  </div>
                </>
              ) : null}
            </>
          ) : (
            <>
              <h2 className="font-display text-5xl text-[#FF0000] mb-3">
                Dungeons
              </h2>

              {dungeonError && (
                <p className="font-pixel text-xs text-[#ef4444] mb-4">{dungeonError}</p>
              )}

              <div className="mt-2 flex flex-wrap justify-center gap-8">
                {Object.values(DUNGEONS).map((dungeon) => (
                  <button
                    key={dungeon.id}
                    disabled={entering}
                    onClick={() => handleDungeonClick(dungeon)}
                    className="group relative flex flex-col items-center cursor-pointer w-52 disabled:opacity-40 disabled:pointer-events-none"
                  >
                    <div className="relative border-2 border-foreground/30 overflow-hidden transition group-hover:border-gold group-hover:shadow-[0_0_20px_rgba(255,215,0,0.15)]">
                      <div className="h-52 w-52 pixelated">
                        <Image
                          src={dungeon.image}
                          alt={dungeon.name}
                          width={208}
                          height={208}
                          className="h-full w-full pixelated object-cover transition group-hover:scale-105"
                        />
                      </div>
                    </div>
                    <p className="font-display text-3xl text-white leading-tight">
                      {dungeon.name}
                    </p>
                    <span className="font-pixel text-[11px] text-[#f700ff]">
                      difficulty {"+".repeat(dungeon.difficulty)}
                    </span>
                  </button>
                ))}
              </div>

              {entering && (
                <p className="font-pixel text-sm text-gold mt-6 animate-pulse">
                  Entering dungeon...
                </p>
              )}
            </>
          )}
        </div>

        {/* Bottom bar - Inventory or Dungeon Log */}
        <div className="shrink-0 border-t-2 border-foreground/10 p-4">
          {activeDungeon ? (
            <>
              <span className="font-pixel text-xs uppercase tracking-[0.2em] text-foreground/70 mb-2 block">
                Log
              </span>
              <div ref={logRef} className="h-24 overflow-y-auto border border-foreground/20 bg-foreground/5 p-3 font-mono text-xs flex flex-col gap-0.5">
                {dungeonLog.map((entry, i) => (
                  <span key={i} style={{ color: entry.color }}>{entry.text}</span>
                ))}
                {resolving && (
                  <span className="text-gold animate-pulse">{">"} ...</span>
                )}
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>

      {/* Debug escape button */}
      <button
        onClick={handleDebugEscape}
        disabled={escaping}
        className="fixed bottom-4 left-4 z-50 font-pixel text-[10px] border border-foreground/20 bg-background px-2 py-1 text-foreground/40 hover:text-foreground/70 hover:border-foreground/40 transition disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
      >
        {escaping ? "ESCAPING..." : "DEBUG_ESCAPE"}
      </button>
    </main>
  );
}
