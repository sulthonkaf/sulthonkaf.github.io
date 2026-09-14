"use client";

import { m, useReducedMotion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, { stiffness: 170, damping: 34, mass: 0.22 });

  return (
    <m.div
      aria-hidden="true"
      className="scroll-progress"
      style={{ scaleX: reduceMotion ? scrollYProgress : scaleX }}
    />
  );
}
