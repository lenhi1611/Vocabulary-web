"use client";

import { ComponentProps } from "react";
import { motion } from "motion/react";

import { revealVariants, RevealVariant } from "./reveal-variants";

type StaggerProps = Omit<
  ComponentProps<typeof motion.div>,
  "variants" | "initial" | "whileInView" | "viewport"
> & {
  stagger?: number;
  delayChildren?: number;
};

export function Stagger({
  stagger = 0.1,
  delayChildren = 0,
  ...props
}: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        visible: { transition: { staggerChildren: stagger, delayChildren } },
      }}
      {...props}
    />
  );
}

type StaggerItemProps = Omit<ComponentProps<typeof motion.div>, "variants"> & {
  variant?: RevealVariant;
};

export function StaggerItem({
  variant = "fade-up",
  transition,
  ...props
}: StaggerItemProps) {
  return (
    <motion.div
      variants={revealVariants[variant]}
      transition={{
        duration: 0.5,
        ease: [0.21, 0.47, 0.32, 0.98],
        ...transition,
      }}
      {...props}
    />
  );
}
