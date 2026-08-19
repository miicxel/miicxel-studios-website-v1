"use client";

import type { PortfolioData } from "@/lib/content";
import { isPlaceholder, videoTimecode } from "@/lib/display";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";
import { CompareSlider } from "@/components/compare-slider";

/** Proof of transformation — a dedicated comparison strip, visually distinct
 *  from the main grid: a drag-to-reveal slider per pair, with the raw moment
 *  on the left of the handle and the structured cut on the right. */
export function BeforeAfterSection({ data }: { data: PortfolioData }) {
  const items = data.before_after.items;

  return (
    <section id="proof" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 md:py-28">
      <Reveal>
        <SectionHeader
          tc="00:22"
          name="Before / after"
          heading="Raw in. Clean cut out."
          sub="Drag to compare the source long-form against the final cut."
        />
      </Reveal>

      <div>
        {items.map((item, i) => {
          const title = isPlaceholder(item.title) ? "Transformation clip" : item.title;
          const desc = isPlaceholder(item.description)
            ? null
            : item.description;

          return (
            <Reveal key={item.id} delay={Math.min(i * 0.06, 0.2)}>
              <div className="grid items-start gap-6 border-t border-[#232228] py-8 md:grid-cols-[minmax(0,380px)_1fr] md:gap-12 md:py-10">
                <CompareSlider
                  before={item.before_video}
                  after={item.after_video}
                  className="mx-auto w-full max-w-[340px] md:mx-0"
                />
                <div>
                  <p className="timecode text-[10px] text-[#817f95]">
                    TRANSFORM {String(i + 1).padStart(2, "0")} ·{" "}
                    <span className="text-[#8e8c99]">{videoTimecode(item.after_video)}</span>
                  </p>
                  <h3 className="mt-3 text-xl font-medium tracking-[-0.01em] text-[#f2f1f5] md:text-2xl">
                    {title}
                  </h3>
                  {desc && (
                    <p className="mt-3 max-w-[58ch] text-[14px] leading-relaxed text-[#8e8c99]">
                      {desc}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
