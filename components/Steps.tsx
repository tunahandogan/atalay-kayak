"use client";

import { motion, useReducedMotion } from "motion/react";
import { steps } from "@/content/business";

export function Steps() {
  const reduce = useReducedMotion();
  return (
    <ol className="relative grid gap-8 md:grid-cols-3 md:gap-6">
      <svg
        aria-hidden
        className="pointer-events-none absolute left-0 top-3 hidden h-8 w-full md:block"
        viewBox="0 0 900 32"
        preserveAspectRatio="none"
        fill="none"
      >
        <motion.path
          d="M0 16 C 75 0, 150 32, 225 16 S 375 0, 450 16 S 600 32, 675 16 S 825 0, 900 16"
          stroke="#d3dde8"
          strokeWidth="2"
          strokeDasharray="6 8"
          vectorEffect="non-scaling-stroke"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
      </svg>
      {steps.map((s, i) => (
        <motion.li
          key={s.title}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.18, ease: "easeOut" }}
          className="relative"
        >
          <span
            aria-hidden
            className="relative grid size-14 place-items-center rounded-full bg-flag font-display text-xl font-extrabold text-white ring-8 ring-glacier"
          >
            {i + 1}
          </span>
          <h3 className="mt-4 font-display text-xl font-extrabold leading-tight text-ink">
            <span className="sr-only">Adım {i + 1}: </span>
            {s.title}
          </h3>
          <p className="mt-2 max-w-[38ch] text-muted">{s.text}</p>
        </motion.li>
      ))}
    </ol>
  );
}
