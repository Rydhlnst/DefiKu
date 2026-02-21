"use client";

import { useReadContract, useAccount } from "wagmi";
import { formatUnits, type Address } from "viem";
import { erc20Abi } from "viem";

/**
 * ERC20 Token ABI (minimal for balanceOf)
 */
const tokenAbi = erc20Abi;

/**
 * Props for useTokenBalance hook
 */
interface UseTokenBalanceProps {
  /** Token contract address */
  tokenAddress: Address;
  /** User address (optional, defaults to connected account) */
  userAddress?: Address;
  /** Token decimals for formatting (optional, auto-fetched if not provided) */
  decimals?: number;
  /** Chain ID (optional, defaults to current chain) */
  chainId?: number;
  /** Enable/disable the query */
  enabled?: boolean;
}

/**
 * Return type for useTokenBalance hook
 */
interface UseTokenBalanceReturn {
  /** Raw balance as bigint */
  balance: bigint | undefined;
  /** Formatted balance as string (e.g., "1.5") */
  formattedBalance: string | undefined;
  /** Token decimals */
  decimals: number | undefined;
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  isError: boolean;
  /** Error object */
  error: Error | null;
  /** Refetch function */
  refetch: () => void;
}

/**
 * Hook to read ERC20 token balance
 * 
 * @example
 * // Basic usage
 * const { formattedBalance, isLoading } = useTokenBalance({
 *   tokenAddress: "0xA0b86a33E6441E6C7D3D4B4b8e7F5E2c4D3B2A19",
 * });
 * 
 * @example
 * // With specific user address
 * const { balance, formattedBalance } = useTokenBalance({
 *   tokenAddress: "0xA0b86a33E6441E6C7D3D4B4b8e7F5E2c4D3B2A19",
 *   userAddress: "0x1234...",
 *   decimals: 18,
 * });
 * 
 * @example
 * // Display balance
 * function TokenBalance({ tokenAddress }: { tokenAddress: Address }) {
 *   const { formattedBalance, isLoading, isError } = useTokenBalance({
 *     tokenAddress,
 *   });
 * 
 *   if (isLoading) return <span>Loading...</span>;
 *   if (isError) return <span>Error loading balance</span>;
 *   
 *   return <span>{formattedBalance || "0"} TOKEN</span>;
 * }
 */
export function useTokenBalance({
  tokenAddress,
  userAddress,
  decimals: providedDecimals,
  chainId,
  enabled = true,
}: UseTokenBalanceProps): UseTokenBalanceReturn {
  const { address: connectedAddress } = useAccount();
  const targetAddress = userAddress || connectedAddress;

  // Fetch token decimals if not provided
  const { data: decimalsData } = useReadContract({
    address: tokenAddress,
    abi: tokenAbi,
    functionName: "decimals",
    chainId,
    query: {
      enabled: enabled && providedDecimals === undefined,
    },
  });

  const decimals = providedDecimals ?? decimalsData ?? 18;

  // Fetch balance
  const {
    data: balance,
    isLoading,
    isError,
    error,
    refetch,
  } = useReadContract({
    address: tokenAddress,
    abi: tokenAbi,
    functionName: "balanceOf",
    args: targetAddress ? [targetAddress] : undefined,
    chainId,
    query: {
      enabled: enabled && !!targetAddress,
    },
  });

  // Format balance
  const formattedBalance = React.useMemo(() => {
    if (balance === undefined) return undefined;
    return formatUnits(balance, decimals);
  }, [balance, decimals]);

  return {
    balance,
    formattedBalance,
    decimals,
    isLoading,
    isError,
    error,
    refetch,
  };
}

// Import React for useMemo
import * as React from "react";

// Re-export types
export type { UseTokenBalanceProps, UseTokenBalanceReturn };
