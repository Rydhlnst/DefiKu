"use client";

import * as React from "react";
import { WagmiProvider, type Config } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider } from "connectkit";
import { type ReactNode } from "react";

/**
 * Classic DeFi Theme - ConnectKit Configuration
 * 
 * Colors:
 * - Background: Slate-950 (#020617)
 * - Card: Slate-900 (#0f172a)
 * - Primary: Purple-500 (#8b5cf6)
 * - Accent: Cyan-400 (#22d3ee)
 * - Success: Emerald-400 (#34d399)
 * - Warning: Amber-400 (#fbbf24)
 * - Error: Rose-500 (#f43f5e)
 */
const defiTheme = {
  "--ck-font-family": "Inter, ui-sans-serif, system-ui, sans-serif",
  "--ck-border-radius": "12px",
  "--ck-overlay-background": "rgba(2, 6, 23, 0.8)",
  "--ck-modal-box-shadow": "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
  // Button colors
  "--ck-connectbutton-background": "#0f172a",
  "--ck-connectbutton-color": "#f8fafc",
  "--ck-connectbutton-hover-background": "#1e293b",
  "--ck-connectbutton-hover-color": "#f8fafc",
  "--ck-connectbutton-border-radius": "8px",
  "--ck-connectbutton-font-weight": "600",
  // Body/Modal colors
  "--ck-body-background": "#020617",
  "--ck-body-color": "#f8fafc",
  "--ck-body-color-muted": "#94a3b8",
  "--ck-body-color-muted-hover": "#f8fafc",
  "--ck-body-action-color": "#22d3ee",
  "--ck-body-divider": "#1e293b",
  "--ck-body-divider-box-shadow": "none",
  // Primary/Accent (Purple)
  "--ck-primary-button-background": "#8b5cf6",
  "--ck-primary-button-color": "#ffffff",
  "--ck-primary-button-hover-background": "#7c3aed",
  "--ck-primary-button-border-radius": "8px",
  "--ck-primary-button-box-shadow": "0 0 20px rgba(139, 92, 246, 0.2)",
  "--ck-primary-button-hover-box-shadow": "0 0 30px rgba(139, 92, 246, 0.3)",
  // Secondary
  "--ck-secondary-button-background": "#0f172a",
  "--ck-secondary-button-color": "#f8fafc",
  "--ck-secondary-button-hover-background": "#1e293b",
  "--ck-secondary-button-border-radius": "8px",
  "--ck-secondary-button-box-shadow": "none",
  // Tertiary
  "--ck-tertiary-button-background": "#1e293b",
  "--ck-tertiary-button-color": "#f8fafc",
  "--ck-tertiary-button-hover-background": "#334155",
  "--ck-tertiary-button-border-radius": "8px",
  // Input
  "--ck-input-background": "#0f172a",
  "--ck-input-color": "#f8fafc",
  "--ck-input-border-radius": "8px",
  "--ck-input-focus-box-shadow": "0 0 0 2px #8b5cf6",
  // Dropdown
  "--ck-dropdown-button-background": "#0f172a",
  "--ck-dropdown-button-color": "#f8fafc",
  // Modal
  "--ck-modal-heading-font-weight": "700",
  // QR code
  "--ck-qr-dot-color": "#f8fafc",
  "--ck-qr-border-color": "#1e293b",
  // Tooltip
  "--ck-tooltip-background": "#0f172a",
  "--ck-tooltip-color": "#f8fafc",
  "--ck-tooltip-border-radius": "6px",
  // Alert/Error
  "--ck-alert-color": "#f43f5e",
  // Focus
  "--ck-focus-color": "#8b5cf6",
  // Scrollbar
  "--ck-scrollbar-background": "#0f172a",
  "--ck-scrollbar-thumb-background": "#334155",
};

/**
 * Props for Web3Provider component
 */
interface Web3ProviderProps {
  children: ReactNode;
  config: Config;
  queryClient?: QueryClient;
}

/**
 * Create a default query client
 */
const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 2,
        staleTime: 60 * 1000, // 1 minute
      },
    },
  });

/**
 * Web3 Provider Component - Classic DeFi Theme with ConnectKit
 * 
 * Wraps the application with:
 * - WagmiProvider (wagmi configuration)
 * - QueryClientProvider (React Query)
 * - ConnectKitProvider (wallet connection UI with DeFi theme)
 * 
 * Theme Features:
 * - Dark slate background (#020617)
 * - Purple accent (#8b5cf6)
 * - Cyan highlights (#22d3ee)
 * - Emerald success states (#34d399)
 * - Rose error states (#f43f5e)
 * 
 * @example
 * // app/layout.tsx
 * import { wagmiConfig } from "@defiku/web3-config/config";
 * import { Web3Provider } from "@defiku/web3-config/providers";
 * 
 * export default function RootLayout({
 *   children,
 * }: {
 *   children: React.ReactNode;
 * }) {
 *   return (
 *     <html lang="en">
 *       <body>
 *         <Web3Provider config={wagmiConfig}>
 *           {children}
 *         </Web3Provider>
 *       </body>
 *     </html>
 *   );
 * }
 */
export function Web3Provider({
  children,
  config,
  queryClient: providedQueryClient,
}: Web3ProviderProps) {
  // Use provided query client or create a new one
  // Use useState to ensure the same query client is used across renders
  const [queryClient] = React.useState(() => providedQueryClient ?? createQueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider
          customTheme={defiTheme}
          options={{
            embedGoogleFonts: true,
          }}
        >
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

// Re-export types
export type { Web3ProviderProps };
