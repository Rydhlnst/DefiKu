"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-4 pt-20">
      <div className="relative z-10 flex max-w-4xl flex-col items-center text-center">
        {/* Announcement Badge */}
        <Link
          href="#features"
          className="group mb-8 inline-flex items-center gap-2 rounded-full border bg-accent px-4 py-2 text-sm text-accent-foreground transition-all hover:bg-accent/80"
        >
          <span className="flex items-center gap-2">
            Bridge & swap over 17,000+ tokens on any EVM
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>

        {/* Main Headline */}
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          Build the next generation
          <br />
          <span className="text-primary">
            of DeFi products
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Where users and AI can spend, earn and transact autonomously across multiple chains.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="#swap"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
          >
            Start for Free
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="#playground"
            className="inline-flex items-center justify-center gap-2 rounded-full border bg-secondary px-8 py-4 text-sm font-semibold text-secondary-foreground transition-all hover:bg-secondary/80"
          >
            View Playground
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="h-6 w-4 rounded-full border-2 border-muted-foreground">
          <div className="mx-auto mt-1 h-2 w-1 rounded-full bg-muted-foreground" />
        </div>
      </div>
    </section>
  );
}
