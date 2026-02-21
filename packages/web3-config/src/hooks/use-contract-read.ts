"use client";

import {
  useReadContract,
  type UseReadContractParameters,
  type UseReadContractReturnType,
} from "wagmi";
import type { Abi, ContractFunctionArgs, ContractFunctionName, Address } from "viem";

/**
 * Generic hook for reading from smart contracts
 * 
 * @example
 * // Read total supply of a token
 * const { data: totalSupply, isLoading } = useContractRead({
 *   address: "0xA0b86a33E6441E6C7D3D4B4b8e7F5E2c4D3B2A19",
 *   abi: erc20Abi,
 *   functionName: "totalSupply",
 * });
 * 
 * @example
 * // Read with arguments
 * const { data: balance } = useContractRead({
 *   address: "0xA0b86a33E6441E6C7D3D4B4b8e7F5E2c4D3B2A19",
 *   abi: erc20Abi,
 *   functionName: "allowance",
 *   args: [ownerAddress, spenderAddress],
 * });
 * 
 * @example
 * // Read with enabled flag
 * const { data: name } = useContractRead({
 *   address: tokenAddress,
 *   abi: erc20Abi,
 *   functionName: "name",
 *   enabled: !!tokenAddress,
 * });
 */
export function useContractRead<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends ContractFunctionName<TAbi, "pure" | "view"> = ContractFunctionName<
    TAbi,
    "pure" | "view"
  >,
  TArgs extends ContractFunctionArgs<TAbi, "pure" | "view", TFunctionName> = ContractFunctionArgs<
    TAbi,
    "pure" | "view",
    TFunctionName
  >,
>(
  params: {
    address: Address | undefined;
    abi: TAbi;
    functionName: TFunctionName;
    args?: TArgs;
    chainId?: number;
    enabled?: boolean;
    watch?: boolean;
  }
) {
  const { address, abi, functionName, args, chainId, enabled = true, watch } = params;

  return useReadContract({
    address,
    abi,
    functionName,
    args,
    chainId,
    query: {
      enabled: enabled && !!address,
    },
  } as UseReadContractParameters<TAbi, TFunctionName, TArgs>);
}

/**
 * Props for useContractRead hook (for type exports)
 */
export interface UseContractReadProps<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends ContractFunctionName<TAbi, "pure" | "view"> = ContractFunctionName<
    TAbi,
    "pure" | "view"
  >,
  TArgs extends ContractFunctionArgs<TAbi, "pure" | "view", TFunctionName> = ContractFunctionArgs<
    TAbi,
    "pure" | "view",
    TFunctionName
  >,
> {
  address: Address | undefined;
  abi: TAbi;
  functionName: TFunctionName;
  args?: TArgs;
  chainId?: number;
  enabled?: boolean;
  watch?: boolean;
}

// Re-export wagmi types for convenience
export type {
  UseReadContractParameters,
  UseReadContractReturnType,
} from "wagmi";
