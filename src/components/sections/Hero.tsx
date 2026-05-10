"use client";

import { motion } from "motion/react";
import dynamic from "next/dynamic";

// 3D shoe is a heavy client-only canvas; lazy-load to keep first paint fast
const ShoeShowcase = dynamic(
  () => import("@/components/three/ShoeShowcase").then((m) => m.ShoeShowcase),
  { ssr: false }
);

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex flex-col items-center justify-center container-x pt-24 pb-12 overflow-hidden hero-glow"
    >
      <motion.div
        className="eyebrow mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="pulse-dot" />
        38.5K on the gram · daily drops since 2018
      </motion.div>

      {/* The shoe — the centerpiece */}
      <motion.div
        className="relative w-full max-w-[1100px]"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        <ShoeShowcase />

        {/* Floating UI badges — hide on small screens */}
        <motion.div
          className="hidden lg:flex absolute top-[18%] -left-2 xl:left-4 flex-col gap-1 bg-bg-2/85 backdrop-blur-md border border-line rounded-md px-4 py-3 z-20"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 1.2 }}
        >
          <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-crimson">verified by</span>
          <span className="font-display text-[15px] text-ink leading-tight">Video Call</span>
        </motion.div>

        <motion.div
          className="hidden lg:flex absolute top-[12%] -right-2 xl:right-6 flex-col gap-1 bg-bg-2/85 backdrop-blur-md border border-line rounded-md px-4 py-3 z-20"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 1.35 }}
        >
          <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-crimson">delivered to</span>
          <span className="font-display text-[15px] text-ink leading-tight">24 states</span>
        </motion.div>

        <motion.div
          className="hidden lg:flex absolute bottom-[24%] -right-4 xl:right-2 flex-col gap-1 bg-bg-2/85 backdrop-blur-md border border-line rounded-md px-4 py-3 z-20"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 1.5 }}
        >
          <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-crimson">38.5K on</span>
          <span className="font-display text-[15px] text-ink leading-tight">Instagram</span>
        </motion.div>
      </motion.div>

      {/* Sub-headline + CTAs sit BELOW the shoe */}
      <motion.div
        className="mt-10 flex flex-col items-center text-center max-w-[640px]"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1.0 }}
      >
        <p className="font-mono text-[11px] tracking-[0.32em] uppercase text-ink-3 mb-4">
          The complete authentication journey
        </p>
        <h1 className="font-display text-ink leading-[0.96] text-[clamp(28px,4vw,52px)]">
          Authentic kicks. <span className="text-crimson">Verified by video call.</span>
        </h1>

        <div className="mt-7 flex gap-3 flex-wrap justify-center">
          <a
            href="https://wa.me/918375808771"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2.5 px-7 py-4 rounded bg-crimson !text-white font-mono text-[12px] tracking-[0.22em] uppercase hover:bg-crimson-2 hover:-translate-y-0.5 transition-all"
          >
            Order on WhatsApp
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#drops"
            className="inline-flex items-center gap-2.5 px-7 py-4 rounded border border-line-2 text-ink hover:border-crimson hover:bg-bg-2 font-mono text-[12px] tracking-[0.22em] uppercase transition-colors"
          >
            See today&rsquo;s drop
          </a>
        </div>
      </motion.div>
    </section>
  );
}
