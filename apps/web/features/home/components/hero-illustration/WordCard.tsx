"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";

import { useHeroParallax } from "./HeroParallaxContext";
import type { CardColor, WordCardData } from "./cards-data";

const COLOR_CLASSES: Record<CardColor, string> = {
  "chart-1": "bg-chart-1 text-primary-foreground",
  "chart-2": "bg-chart-2 text-accent-foreground",
  "chart-3": "bg-chart-3 text-primary-foreground",
  "chart-4": "bg-chart-4 text-primary-foreground",
  "chart-5": "bg-chart-5 text-accent-foreground",
};

const GLOW_CLASSES: Record<CardColor, string> = {
  "chart-1": "bg-chart-1",
  "chart-2": "bg-chart-2",
  "chart-3": "bg-chart-3",
  "chart-4": "bg-chart-4",
  "chart-5": "bg-chart-5",
};

// Card starts hidden, collapsed at the boy's center (z-index below him),
// then springs out to its resting spot and settles into a gentle float.
const flightVariants: Variants = {
  hidden: { x: 0, y: 0, opacity: 0, scale: 0.6, rotate: 0 },
  visible: (d: WordCardData) => ({
    x: d.finalX,
    y: d.finalY,
    opacity: 1,
    scale: 1,
    rotate: d.rotation,
    transition: {
      type: "spring",
      stiffness: 240,
      damping: 16,
      mass: 0.8,
      delay: d.delay,
    },
  }),
  floating: (d: WordCardData) => ({
    x: d.finalX,
    y: [d.finalY, d.finalY - (7 + d.depth * 3), d.finalY],
    rotate: [d.rotation - 2, d.rotation + 2, d.rotation - 2],
    opacity: 1,
    scale: 1,
    transition: {
      y: { duration: 3.2 + d.depth, repeat: Infinity, ease: "easeInOut" },
      rotate: { duration: 4.4 + d.depth, repeat: Infinity, ease: "easeInOut" },
    },
  }),
};

export function WordCard(data: WordCardData) {
  const { text, color, depth } = data;
  const [phase, setPhase] = useState<"visible" | "floating">("visible");
  const { mouseX, mouseY } = useHeroParallax();

  // Hover: tilt toward the cursor + a small lift.
  const tilt = useMotionValue(0);
  const lift = useMotionValue(0);
  const springTilt = useSpring(tilt, { stiffness: 260, damping: 20 });
  const springLift = useSpring(lift, { stiffness: 260, damping: 20 });

  // Occasional playful wiggle, independent per card.
  const wiggle = useMotionValue(0);

  const parallaxX = useTransform(mouseX, (v) => v * 26 * depth);
  const parallaxY = useTransform(mouseY, (v) => v * 26 * depth);

  const x = useTransform([parallaxX, wiggle], ([px, w]) => (px as number) + (w as number) * 3);
  const y = useTransform(
    [parallaxY, springLift, wiggle],
    ([py, l, w]) => (py as number) + (l as number) + (w as number) * -5,
  );
  const rotate = useTransform([springTilt, wiggle], ([t, w]) => (t as number) + (w as number) * 6);

  const wiggleTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    function scheduleWiggle() {
      const delayMs = 4000 + Math.random() * 4000;
      wiggleTimer.current = setTimeout(() => {
        animate(wiggle, [0, 1, -0.6, 0], { duration: 0.7, ease: "easeInOut" });
        scheduleWiggle();
      }, delayMs);
    }
    scheduleWiggle();
    return () => clearTimeout(wiggleTimer.current);
  }, [wiggle]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    tilt.set(relX * 18);
  }

  function handleHoverEnd() {
    tilt.set(0);
    lift.set(0);
  }

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 z-10 -ml-14 -mt-8 w-28"
      custom={data}
      initial="hidden"
      animate={phase}
      variants={flightVariants}
      onAnimationComplete={(definition) => {
        if (definition === "visible") setPhase("floating");
      }}
    >
      {/* Glow trail: blooms as the card flies out, fades once it settles */}
      <motion.div
        aria-hidden
        className={`absolute inset-0 -z-10 rounded-full opacity-40 blur-xl ${GLOW_CLASSES[color]}`}
        initial={{ opacity: 0, scale: 0.4 }}
        animate={
          phase === "visible"
            ? { opacity: 0.45, scale: 1.5 }
            : { opacity: 0, scale: 1.8 }
        }
        transition={{ duration: 0.55, delay: data.delay + 0.05 }}
      />

      <motion.div
        onMouseMove={handleMouseMove}
        onHoverEnd={handleHoverEnd}
        whileHover={{ scale: 1.12 }}
        style={{ x, y, rotate }}
        className={`flex h-14 w-28 cursor-default items-center justify-center rounded-2xl text-sm font-semibold tracking-wide shadow-md transition-shadow duration-200 hover:shadow-2xl ${COLOR_CLASSES[color]}`}
      >
        {text}
      </motion.div>
    </motion.div>
  );
}
