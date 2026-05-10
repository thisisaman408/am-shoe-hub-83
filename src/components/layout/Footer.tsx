import { SITE } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t border-line mt-16 pt-20 pb-8 container-x">
      <div className="max-page grid gap-16 md:grid-cols-[1fr_1.5fr] items-start">
        <div className="flex items-start gap-3.5">
          <span className="grid place-items-center w-12 h-12 rounded border border-crimson/60 text-ink font-display text-lg">83</span>
          <div>
            <strong className="block font-display text-[22px] text-ink">Shoe Hub <span className="text-crimson">83</span></strong>
            <small className="text-ink-3 text-[13px] block mt-1">{SITE.tagline}</small>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h5 className="font-mono text-[11px] tracking-[0.22em] uppercase text-crimson mb-3.5">Order</h5>
            <p className="text-ink-2 text-[14.5px] leading-7">
              <a href={SITE.whatsapp} className="hover:text-crimson" target="_blank" rel="noopener">WhatsApp · {SITE.phone}</a><br />
              <a href={SITE.whatsappChannel} className="hover:text-crimson" target="_blank" rel="noopener">Daily-drops channel</a><br />
              <a href={SITE.ig} className="hover:text-crimson" target="_blank" rel="noopener">Instagram · {SITE.igHandle}</a>
            </p>
          </div>
          <div>
            <h5 className="font-mono text-[11px] tracking-[0.22em] uppercase text-crimson mb-3.5">Trust</h5>
            <p className="text-ink-2 text-[14.5px] leading-7">
              ₹100 advance for COD<br />
              Video-call confirmation<br />
              Worldwide shipping
            </p>
          </div>
          <div>
            <h5 className="font-mono text-[11px] tracking-[0.22em] uppercase text-crimson mb-3.5">Base</h5>
            <p className="text-ink-2 text-[14.5px] leading-7">
              Sagar Pur, Delhi<br />
              India<br />
              Run by Himanshu
            </p>
          </div>
        </div>
      </div>
      <div className="max-page mt-12 pt-6 border-t border-line flex flex-wrap gap-3 justify-between font-mono text-[11px] tracking-[0.18em] uppercase text-ink-3">
        <span>© Shoe Hub 83 · Delhi · {SITE.followers / 1000}k+ on the gram</span>
        <span>Site by AM Web Studio</span>
      </div>
    </footer>
  );
}
