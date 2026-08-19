import type { ReactNode } from "react";

/**
 * Section header in the timeline's own vocabulary: a burned-in timecode chip
 * with the clip name, then the heading. No numbered markers, no icon tiles.
 */
export function SectionHeader({
  tc,
  name,
  heading,
  sub,
  aside,
}: {
  tc: string;
  name: string;
  heading: ReactNode;
  sub?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="mb-12">
      <div className="hairline-h mb-10" />
      <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-4">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <span className="timecode burned rounded-[3px] px-2 py-1">
              <span className="mr-1.5 inline-block h-[6px] w-[6px] translate-y-[-1px] bg-[#7c3aed]" />
              {tc}
            </span>
            <span className="timecode text-[#8e8c99]">{name}</span>
          </div>
          <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.02em] text-[#f2f1f5] md:text-[2.6rem] md:leading-[1.08]">
            {heading}
          </h2>
          {sub && (
            <p className="mt-5 max-w-[62ch] text-[15px] leading-relaxed text-[#8e8c99]">
              {sub}
            </p>
          )}
        </div>
        {aside}
      </div>
    </div>
  );
}
