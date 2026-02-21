/**
 * Constants exports for @defiku/web3-config
 */

export {
  CONTRACTS,
  getContractAddress,
  isDeFiKuDeployedOnChain,
  DEX_ROUTERS,
  ERC20_ABI,
  ROUTER_ABI,
} from "./contracts.js";

export type {
  SupportedChainId,
  ContractAddresses,
} from "./contracts.js";

export {
  NATIVE_TOKENS,
  COMMON_TOKENS,
  getTokenBySymbol,
  getTokenByAddress,
  getNativeToken,
  isNativeTokenAddress,
  getTokensForSwap,
} from "./tokens.js";

export type {
  Token,
} from "./tokens.js";
