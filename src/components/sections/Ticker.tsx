const items = [
  "100% authentic",
  "video-call confirmation",
  "worldwide shipping",
  "₹100 advance for COD",
  "free delivery in India",
  "exchange in 7 days",
  "38.5K sneakerheads",
  "since 2018",
];

export function Ticker() {
  return (
    <section className="relative border-y border-line bg-bg-2/50 py-3.5 overflow-hidden">
      <div
        className="ticker-track flex gap-12 font-mono text-[11.5px] tracking-[0.32em] uppercase text-ink-2"
        aria-hidden="true"
      >
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-12 shrink-0">
            <span>{t}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
          </span>
        ))}
      </div>
    </section>
  );
}
