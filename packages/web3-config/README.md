# @defiku/web3-config

Web3 configuration package for DeFiKu dApp. Built with Wagmi v2, Viem, and RainbowKit v2.

## Features

- ⚡ **Wagmi v2** - React hooks for Ethereum
- 🔷 **RainbowKit v2** - Wallet connection UI
- 🔧 **Viem** - TypeScript interface for Ethereum
- 🌐 **Multi-chain** - Ethereum, Arbitrum, Base, BSC
- 🎨 **Custom Theme** - Dark mode with purple accent
- 📘 **TypeScript** - Full type safety

## Installation

```bash
pnpm install @defiku/web3-config
```

## Setup

### 1. Environment Variables

Add these to your `.env.local`:

```env
# Required
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id

# Optional - Custom RPC URLs
NEXT_PUBLIC_ETHEREUM_RPC_URL=https://eth.llamarpc.com
NEXT_PUBLIC_ARBITRUM_RPC_URL=https://arb1.arbitrum.io/rpc
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
NEXT_PUBLIC_BSC_RPC_URL=https://bsc-dataseed.binance.org
```

### 2. Wrap Your App

```tsx
// app/layout.tsx
import { wagmiConfig } from "@defiku/web3-config/config";
import { Web3Provider } from "@defiku/web3-config/providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
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
```

### 3. Add Connect Button

```tsx
// app/page.tsx
"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  return (
    <div>
      <ConnectButton />
    </div>
  );
}
```

## Usage Examples

### Read Token Balance

```tsx
"use client";

import { useTokenBalance } from "@defiku/web3-config/hooks";
import { COMMON_TOKENS } from "@defiku/web3-config/constants";

function TokenBalance() {
  const usdc = COMMON_TOKENS[1].find(t => t.symbol === "USDC");
  
  const { 
    formattedBalance, 
    isLoading, 
    isError 
  } = useTokenBalance({
    tokenAddress: usdc!.address,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return <div>Balance: {formattedBalance} USDC</div>;
}
```

### Read Contract Data

```tsx
"use client";

import { useContractRead } from "@defiku/web3-config/hooks";
import { ERC20_ABI, COMMON_TOKENS } from "@defiku/web3-config/constants";

function TokenName() {
  const usdc = COMMON_TOKENS[1].find(t => t.symbol === "USDC");
  
  const { data: name } = useContractRead({
    address: usdc!.address,
    abi: ERC20_ABI,
    functionName: "name",
  });

  return <div>Token: {name}</div>;
}
```

### Write Contract (Token Transfer)

```tsx
"use client";

import { useContractWrite } from "@defiku/web3-config/hooks";
import { ERC20_ABI, COMMON_TOKENS } from "@defiku/web3-config/constants";
import { parseUnits } from "viem";

function TransferButton({ to, amount }: { to: Address; amount: string }) {
  const usdc = COMMON_TOKENS[1].find(t => t.symbol === "USDC");
  
  const {
    writeContract,
    isLoading,
    isSuccess,
    isConfirming,
    hash,
  } = useContractWrite({
    address: usdc!.address,
    abi: ERC20_ABI,
    functionName: "transfer",
  });

  const handleTransfer = () => {
    writeContract({
      args: [to, parseUnits(amount, 6)],
    });
  };

  return (
    <button onClick={handleTransfer} disabled={isLoading}>
      {isConfirming ? "Confirming..." : isLoading ? "Processing..." : "Transfer"}
    </button>
  );
}
```

### Get Contract Addresses

```tsx
import { getContractAddress, CONTRACTS } from "@defiku/web3-config/constants";

// Get specific contract
const router = getContractAddress(1, "DEFIKU_ROUTER");

// Check all addresses for a chain
const mainnetContracts = CONTRACTS[1];
```

### Work with Tokens

```tsx
import { 
  getTokenBySymbol, 
  getNativeToken,
  getTokensForSwap,
  NATIVE_TOKENS 
} from "@defiku/web3-config/constants";

// Get token by symbol
const usdc = getTokenBySymbol(1, "USDC");

// Get native token
const eth = getNativeToken(1);

// Get tokens for swap UI
const tokens = getTokensForSwap(1);
```

## Supported Chains

| Chain | Chain ID | Native Token |
|-------|----------|--------------|
| Ethereum | 1 | ETH |
| Arbitrum | 42161 | ETH |
| Base | 8453 | ETH |
| BSC | 56 | BNB |

## Wagmi Connectors

The package exports wagmi connectors for custom wallet configurations:

```tsx
import { 
  injected,
  metaMask,
  walletConnect,
  coinbaseWallet,
  safe,
} from "@defiku/web3-config";
```

### Available Connectors

| Connector | Description |
|-----------|-------------|
| `injected` | Browser injected wallets (MetaMask, etc.) |
| `metaMask` | MetaMask specific connector |
| `walletConnect` | WalletConnect v2 connector |
| `coinbaseWallet` | Coinbase Wallet connector |
| `safe` | Gnosis Safe connector |

### Custom Connectors Usage

If you need to customize which wallets to support, import connectors directly from wagmi:

```tsx
import { createConfig } from "wagmi";
import { mainnet, arbitrum } from "wagmi/chains";
import { metaMask, walletConnect } from "wagmi/connectors";

const config = createConfig({
  chains: [mainnet, arbitrum],
  connectors: [
    metaMask(),
    walletConnect({ 
      projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID 
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
  },
});
```

## API Reference

### Hooks

- `useTokenBalance` - Read ERC20 token balance
- `useContractRead` - Generic contract read
- `useContractWrite` - Generic contract write with transaction status

### Constants

- `CONTRACTS` - DeFiKu contract addresses per chain
- `COMMON_TOKENS` - Common ERC20 tokens per chain
- `NATIVE_TOKENS` - Native token info per chain
- `ERC20_ABI` - Standard ERC20 ABI
- `ROUTER_ABI` - DEX router ABI

### Config

- `wagmiConfig` - Pre-configured Wagmi config
- `supportedChains` - List of supported chains
- `getChainConfig` - Get chain config by ID

## Theme Customization

The package includes a custom RainbowKit theme:
- Background: `#0a0a0f`
- Accent: `#8b5cf6` (Purple)
- Border radius: `0.625rem`
- Font: Inter

To customize, modify `src/providers/web3-provider.tsx`.

## TypeScript

All exports are fully typed. Import types as needed:

```tsx
import type { Token, ChainConfig } from "@defiku/web3-config";
```

## License

MIT
