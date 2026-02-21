"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { CustomConnectButton } from "../components/wallet/custom-connect-button";


export function CTASection() {
  return (
    <section className="py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="relative bg-background border border-border py-16 px-8 md:px-12 text-center overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Content */}
              <div className="relative z-10">
                {/* Heading */}
                <motion.h2
                  className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight text-foreground"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Ready to stop farming
                  <br />
                  in the dark?
                </motion.h2>

                {/* Subheadline */}
                <motion.p
                  className="text-muted-foreground mt-4 max-w-xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Connect your wallet to track all your DeFi positions across chains. 
                  No transaction signing required.
                </motion.p>

                {/* CTA Button */}
                <motion.div
                  className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <CustomConnectButton variant="hero" />
                  
                  <a 
                    href="#features" 
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 text-sm"
                  >
                    Learn more
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </motion.div>

                {/* Trust Badges */}
                <motion.div
                  className="flex flex-wrap items-center justify-center gap-6 mt-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Check className="w-3 h-3" />
                    Read-only access
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Check className="w-3 h-3" />
                    Track 12+ chains
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Check className="w-3 h-3" />
                    Free forever
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>
      </div>
    </section>
  );
}
