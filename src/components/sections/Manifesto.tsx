"use client";

import { motion } from "motion/react";
import { Counter } from "@/components/animations/Counter";

export function Manifesto() {
  return (
    <section className="relative container-x py-[clamp(60px,10vw,140px)] streak-bg">
      <div className="max-page max-w-[1280px] mx-auto">
        <motion.div
          className="eyebrow mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          The shop, in three lines
        </motion.div>

        <h2 className="font-display text-ink leading-[0.92] text-[clamp(56px,11vw,170px)]">
          {[
            ["Real ", "kicks."],
            ["Real ", "video."],
            ["No ", "fakes."],
          ].map((line, li) => (
            <span key={li} className="block overflow-hidden">
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: li * 0.08 }}
              >
                {line.map((seg, si) =>
                  si === 1 ? <span key={si} className="text-crimson">{seg}</span> : <span key={si}>{seg}</span>
                )}
              </motion.span>
            </span>
          ))}
        </h2>

        <motion.p
          className="mt-9 max-w-[640px] text-ink-2 text-[18px] leading-[1.6]"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        >
          Himanshu hand-picks every pair from his Delhi warehouse, films a video-call confirmation before he ships, and posts the day&rsquo;s drop to 38,500 sneakerheads on Instagram. Cash on delivery in India, secure shipping worldwide.
        </motion.p>

        <motion.div
          className="mt-14 grid grid-cols-3 gap-6 max-w-[640px] border-t border-line pt-7"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
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
    </section>
  );
}
