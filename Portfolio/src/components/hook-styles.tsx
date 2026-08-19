"use client";

import { useState } from "react";
import type { HookStyleItem, PortfolioData } from "@/lib/content";
import { isPlaceholder, videoTimecode } from "@/lib/display";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";
import { VideoPreview } from "@/components/video-preview";
import { VideoModal } from "@/components/video-modal";

const STYLE_NAMES: Record<string, string> = {
  Simple: "Simple: cold open",
  Advanced: "Advanced: layered intro",
  Podcast: "Podcast: talking head",
};

/** Compact showcase of hook openings. Range, not archive. */
export function HookStylesSection({ data }: { data: PortfolioData }) {
  const [openItem, setOpenItem] = useState<HookStyleItem | null>(null);

  const groups = data.hook_styles.items.reduce<Record<string, HookStyleItem[]>>(
    (acc, item) => {
      const key = item.style_label ?? "Clip";
      (acc[key] ??= []).push(item);
      return acc;
    },
    {}
  );

  return (
    <section id="hooks" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 md:py-28">
      <Reveal>
        <SectionHeader
          tc="00:38"
          name="Hook styles"
          heading="Three hooks. Same source."
          sub="A cold open, a layered intro, and a talking head. Different starts. Same message."
        />
      </Reveal>

      <div className="overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex min-w-max gap-10 md:min-w-0 md:gap-14">
          {Object.entries(groups).map(([style, items]) => (
            <div key={style} className="flex-1 md:max-w-[280px]">
              <div className="mb-5 flex items-center gap-3">
                <span className="timecode text-[10px] text-[#8e8c99]">
                  {STYLE_NAMES[style] ?? style.toUpperCase()}
                </span>
                <span className="hairline-h flex-1" />
                <span className="measure text-[10px] text-[#817f95]">
                  {String(items.length).padStart(2, "0")}
                </span>
              </div>
              <div className={`grid gap-4 ${items.length > 2 ? "grid-cols-2" : ""}`}>
                {items.map((item) => (
                  <div key={item.id} className="group">
                    <button
                      type="button"
                      onClick={() => setOpenItem(item)}
                      aria-label={`Play hook style: ${style}`}
                      className="block w-full cursor-pointer text-left focus-visible:outline-none"
                    >
                      <VideoPreview
                        src={item.video}
                        className="aspect-[9/16] w-full max-w-[150px] border border-[#232228]"
                        label={videoTimecode(item.video)}
                      />
                      <p className="timecode mt-2.5 text-[9px] text-[#817f95]">
                        {item.style_label.toUpperCase()} · {videoTimecode(item.video)}
                      </p>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {openItem && (
        <VideoModal
          open={!!openItem}
          onOpenChange={(o) => !o && setOpenItem(null)}
          title={isPlaceholder(openItem.style_label) ? "Hook style" : openItem.style_label}
          src={openItem.video}
          meta={[{ label: "DUR", mono: videoTimecode(openItem.video) }]}
        />
      )}
    </section>
  );
}
