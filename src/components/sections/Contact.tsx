"use client";

import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { SITE } from "@/lib/utils";

export function Contact() {
  const [form, setForm] = useState({ name: "", model: "", size: "", pin: "" });

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = `Hi Shoe Hub 83 — I'm ${form.name || "—"}. Looking at: ${form.model || "—"}, size ${form.size || "—"}. Delivery PIN: ${form.pin || "—"}.`;
    window.location.href = `https://wa.me/918375808771?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="contact" className="container-x py-[clamp(80px,12vw,160px)]">
      <div className="max-page max-w-[1080px] mx-auto grid lg:grid-cols-[1fr_1.1fr] gap-16 items-start">
        <div>
          <Reveal><div className="eyebrow mb-4">06 / start the order</div></Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-[clamp(40px,6vw,84px)] leading-[0.96] text-ink">
              Tell Himanshu <span className="text-crimson">what you want.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 mb-9 text-ink-2 text-[17px] max-w-[440px] font-light">
              Fill the four fields. We&rsquo;ll open WhatsApp pre-filled with your order — Himanshu replies inside thirty minutes during the day.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <ul className="grid gap-4 list-none">
              {[
                ["WhatsApp", <a key="w" href={SITE.whatsapp} target="_blank" rel="noopener" className="hover:text-crimson">{SITE.phone}</a>],
                ["Channel", <a key="c" href={SITE.whatsappChannel} target="_blank" rel="noopener" className="hover:text-crimson">Daily-drops broadcast</a>],
                ["Instagram", <a key="i" href={SITE.ig} target="_blank" rel="noopener" className="hover:text-crimson">{SITE.igHandle}</a>],
                ["Warehouse", "Sagar Pur, Delhi · by appointment"],
              ].map(([k, v], i) => (
                <li key={i} className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-4 border-t border-line pt-4 text-[15px] text-ink-2">
                  <strong className="font-mono text-[11px] tracking-[0.24em] uppercase text-crimson font-normal">{k}</strong>
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.18} variant="scaleIn">
          <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-5 border border-line p-10 bg-bg-2/50 rounded">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-mono text-[11px] tracking-[0.22em] uppercase text-crimson">Your name</label>
              <input id="name" type="text" autoComplete="name" required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="bg-transparent border-0 border-b border-line-2 py-2.5 text-ink text-[16px] outline-none focus:border-crimson transition-colors" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="size" className="font-mono text-[11px] tracking-[0.22em] uppercase text-crimson">UK size</label>
              <input id="size" type="text" placeholder="e.g. UK 9" required value={form.size} onChange={(e) => setForm((f) => ({ ...f, size: e.target.value }))} className="bg-transparent border-0 border-b border-line-2 py-2.5 text-ink text-[16px] outline-none focus:border-crimson transition-colors" />
            </div>
            <div className="sm:col-span-2 flex flex-col gap-2">
              <label htmlFor="model" className="font-mono text-[11px] tracking-[0.22em] uppercase text-crimson">Which pair?</label>
              <input id="model" type="text" placeholder="Air Jordan 4 University Blue" required value={form.model} onChange={(e) => setForm((f) => ({ ...f, model: e.target.value }))} className="bg-transparent border-0 border-b border-line-2 py-2.5 text-ink text-[16px] outline-none focus:border-crimson transition-colors" />
            </div>
            <div className="sm:col-span-2 flex flex-col gap-2">
              <label htmlFor="pin" className="font-mono text-[11px] tracking-[0.22em] uppercase text-crimson">Delivery PIN code</label>
              <input id="pin" type="text" placeholder="110001" required value={form.pin} onChange={(e) => setForm((f) => ({ ...f, pin: e.target.value }))} className="bg-transparent border-0 border-b border-line-2 py-2.5 text-ink text-[16px] outline-none focus:border-crimson transition-colors" />
            </div>
            <button type="submit" className="sm:col-span-2 mt-4 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded bg-crimson !text-white font-mono text-[12px] tracking-[0.22em] uppercase hover:bg-crimson-2 hover:-translate-y-0.5 transition-all">
              Open WhatsApp with this order
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
