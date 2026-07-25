"use client";

import { PrivyProvider } from "@privy-io/react-auth";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId="cms0js9mt007u0blaav6p9tv1"
      clientId="client-WY6c1HhFL63efP7w6RRtqA1qJuet33V6mYKQwAMppwZMY"
      config={{
        embeddedWallets: {
          ethereum: {
            createOnLogin: "all-users",
          },
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
