"use client";

import { useEffect, useRef, useState } from "react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { getCharacter, Character } from "@/lib/actions/character";
import { LoadingScreen } from "./loading-screen";
import { CharacterCreation } from "./character-creation";
import { GameMenu } from "./game-menu";

export default function Play() {
  const { ready, authenticated, login } = usePrivy();
  const { wallets } = useWallets();
  const loginTriggered = useRef(false);

  const embeddedWallet = wallets.find((w) => w.walletClientType === "privy");

  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ready && !authenticated && !loginTriggered.current) {
      loginTriggered.current = true;
      login();
    }
  }, [ready, authenticated, login]);

  useEffect(() => {
    if (!embeddedWallet) return;

    getCharacter(embeddedWallet.address.toLowerCase())
      .then((c) => {
        if (c) setCharacter(c);
      })
      .finally(() => setLoading(false));
  }, [embeddedWallet]);

  if (!ready || !authenticated || loading || !embeddedWallet) {
    return <LoadingScreen />;
  }

  if (character) {
    return <GameMenu character={character} />;
  }

  return (
    <CharacterCreation
      walletAddress={embeddedWallet.address.toLowerCase()}
      onCharacterCreated={setCharacter}
    />
  );
}
