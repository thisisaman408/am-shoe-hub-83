import { Reveal } from "@/components/animations/Reveal";

export function Founder() {
  return (
    <section className="container-x py-[clamp(80px,12vw,160px)]">
      <div className="max-page grid gap-16 lg:grid-cols-[1.1fr_1fr] items-center">
        <div>
          <Reveal><div className="eyebrow mb-4">05 / who you're buying from</div></Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-[clamp(40px,6vw,84px)] leading-[0.96] text-ink">
              Himanshu. <span className="text-crimson">Sagar Pur.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="font-display text-[clamp(20px,1.6vw,26px)] mt-9 leading-snug text-ink-2 mb-6 normal-case tracking-normal" style={{ fontWeight: 400 }}>
              Started @shoe_hub83 in 2018 with one pair of Jordans, ten followers and a phone camera.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="text-ink-2 text-[16px] leading-relaxed mb-4 max-w-[520px] font-light">
              Six years on, the warehouse holds five hundred pairs at any given time, the Instagram has 38,500 followers, and Himanshu still personally video-calls every single buyer before he ships. No team, no automation, no fakes.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-ink-2 text-[16px] leading-relaxed max-w-[520px] font-light">
              The shop runs on three rules: only stock pairs he&rsquo;d wear himself, only ship after a video call, and never sell something he can&rsquo;t replace if it goes wrong. That&rsquo;s why the same buyers come back.
            </p>
          </Reveal>
          <Reveal delay={0.36}>
            <a
              href="https://www.instagram.com/shoe_hub83/"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2.5 mt-7 font-mono text-[12px] tracking-[0.22em] uppercase text-crimson border-b border-crimson/40 pb-1 hover:text-ink hover:border-ink transition-colors group"
            >
              See the gram → <span className="transition-transform group-hover:translate-x-1.5">→</span>
            </a>
          </Reveal>
        </div>

        <Reveal variant="scaleIn">
          <aside className="border border-line-2 bg-bg-2/40 p-10 rounded relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-crimson/15 blur-3xl" aria-hidden="true" />
            <div className="font-mono text-[11px] tracking-[0.32em] uppercase text-crimson mb-3 relative">Owner / curator / packer</div>
            <h3 className="font-display text-[40px] leading-none text-ink mb-1 relative">HIMANSHU</h3>
            <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink-3 mb-7 relative">Sagar Pur, Delhi · since 2018</div>
            <p className="text-ink text-[18px] leading-relaxed italic relative">
              &ldquo;If I wouldn&rsquo;t put it on my own foot, it doesn&rsquo;t leave the warehouse. That&rsquo;s the whole shop.&rsquo;
            </p>
            <div className="mt-6 flex flex-wrap gap-2 relative">
              {["UA wear-test", "OG-only sourcing", "video-call confirm", "personal pack"].map((t) => (
                <span key={t} className="text-[10.5px] font-mono tracking-[0.18em] uppercase px-2.5 py-1 rounded border border-line text-ink-2">
                  {t}
                </span>
              ))}
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
