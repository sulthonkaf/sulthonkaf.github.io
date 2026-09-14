"use client";

import { m, useReducedMotion } from "motion/react";
import type { HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  as?: "div" | "article" | "aside" | "li";
  children: ReactNode;
  className?: string;
  delay?: number;
} & Omit<HTMLMotionProps<"div">, "children" | "className">;

export function Reveal({
  as,
  children,
  className,
  delay = 0,
  ...props
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const motionProps = {
    className: `reveal${className ? ` ${className}` : ""}`,
    initial: false as const,
    whileInView: reduceMotion ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12, margin: "0px 0px -48px" },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    ...props,
  };

  if (as === "article") return <m.article {...(motionProps as HTMLMotionProps<"article">)}>{children}</m.article>;
  if (as === "aside") return <m.aside {...(motionProps as HTMLMotionProps<"aside">)}>{children}</m.aside>;
  if (as === "li") return <m.li {...(motionProps as HTMLMotionProps<"li">)}>{children}</m.li>;
  return <m.div {...motionProps}>{children}</m.div>;
}
