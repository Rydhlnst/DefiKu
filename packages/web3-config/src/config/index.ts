/**
 * Config exports for @defiku/web3-config
 */

export {
  wagmiConfig,
  queryClientConfig,
  supportedChains,
  getChainConfig,
  isSupportedChain,
} from "./wagmi.js";

export type { Web3Config } from "./wagmi.js";
export type { ChainConfig } from "./chains.js";

// Re-export chains from viem
export { mainnet, arbitrum, base, bsc } from "./chains.js";
