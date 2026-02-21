"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface RippleProps {
  className?: string;
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
}

export const Ripple = ({
  className,
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 8,
}: RippleProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center overflow-hidden",
        className
      )}
    >
      {Array.from({ length: numCircles }).map((_, i) => {
        const size = mainCircleSize + i * 70;
        const opacity = mainCircleOpacity - i * 0.03;
        const animationDelay = i * 0.06;
        const borderStyle = i === numCircles - 1 ? "dashed" : "solid";
        const borderOpacity = 0.1 + i * 0.03;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full border"
            style={{
              width: size,
              height: size,
              borderStyle: borderStyle,
              borderWidth: 1,
              borderColor: `rgba(255, 255, 255, ${borderOpacity})`,
              opacity: opacity,
            }}
            initial={{
              scale: 0.8,
              opacity: 0,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [opacity, opacity * 0.8, opacity],
            }}
            transition={{
              duration: 4,
              delay: animationDelay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
};
