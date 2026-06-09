"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Helper for the 8 directions
const directions = [
  { x: 0, y: -1 },    // N
  { x: 0.707, y: -0.707 }, // NE
  { x: 1, y: 0 },     // E
  { x: 0.707, y: 0.707 }, // SE
  { x: 0, y: 1 },     // S
  { x: -0.707, y: 0.707 }, // SW
  { x: -1, y: 0 },    // W
  { x: -0.707, y: -0.707 } // NW
];

const items = [
  { type: "bee", emoji: "🐝" },
  { type: "money", emoji: "💵" },
  { type: "coin", emoji: "🪙" },
  { type: "bee", emoji: "🐝" },
  { type: "coin", emoji: "🪙" },
  { type: "bee", emoji: "🐝" },
  { type: "money", emoji: "💶" },
  { type: "coin", emoji: "🪙" },
];

export function HeroStarburst() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative w-full max-w-5xl mx-auto min-h-[70vh] flex flex-col items-center justify-center py-32 overflow-visible">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-bee-green/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/4 -translate-y-1/4 w-[400px] h-[400px] bg-honey-yellow/10 rounded-full blur-[80px] pointer-events-none" />
      
      {/* Starburst Elements */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
        {directions.map((dir, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
            animate={{ 
              x: dir.x * 350, 
              y: dir.y * 350, 
              opacity: [0, 1, 0.8],
              scale: 1,
            }}
            transition={{
              duration: 2,
              delay: 0.2 + i * 0.1,
              ease: "easeOut"
            }}
          >
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.2,
                ease: "easeInOut"
              }}
              className="text-5xl md:text-7xl drop-shadow-2xl"
              style={{ filter: 'drop-shadow(0px 15px 25px rgba(0,0,0,0.15))' }}
            >
              {items[i].emoji}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Main Headline */}
      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center flex flex-col items-center"
      >
        <h1 className="font-jakarta font-extrabold text-6xl md:text-8xl tracking-tight leading-tight">
          <span className="text-deep-ocean block mb-2 drop-shadow-sm">Split Smarter.</span>
          <span className="bg-gradient-to-br from-bee-green to-emerald-400 bg-clip-text text-transparent block drop-shadow-sm pb-4">
            Settle Faster.
          </span>
        </h1>
      </motion.div>
    </div>
  );
}
