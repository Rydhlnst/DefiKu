"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Link2, Activity } from "lucide-react";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
};

const stats = [
  {
    value: "$420M",
    label: "Total Value Tracked",
    description: "Assets monitored across all supported chains in real-time.",
    icon: TrendingUp,
  },
  {
    value: "50K",
    label: "Active Farmers",
    description: "Verified liquidity providers copying top strategies.",
    icon: Users,
  },
  {
    value: "12",
    label: "Chains Supported",
    description: "Multi-chain infrastructure spanning EVM and non-EVM networks.",
    icon: Link2,
  },
  {
    value: "99.9%",
    label: "Uptime SLA",
    description: "Enterprise-grade reliability with redundant node architecture.",
    icon: Activity,
  },
];

export function SocialProofSection() {
  return (
    <section className="py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <motion.div 
          className="mb-20"
          {...fadeInUp}
        >
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
            Network Metrics
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight text-foreground mt-4 max-w-2xl">
            Real-time performance data across our entire infrastructure
          </h2>
        </motion.div>

        {/* Sharp Grid Layout */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 border border-border rounded-none divide-y md:divide-y-0 md:divide-x divide-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="group relative p-8 lg:p-12 bg-background hover:bg-muted transition-colors duration-300"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {/* Top row: Icon and Label */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
                    {stat.label}
                  </span>
                  <div className="w-10 h-10 flex items-center justify-center border border-border rounded-none text-foreground">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Large Value */}
                <div className="mb-4">
                  <span className="text-5xl lg:text-6xl font-light text-foreground tracking-tight">
                    {stat.value}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                  {stat.description}
                </p>

                {/* Sharp corner accent on hover */}
                <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[20px] border-r-[20px] border-b-transparent border-r-border opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom border line to close the grid visually */}
        <div className="h-px w-full bg-border mt-0" />
      </div>
    </section>
  );
}
