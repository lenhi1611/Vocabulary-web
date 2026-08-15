"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

import { HeroParallaxProvider } from "./HeroParallaxContext";
import { WordCard } from "./WordCard";
import { BoyIllustration } from "./BoyIllustration";
import { HERO_WORD_CARDS } from "./cards-data";

// All card offsets in cards-data.ts were hand-placed against this
// reference stage size. Everything below scales as one unit to match
// however small the container actually renders (phones included),
// instead of the cards' fixed pixel offsets overflowing a narrow screen.
const STAGE_SIZE = 420;

export function HeroIllustration() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mouseX = useSpring(rawX, { stiffness: 60, damping: 20, mass: 0.6 });
  const mouseY = useSpring(rawY, { stiffness: 60, damping: 20, mass: 0.6 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setScale(Math.min(entry.contentRect.width / STAGE_SIZE, 1));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative mx-auto aspect-square w-full max-w-[420px] select-none"
    >
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: STAGE_SIZE,
          height: STAGE_SIZE,
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      >
        <HeroParallaxProvider value={{ mouseX, mouseY }}>
          {/* Soft pulsing light behind the boy */}
          <motion.div
            aria-hidden
            className="absolute left-1/2 top-1/2 z-0 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-3xl"
            animate={{ scale: [1, 1.03, 1], opacity: [0.5, 0.75, 0.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          {HERO_WORD_CARDS.map((card) => (
            <WordCard key={card.id} {...card} />
          ))}

          <BoyIllustration />
        </HeroParallaxProvider>
      </div>
    </div>
  );
}
