"use client";

import { Reveal } from "@/components/animations/Reveal";

const steps = [
  {
    num: "01",
    title: "Pick a pair",
    body: "Browse today's rack on Instagram or scroll the drops section above. Note the brand, model, colourway and your UK size.",
  },
  {
    num: "02",
    title: "WhatsApp the order",
    body: "Message +91 83758 08771 with the model + your size + delivery PIN. Himanshu replies within thirty minutes during the day.",
  },
  {
    num: "03",
    title: "Video-call confirmation",
    body: "Before he ships, Himanshu video-calls you and shows the actual pair, the size sticker and the box. You see exactly what's getting packed.",
  },
  {
    num: "04",
    title: "₹100 advance for COD",
    body: "Pay ₹100 advance via UPI to lock the order. Pay the rest cash on delivery anywhere in India. International buyers pay full upfront.",
  },
  {
    num: "05",
    title: "Ships next day",
    body: "Packed by Himanshu in original box, double-bubble-wrapped, dispatched via DTDC / Bluedart. Tracking shared on WhatsApp before pick-up.",
  },
  {
    num: "06",
    title: "7-day exchange",
    body: "Wrong size? Open-and-return within seven days for size exchange. Pair-not-as-shown? Full refund — but the video-call step prevents that.",
  },
];

export function HowToOrder() {
  return (
    <section id="how" className="container-x py-[clamp(80px,12vw,160px)]">
      <div className="max-page">
        <div className="mb-14">
          <Reveal><div className="eyebrow mb-4">03 / how to order</div></Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-[clamp(40px,6vw,84px)] leading-[0.96] text-ink max-w-[1100px]">
              Six steps. <span className="text-crimson">No fakes possible.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 text-ink-2 text-[17px] max-w-[640px] font-light">
              The video-call step is what makes Shoe Hub 83 different from every other Insta-reseller. You see the actual pair before it leaves Delhi.
            </p>
          </Reveal>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line border-y border-line list-none">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.06}>
              <li className="bg-bg p-10 h-full transition-colors duration-500 hover:bg-bg-2">
                <div className="font-mono text-[12px] tracking-[0.32em] uppercase text-crimson mb-5">{s.num}</div>
                <h3 className="font-display text-[26px] leading-tight text-ink mb-4">{s.title}</h3>
                <p className="text-ink-2 text-[15px] leading-relaxed font-light">{s.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.2}>
          <div className="mt-14">
            <a
              href="https://wa.me/918375808771"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded bg-crimson !text-white font-mono text-[12px] tracking-[0.22em] uppercase hover:bg-crimson-2 hover:-translate-y-0.5 transition-all"
            >
              Start the video call now
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
