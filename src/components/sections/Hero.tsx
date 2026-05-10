"use client";

import { motion } from "motion/react";
import dynamic from "next/dynamic";

const ShoeShowcase = dynamic(
  () => import("@/components/three/ShoeShowcase").then((m) => m.ShoeShowcase),
  { ssr: false }
);

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden hero-glow"
    >
      {/* The shoe canvas fills the entire section — it's the centerpiece */}
      <div className="absolute inset-0 z-0">
        <ShoeShowcase />
      </div>

      {/* Eyebrow tag — top center */}
      <motion.div
        className="absolute top-28 left-1/2 -translate-x-1/2 eyebrow z-20 pointer-events-none"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="pulse-dot" />
        38.5K on the gram · daily drops since 2018
      </motion.div>

      {/* Floating UI badges — desktop only */}
      <motion.div
        className="hidden lg:flex absolute top-[28%] left-[6%] xl:left-[10%] flex-col gap-1 bg-bg-2/85 backdrop-blur-md border border-line rounded-md px-4 py-3 z-20 pointer-events-none"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 1.0 }}
      >
        <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-crimson">verified by</span>
        <span className="font-display text-[15px] text-ink leading-tight">Video Call</span>
      </motion.div>

      <motion.div
        className="hidden lg:flex absolute top-[28%] right-[6%] xl:right-[10%] flex-col gap-1 bg-bg-2/85 backdrop-blur-md border border-line rounded-md px-4 py-3 z-20 pointer-events-none"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 1.15 }}
      >
        <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-crimson">delivered to</span>
        <span className="font-display text-[15px] text-ink leading-tight">24 states</span>
      </motion.div>

      <motion.div
        className="hidden lg:flex absolute bottom-[28%] left-[6%] xl:left-[10%] flex-col gap-1 bg-bg-2/85 backdrop-blur-md border border-line rounded-md px-4 py-3 z-20 pointer-events-none"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 1.3 }}
      >
        <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-crimson">38.5K on</span>
        <span className="font-display text-[15px] text-ink leading-tight">Instagram</span>
      </motion.div>

      <motion.div
        className="hidden lg:flex absolute bottom-[28%] right-[6%] xl:right-[10%] flex-col gap-1 bg-bg-2/85 backdrop-blur-md border border-line rounded-md px-4 py-3 z-20 pointer-events-none"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 1.45 }}
      >
        <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-crimson">orders since</span>
        <span className="font-display text-[15px] text-ink leading-tight">2018</span>
      </motion.div>

      {/* Sub-headline + CTAs at the bottom */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center text-center max-w-[640px] container-x z-20"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1.0 }}
      >
        <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.32em] uppercase text-ink-3 mb-3">
          The complete authentication journey
        </p>
        <h1 className="font-display text-ink leading-[0.96] text-[clamp(22px,3.4vw,42px)] mb-6">
          Authentic kicks. <span className="text-crimson">Verified by video call.</span>
        </h1>

        <div className="flex gap-3 flex-wrap justify-center">
          <a
            href="https://wa.me/918375808771"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded bg-crimson !text-white font-mono text-[11px] sm:text-[12px] tracking-[0.22em] uppercase hover:bg-crimson-2 hover:-translate-y-0.5 transition-all"
          >
            Order on WhatsApp
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#drops"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded border border-line-2 text-ink hover:border-crimson hover:bg-bg-2 font-mono text-[11px] sm:text-[12px] tracking-[0.22em] uppercase transition-colors"
          >
            See today&rsquo;s drop
          </a>
        </div>
      </motion.div>
    </section>
  );
}
