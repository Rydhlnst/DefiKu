"use client";

import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";

const floatingTokens = [
  { symbol: "ETH", color: "hsl(var(--primary))", position: "top-[10%] left-[20%]" },
  { symbol: "OP", color: "hsl(var(--destructive))", position: "top-[5%] right-[25%]" },
  { symbol: "ARB", color: "hsl(var(--primary))", position: "top-[25%] right-[10%]" },
  { symbol: "AVAX", color: "hsl(var(--destructive))", position: "bottom-[30%] right-[20%]" },
  { symbol: "MATIC", color: "hsl(var(--primary))", position: "bottom-[15%] left-[25%]" },
  { symbol: "BASE", color: "hsl(var(--primary))", position: "bottom-[25%] left-[5%]" },
];

export function FeatureGrid() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-[600px] gap-8 rounded-3xl border bg-card p-8 lg:grid-cols-2 lg:p-12">
          {/* Left Column - Text Content */}
          <div className="flex flex-col justify-center">
            <h2 className="mb-6 text-3xl font-bold text-card-foreground sm:text-4xl lg:text-5xl">
              Buy it. Swap it. Spend it. Anywhere.
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Powering the world&apos;s most seamless bridging and swapping experience. 
              Connect any wallet, trade any token, on any chain.
            </p>
            <Link
              href="#swap"
              className="group inline-flex w-fit items-center gap-2 rounded-full border bg-secondary px-6 py-3 text-sm font-medium text-secondary-foreground transition-all hover:bg-secondary/80"
            >
              Swap Crypto
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Right Column - Visual */}
          <div className="relative flex items-center justify-center">
            {/* Floating Tokens */}
            {floatingTokens.map((token) => (
              <div
                key={token.symbol}
                className={`absolute ${token.position} animate-pulse`}
                style={{ animationDelay: `${Math.random() * 2}s` }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full shadow-lg sm:h-14 sm:w-14"
                  style={{
                    backgroundColor: token.color,
                    boxShadow: `0 0 30px ${token.color}40`,
                  }}
                >
                  <span className="text-xs font-bold text-primary-foreground">
                    {token.symbol.slice(0, 3)}
                  </span>
                </div>
              </div>
            ))}

            {/* Center Card */}
            <div className="relative z-10 w-full max-w-sm rounded-2xl border bg-card p-6">
              <div className="mb-4 text-sm font-medium text-muted-foreground">
                Select Token
              </div>
              <button className="flex w-full items-center gap-3 rounded-xl border bg-accent px-4 py-3 text-left transition-all hover:bg-accent/80">
                <Search className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">Search by token</span>
                <svg
                  className="ml-auto h-5 w-5 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Quick select tokens */}
              <div className="mt-4 flex gap-2">
                {["ETH", "USDC", "USDT"].map((token) => (
                  <button
                    key={token}
                    className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-all hover:bg-secondary/80"
                  >
                    {token}
                  </button>
                ))}
              </div>
            </div>

            {/* Decorative gradient ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-64 w-64 rounded-full border border-muted" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-80 w-80 rounded-full border border-muted/50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
