"use client";

import { Reveal } from "@/components/animations/Reveal";

const brands = [
  { name: "Jordan", line: "Air Jordan 1 / 3 / 4 / 6 / 11 / 12 retros", count: "120+ pairs" },
  { name: "Nike", line: "Air Force 1, Dunks, Cortez, Air Max, SB", count: "180+ pairs" },
  { name: "Adidas", line: "Yeezy, Stan Smith, Samba, Forum, Campus", count: "90+ pairs" },
  { name: "New Balance", line: "550, 990 v3 / v4 / v5, 327, 9060", count: "40+ pairs" },
  { name: "Puma", line: "Suede, Speedcat, Palermo, Mostro", count: "30+ pairs" },
  { name: "Asics", line: "Gel-1130, Gel-Kayano, Gel-NYC, Gel-Lyte III", count: "25+ pairs" },
];

export function Brands() {
  return (
    <section id="brands" className="container-x py-[clamp(80px,12vw,160px)] streak-bg">
      <div className="max-page">
        <div className="mb-14">
          <Reveal><div className="eyebrow mb-4">02 / brands on the shelf</div></Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-[clamp(40px,6vw,84px)] leading-[0.96] text-ink max-w-[1100px]">
              Six brands. <span className="text-crimson">Five hundred pairs.</span> All authentic.
            </h2>
          </Reveal>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-y border-line gap-px bg-line list-none">
          {brands.map((b, i) => (
            <Reveal key={b.name} delay={(i % 3) * 0.05}>
              <li className="bg-bg p-10 h-full transition-colors duration-500 hover:bg-bg-2 group">
                <div className="font-mono text-[11px] tracking-[0.32em] uppercase text-crimson mb-3">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="font-display text-[36px] leading-none text-ink mb-3 group-hover:text-crimson transition-colors">{b.name}</h3>
                <p className="text-ink-2 text-[14.5px] leading-relaxed mb-5 font-light">{b.line}</p>
                <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink-3 border-t border-line pt-4">{b.count}</div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
