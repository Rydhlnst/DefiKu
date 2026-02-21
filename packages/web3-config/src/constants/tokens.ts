import type { Address } from "viem";

/**
 * Token metadata
 */
export interface Token {
  /** Token contract address */
  address: Address;
  /** Token symbol */
  symbol: string;
  /** Token name */
  name: string;
  /** Token decimals */
  decimals: number;
  /** Chain ID */
  chainId: number;
  /** Token logo URL */
  logoUrl?: string;
  /** Is native token */
  isNative?: boolean;
  /** Wrapped version address (for native tokens) */
  wrappedAddress?: Address;
}

/**
 * Native tokens per chain
 */
export const NATIVE_TOKENS: Record<number, Omit<Token, "address"> & { wrappedAddress: Address }> = {
  1: {
    symbol: "ETH",
    name: "Ethereum",
    decimals: 18,
    chainId: 1,
    logoUrl: "https://icons.llamao.fi/icons/currencies/eth.jpg",
    isNative: true,
    wrappedAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // WETH
  },
  42161: {
    symbol: "ETH",
    name: "Ethereum",
    decimals: 18,
    chainId: 42161,
    logoUrl: "https://icons.llamao.fi/icons/currencies/eth.jpg",
    isNative: true,
    wrappedAddress: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1", // WETH
  },
  8453: {
    symbol: "ETH",
    name: "Ethereum",
    decimals: 18,
    chainId: 8453,
    logoUrl: "https://icons.llamao.fi/icons/currencies/eth.jpg",
    isNative: true,
    wrappedAddress: "0x4200000000000000000000000000000000000006", // WETH
  },
  56: {
    symbol: "BNB",
    name: "BNB",
    decimals: 18,
    chainId: 56,
    logoUrl: "https://icons.llamao.fi/icons/currencies/bnb.jpg",
    isNative: true,
    wrappedAddress: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", // WBNB
  },
};

/**
 * Common ERC20 tokens per chain
 */
export const COMMON_TOKENS: Record<number, Token[]> = {
  // Ethereum Mainnet
  1: [
    {
      address: "0xA0b86a33E6441E6C7D3D4B4b8e7F5E2c4D3B2A19",
      symbol: "USDC",
      name: "USD Coin",
      decimals: 6,
      chainId: 1,
      logoUrl: "https://icons.llamao.fi/icons/currencies/usdc.jpg",
    },
    {
      address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      symbol: "USDT",
      name: "Tether USD",
      decimals: 6,
      chainId: 1,
      logoUrl: "https://icons.llamao.fi/icons/currencies/usdt.jpg",
    },
    {
      address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      symbol: "DAI",
      name: "Dai Stablecoin",
      decimals: 18,
      chainId: 1,
      logoUrl: "https://icons.llamao.fi/icons/currencies/dai.jpg",
    },
    {
      address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
      symbol: "WBTC",
      name: "Wrapped BTC",
      decimals: 8,
      chainId: 1,
      logoUrl: "https://icons.llamao.fi/icons/currencies/wbtc.jpg",
    },
    {
      address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      symbol: "WETH",
      name: "Wrapped Ether",
      decimals: 18,
      chainId: 1,
      logoUrl: "https://icons.llamao.fi/icons/currencies/weth.jpg",
    },
  ],
  
  // Arbitrum
  42161: [
    {
      address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      symbol: "USDC",
      name: "USD Coin",
      decimals: 6,
      chainId: 42161,
      logoUrl: "https://icons.llamao.fi/icons/currencies/usdc.jpg",
    },
    {
      address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
      symbol: "USDT",
      name: "Tether USD",
      decimals: 6,
      chainId: 42161,
      logoUrl: "https://icons.llamao.fi/icons/currencies/usdt.jpg",
    },
    {
      address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
      symbol: "DAI",
      name: "Dai Stablecoin",
      decimals: 18,
      chainId: 42161,
      logoUrl: "https://icons.llamao.fi/icons/currencies/dai.jpg",
    },
    {
      address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
      symbol: "WETH",
      name: "Wrapped Ether",
      decimals: 18,
      chainId: 42161,
      logoUrl: "https://icons.llamao.fi/icons/currencies/weth.jpg",
    },
  ],
  
  // Base
  8453: [
    {
      address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      symbol: "USDC",
      name: "USD Coin",
      decimals: 6,
      chainId: 8453,
      logoUrl: "https://icons.llamao.fi/icons/currencies/usdc.jpg",
    },
    {
      address: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",
      symbol: "DAI",
      name: "Dai Stablecoin",
      decimals: 18,
      chainId: 8453,
      logoUrl: "https://icons.llamao.fi/icons/currencies/dai.jpg",
    },
    {
      address: "0x4200000000000000000000000000000000000006",
      symbol: "WETH",
      name: "Wrapped Ether",
      decimals: 18,
      chainId: 8453,
      logoUrl: "https://icons.llamao.fi/icons/currencies/weth.jpg",
    },
  ],
  
  // BSC
  56: [
    {
      address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
      symbol: "USDC",
      name: "USD Coin",
      decimals: 18,
      chainId: 56,
      logoUrl: "https://icons.llamao.fi/icons/currencies/usdc.jpg",
    },
    {
      address: "0x55d398326f99059fF775485246999027B3197955",
      symbol: "USDT",
      name: "Tether USD",
      decimals: 18,
      chainId: 56,
      logoUrl: "https://icons.llamao.fi/icons/currencies/usdt.jpg",
    },
    {
      address: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
      symbol: "DAI",
      name: "Dai Stablecoin",
      decimals: 18,
      chainId: 56,
      logoUrl: "https://icons.llamao.fi/icons/currencies/dai.jpg",
    },
    {
      address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      symbol: "WBNB",
      name: "Wrapped BNB",
      decimals: 18,
      chainId: 56,
      logoUrl: "https://icons.llamao.fi/icons/currencies/bnb.jpg",
    },
  ],
};

/**
 * Get token by symbol on a specific chain
 */
export function getTokenBySymbol(
  chainId: number,
  symbol: string
): Token | undefined {
  const tokens = COMMON_TOKENS[chainId];
  if (!tokens) return undefined;
  
  return tokens.find(
    (token) => token.symbol.toLowerCase() === symbol.toLowerCase()
  );
}

/**
 * Get token by address on a specific chain
 */
export function getTokenByAddress(
  chainId: number,
  address: Address
): Token | undefined {
  const tokens = COMMON_TOKENS[chainId];
  if (!tokens) return undefined;
  
  return tokens.find(
    (token) => token.address.toLowerCase() === address.toLowerCase()
  );
}

/**
 * Get native token for chain
 */
export function getNativeToken(chainId: number): typeof NATIVE_TOKENS[number] | undefined {
  return NATIVE_TOKENS[chainId];
}

/**
 * Check if address is native token (zero address convention)
 */
export function isNativeTokenAddress(address: Address): boolean {
  return address === "0x0000000000000000000000000000000000000000";
}

/**
 * Token selector helper for swap UI
 */
export function getTokensForSwap(chainId: number): Token[] {
  const common = COMMON_TOKENS[chainId] || [];
  return common;
}

// Re-export Address type
export type { Address };
