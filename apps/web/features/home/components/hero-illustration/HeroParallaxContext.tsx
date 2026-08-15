"use client";

import { createContext, useContext } from "react";
import type { MotionValue } from "motion/react";

interface HeroParallaxContextValue {
  // Normalized pointer position relative to the illustration's center,
  // roughly -0.5..0.5 on each axis.
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

const HeroParallaxContext = createContext<HeroParallaxContextValue | null>(null);

export function HeroParallaxProvider({
  value,
  children,
}: {
  value: HeroParallaxContextValue;
  children: React.ReactNode;
}) {
  return (
    <HeroParallaxContext.Provider value={value}>
      {children}
    </HeroParallaxContext.Provider>
  );
}

export function useHeroParallax() {
  const ctx = useContext(HeroParallaxContext);
  if (!ctx) {
    throw new Error("useHeroParallax must be used within <HeroIllustration>");
  }
  return ctx;
}
