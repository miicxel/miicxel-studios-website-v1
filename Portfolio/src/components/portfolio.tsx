"use client";

import { useState } from "react";
import type { Clip, PortfolioData } from "@/lib/content";
import { fileName, isPlaceholder, nicheLabel, videoTimecode } from "@/lib/display";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";
import { Waveform } from "@/components/waveform";
import { VideoPreview } from "@/components/video-preview";
import { VideoModal } from "@/components/video-modal";

export function PortfolioSection({ data }: { data: PortfolioData }) {
  const [openClip, setOpenClip] = useState<Clip | null>(null);

  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 md:py-28">
      <Reveal>
        <SectionHeader
          tc="00:07"
          name="The work"
          heading="Real clips from real long-form."
          sub="Hover to preview. Click to open the clip in the monitor."
        />
      </Reveal>

      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
        {data.general_clips.map((clip, i) => {
          const title = isPlaceholder(clip.title) ? "Client clip" : clip.title;
          const hook = isPlaceholder(clip.hook) ? null : clip.hook;
          const desc = isPlaceholder(clip.description) ? null : clip.description;
          const tags = clip.tags?.filter((t) => !isPlaceholder(t)) ?? [];

          return (
            <Reveal key={clip.id} delay={i * 0.08}>
              <div className="group">
                <button
                  type="button"
                  onClick={() => setOpenClip(clip)}
                  aria-label={`Open clip: ${title}`}
                  className="block w-full cursor-pointer text-left focus-visible:outline-none"
                >
                  <VideoPreview
                    src={clip.video}
                    className="aspect-[9/16] w-full border border-[#232228]"
                  />
                  <div className="mt-3">
                    <Waveform />
                  </div>
                  <div className="mt-3 flex items-baseline justify-between gap-4">
                    <span className="timecode text-[10px] text-[#8e8c99]">
                      <span className="mr-2 inline-block h-[5px] w-[5px] translate-y-[-1px] bg-[#7c3aed]" />
                      {nicheLabel(clip.niche)}
                    </span>
                    <span className="timecode text-[10px] text-[#817f95]">
                      {videoTimecode(clip.video)}
                    </span>
                  </div>
                  <h3 className="mt-1.5 text-[15px] leading-snug font-medium text-[#f2f1f5] transition-colors duration-200 ease-out group-hover:text-[#9061f9]">
                    {title}
                  </h3>
                  {hook && (
                    <p className="mt-1 text-[13px] leading-relaxed text-[#8e8c99]">
                      <span className="timecode mr-1.5 text-[9px] text-[#817f95]">HOOK</span>
                      {hook}
                    </p>
                  )}
                  {desc && (
                    <p className="mt-1.5 text-[13px] leading-relaxed text-[#817f95]">
                      {desc}
                    </p>
                  )}
                  {tags.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {tags.map((t) => (
                        <span
                          key={t}
                          className="timecode rounded-[2px] border border-[#232228] px-1.5 py-0.5 text-[9px] text-[#8e8c99]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </button>
              </div>
            </Reveal>
          );
        })}
      </div>

      {openClip && (
        <VideoModal
          open={!!openClip}
          onOpenChange={(o) => !o && setOpenClip(null)}
          title={isPlaceholder(openClip.title) ? "Client clip" : openClip.title}
          description={
            isPlaceholder(openClip.description) ? undefined : openClip.description
          }
          src={openClip.video}
          meta={[
            { label: "SRC", mono: fileName(openClip.video) },
            { label: "DUR", mono: videoTimecode(openClip.video) },
            { label: "NICHE", mono: nicheLabel(openClip.niche).toUpperCase() },
          ]}
        />
      )}
    </section>
  );
}
