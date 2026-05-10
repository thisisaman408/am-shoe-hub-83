"use client";

import Image from "next/image";
import { Reveal } from "@/components/animations/Reveal";

interface Drop {
  name: string;
  brand: string;
  desc: string;
  price: string;
  size: string;
  img: string;
  badge?: string;
}

// Curated current drops — real product photography from Pexels
const drops: Drop[] = [
  {
    name: "Air Jordan 1 Retro High",
    brand: "Jordan",
    desc: "Bred colourway. Premium leather. Box, dust-bag, original receipt.",
    price: "₹14,500",
    size: "UK 7 – UK 11",
    img: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
    badge: "Today's drop",
  },
  {
    name: "Air Force 1 '07",
    brand: "Nike",
    desc: "Triple white. Crisp leather upper. Most-asked size 9 in stock.",
    price: "₹8,200",
    size: "UK 6 – UK 12",
    img: "https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg",
    badge: "Daily favourite",
  },
  {
    name: "Air Jordan 4 Retro",
    brand: "Jordan",
    desc: "University Blue. OG colourway. Last three pairs left at this price.",
    price: "₹16,800",
    size: "UK 8 – UK 11",
    img: "https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg",
    badge: "Low stock",
  },
  {
    name: "Yeezy Boost 350 V2",
    brand: "Adidas",
    desc: "Zebra. Primeknit upper. SPLY-350 side stripe. Box-fresh.",
    price: "₹13,400",
    size: "UK 7 – UK 11",
    img: "https://images.pexels.com/photos/2300334/pexels-photo-2300334.jpeg",
  },
  {
    name: "Cortez Leather",
    brand: "Nike",
    desc: "White / red. Vintage silhouette. Track-and-field heritage.",
    price: "₹6,800",
    size: "UK 6 – UK 11",
    img: "https://images.pexels.com/photos/1102777/pexels-photo-1102777.jpeg",
  },
  {
    name: "Dunk Low Retro",
    brand: "Nike",
    desc: "Panda. Black-and-white classic. The most-requested daily.",
    price: "₹9,400",
    size: "UK 6 – UK 12",
    img: "https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg",
    badge: "Restock",
  },
  {
    name: "Air Jordan 11 Retro",
    brand: "Jordan",
    desc: "Concord. Patent-leather mudguard. Carbon-fibre shank plate.",
    price: "₹18,200",
    size: "UK 7 – UK 11",
    img: "https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg",
  },
  {
    name: "Stan Smith",
    brand: "Adidas",
    desc: "All-white-with-green-heel original. Court tennis silhouette.",
    price: "₹5,400",
    size: "UK 5 – UK 12",
    img: "https://images.pexels.com/photos/1407354/pexels-photo-1407354.jpeg",
  },
  {
    name: "Air Jordan 6 Retro",
    brand: "Jordan",
    desc: "Infrared. Original 1991 colourway. Lace-locks intact.",
    price: "₹17,600",
    size: "UK 8 – UK 11",
    img: "https://images.pexels.com/photos/1598506/pexels-photo-1598506.jpeg",
    badge: "Today's drop",
  },
];

function DropCard({ d, i }: { d: Drop; i: number }) {
  const waText = encodeURIComponent(`Hi Shoe Hub 83 — interested in the ${d.name} (${d.brand}) at ${d.price}. Available?`);
  return (
    <Reveal delay={(i % 3) * 0.06}>
      <article className="group relative flex flex-col cursor-pointer">
        <div className="relative aspect-[4/5] overflow-hidden rounded bg-bg-2 mb-5 border border-line">
          <Image
            src={d.img}
            alt={d.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          {d.badge && (
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-crimson !text-white text-[10px] font-mono uppercase tracking-[0.2em]">
              {d.badge}
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-bg/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <a
              href={`https://wa.me/918375808771?text=${waText}`}
              target="_blank"
              rel="noopener"
              className="block text-center py-2.5 rounded bg-crimson !text-white font-mono text-[11px] tracking-[0.22em] uppercase hover:bg-crimson-2"
            >
              Order via WhatsApp →
            </a>
          </div>
        </div>
        <div className="flex items-baseline justify-between gap-3 mb-1">
          <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-crimson">{d.brand}</span>
          <span className="font-display text-[20px] text-ink leading-none">{d.price}</span>
        </div>
        <h3 className="font-display text-[22px] text-ink leading-tight mb-2">{d.name}</h3>
        <p className="text-ink-2 text-[14px] leading-relaxed mb-3">{d.desc}</p>
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-3 border-t border-line pt-3">{d.size}</div>
      </article>
    </Reveal>
  );
}

export function Drops() {
  return (
    <section id="drops" className="container-x py-[clamp(80px,12vw,160px)]">
      <div className="max-page">
        <div className="flex flex-wrap items-end gap-6 justify-between mb-14 max-w-[1200px]">
          <div>
            <Reveal><div className="eyebrow mb-4">01 / today on the rack</div></Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display text-[clamp(40px,6vw,84px)] leading-[0.96] text-ink">
                Today&rsquo;s <span className="text-crimson">drops.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <p className="text-ink-2 text-[16px] max-w-[420px] font-light leading-relaxed">
              The rack rotates every morning. WhatsApp Himanshu for size and ship-by date — most messages reply inside thirty minutes.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {drops.map((d, i) => <DropCard key={d.name} d={d} i={i} />)}
        </div>

        <Reveal delay={0.18}>
          <div className="mt-16 flex flex-wrap gap-3">
            <a
              href="https://www.instagram.com/shoe_hub83/"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded bg-crimson !text-white font-mono text-[12px] tracking-[0.22em] uppercase hover:bg-crimson-2 hover:-translate-y-0.5 transition-all"
            >
              See all 313 drops on Instagram
            </a>
            <a
              href="https://whatsapp.com/channel/0029Vab9kGI9RZAaycsJws1M"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded border border-line-2 text-ink hover:border-crimson hover:bg-bg-2 font-mono text-[12px] tracking-[0.22em] uppercase transition-colors"
            >
              Subscribe to the WhatsApp channel
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
