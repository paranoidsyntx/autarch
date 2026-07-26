"use client";

import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { createPublicClient, encodeFunctionData, http } from "viem";
import { arbitrumSepolia } from "viem/chains";
import { AUTARCH_ADDRESS } from "@/lib/data/autarch";
import { AUTARCH_ABI } from "@/lib/abi/autarch";
import { CLASSES } from "@/lib/data/classes";
import { getCharacter, Character } from "@/lib/actions/character";
import Image from "next/image";

interface CharacterCreationProps {
  walletAddress: string;
  onCharacterCreated: (character: Character) => void;
}

export function CharacterCreation({ walletAddress, onCharacterCreated }: CharacterCreationProps) {
  const { sendTransaction } = usePrivy();
  const [name, setName] = useState("");
  const [selectedClass, setSelectedClass] = useState(0);
  const [creating, setCreating] = useState(false);

  const handleCreate = async () => {
    setCreating(true);
    try {
      const publicClient = createPublicClient({ chain: arbitrumSepolia, transport: http() });

      const data = encodeFunctionData({
        abi: AUTARCH_ABI,
        functionName: "mintCharacter",
        args: [name, BigInt(selectedClass)],
      });

      const { hash } = await sendTransaction(
        { to: AUTARCH_ADDRESS, data },
        { sponsor: true }
      );

      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      if (receipt.status !== "success") {
        throw new Error(`Transaction failed: ${hash}`);
      }

      for (let i = 0; i < 10; i++) {
        await new Promise((r) => setTimeout(r, 2000));
        const c = await getCharacter(walletAddress);
        if (c) {
          onCharacterCreated(c);
          return;
        }
      }
    } finally {
      setCreating(false);
    }
  };

  return (
    <main className="flex flex-1 flex-col items-center bg-background text-foreground py-8">
      <h1 className="font-display text-6xl sm:text-8xl leading-none text-balance text-gold">
        Create Character
      </h1>
      <div className="mt-6 flex items-center gap-3" aria-hidden="true">
        <span className="h-px w-12 bg-foreground/30 sm:w-24" />
        <span className="h-2.5 w-2.5 rotate-45 bg-gold" />
        <span className="h-px w-12 bg-foreground/30 sm:w-24" />
      </div>

      <input
        type="text"
        placeholder="Character name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mt-12 w-96 border-2 border-foreground/20 bg-transparent px-4 py-3 font-pixel text-sm tracking-widest text-foreground placeholder:text-foreground/40 focus:border-gold focus:outline-none transition-colors"
      />

      <div className="mt-12 flex flex-wrap justify-center gap-6">
        {CLASSES.map((cls) => (
          <label
            key={cls.id}
            className={`w-48 flex cursor-pointer flex-col items-center gap-3 border-2 p-5 transition ${
              selectedClass === cls.id
                ? "border-gold"
                : "border-foreground/20 hover:border-foreground/50"
            }`}
          >
            <input
              type="radio"
              name="class"
              value={cls.id}
              checked={selectedClass === cls.id}
              onChange={() => setSelectedClass(cls.id)}
              className="sr-only"
            />
            <div className="h-20 w-20 pixelated">
              <Image
                src={cls.portrait}
                alt={cls.name}
                width={80}
                height={80}
                className="h-full w-full pixelated object-cover"
              />
            </div>
            <span className="font-pixel uppercase tracking-[0.2em]">
              {cls.name}
            </span>
            <div className="flex flex-col gap-1 text-xs font-pixel w-full">
              <span className="text-[#22c55e]">
                Max HP: {cls.stats.maxHp}
                {cls.stats.maxHp > 10 && <span className="ml-1 text-[#22c55e]">+</span>}
              </span>
              <span className="text-[#06b6d4]">
                Armor: {cls.stats.armor}
                {cls.stats.armor > 0 && <span className="ml-1 text-[#06b6d4]">+</span>}
              </span>
              <span className="text-[#ef4444]">
                Attack: {cls.stats.attack}
                {cls.stats.attack > 1 && <span className="ml-1 text-[#ef4444]">+</span>}
              </span>
              <span className="text-[#eab308]">
                Speed: {cls.stats.speed}
                {cls.stats.speed > 1 && <span className="ml-1 text-[#eab308]">+</span>}
              </span>
            </div>
          </label>
        ))}
      </div>

      <button
        disabled={!name.trim() || creating}
        onClick={handleCreate}
        className="cursor-pointer mt-12 font-pixel inline-flex select-none items-center justify-center border-2 border-white bg-transparent px-12 py-3 text-sm uppercase tracking-[0.3em] text-white transition-colors hover:bg-white hover:text-background focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-30 disabled:pointer-events-none"
      >
        {creating ? "Creating..." : "Create"}
      </button>
    </main>
  );
}
