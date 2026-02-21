"use client";

import {
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import type { Abi, ContractFunctionName, Address, Hash } from "viem";
import * as React from "react";

/**
 * Extended return type with transaction status
 */
interface UseContractWriteReturn {
  /** Write function */
  writeContract: (args?: { args?: readonly unknown[]; value?: bigint }) => void;
  /** Transaction hash */
  hash: Hash | undefined;
  /** Transaction receipt */
  receipt: ReturnType<typeof useWaitForTransactionReceipt>["data"];
  /** Combined loading state (write or confirm) */
  isLoading: boolean;
  /** Write transaction is pending */
  isPending: boolean;
  /** Transaction is confirming */
  isConfirming: boolean;
  /** Transaction confirmed successfully */
  isConfirmed: boolean;
  /** Error during write or confirmation */
  error: Error | null;
  /** Reset function to clear state */
  reset: () => void;
}

/**
 * Generic hook for writing to smart contracts
 * 
 * @example
 * // Basic token transfer
 * const { writeContract, isLoading, isConfirmed } = useContractWrite({
 *   address: "0xA0b86a33E6441E6C7D3D4B4b8e7F5E2c4D3B2A19",
 *   abi: erc20Abi,
 *   functionName: "transfer",
 * });
 * 
 * // Call the function
 * const handleTransfer = () => {
 *   writeContract({
 *     args: ["0xRecipient...", parseUnits("100", 18)],
 *   });
 * };
 * 
 * @example
 * // With transaction status handling
 * function ApproveButton({
 *   tokenAddress,
 *   spenderAddress,
 *   amount,
 * }: {
 *   tokenAddress: Address;
 *   spenderAddress: Address;
 *   amount: bigint;
 * }) {
 *   const {
 *     writeContract,
 *     isLoading,
 *     isConfirmed,
 *     isConfirming,
 *     hash,
 *   } = useContractWrite({
 *     address: tokenAddress,
 *     abi: erc20Abi,
 *     functionName: "approve",
 *   });
 * 
 *   const handleApprove = () => {
 *     writeContract({
 *       args: [spenderAddress, amount],
 *     });
 *   };
 * 
 *   return (
 *     <button onClick={handleApprove} disabled={isLoading}>
 *       {isConfirming ? "Confirming..." : isLoading ? "Processing..." : "Approve"}
 *     </button>
 *   );
 * }
 */
export function useContractWrite<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends ContractFunctionName<TAbi, "nonpayable" | "payable"> = ContractFunctionName<
    TAbi,
    "nonpayable" | "payable"
  >,
>(
  params: {
    address: Address;
    abi: TAbi;
    functionName: TFunctionName;
  }
): UseContractWriteReturn {
  const { address, abi, functionName } = params;

  // Write contract hook
  const {
    writeContract: wagmiWriteContract,
    data: hash,
    isPending,
    error: writeError,
    reset: resetWrite,
  } = useWriteContract();

  // Wait for transaction receipt
  const {
    data: receipt,
    isLoading: isConfirming,
    error: receiptError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  // Combined loading state
  const isLoading = isPending || isConfirming;

  // Combined success state
  const isConfirmed = !!receipt?.status && receipt.status === "success";

  // Combined error
  const error = writeError || receiptError || null;

  // Reset function
  const reset = () => {
    resetWrite();
  };

  // Typed write function with pre-filled config
  const writeContract = React.useCallback(
    (callArgs?: { args?: readonly unknown[]; value?: bigint }) => {
      const config: {
        address: Address;
        abi: TAbi;
        functionName: TFunctionName;
        args?: readonly unknown[];
        value?: bigint;
      } = {
        address,
        abi,
        functionName,
      };
      
      if (callArgs?.args) {
        config.args = callArgs.args;
      }
      if (callArgs?.value) {
        config.value = callArgs.value;
      }
      
      wagmiWriteContract(config as Parameters<typeof wagmiWriteContract>[0]);
    },
    [wagmiWriteContract, address, abi, functionName]
  );

  return {
    writeContract,
    hash,
    receipt,
    isLoading,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    reset,
  };
}

/**
 * Props for useContractWrite hook
 */
export interface UseContractWriteProps<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends ContractFunctionName<TAbi, "nonpayable" | "payable"> = ContractFunctionName<
    TAbi,
    "nonpayable" | "payable"
  >,
> {
  address: Address;
  abi: TAbi;
  functionName: TFunctionName;
}

// Re-export wagmi types
export type {
  UseWriteContractParameters,
  UseWriteContractReturnType,
} from "wagmi";
