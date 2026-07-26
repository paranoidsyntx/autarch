"use client";

import { useEffect, useRef } from "react";
import { usePrivy, useWallets } from "@privy-io/react-auth";

export default function Play() {
  const { ready, authenticated, login } = usePrivy();
  const { wallets } = useWallets();
  const loginTriggered = useRef(false);

  const embeddedWallet = wallets.find((w) => w.walletClientType === "privy");

  useEffect(() => {
    if (ready && !authenticated && !loginTriggered.current) {
      loginTriggered.current = true;
      login();
    }
  }, [ready, authenticated, login]);

  if (!ready || !authenticated || !embeddedWallet) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center bg-background text-foreground">
        <p className="font-display text-5xl">Loading...</p>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-background text-foreground">
      <p className="text-2xl">
        {embeddedWallet ? embeddedWallet.address : "Loading wallet..."}
      </p>
    </main>
  );
}
