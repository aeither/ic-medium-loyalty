"use client";
import {
  RainbowKitProvider,
  darkTheme,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import * as React from "react";
import { defineChain } from "viem";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
// new one
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

const { wallets } = getDefaultWallets();

const bitfinityTestnet = defineChain({
  id: 355113,
  name: "Bitfinity Testnet",
  nativeCurrency: { name: "BTF", symbol: "BTF", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://testnet.bitfinity.network/"] },
  },
  blockExplorers: {
    default: {
      name: "BlockScout",
      url: "https://explorer.testnet.bitfinity.network",
    },
  },
});

/* New RainbowKit API */
const config = getDefaultConfig({
  appName: "Daily Login",
  projectId: "123123123",
  chains: [bitfinityTestnet],
  wallets,
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient());

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          coolMode
          theme={darkTheme({
            accentColor: "#7075b8",
            accentColorForeground: "white",
            borderRadius: "small",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          {mounted && children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
