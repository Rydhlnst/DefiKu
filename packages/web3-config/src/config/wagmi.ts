import { createConfig, http, type Config } from "wagmi";
import { mainnet, arbitrum, base, bsc } from "wagmi/chains";
import { injected, metaMask, walletConnect, coinbaseWallet, safe } from "wagmi/connectors";
import { supportedChains, getChainConfig } from "./chains.js";

/**
 * Web3 configuration interface
 */
export interface Web3Config {
  appName: string;
  projectId: string;
  chains: readonly [typeof mainnet, typeof arbitrum, typeof base, typeof bsc];
  ssr: boolean;
  transports?: Record<number, ReturnType<typeof http>>;
}

/**
 * Get RPC URL for a chain
 * Priority: Custom RPC from env > Default public RPC
 */
const getRpcUrl = (chainId: number): string => {
  const chainConfig = getChainConfig(chainId);
  
  // Use custom RPC if available
  if (chainConfig?.customRpcUrl) {
    return chainConfig.customRpcUrl;
  }
  
  // Fallback to public RPCs
  const publicRpcUrls: Record<number, string> = {
    [mainnet.id]: "https://eth.llamarpc.com",
    [arbitrum.id]: "https://arb1.arbitrum.io/rpc",
    [base.id]: "https://mainnet.base.org",
    [bsc.id]: "https://bsc-dataseed.binance.org",
  };
  
  return publicRpcUrls[chainId] || "";
};

/**
 * Create transports configuration for each chain
 */
const createTransports = () => {
  return supportedChains.reduce((acc, chain) => {
    return {
      ...acc,
      [chain.id]: http(getRpcUrl(chain.id)),
    };
  }, {} as Record<number, ReturnType<typeof http>>);
};

/**
 * Get project ID from environment or use placeholder for build
 */
const getProjectId = (): string => {
  if (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID) {
    return process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;
  }
  // Return a placeholder for build time
  // This will need to be set in the actual environment
  return "placeholder_project_id";
};

/**
 * Wagmi + ConnectKit configuration
 * 
 * Default connectors included:
 * - WalletConnect
 * - MetaMask
 * - Coinbase Wallet
 * - Safe (Gnosis Safe)
 * - Injected wallets
 * 
 * @example
 * // In your app layout:
 * import { wagmiConfig } from "@defiku/web3-config/config";
 * import { ConnectKitProvider } from "connectkit";
 * 
 * export default function RootLayout({ children }) {
 *   return (
 *     <WagmiProvider config={wagmiConfig}>
 *       <QueryClientProvider client={queryClient}>
 *         <ConnectKitProvider>
 *           {children}
 *         </ConnectKitProvider>
 *       </QueryClientProvider>
 *     </WagmiProvider>
 *   );
 * }
 */
export const wagmiConfig: Config = createConfig({
  chains: [mainnet, arbitrum, base, bsc],
  connectors: [
    injected({ target: "metaMask" }),
    metaMask({
      dappMetadata: {
        name: process?.env?.NEXT_PUBLIC_APP_NAME || "DeFiKu",
      },
    }),
    walletConnect({
      projectId: getProjectId(),
      metadata: {
        name: process?.env?.NEXT_PUBLIC_APP_NAME || "DeFiKu",
        description: "DeFiKu - Next Generation DeFi Platform",
        url: "https://defiku.xyz",
        icons: ["https://defiku.xyz/icon.png"],
      },
      showQrModal: false, // Disable WalletConnect's own modal - use ConnectKit instead
    }),
    coinbaseWallet({
      appName: process?.env?.NEXT_PUBLIC_APP_NAME || "DeFiKu",
    }),
    safe(),
  ],
  transports: createTransports(),
});

/**
 * Query client configuration for React Query
 */
export const queryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
      staleTime: 60 * 1000, // 1 minute
    },
  },
};

// Re-export for convenience
export { supportedChains, getChainConfig, isSupportedChain } from "./chains.js";
export type { ChainConfig } from "./chains.js";

// Re-export connectors from wagmi for custom configuration
export { 
  injected,
  metaMask,
  walletConnect,
  coinbaseWallet,
  safe,
} from "wagmi/connectors";
