import type { PricingData } from "@/lib/content";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";

export function PricingSection({ data }: { data: PricingData }) {
  const { single_clips, monthly_packages, notes } = data;

  return (
    <section id="pricing" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 md:py-28">
      <Reveal>
        <SectionHeader
          tc="01:05"
          name="Pricing"
          heading="Rates for clips and retainers."
          sub={notes.pricing_model}
        />
      </Reveal>

      {/* Single clip */}
      <Reveal>
        <div className="grid gap-6 border-t border-[#232228] py-8 md:grid-cols-[1fr_1fr] md:gap-16">
          <div>
            <p className="timecode mb-3 text-[10px] text-[#817f95]">SINGLE CLIP · TEST THE QUALITY FIRST</p>
            <p className="text-3xl font-semibold tracking-[-0.02em] text-[#f2f1f5] md:text-4xl">
              ${single_clips.price_range.min}–${single_clips.price_range.max}
              <span className="timecode ml-2 text-[11px] font-normal text-[#8e8c99]">
                {single_clips.unit}
              </span>
            </p>
            <p className="mt-3 max-w-[46ch] text-[14px] leading-relaxed text-[#8e8c99]">
              {single_clips.description}
            </p>
          </div>
          <div className="grid content-start gap-2">
            {single_clips.includes.map((item) => (
              <div key={item} className="flex items-baseline gap-3">
                <span className="mt-[6px] inline-block h-[5px] w-[5px] shrink-0 bg-[#7c3aed]" />
                <span className="text-[14px] text-[#c9c7d1]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Monthly tiers */}
      <div className="panel mt-6 overflow-hidden rounded-lg">
        <div className="grid lg:grid-cols-3 lg:divide-x lg:divide-[#232228]">
          {monthly_packages.map((tier) => (
            <div
              key={tier.id}
              className={`relative flex flex-col border-b border-[#232228] p-7 last:border-b-0 lg:border-b-0 ${
                tier.featured ? "bg-[#1a1a21]" : ""
              }`}
            >
              {tier.featured && (
                <>
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[2px] bg-[#7c3aed]"
                  />
                  <span className="timecode mb-3 inline-flex w-fit items-center gap-1.5 rounded-[2px] border border-[#7c3aed]/40 bg-[#7c3aed]/10 px-2 py-1 text-[9px] text-[#9061f9]">
                    <span className="inline-block h-[5px] w-[5px] bg-[#7c3aed]" />
                    FEATURED
                  </span>
                </>
              )}
              <p className="timecode text-[10px] text-[#8e8c99]">{tier.label.toUpperCase()} TIER</p>
              <p className="mt-4 text-[2.6rem] leading-none font-semibold tracking-[-0.03em] text-[#f2f1f5]">
                ${tier.price}
                <span className="timecode ml-1.5 align-middle text-[11px] font-normal text-[#8e8c99]">
                  {tier.billing}
                </span>
              </p>
              <p className="timecode mt-3 text-[10px] text-[#817f95]">
                {tier.clips_per_month} CLIPS / MONTH · ≈ ${tier.effective_per_clip} / CLIP
              </p>
              <ul className="mt-6 flex-1 space-y-2.5">
                {tier.includes.map((item) => (
                  <li key={item} className="flex items-baseline gap-3">
                    <span className="mt-[6px] inline-block h-[5px] w-[5px] shrink-0 bg-[#7c3aed]" />
                    <span className="text-[13.5px] text-[#c9c7d1]">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-[#232228] pt-4 text-[12.5px] leading-relaxed text-[#8e8c99]">
                {tier.best_for}
              </p>
              <a
                href="#start"
                className={`mt-6 rounded-md px-4 py-2.5 text-center text-[13.5px] font-semibold transition-colors duration-200 ease-out focus-visible:ring-2 focus-visible:ring-[#9061f9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#16161b] ${
                  tier.featured
                    ? "bg-[#7c3aed] text-[#f2f1f5] hover:bg-[#9061f9]"
                    : "border border-[#232228] bg-transparent text-[#f2f1f5] hover:border-[#7c3aed] hover:text-[#9061f9]"
                }`}
              >
                Choose {tier.label}
              </a>
            </div>
          ))}
        </div>
      </div>

      <Reveal>
        <p className="timecode mt-6 max-w-[80ch] text-[10px] leading-relaxed text-[#817f95]">
          {notes.custom_note}
        </p>
      </Reveal>
    </section>
  );
}
