"use client";

import { motion } from "framer-motion";

// Sparkline component for trend visualization
function Sparkline({ color = "hsl(var(--cyan))", positive = true }: { color?: string; positive?: boolean }) {
  const path = positive 
    ? "M2 14L14 10L26 12L38 6L50 10L62 4L78 2"
    : "M2 4L14 8L26 6L38 12L50 8L62 14L78 10";
  
  return (
    <svg width="60" height="16" viewBox="0 0 80 24" fill="none" className="overflow-visible">
      {/* Gradient fill underneath */}
      <defs>
        <linearGradient id={`gradient-${positive}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path 
        d={`${path} V24 H2 Z`}
        fill={`url(#gradient-${positive})`}
      />
      <path 
        d={path}
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Pool data
const poolData = [
  { name: "ETH-USDC", apy: "18.52%", tvl: "$24.5M", ilRisk: "-0.2%", positive: true },
  { name: "WBTC-ETH", apy: "12.84%", tvl: "$18.2M", ilRisk: "-0.5%", positive: false },
  { name: "USDC-DAI", apy: "8.21%", tvl: "$42.8M", ilRisk: "-0.1%", positive: true },
];

export function BrowserMockup() {
  return (
    <div className="relative w-full max-w-3xl mx-auto" style={{ perspective: "1000px" }}>
      {/* Floating glow behind mockup */}
      <div className="absolute -inset-8 blur-3xl bg-foreground/5 rounded-3xl pointer-events-none" />
      
      {/* Live Badge - Floating top-right */}
      <motion.div 
        className="absolute -top-4 -right-4 z-20"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted backdrop-blur-md border border-border">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs font-medium text-foreground">Live</span>
        </div>
      </motion.div>

      {/* Transaction Notification - Floating left */}
      <motion.div 
        className="absolute top-1/4 -left-12 lg:-left-20 z-20 hidden md:block"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className="p-3 rounded-lg bg-muted backdrop-blur-md border border-border shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-cyan/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <div className="text-xs font-medium text-foreground">New Position</div>
              <div className="text-[10px] text-muted-foreground">+2.4 ETH-USDC</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Browser Frame with 3D transform */}
      <motion.div 
        className="relative rounded-xl overflow-hidden border border-border bg-background shadow-2xl"
        style={{ 
          transform: "rotateX(2deg)",
          transformStyle: "preserve-3d"
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Browser Chrome */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-muted">
          {/* Traffic Lights */}
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400 border border-red-500/30" />
            <div className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-500/30" />
            <div className="w-3 h-3 rounded-full bg-green-400 border border-green-500/30" />
          </div>
          
          {/* URL Bar */}
          <div className="flex-1 mx-4">
            <div className="max-w-md mx-auto bg-background border border-border rounded-md px-4 py-1.5 flex items-center justify-center gap-2">
              <svg className="w-3 h-3 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.131A8 8 0 008 8m0 0a8 8 0 00-8 8c0 2.472.345 4.865.99 7.131M8 8a8 8 0 0016 0M8 8V6m0 0a2 2 0 012-2h4a2 2 0 012 2v2m-8 0h8" />
              </svg>
              <span className="text-xs text-muted-foreground font-mono">app.defiku.io/analytics</span>
            </div>
          </div>
          
          {/* Window Controls */}
          <div className="flex gap-1.5">
            <div className="w-4 h-4 rounded-sm bg-muted flex items-center justify-center border border-border">
              <div className="w-2 h-0.5 bg-muted-foreground rounded-full" />
            </div>
            <div className="w-4 h-4 rounded-sm bg-muted flex items-center justify-center border border-border">
              <div className="w-2 h-2 border border-muted-foreground rounded-sm" />
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-5 bg-background">
          {/* Dashboard Header */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <h3 className="text-base font-semibold text-foreground">Pool Analytics</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Real-time yield optimization data</p>
            </div>
            <div className="flex items-center gap-2 text-right">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
              </span>
              <div>
                <span className="text-[10px] text-muted-foreground font-mono block">Last updated</span>
                <span className="text-[10px] text-foreground font-mono">2s ago</span>
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="border border-border rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-2 px-4 py-2.5 bg-muted border-b border-border text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
              <div className="col-span-3">Pool</div>
              <div className="col-span-2 text-right">APY</div>
              <div className="col-span-2 text-right">TVL</div>
              <div className="col-span-2 text-right">IL Risk</div>
              <div className="col-span-2 text-right">Trend</div>
              <div className="col-span-1" />
            </div>

            {/* Table Rows */}
            {poolData.map((pool, index) => (
              <div 
                key={pool.name}
                className={`grid grid-cols-12 gap-2 px-4 py-3 items-center border-b border-border/50 last:border-0 hover:bg-muted transition-colors cursor-pointer ${
                  index % 2 === 0 ? 'bg-background' : 'bg-muted/50'
                }`}
              >
                <div className="col-span-3">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-muted-foreground to-foreground border border-border" />
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-muted-foreground/80 to-foreground/80 border border-border" />
                    </div>
                    <span className="text-xs font-medium text-foreground">{pool.name}</span>
                  </div>
                </div>
                <div className="col-span-2 text-right">
                  <span className="text-xs font-mono font-medium text-cyan">{pool.apy}</span>
                </div>
                <div className="col-span-2 text-right">
                  <span className="text-xs font-mono text-foreground">{pool.tvl}</span>
                </div>
                <div className="col-span-2 text-right">
                  <span className="text-xs font-mono text-muted-foreground">{pool.ilRisk}</span>
                </div>
                <div className="col-span-2 flex justify-end">
                  <Sparkline positive={pool.positive} />
                </div>
                <div className="col-span-1 flex justify-end">
                  <button className="text-muted-foreground hover:text-foreground transition-colors">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                      <circle cx="8" cy="4" r="1.5" />
                      <circle cx="8" cy="8" r="1.5" />
                      <circle cx="8" cy="12" r="1.5" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Yield Trend Section */}
          <div className="mt-5 pt-4 border-t border-border">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-foreground">Yield Trend (24h)</span>
              <div className="flex items-center gap-3 text-[10px]">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan" />
                  <span className="text-muted-foreground">APY</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                  <span className="text-muted-foreground">Volume</span>
                </div>
              </div>
            </div>
            <div className="h-20 w-full relative">
              <svg className="w-full h-full" viewBox="0 0 400 80" fill="none" preserveAspectRatio="none">
                {/* Grid lines */}
                <line x1="0" y1="20" x2="400" y2="20" stroke="hsl(var(--border))" strokeWidth="1" />
                <line x1="0" y1="40" x2="400" y2="40" stroke="hsl(var(--border))" strokeWidth="1" />
                <line x1="0" y1="60" x2="400" y2="60" stroke="hsl(var(--border))" strokeWidth="1" />
                
                {/* Gradient definition */}
                <defs>
                  <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--cyan))" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="hsl(var(--cyan))" stopOpacity="0" />
                  </linearGradient>
                </defs>
                
                {/* Area fill */}
                <path 
                  d="M0 60 L40 44 L80 52 L120 32 L160 40 L200 24 L240 32 L280 20 L320 26 L360 12 L400 16 V80 H0 Z" 
                  fill="url(#trendGradient)"
                />
                
                {/* Line */}
                <path 
                  d="M0 60 L40 44 L80 52 L120 32 L160 40 L200 24 L240 32 L280 20 L320 26 L360 12 L400 16" 
                  stroke="hsl(var(--cyan))" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
