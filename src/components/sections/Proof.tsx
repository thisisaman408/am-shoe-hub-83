import { Reveal } from "@/components/animations/Reveal";

const states = [
  "Delhi NCR", "Maharashtra", "Karnataka", "Tamil Nadu", "Uttar Pradesh",
  "West Bengal", "Punjab", "Haryana", "Rajasthan", "Gujarat",
  "Telangana", "Andhra Pradesh", "Madhya Pradesh", "Bihar", "Jharkhand",
  "Tripura", "Assam", "Kerala", "Goa", "Andaman & Nicobar",
  "Himachal Pradesh", "Uttarakhand", "Odisha", "Chhattisgarh",
];

const reviewQuotes = [
  { name: "Arjun, Bombay", body: "Got my Jordan 4s in three days. Video call before shipping made it feel safe — pair was 1:1 with the photos. Will buy again." },
  { name: "Priya, Bangalore", body: "Ordered the Yeezy 350s for my brother's birthday. Box, dust bag, everything original. Himanshu bhai is the realest reseller on insta." },
  { name: "Tejas, Pune", body: "Was scared to spend 14k on insta but the COD with ₹100 advance was the deciding thing. Got my AF1s on Monday. Crisp." },
  { name: "Khushi, Delhi", body: "Walked into the warehouse to pick up myself. The collection is unreal. Himanshu let me try on three pairs before deciding. Old-school customer service." },
];

export function Proof() {
  return (
    <section id="proof" className="container-x py-[clamp(80px,12vw,160px)]">
      <div className="max-page">
        <div className="mb-14">
          <Reveal><div className="eyebrow mb-4">04 / proof of work</div></Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-[clamp(40px,6vw,84px)] leading-[0.96] text-ink max-w-[1100px]">
              Twenty-four states. <span className="text-crimson">Thousands of pairs shipped.</span>
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="border-y border-line py-8 mb-16">
            <div className="font-mono text-[10.5px] tracking-[0.32em] uppercase text-ink-3 mb-5">delivered to</div>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {states.map((s) => (
                <span key={s} className="font-display text-[clamp(18px,2vw,28px)] text-ink-2 hover:text-crimson transition-colors cursor-default">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviewQuotes.map((q, i) => (
            <Reveal key={q.name} delay={(i % 2) * 0.07}>
              <article className="border border-line bg-bg-2/40 p-8 hover:border-crimson/50 transition-colors h-full">
                <svg viewBox="0 0 24 24" width="22" height="22" className="text-crimson mb-4" fill="currentColor" aria-hidden="true">
                  <path d="M9.5 6c-3 0-5.5 2.5-5.5 5.5v6.5h6v-6h-3c0-2 1.5-3.5 3.5-3.5v-2.5zm10 0c-3 0-5.5 2.5-5.5 5.5v6.5h6v-6h-3c0-2 1.5-3.5 3.5-3.5v-2.5z" />
                </svg>
                <p className="text-ink text-[17px] leading-relaxed mb-5">&ldquo;{q.body}&rdquo;</p>
                <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink-3">— {q.name}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
