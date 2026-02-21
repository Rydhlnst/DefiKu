/**
 * USAGE EXAMPLES for @defiku/web3-config
 * 
 * This file contains example usage patterns for the web3-config package.
 * Copy these examples into your Next.js app.
 */

// =============================================================================
// EXAMPLE 1: App Layout Setup
// =============================================================================
// File: app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { wagmiConfig } from "@defiku/web3-config/config";
import { Web3Provider } from "@defiku/web3-config/providers";
import "@rainbow-me/rainbowkit/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DeFiKu - Web3 Dashboard",
  description: "Your DeFi dashboard powered by DeFiKu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Provider 
          config={wagmiConfig}
          showRecentTransactions={true}
          coolMode={true}
        >
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}

// =============================================================================
// EXAMPLE 2: Connect Wallet Button
// =============================================================================
// File: components/ConnectWallet.tsx

"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export function ConnectWallet() {
  return (
    <ConnectButton 
      showBalance={true}
      chainStatus="icon"
      accountStatus="avatar"
    />
  );
}

// =============================================================================
// EXAMPLE 3: Token Balance Display
// =============================================================================
// File: components/TokenBalance.tsx

"use client";

import { useTokenBalance } from "@defiku/web3-config/hooks";
import { COMMON_TOKENS } from "@defiku/web3-config/constants";
import { useAccount } from "wagmi";
import type { Address } from "viem";

interface TokenBalanceProps {
  tokenAddress?: Address;
  symbol?: string;
  chainId?: number;
}

export function TokenBalance({ 
  tokenAddress, 
  symbol = "USDC",
  chainId = 1 
}: TokenBalanceProps) {
  const { address } = useAccount();
  
  // Get token address from symbol if not provided
  const token = tokenAddress 
    ? { address: tokenAddress, decimals: 18 }
    : COMMON_TOKENS[chainId]?.find(t => t.symbol === symbol);

  const { 
    formattedBalance, 
    balance,
    isLoading, 
    isError,
    refetch 
  } = useTokenBalance({
    tokenAddress: token?.address as Address,
    decimals: token?.decimals,
  });

  if (!address) {
    return <div>Connect wallet to view balance</div>;
  }

  if (isLoading) {
    return <div className="animate-pulse">Loading...</div>;
  }

  if (isError) {
    return (
      <div>
        <span className="text-red-500">Error loading balance</span>
        <button onClick={refetch} className="ml-2 text-sm underline">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="font-medium">
        {formattedBalance || "0"} {symbol}
      </span>
      <button 
        onClick={() => refetch()}
        className="text-xs text-gray-500 hover:text-gray-700"
      >
        🔄
      </button>
    </div>
  );
}

// =============================================================================
// EXAMPLE 4: Token Approval & Transfer
// =============================================================================
// File: components/TokenActions.tsx

"use client";

import { useState } from "react";
import { useContractWrite, useContractRead } from "@defiku/web3-config/hooks";
import { ERC20_ABI, COMMON_TOKENS } from "@defiku/web3-config/constants";
import { parseUnits, formatUnits, type Address } from "viem";
import { useAccount } from "wagmi";

interface TokenActionsProps {
  tokenSymbol: string;
  spenderAddress: Address;
}

export function TokenActions({ tokenSymbol, spenderAddress }: TokenActionsProps) {
  const { address } = useAccount();
  const [amount, setAmount] = useState("");
  const chainId = 1; // Ethereum mainnet
  
  const token = COMMON_TOKENS[chainId]?.find(t => t.symbol === tokenSymbol);
  
  if (!token) return <div>Token not found</div>;

  // Read allowance
  const { data: allowance } = useContractRead({
    address: token.address,
    abi: ERC20_ABI,
    functionName: "allowance",
    args: address && spenderAddress ? [address, spenderAddress] : undefined,
    enabled: !!address,
  });

  // Write: Approve
  const {
    writeContract: approve,
    isLoading: isApproving,
    isSuccess: isApproveSuccess,
  } = useContractWrite({
    address: token.address,
    abi: ERC20_ABI,
    functionName: "approve",
  });

  // Write: Transfer
  const {
    writeContract: transfer,
    isLoading: isTransferring,
    isSuccess: isTransferSuccess,
  } = useContractWrite({
    address: token.address,
    abi: ERC20_ABI,
    functionName: "transfer",
  });

  const handleApprove = () => {
    approve({
      args: [spenderAddress, parseUnits(amount || "1000000", token.decimals)],
    });
  };

  const handleTransfer = () => {
    transfer({
      args: [spenderAddress, parseUnits(amount, token.decimals)],
    });
  };

  const needsApproval = allowance === undefined || allowance < parseUnits(amount || "0", token.decimals);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 block w-full rounded border p-2"
          placeholder="0.0"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleApprove}
          disabled={isApproving || !amount}
          className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {isApproving ? "Approving..." : "Approve"}
        </button>

        <button
          onClick={handleTransfer}
          disabled={isTransferring || !amount || needsApproval}
          className="rounded bg-green-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {isTransferring ? "Transferring..." : "Transfer"}
        </button>
      </div>

      {isApproveSuccess && <div className="text-green-600">✅ Approved!</div>}
      {isTransferSuccess && <div className="text-green-600">✅ Transferred!</div>}

      <div className="text-sm text-gray-600">
        Current Allowance: {allowance ? formatUnits(allowance, token.decimals) : "0"} {tokenSymbol}
      </div>
    </div>
  );
}

// =============================================================================
// EXAMPLE 5: Multi-Chain Token Selector
// =============================================================================
// File: components/TokenSelector.tsx

"use client";

import { useState } from "react";
import { 
  COMMON_TOKENS, 
  NATIVE_TOKENS,
  getTokenBySymbol,
  type Token 
} from "@defiku/web3-config/constants";
import { supportedChains } from "@defiku/web3-config/config";
import { useChainId } from "wagmi";

interface TokenSelectorProps {
  onSelect: (token: Token) => void;
  selectedToken?: Token;
}

export function TokenSelector({ onSelect, selectedToken }: TokenSelectorProps) {
  const currentChainId = useChainId();
  const [isOpen, setIsOpen] = useState(false);
  
  const tokens = COMMON_TOKENS[currentChainId] || [];
  const nativeToken = NATIVE_TOKENS[currentChainId];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded border px-4 py-2"
      >
        {selectedToken ? (
          <>
            {selectedToken.logoUrl && (
              <img 
                src={selectedToken.logoUrl} 
                alt={selectedToken.symbol}
                className="h-6 w-6 rounded-full"
              />
            )}
            <span>{selectedToken.symbol}</span>
          </>
        ) : (
          <span>Select Token</span>
        )}
        <span>▼</span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-64 rounded border bg-white shadow-lg">
          {nativeToken && (
            <button
              onClick={() => {
                onSelect({
                  address: "0x0000000000000000000000000000000000000000" as `0x${string}`,
                  ...nativeToken,
                });
                setIsOpen(false);
              }}
              className="flex w-full items-center gap-2 px-4 py-2 hover:bg-gray-100"
            >
              {nativeToken.logoUrl && (
                <img 
                  src={nativeToken.logoUrl} 
                  alt={nativeToken.symbol}
                  className="h-6 w-6 rounded-full"
                />
              )}
              <div className="text-left">
                <div className="font-medium">{nativeToken.symbol}</div>
                <div className="text-xs text-gray-500">{nativeToken.name}</div>
              </div>
            </button>
          )}
          
          <div className="border-t" />
          
          {tokens.map((token) => (
            <button
              key={token.address}
              onClick={() => {
                onSelect(token);
                setIsOpen(false);
              }}
              className="flex w-full items-center gap-2 px-4 py-2 hover:bg-gray-100"
            >
              {token.logoUrl && (
                <img 
                  src={token.logoUrl} 
                  alt={token.symbol}
                  className="h-6 w-6 rounded-full"
                />
              )}
              <div className="text-left">
                <div className="font-medium">{token.symbol}</div>
                <div className="text-xs text-gray-500">{token.name}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// =============================================================================
// EXAMPLE 6: Chain Switcher
// =============================================================================
// File: components/ChainSwitcher.tsx

"use client";

import { useSwitchChain, useChainId } from "wagmi";
import { supportedChains } from "@defiku/web3-config/config";

export function ChainSwitcher() {
  const chainId = useChainId();
  const { switchChain, isPending } = useSwitchChain();

  return (
    <div className="flex gap-2">
      {supportedChains.map((chain) => (
        <button
          key={chain.id}
          onClick={() => switchChain({ chainId: chain.id })}
          disabled={isPending || chain.id === chainId}
          className={`rounded px-3 py-1 text-sm ${
            chain.id === chainId
              ? "bg-purple-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {chain.name}
        </button>
      ))}
    </div>
  );
}

// =============================================================================
// Export all examples
// =============================================================================

export {
  ConnectWallet,
  TokenBalance,
  TokenActions,
  TokenSelector,
  ChainSwitcher,
};
