"use client";

import { motion } from "motion/react";
import dynamic from "next/dynamic";
import { Counter } from "@/components/animations/Counter";

// 3D shoe is a heavy client-only canvas; lazy-load to keep first paint fast
const ShoeShowcase = dynamic(
  () => import("@/components/three/ShoeShowcase").then((m) => m.ShoeShowcase),
  { ssr: false }
);

export function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] flex items-center container-x pt-28 pb-16 overflow-hidden hero-glow">
      <div className="max-page relative z-10 w-full grid gap-12 lg:grid-cols-[0.9fr_1.1fr] items-center">
        <div>
          <motion.div
            className="eyebrow mb-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="pulse-dot" />
            38.5K on the gram · daily drops since 2018
          </motion.div>

          <h1 className="font-display text-ink leading-[0.86] text-[clamp(48px,8.5vw,130px)]">
            {[
              ["Real ", "kicks."],
              ["Real ", "video."],
              ["No ", "fakes."],
            ].map((line, li) => (
              <span key={li} className="block overflow-hidden">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 + li * 0.1 }}
                >
                  {line.map((seg, si) =>
                    si === 1 ? <span key={si} className="text-crimson">{seg}</span> : <span key={si}>{seg}</span>
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-9 max-w-[540px] text-ink-2 text-[18px] leading-[1.6]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
          >
            Himanshu hand-picks every pair from his Delhi warehouse, films a video-call confirmation before he ships, and posts the day&rsquo;s drop to 38,500 sneakerheads on Instagram. Cash on delivery in India, secure shipping worldwide.
          </motion.p>

          <motion.div
            className="mt-10 flex gap-3.5 flex-wrap"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.85 }}
          >
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
          </motion.div>

          <motion.div
            className="mt-14 grid grid-cols-3 gap-6 max-w-[600px] border-t border-line pt-7"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1.0 }}
          >
            {[
              { n: 38500, l: "followers" },
              { n: 313, l: "drops posted" },
              { n: 24, l: "states shipped" },
            ].map((m) => (
              <div key={m.l} className="flex flex-col gap-1.5">
                <Counter to={m.n} className="font-display text-[clamp(28px,3.4vw,46px)] text-ink leading-none" />
                <span className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink-3">{m.l}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        >
          <ShoeShowcase />
        </motion.div>
      </div>
    </section>
  );
}
