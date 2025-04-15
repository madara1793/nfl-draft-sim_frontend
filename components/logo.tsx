"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

type LogoSize = "small" | "medium" | "large";

interface LogoProps {
  size?: LogoSize;
}

export default function Logo({ size = "large" }: LogoProps) {
  const sizes = useMemo(
    () => ({
      small: { outer: 40, font: 14 },
      medium: { outer: 52, font: 18 },
      large: { outer: 72, font: 26 },
    }),
    []
  );

  const { outer, font } = sizes[size];

  // Extract animations to make them more readable
  const glowAnimation = {
    scale: [1, 1.1, 1],
    opacity: [0.4, 0.6, 0.4],
  };

  const shineAnimation = {
    x: ["-100%", "100%"],
  };

  const textAnimation = {
    backgroundPosition: ["0% center", "100% center"],
    scale: 1.02,
  };

  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: outer,
        height: outer,
        clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
        background: "linear-gradient(135deg, #E31837, #8B0000)",
        border: "2.5px solid #FFB81C",
        boxShadow: `
          0 0 12px rgba(255, 184, 28, 0.6),
          0 0 8px rgba(227, 24, 55, 0.6),
          inset 0 0 10px rgba(255,255,255,0.08)
        `,
      }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          filter: "blur(6px)",
          background:
            "radial-gradient(circle, rgba(255,184,28,0.4), transparent)",
        }}
        animate={glowAnimation}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Shine pass */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-15"
        initial={{ x: "-100%" }}
        animate={shineAnimation}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
        }}
        style={{
          clipPath: "polygon(0 0, 30% 0, 55% 100%, 0% 100%)",
        }}
      />

      {/* GM text with smooth pulse and gold gradient */}
      <motion.span
        className="bg-clip-text text-transparent"
        style={{
          backgroundImage:
            "linear-gradient(90deg, #FFD700, #FFA500, #FFB81C, #FFD700)",
          backgroundSize: "200% auto",
          fontSize: font,
          fontWeight: 700,
          fontFamily: `'Orbitron', 'Bebas Neue', 'Oswald', sans-serif`,
          letterSpacing: 1.2,
          textShadow: `
            0 1px 2px rgba(0,0,0,0.7),
            0 0 4px rgba(255,184,28,0.4)
          `,
        }}
        animate={textAnimation}
        transition={{
          scale: {
            duration: 2.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          },
          backgroundPosition: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        GM
      </motion.span>
    </div>
  );
}
