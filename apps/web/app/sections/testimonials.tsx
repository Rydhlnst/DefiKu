"use client";

import { motion } from "framer-motion";
import { Star, Quote, Shield } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { NotionFaceAvatar } from "../components/notion-avatar";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
};

// ============================================
// Marquee Component
// ============================================
interface MarqueeProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
}

function Marquee({
  children,
  direction = "left",
  speed = 30,
  pauseOnHover = true,
  className = "",
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [duplicateCount, setDuplicateCount] = useState(2);

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const contentWidth = containerRef.current.scrollWidth / 2;
      const needed = Math.ceil((containerWidth * 2) / contentWidth) + 1;
      setDuplicateCount(Math.max(2, needed));
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      style={{
        maskImage: "linear-gradient(to right, transparent, rgb(0,0,0) 5%, rgb(0,0,0) 95%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, rgb(0,0,0) 5%, rgb(0,0,0) 95%, transparent)",
      }}
    >
      <motion.div
        className="flex gap-6 w-max"
        animate={{
          x: direction === "left" ? [0, -50 + "%"] : [-50 + "%", 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
        whileHover={pauseOnHover ? { animationPlayState: "paused" } : undefined}
      >
        {Array.from({ length: duplicateCount }).map((_, i) => (
          <div key={i} className="flex gap-6 shrink-0">
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ============================================
// Testimonial Card
// ============================================
interface TestimonialCardProps {
  quote: string;
  name: string;
  handle: string;
  isVerified?: boolean;
  rating?: number;
  className?: string;
}

function TestimonialCard({
  quote,
  name,
  handle,
  isVerified = true,
  rating = 5,
  className = "",
}: TestimonialCardProps) {
  return (
    <motion.div
      className={`group relative w-[380px] shrink-0 bg-background border border-border p-6 hover:border-foreground/20 transition-all duration-300 ${className}`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Quote Icon */}
      <div className="absolute top-4 right-4 text-muted">
        <Quote className="w-8 h-8" />
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="w-3 h-3 fill-foreground text-foreground" />
        ))}
      </div>

      {/* Quote */}
      <p className="text-base font-normal text-foreground/80 leading-relaxed mb-6 line-clamp-3">
        &quot;{quote}&quot;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-border">
        {/* Avatar - Notion Face Style */}
        <NotionFaceAvatar name={name} size={40} className="rounded-full border border-border flex-shrink-0" />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">{name}</span>
            {isVerified && (
              <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 font-medium border border-border">
                Verified
              </span>
            )}
          </div>
          <span className="text-xs text-muted-foreground font-mono">{handle}</span>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// Stats Card
// ============================================
function StatsCard() {
  return (
    <motion.div
      className="group relative w-[300px] shrink-0 bg-background border border-border p-6 hover:border-foreground/20 transition-all duration-300"
      whileHover={{ y: -4 }}
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-muted flex items-center justify-center flex-shrink-0 border border-border">
          <Shield className="w-5 h-5 text-foreground" strokeWidth={1.5} />
        </div>
        <div>
          <div className="text-3xl font-light text-foreground tracking-tight">12,400</div>
          <div className="text-sm text-muted-foreground mt-1">rugs avoided this quarter</div>
          <div className="text-xs text-muted-foreground mt-3 uppercase tracking-[0.2em] font-medium">Community Alert</div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// Rating Summary Card
// ============================================
function RatingCard() {
  return (
    <motion.div
      className="group relative w-[280px] shrink-0 bg-background border border-border p-6 hover:border-foreground/20 transition-all duration-300"
      whileHover={{ y: -4 }}
    >
      <div className="flex items-center gap-4">
        <div className="text-4xl font-light text-foreground tracking-tighter">4.9</div>
        <div>
          <div className="flex gap-0.5 mb-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-foreground text-foreground" />
            ))}
          </div>
          <div className="text-sm text-muted-foreground">Average rating</div>
          <div className="text-xs text-muted-foreground">from 2,400+ reviews</div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// Main Section
// ============================================
export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "DeFiKu helped me avoid a 40% IL on a pool I was about to enter. The community warnings are gold.",
      name: "CryptoWhale",
      handle: "@0x71...3A9F",
    },
    {
      quote: "Finally, a tool that shows REAL P&L after gas fees. Changed how I calculate my actual yields.",
      name: "YieldHunter",
      handle: "@0x42...8B2E",
    },
    {
      quote: "Copied @SmartMoney's strategy and made 15% in two weeks. The transparency is unmatched.",
      name: "DeFiNewbie",
      handle: "@0x93...1C4D",
    },
    {
      quote: "The risk scoring system saved me from three potential rug pulls this month alone.",
      name: "ChainGuardian",
      handle: "@0x55...7F2A",
    },
    {
      quote: "Best farming dashboard I've used. Clean UI and accurate APY calculations.",
      name: "YieldFarmer",
      handle: "@0x88...9C1B",
    },
    {
      quote: "Community features are next level. Getting alerts before Twitter knows about the alpha.",
      name: "AlphaSeeker",
      handle: "@0x22...4D8E",
    },
  ];

  // Split testimonials untuk row yang berbeda
  const row1 = testimonials.slice(0, 3);
  const row2 = testimonials.slice(3, 6);

  return (
    <section className="py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <motion.div 
          className="mb-20"
          {...fadeInUp}
        >
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
            Testimonials
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight text-foreground mt-4 max-w-2xl">
            Trusted by DeFi natives
          </h2>
        </motion.div>

        {/* Marquee Container - Terbatas dalam max-w-7xl */}
        <div className="space-y-6">
          {/* Marquee Row 1 - Left Direction */}
          <Marquee direction="left" speed={40} pauseOnHover>
            {row1.map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
            <StatsCard />
            {row1.map((t, i) => (
              <TestimonialCard key={`dup-${i}`} {...t} />
            ))}
          </Marquee>

          {/* Marquee Row 2 - Right Direction */}
          <Marquee direction="right" speed={35} pauseOnHover>
            {row2.map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
            <RatingCard />
            {row2.map((t, i) => (
              <TestimonialCard key={`dup-${i}`} {...t} />
            ))}
          </Marquee>
        </div>

        {/* Bottom Stats Bar */}
        <motion.div 
          className="mt-20 pt-8 border-t border-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex flex-wrap justify-center gap-12 text-center">
            <div>
              <div className="text-2xl font-light text-foreground tracking-tight">2,400+</div>
              <div className="text-xs text-muted-foreground uppercase tracking-[0.2em] mt-1">Active Farmers</div>
            </div>
            <div>
              <div className="text-2xl font-light text-foreground tracking-tight">$420M+</div>
              <div className="text-xs text-muted-foreground uppercase tracking-[0.2em] mt-1">Value Protected</div>
            </div>
            <div>
              <div className="text-2xl font-light text-foreground tracking-tight">99.9%</div>
              <div className="text-xs text-muted-foreground uppercase tracking-[0.2em] mt-1">Uptime</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
