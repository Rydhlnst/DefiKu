"use client";

import { motion } from "framer-motion";

// Feature data
const features = [
  {
    number: "01",
    title: "Portfolio Tracking",
    description: "Real-time monitoring of all your DeFi positions across multiple chains and protocols in one unified dashboard.",
    layout: "left",
  },
  {
    number: "02",
    title: "Social Alpha",
    description: "Follow top performers, share strategies, and discover alpha through our community-driven social layer.",
    layout: "right",
  },
  {
    number: "03",
    title: "Risk Management",
    description: "Automated IL risk scoring and portfolio health monitoring. Stay ahead of market volatility with intelligent alerts.",
    layout: "full",
  },
];

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
};

export function FeaturesSection() {
  return (
    <section className="py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <motion.div 
          className="mb-20"
          {...fadeInUp}
        >
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
            Features
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight text-foreground mt-4 max-w-2xl">
            Everything you need to farm smarter
          </h2>
        </motion.div>

      {/* Editorial Masonry Grid */}
      <div className="space-y-32">
        
        {/* Item 1: Portfolio - Image Left, Text Right */}
        <motion.div 
          className="grid grid-cols-12 gap-8 items-center"
          {...fadeInUp}
        >
          {/* Image - Cols 1-7 */}
          <div className="col-span-12 lg:col-span-7">
            <div className="aspect-[4/3] bg-muted overflow-hidden group">
              <div 
                className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/20 grayscale group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='%23f3f4f6'/%3E%3Cpath d='M0 50h100M50 0v100' stroke='%23e5e7eb' stroke-width='1'/%3E%3Ccircle cx='50' cy='50' r='20' fill='%23d1d5db'/%3E%3C/svg%3E")`,
                }}
              />
            </div>
          </div>
          
          {/* Text - Cols 8-12 */}
          <div className="col-span-12 lg:col-span-5 flex flex-col justify-center lg:pl-8">
            <span className="text-8xl text-muted font-light">01</span>
            <h3 className="text-2xl text-foreground mt-2">Portfolio Tracking</h3>
            <p className="text-sm text-muted-foreground mt-4 max-w-xs leading-relaxed">
              Real-time monitoring of all your DeFi positions across multiple chains and protocols in one unified dashboard.
            </p>
          </div>
        </motion.div>

        {/* Item 2: Social - Text Left, Image Right */}
        <motion.div 
          className="grid grid-cols-12 gap-8 items-center"
          initial={fadeInUp.initial}
          whileInView={fadeInUp.whileInView}
          viewport={fadeInUp.viewport}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
        >
          {/* Text - Cols 1-5 */}
          <div className="col-span-12 lg:col-span-5 flex flex-col justify-center order-2 lg:order-1">
            <span className="text-8xl text-muted font-light">02</span>
            <h3 className="text-2xl text-foreground mt-2">Social Alpha</h3>
            <p className="text-sm text-muted-foreground mt-4 max-w-xs leading-relaxed">
              Follow top performers, share strategies, and discover alpha through our community-driven social layer.
            </p>
          </div>
          
          {/* Image - Cols 6-12 (taller) */}
          <div className="col-span-12 lg:col-span-7 order-1 lg:order-2">
            <div className="aspect-[3/4] lg:aspect-[3/4] bg-muted overflow-hidden group">
              <div 
                className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/20 grayscale group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='%23f3f4f6'/%3E%3Ccircle cx='30' cy='30' r='15' fill='%23d1d5db'/%3E%3Ccircle cx='70' cy='50' r='20' fill='%239ca3af'/%3E%3Ccircle cx='40' cy='80' r='12' fill='%23d1d5db'/%3E%3C/svg%3E")`,
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Item 3: Risk - Full Width with Overlay */}
        <motion.div 
          className="relative"
          initial={fadeInUp.initial}
          whileInView={fadeInUp.whileInView}
          viewport={fadeInUp.viewport}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
        >
          {/* Full Width Image */}
          <div className="aspect-[21/9] bg-muted overflow-hidden group">
            <div 
              className="w-full h-full bg-gradient-to-br from-foreground/80 to-foreground/90 grayscale group-hover:scale-[1.02] transition-transform duration-700 ease-out relative"
            >
              {/* Dark gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              
              {/* Overlay Text - Bottom Left */}
              <div className="absolute bottom-8 left-8 lg:bottom-12 lg:left-12">
                <div className="flex items-baseline gap-4">
                  <span className="text-6xl lg:text-8xl text-background/20 font-light">03</span>
                  <div>
                    <h3 className="text-2xl lg:text-3xl text-background">Risk Management</h3>
                    <p className="text-sm text-background/70 mt-2 max-w-sm leading-relaxed">
                      Automated monitoring for maximum safety. Intelligent alerts keep you ahead of market volatility.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
      </div>
    </section>
  );
}
