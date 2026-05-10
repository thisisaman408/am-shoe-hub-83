"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#drops", label: "Drops" },
  { href: "#brands", label: "Brands" },
  { href: "#how", label: "How to order" },
  { href: "#proof", label: "Proof" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn(
      "fixed inset-x-0 top-0 z-50 transition-[background,padding,backdrop-filter] duration-500",
      scrolled ? "bg-bg/85 py-2.5 backdrop-blur-md border-b border-line" : "py-4 bg-transparent"
    )}>
      <div className="max-page container-x flex items-center gap-8">
        <a href="#top" className="flex items-center gap-3">
          <span className="grid place-items-center w-11 h-11 rounded border border-crimson/60 text-ink font-display text-base">83</span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-[20px] text-ink">Shoe Hub <span className="text-crimson">83</span></span>
            <small className="text-[10px] tracking-[0.24em] uppercase font-mono text-ink-3 mt-1.5">authentic · daily drops · since the gram</small>
          </span>
        </a>

        <nav className="ml-auto hidden lg:flex items-center gap-7 font-mono text-[11.5px] tracking-[0.22em] uppercase">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-ink-2 hover:text-crimson relative pb-1 transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-crimson after:transition-[width] after:duration-500 hover:after:w-full">{l.label}</a>
          ))}
        </nav>

        <a href="https://wa.me/918375808771" target="_blank" rel="noopener" className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded bg-crimson !text-white hover:bg-crimson-2 font-mono text-[11.5px] tracking-[0.22em] uppercase transition-colors">
          Order on WhatsApp
        </a>

        <button aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen((v) => !v)} className="lg:hidden ml-auto w-10 h-10 grid place-items-center">
          <span className="flex flex-col gap-[5px]">
            <span className={cn("block w-5 h-px bg-ink transition-transform", open && "translate-y-[6px] rotate-45")} />
            <span className={cn("block w-5 h-px bg-ink transition-opacity", open && "opacity-0")} />
            <span className={cn("block w-5 h-px bg-ink transition-transform", open && "-translate-y-[6px] -rotate-45")} />
          </span>
        </button>
      </div>

      {open && (
        <div className="lg:hidden absolute inset-x-0 top-full bg-bg/95 backdrop-blur-xl border-b border-line">
          <nav className="container-x py-6 flex flex-col gap-5 font-mono text-[13px] tracking-[0.22em] uppercase">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-ink-2 hover:text-crimson">{l.label}</a>
            ))}
            <a href="https://wa.me/918375808771" target="_blank" rel="noopener" onClick={() => setOpen(false)} className="mt-2 inline-flex w-fit items-center gap-2 px-5 py-2.5 rounded bg-crimson !text-white">Order on WhatsApp</a>
          </nav>
        </div>
      )}
    </header>
  );
}
