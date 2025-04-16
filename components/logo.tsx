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
      small: { outer: 40, inner: 36, font: 14 },
      medium: { outer: 52, inner: 47, font: 18 },
      large: { outer: 72, inner: 65, font: 26 },
    }),
    []
  );

  const { outer, inner, font } = sizes[size];

  const glowAnimation = {
    scale: [1, 1.05, 1],
    opacity: [0.4, 0.6, 0.4],
  };

  const shineAnimation = {
    x: ["-200%", "200%"],
  };

  const pulseAnimation = {
    scale: [1, 1.02, 1],
    opacity: [0.9, 1, 0.9],
  };

  return (
    <div
      className="relative"
      style={{
        width: outer,
        height: outer,
      }}
    >
      {/* Premium animated border with dynamic gradient */}
      <div className="absolute inset-0">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="borderGradient" gradientTransform="rotate(90)">
              <stop offset="0%" stopColor="#E31837">
                <animate
                  attributeName="stop-color"
                  values="#E31837; #FFD700; #E31837"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="50%" stopColor="#FFD700">
                <animate
                  attributeName="stop-color"
                  values="#FFD700; #E31837; #FFD700"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor="#E31837">
                <animate
                  attributeName="stop-color"
                  values="#E31837; #FFD700; #E31837"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="premium-shadow">
              <feDropShadow
                dx="0"
                dy="0"
                stdDeviation="3"
                floodColor="#E31837"
                floodOpacity="0.5"
              />
            </filter>
          </defs>
          <path
            d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z"
            fill="none"
            stroke="url(#borderGradient)"
            strokeWidth="2.5"
            filter="url(#glow)"
          >
            <animate
              attributeName="stroke-dasharray"
              values="0,1000;1000,0"
              dur="3s"
              repeatCount="1"
            />
          </path>
        </svg>
      </div>

      {/* Inner hexagon with luxury gradient */}
      <div
        className="absolute"
        style={{
          top: (outer - inner) / 2,
          left: (outer - inner) / 2,
          width: inner,
          height: inner,
          clipPath:
            "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
          background: `
            linear-gradient(135deg,
              rgba(20, 30, 48, 0.95),
              rgba(227, 24, 55, 0.15)
            )
          `,
          boxShadow: `
            0 0 20px rgba(227, 24, 55, 0.3),
            0 0 40px rgba(255, 215, 0, 0.2),
            inset 0 0 20px rgba(255, 255, 255, 0.1)
          `,
        }}
      >
        {/* Premium glow effect */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(227, 24, 55, 0.2), transparent 70%)",
            filter: "blur(10px)",
          }}
          animate={glowAnimation}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Enhanced shine effects */}
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                90deg,
                transparent,
                rgba(255, 255, 255, ${0.15 - index * 0.03}),
                transparent
              )`,
              clipPath: "polygon(0 0, 30% 0, 55% 100%, 0% 100%)",
            }}
            initial={{ x: "-200%" }}
            animate={shineAnimation}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 5,
              delay: index * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Premium GM text */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={pulseAnimation}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span
            style={{
              fontSize: font,
              fontWeight: 800,
              fontFamily: "'Orbitron', 'Bebas Neue', 'Oswald', sans-serif",
              letterSpacing: 1.5,
              background: `linear-gradient(
                90deg,
                #FFD700,
                #E31837,
                #FFD700
              )`,
              backgroundSize: "300% 100%",
              animation: "gradientText 6s ease-in-out infinite",
              color: "transparent",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              textShadow: `
                0 2px 4px rgba(0,0,0,0.8),
                0 0 6px rgba(227, 24, 55, 0.4),
                0 0 12px rgba(255, 215, 0, 0.3)
              `,
            }}
          >
            GM
          </span>
        </motion.div>
      </div>

      {/* Premium outer glow */}
      <div
        className="absolute inset-0"
        style={{
          filter: "blur(20px)",
          background: `
            radial-gradient(
              circle at 50% 50%,
              rgba(227, 24, 55, 0.2),
              rgba(255, 215, 0, 0.1),
              transparent 70%
            )
          `,
          animation: "pulse 4s ease-in-out infinite",
        }}
      />

      <style jsx>{`
        @keyframes gradientText {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        @keyframes pulse {
          0% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  );
}
