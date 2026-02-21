"use client";

import { ConnectKitButton } from "connectkit";
import { Wallet } from "lucide-react";

interface CustomConnectButtonProps {
  className?: string;
  variant?: "nav" | "hero" | "mobile";
}

export function CustomConnectButton({ 
  className = "",
  variant = "nav"
}: CustomConnectButtonProps) {
  
  const baseStyles = "inline-flex items-center justify-center font-medium transition-colors duration-200";
  
  const variants = {
    nav: "h-9 px-4 text-sm bg-background text-foreground hover:bg-muted rounded-md",
    hero: "h-11 px-6 text-base bg-background text-foreground hover:bg-muted rounded-md gap-2",
    mobile: "h-12 px-4 text-base bg-background text-foreground hover:bg-muted rounded-md gap-2 w-full"
  };

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, address, ensName }) => {
        const handleClick = (e: React.MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          show?.();
        };

        if (isConnected) {
          return (
            <button
              onClick={handleClick}
              type="button"
              className={`${baseStyles} ${variants[variant]} ${className}`}
            >
              <span className="font-mono">
                {ensName || (address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Connected")}
              </span>
            </button>
          );
        }

        return (
          <button
            onClick={handleClick}
            type="button"
            className={`${baseStyles} ${variants[variant]} ${className}`}
          >
            {isConnecting ? (
              <span>Connecting...</span>
            ) : (
              <>
                {variant !== "nav" && <Wallet className="w-4 h-4" />}
                <span>Connect Wallet</span>
              </>
            )}
          </button>
        );
      }}
    </ConnectKitButton.Custom>
  );
}
