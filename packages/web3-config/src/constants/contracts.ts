import type { Address } from "viem";

/**
 * Supported chain IDs
 */
export type SupportedChainId = 1 | 42161 | 8453 | 56;

/**
 * Contract addresses per chain
 */
export interface ContractAddresses {
  /** DeFiKu Core Router */
  DEFIKU_ROUTER: Address;
  /** DeFiKu Factory */
  DEFIKU_FACTORY: Address;
  /** Multi-call contract for batching reads */
  MULTICALL3: Address;
  /** Wrapped native token (WETH, WBNB, etc.) */
  WNATIVE: Address;
}

/**
 * Contract addresses for each supported chain
 * 
 * NOTE: These are placeholder addresses.
 * Replace with actual deployed contract addresses
 */
export const CONTRACTS: Record<SupportedChainId, ContractAddresses> = {
  // Ethereum Mainnet (chainId: 1)
  1: {
    DEFIKU_ROUTER: "0x0000000000000000000000000000000000000000" as Address,
    DEFIKU_FACTORY: "0x0000000000000000000000000000000000000000" as Address,
    MULTICALL3: "0xcA11bde05977b3631167028862bE2a173976CA11" as Address,
    WNATIVE: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" as Address, // WETH
  },
  
  // Arbitrum One (chainId: 42161)
  42161: {
    DEFIKU_ROUTER: "0x0000000000000000000000000000000000000000" as Address,
    DEFIKU_FACTORY: "0x0000000000000000000000000000000000000000" as Address,
    MULTICALL3: "0xcA11bde05977b3631167028862bE2a173976CA11" as Address,
    WNATIVE: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1" as Address, // WETH
  },
  
  // Base (chainId: 8453)
  8453: {
    DEFIKU_ROUTER: "0x0000000000000000000000000000000000000000" as Address,
    DEFIKU_FACTORY: "0x0000000000000000000000000000000000000000" as Address,
    MULTICALL3: "0xcA11bde05977b3631167028862bE2a173976CA11" as Address,
    WNATIVE: "0x4200000000000000000000000000000000000006" as Address, // WETH
  },
  
  // BSC Mainnet (chainId: 56)
  56: {
    DEFIKU_ROUTER: "0x0000000000000000000000000000000000000000" as Address,
    DEFIKU_FACTORY: "0x0000000000000000000000000000000000000000" as Address,
    MULTICALL3: "0xcA11bde05977b3631167028862bE2a173976CA11" as Address,
    WNATIVE: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" as Address, // WBNB
  },
};

/**
 * Get contract address for a specific chain
 */
export function getContractAddress(
  chainId: SupportedChainId,
  contractName: keyof ContractAddresses
): Address {
  const chainContracts = CONTRACTS[chainId];
  if (!chainContracts) {
    throw new Error(`Chain ${chainId} is not supported`);
  }
  return chainContracts[contractName];
}

/**
 * Check if all DeFiKu contracts are deployed on a chain
 */
export function isDeFiKuDeployedOnChain(chainId: SupportedChainId): boolean {
  const contracts = CONTRACTS[chainId];
  if (!contracts) return false;
  
  return (
    contracts.DEFIKU_ROUTER !== "0x0000000000000000000000000000000000000000" &&
    contracts.DEFIKU_FACTORY !== "0x0000000000000000000000000000000000000000"
  );
}

/**
 * Common DEX router addresses (for reference/integration)
 */
export const DEX_ROUTERS: Record<SupportedChainId, { UNISWAP_V2?: Address; UNISWAP_V3?: Address; SUSHISWAP?: Address }> = {
  1: {
    UNISWAP_V2: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    UNISWAP_V3: "0xE592427A0AEce92De3Edee1F18E0157C05861564",
    SUSHISWAP: "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F",
  },
  42161: {
    UNISWAP_V2: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    UNISWAP_V3: "0xE592427A0AEce92De3Edee1F18E0157C05861564",
    SUSHISWAP: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
  },
  8453: {
    UNISWAP_V3: "0x2626664c2603336E57B271c5C0b26F421741e481", // BaseSwap/Uniswap on Base
  },
  56: {
    UNISWAP_V2: "0x10ED43C718714eb63d5aA57B78B54704E256024E", // PancakeSwap
    SUSHISWAP: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
  },
};

/**
 * Token contract ABIs (minimal for common operations)
 */
export const ERC20_ABI = [
  // Read functions
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address owner) view returns (uint256)",
  "function allowance(address owner, address spender) view returns (uint256)",
  // Write functions
  "function transfer(address to, uint256 value) returns (bool)",
  "function approve(address spender, uint256 value) returns (bool)",
  "function transferFrom(address from, address to, uint256 value) returns (bool)",
  // Events
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)",
] as const;

/**
 * Router ABI (minimal for swaps)
 */
export const ROUTER_ABI = [
  "function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",
  "function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)",
  "function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",
  "function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts)",
  "function getAmountsIn(uint amountOut, address[] calldata path) external view returns (uint[] memory amounts)",
] as const;

// Re-export Address type
export type { Address };
