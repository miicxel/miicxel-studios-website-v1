import type { MdSection } from "@/lib/content";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";

function Prose({ html }: { html: string }) {
  return <div className="prose-dark" dangerouslySetInnerHTML={{ __html: html }} />;
}

export function AboutSection({ sections }: { sections: MdSection[] }) {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 md:py-28">
      <Reveal>
        <SectionHeader
          tc="01:19"
          name="The studio"
          heading="Every clip, through one consistent eye."
          sub="One editor owns every clip. No rotating pool. One view of your voice."
          aside={
            <div className="hidden min-w-[220px] gap-3 pt-1 md:flex md:flex-col">
              {[
                ["FILE", "ABOUT.MD"],
                ["EDITOR", "MICKEL"],
                ["MODEL", "ONE DEDICATED EDITOR"],
                ["RHYTHM", "WEEKLY / BIWEEKLY"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between border-b border-[#232228] pb-2">
                  <span className="timecode text-[9px] text-[#817f95]">{k}</span>
                  <span className="timecode text-[9px] text-[#8e8c99]">{v}</span>
                </div>
              ))}
            </div>
          }
        />
      </Reveal>

      <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
        <div className="space-y-12">
          {sections.map((section) => (
            <div key={section.heading}>
              <p className="timecode mb-4 text-[10px] text-[#817f95]">
                {section.heading.toUpperCase()}
              </p>
              {section.blocks
                .filter((b) => b.kind === "p")
                .map((b, j) => (
                  <Prose key={j} html={b.html} />
                ))}
            </div>
          ))}
        </div>

        <div className="md:pt-2">
          <Reveal>
            <blockquote className="border-t border-[#232228] py-8">
              <p className="text-xl leading-snug font-medium tracking-[-0.01em] text-[#f2f1f5] md:text-[1.45rem]">
                "Not did we hit the deadline. Does this represent the person well?"
              </p>
              <footer className="timecode mt-4 text-[10px] text-[#817f95]">
                THE STANDARD EVERY CLIP FOLLOWS · ABOUT.MD
              </footer>
            </blockquote>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="border-t border-[#232228] py-8">
              <p className="text-[15px] leading-relaxed text-[#8e8c99]">
                Miicxel Studios should feel like invisible infrastructure.
                It does the work.
                Your output looks like a bigger team made it.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
