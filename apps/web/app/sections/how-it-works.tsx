"use client";

import { motion } from "framer-motion";
import { Wallet, Users, Copy, TrendingUp, ArrowRight } from "lucide-react";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
};

// ============================================
// Arrow Connector
// ============================================
function ArrowConnector({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div 
      className="hidden lg:flex items-center justify-center w-12 flex-shrink-0"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
    >
      <div className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center">
        <ArrowRight className="w-4 h-4 text-muted-foreground" />
      </div>
    </motion.div>
  );
}

// ============================================
// Step Card Component
// ============================================
interface StepCardProps {
  stepNumber: string;
  stepLabel: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  tagline: string;
  delay: number;
  visualType?: "wallet" | "users" | "copy" | "chart";
}

function StepCard({ stepNumber, stepLabel, title, description, icon, tagline, delay }: StepCardProps) {
  return (
    <motion.div
      className="flex-1 min-w-[240px]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.div
        className="relative h-full rounded-2xl p-6 flex flex-col bg-muted border border-border hover:border-foreground/20 transition-colors"
        whileHover={{
          y: -4,
          boxShadow: "0 20px 40px -15px hsl(var(--foreground) / 0.1)",
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Step Label */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
            {stepLabel}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-normal text-foreground mb-6 tracking-tight">
          {title}
        </h3>

        {/* Visual/Icon Area - Minimalist Style */}
        <div className="flex-1 flex items-center justify-center py-6 min-h-[120px] bg-background rounded-xl border border-border mb-6">
          <motion.div
            className="relative w-20 h-20 rounded-xl flex items-center justify-center text-foreground bg-muted"
            whileHover={{
              scale: 1.05,
            }}
          >
            {icon}
          </motion.div>
        </div>

        {/* Tagline */}
        <div className="mt-auto">
          <span className="text-xs text-muted-foreground font-medium">
            {tagline}
          </span>
        </div>

        {/* Step Number Watermark */}
        <div className="absolute top-4 right-4 text-4xl font-light text-muted pointer-events-none select-none">
          {stepNumber}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============================================
// Main Component
// ============================================
export function HowItWorksSection() {
  const steps = [
    {
      stepNumber: "01",
      stepLabel: "Step One",
      title: "Create Account",
      description: "Link your Web3 wallet to access the platform securely.",
      icon: <Wallet className="w-8 h-8" />,
      tagline: "Easy Debut",
    },
    {
      stepNumber: "02",
      stepLabel: "Step Two",
      title: "Choose Investments",
      description: "Browse verified opportunities with transparent metrics.",
      icon: <Users className="w-8 h-8" />,
      tagline: "Super Fast!",
    },
    {
      stepNumber: "03",
      stepLabel: "Step Three",
      title: "Invest & Earn",
      description: "Mirror successful strategies with one-click execution.",
      icon: <Copy className="w-8 h-8" />,
      tagline: "Smart Automation",
    },
    {
      stepNumber: "04",
      stepLabel: "Step Four",
      title: "Withdraw Anytime",
      description: "Track real-time yields and withdraw with full control.",
      icon: <TrendingUp className="w-8 h-8" />,
      tagline: "Easy Process!",
    },
  ];

  return (
    <section className="py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <motion.div 
          className="mb-20"
          {...fadeInUp}
        >
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
            How It Works
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight text-foreground mt-4 max-w-2xl">
            Start in four steps and grow with secured investments
          </h2>
        </motion.div>

        {/* Steps Grid */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 items-stretch">
          {steps.map((step, index) => (
            <div key={step.stepNumber} className="contents">
              <StepCard
                stepNumber={step.stepNumber}
                stepLabel={step.stepLabel}
                title={step.title}
                description={step.description}
                icon={step.icon}
                tagline={step.tagline}
                delay={index * 0.1}
              />
              {index < steps.length - 1 && (
                <ArrowConnector delay={index * 0.1 + 0.2} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
