/**
 * @defiku/web3-config
 * 
 * Web3 configuration package for DeFiKu dApp
 * Built with Wagmi v2, Viem, and RainbowKit v2
 */

// Config exports
export {
  wagmiConfig,
  queryClientConfig,
  supportedChains,
  getChainConfig,
  isSupportedChain,
} from "./config/wagmi.js";

export type {
  Web3Config,
  ChainConfig,
} from "./config/index.js";

// Provider exports
export { Web3Provider } from "./providers/web3-provider.js";
export type { Web3ProviderProps } from "./providers/web3-provider.js";

// Hook exports
export {
  useTokenBalance,
} from "./hooks/use-token-balance.js";

export {
  useContractRead,
} from "./hooks/use-contract-read.js";

export {
  useContractWrite,
} from "./hooks/use-contract-write.js";

// Constants exports
export {
  CONTRACTS,
  getContractAddress,
  isDeFiKuDeployedOnChain,
  DEX_ROUTERS,
  ERC20_ABI,
  ROUTER_ABI,
} from "./constants/contracts.js";

export {
  NATIVE_TOKENS,
  COMMON_TOKENS,
  getTokenBySymbol,
  getTokenByAddress,
  getNativeToken,
  isNativeTokenAddress,
  getTokensForSwap,
} from "./constants/tokens.js";

// Type exports
export type {
  SupportedChainId,
  ContractAddresses,
} from "./constants/contracts.js";

export type {
  Token,
} from "./constants/tokens.js";

export type {
  UseTokenBalanceProps,
  UseTokenBalanceReturn,
} from "./hooks/use-token-balance.js";

export type {
  UseContractReadProps,
} from "./hooks/use-contract-read.js";

export type {
  UseContractWriteProps,
} from "./hooks/use-contract-write.js";

// Re-export connectors from wagmi
export {
  injected,
  metaMask,
  walletConnect,
  coinbaseWallet,
  safe,
} from "wagmi/connectors";

// Re-export useful types from wagmi/viem
export type {
  Address,
  Abi,
  Chain,
  Hash,
} from "viem";

export type {
  Config,
  Connector,
} from "wagmi";
