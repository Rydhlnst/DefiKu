import { type Chain } from "viem";
import {
  mainnet,
  arbitrum,
  base,
  bsc,
} from "wagmi/chains";

/**
 * Extended chain configuration with custom metadata
 */
export interface ChainConfig extends Chain {
  iconUrl?: string;
  customRpcUrl?: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
    logoUrl?: string;
  };
}

/**
 * Chain icon URLs (using simple SVG data URIs or external CDN)
 * In production, replace with your own CDN or local assets
 */
const CHAIN_ICONS: Record<number, string> = {
  [mainnet.id]: "https://icons.llamao.fi/icons/chains/rsz_ethereum.jpg",
  [arbitrum.id]: "https://icons.llamao.fi/icons/chains/rsz_arbitrum.jpg",
  [base.id]: "https://icons.llamao.fi/icons/chains/rsz_base.jpg",
  [bsc.id]: "https://icons.llamao.fi/icons/chains/rsz_binance.jpg",
};

/**
 * Custom RPC URLs from environment variables
 * Falls back to public RPC if not configured
 */
const getCustomRpcUrl = (chainId: number): string | undefined => {
  const rpcUrls: Record<number, string | undefined> = {
    [mainnet.id]: process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL,
    [arbitrum.id]: process.env.NEXT_PUBLIC_ARBITRUM_RPC_URL,
    [base.id]: process.env.NEXT_PUBLIC_BASE_RPC_URL,
    [bsc.id]: process.env.NEXT_PUBLIC_BSC_RPC_URL,
  };
  return rpcUrls[chainId];
};

/**
 * Supported chains with custom configuration
 */
export const supportedChains: ChainConfig[] = [
  {
    ...mainnet,
    iconUrl: CHAIN_ICONS[mainnet.id],
    customRpcUrl: getCustomRpcUrl(mainnet.id),
    nativeCurrency: {
      ...mainnet.nativeCurrency,
      logoUrl: "https://icons.llamao.fi/icons/currencies/eth.jpg",
    },
  },
  {
    ...arbitrum,
    iconUrl: CHAIN_ICONS[arbitrum.id],
    customRpcUrl: getCustomRpcUrl(arbitrum.id),
    nativeCurrency: {
      ...arbitrum.nativeCurrency,
      logoUrl: "https://icons.llamao.fi/icons/currencies/eth.jpg",
    },
  },
  {
    ...base,
    iconUrl: CHAIN_ICONS[base.id],
    customRpcUrl: getCustomRpcUrl(base.id),
    nativeCurrency: {
      ...base.nativeCurrency,
      logoUrl: "https://icons.llamao.fi/icons/currencies/eth.jpg",
    },
  },
  {
    ...bsc,
    iconUrl: CHAIN_ICONS[bsc.id],
    customRpcUrl: getCustomRpcUrl(bsc.id),
    nativeCurrency: {
      ...bsc.nativeCurrency,
      logoUrl: "https://icons.llamao.fi/icons/currencies/bnb.jpg",
    },
  },
];

/**
 * Chain ID to chain config mapping
 */
export const chainIdToConfig: Record<number, ChainConfig> = supportedChains.reduce(
  (acc, chain) => ({
    ...acc,
    [chain.id]: chain,
  }),
  {}
);

/**
 * Get chain config by chain ID
 */
export function getChainConfig(chainId: number): ChainConfig | undefined {
  return chainIdToConfig[chainId];
}

/**
 * Check if chain is supported
 */
export function isSupportedChain(chainId: number): boolean {
  return supportedChains.some((chain) => chain.id === chainId);
}

// Re-export chains for convenience
export { mainnet, arbitrum, base, bsc };
