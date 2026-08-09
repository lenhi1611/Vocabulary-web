"use client";

import { ComponentProps } from "react";
import { motion } from "motion/react";

import { revealVariants, RevealVariant } from "./reveal-variants";

type RevealProps = Omit<
  ComponentProps<typeof motion.div>,
  "variants" | "initial" | "whileInView" | "viewport"
> & {
  variant?: RevealVariant;
  delay?: number;
};

export function Reveal({
  variant = "fade-up",
  delay = 0,
  transition,
  ...props
}: RevealProps) {
  return (
    <motion.div
      variants={revealVariants[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
        ...transition,
      }}
      {...props}
    />
  );
}
