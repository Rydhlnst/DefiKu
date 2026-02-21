"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

const tabs = [
  { id: "share", title: "Share", subtitle: "your alpha" },
  { id: "copy", title: "Copy", subtitle: "top farmers" },
  { id: "track", title: "Track", subtitle: "real P&L" },
  { id: "alert", title: "Alert", subtitle: "rugs early" },
  { id: "automate", title: "Automate", subtitle: "harvests" },
  { id: "export", title: "Export", subtitle: "tax ready" },
];

export function HeroSection() {
  const [activeTab, setActiveTab] = useState<string>("share");

  return (
    <section className="relative overflow-hidden pt-16">
      <div className="max-w-7xl mx-auto px-8">
        {/* Hero Content */}
        <div className="min-h-[60vh] flex flex-col justify-center py-20">
          <div className="relative z-10 max-w-3xl">
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-normal text-foreground leading-[1.1] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            >
              DeFiKu is the Social Layer
              <br />
              <span className="text-muted-foreground">for DeFi farmers</span>
            </motion.h1>
            
            <motion.p 
              className="mt-8 text-lg text-muted-foreground max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            >
              See what top farmers are actually doing. Copy their moves, share your wins, 
              and avoid rugs together with real-time on-chain alerts.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Link 
                href="/app" 
                className="inline-block mt-8 px-6 py-3 bg-muted border border-border text-foreground text-sm font-medium hover:bg-accent hover:border-foreground/20 transition-all duration-300"
              >
                Join the Community
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link 
                href="#how-it-works" 
                className="inline-block mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Or view demo data →
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Tabs Navigation - Inside max-w-7xl */}
        <div className="border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-6">
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group relative text-left transition-colors ${
                  activeTab === tab.id ? 'bg-background' : ''
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
              >
                {/* Active indicator line */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] transition-colors duration-300 ${
                  activeTab === tab.id ? 'bg-foreground' : 'bg-transparent group-hover:bg-foreground/30'
                }`} />
                
                <div className="px-6 py-6">
                  <span className={`text-base font-medium transition-colors ${
                    activeTab === tab.id ? 'text-foreground' : 'text-foreground group-hover:text-foreground/80'
                  }`}>
                    {tab.title}
                  </span>
                  <span className="block text-sm text-muted-foreground mt-1">
                    {tab.subtitle}
                  </span>
                </div>
                
                {/* Right border separator */}
                {index < tabs.length - 1 && (
                  <div className="absolute right-0 top-0 bottom-0 w-px bg-border" />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Tab Content - Inside max-w-7xl with Skeleton */}
        <AnimatePresence mode="wait">
          {activeTab && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-border overflow-hidden"
            >
              <div className="py-8">
                {/* Skeleton Placeholder */}
                <Skeleton className="w-full aspect-[16/9] bg-border" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
