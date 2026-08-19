import type { MdSection } from "@/lib/content";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";

function Prose({ html }: { html: string }) {
  return <div className="prose-dark" dangerouslySetInnerHTML={{ __html: html }} />;
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="prose-dark">
      {items.map((item, i) => (
        <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
      ))}
    </ul>
  );
}

const STEP_TC = ["00:00", "00:04", "00:09", "00:14", "00:19", "00:23", "00:26"];

function sectionByName(sections: MdSection[], name: string): MdSection | undefined {
  return sections.find((s) => s.heading === name);
}

export function ServicesSection({ sections }: { sections: MdSection[] }) {
  const who = sectionByName(sections, "Who We Are");
  const problem = sectionByName(sections, "The Core Problem We Solve");
  const process = sectionByName(sections, "What Short-Form Repurposing Actually Means");
  const fit = sectionByName(sections, "Ideal Client Profile");
  const addons = sectionByName(sections, "Add-Ons & Upsells");
  const engagement = sectionByName(sections, "Engagement Style");

  return (
    <section id="service" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 md:py-28">
      <Reveal>
        <SectionHeader
          tc="00:49"
          name="The service"
          heading="Short-form repurposing for coaches and consultants."
          sub="We turn long-form talking into clips that stand alone."
        />
      </Reveal>

      {/* Who We Are */}
      {who && (
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <div>
            <p className="timecode mb-4 text-[10px] text-[#817f95]">
              SERVICE / CORE · WHO WE ARE
            </p>
            <p className="max-w-[30ch] text-2xl leading-snug font-medium tracking-[-0.015em] text-[#f2f1f5] md:text-[1.7rem]">
              We turn what you already say into clips that perform.
            </p>
          </div>
          <div>
            {who.blocks
              .filter((b) => b.kind === "p")
              .map((b, i) => (
                <Prose key={i} html={b.html} />
              ))}
          </div>
        </div>
      )}

      {/* The problem we solve */}
      {problem && (
        <div className="mt-20 border-t border-[#232228] pt-12">
          <Reveal>
            <p className="timecode mb-8 text-[10px] text-[#817f95]">
              WHY CLIENTS COME IN · THE PROBLEM
            </p>
          </Reveal>
          {problem.blocks
            .filter((b) => b.kind === "p")
            .map((b, i) => (
              <Reveal key={i}>
                <Prose html={b.html} />
              </Reveal>
            ))}
          {problem.blocks
            .filter((b) => b.kind === "list")
            .map((b, i) => (
              <Reveal key={`l${i}`}>
                <ul className="mt-8 grid gap-0 border-t border-[#232228] md:grid-cols-3 md:divide-x md:divide-[#232228]">
                  {b.items!.map((item, j) => (
                    <li
                      key={j}
                      className="border-b border-[#232228] py-6 pr-6 last:border-b-0 md:border-b-0 md:px-6 md:first:pl-0 md:last:pr-0"
                    >
                      <span className="measure mb-4 block text-[10px] tracking-[0.18em] text-[#7c3aed]">
                        {"0" + (j + 1)}.
                      </span>
                      <span
                        className="prose-dark text-[15px]"
                        dangerouslySetInnerHTML={{ __html: item }}
                      />
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
        </div>
      )}

      {/* The process — a true sequence, so it earns timecodes */}
      {process && (
        <div className="mt-20 border-t border-[#232228] pt-12">
          <Reveal>
            <p className="timecode mb-4 text-[10px] text-[#817f95]">
              THE PROCESS · ONE REEL, SEVEN PASSES
            </p>
            <h3 className="max-w-2xl text-2xl font-medium tracking-[-0.015em] text-[#f2f1f5] md:text-[1.9rem] md:leading-[1.15]">
              How a long-form episode becomes a clip.
            </h3>
          </Reveal>
          {process.blocks
            .filter((b) => b.kind === "p")
            .map((b, i) => (
              <Reveal key={i}>
                <Prose html={b.html} />
              </Reveal>
            ))}
          <div className="mt-10">
            {process.subsections.map((step, i) => (
              <Reveal key={step.heading}>
                <div className="grid gap-3 border-t border-[#232228] py-7 md:grid-cols-[120px_240px_1fr] md:gap-8">
                  <span className="timecode flex items-start gap-2 text-[11px] text-[#9061f9]">
                    <span className="mt-[5px] inline-block h-[7px] w-[7px] bg-[#7c3aed]" />
                    {STEP_TC[i] ?? `00:${String(i).padStart(2, "0")}`}
                  </span>
                  <h4 className="text-[15px] font-semibold tracking-[-0.01em] text-[#f2f1f5]">
                    {step.heading}
                  </h4>
                  <div>
                    {step.blocks.map((b, j) =>
                      b.kind === "p" ? (
                        <Prose key={j} html={b.html} />
                      ) : (
                        <List key={j} items={b.items!} />
                      )
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      )}

      {/* Ideal client profile */}
      {fit && (
        <div className="mt-20 border-t border-[#232228] pt-12">
          <Reveal>
            <p className="timecode mb-4 text-[10px] text-[#817f95]">WHO THIS FITS</p>
            <h3 className="text-2xl font-medium tracking-[-0.015em] text-[#f2f1f5]">
              Built for people who talk for a living.
            </h3>
          </Reveal>
          {fit.blocks
            .filter((b) => b.kind === "p")
            .map((b, i) => (
              <Reveal key={i}>
                <Prose html={b.html} />
              </Reveal>
            ))}
          {fit.blocks
            .filter((b) => b.kind === "list")
            .map((b, i) => (
              <Reveal key={`l${i}`}>
                <ul className="grid gap-x-10 gap-y-5 md:grid-cols-2">
                  {b.items!.map((item, j) => (
                    <li key={j} className="border-t border-[#232228] pt-4">
                      <span className="prose-dark text-[15px] leading-relaxed" dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
        </div>
      )}

      {/* Add-ons */}
      {addons && (
        <div className="mt-20 border-t border-[#232228] pt-12">
          <Reveal>
            <p className="timecode mb-4 text-[10px] text-[#817f95]">ADD-ONS · WHEN THE CORE IS RUNNING</p>
            <h3 className="text-2xl font-medium tracking-[-0.015em] text-[#f2f1f5]">
              The next steps once the clips are flowing.
            </h3>
          </Reveal>
          {addons.blocks
            .filter((b) => b.kind === "p")
            .map((b, i) => (
              <Reveal key={i}>
                <Prose html={b.html} />
              </Reveal>
            ))}
          <div className="mt-10 grid gap-0 border-t border-[#232228] sm:grid-cols-2 sm:divide-x sm:divide-[#232228]">
            {addons.subsections.map((addon, i) => (
              <Reveal key={addon.heading} delay={Math.min(i * 0.05, 0.2)}>
                <div className="border-b border-[#232228] py-6 pr-6 even:sm:pl-6 sm:odd:pr-6 sm:even:pl-8">
                  <p className="measure mb-2 text-[10px] tracking-[0.18em] text-[#7c3aed]">
                    + ADD-ON {String(i + 1).padStart(2, "0")}
                  </p>
                  <h4 className="text-[15px] font-semibold text-[#f2f1f5]">{addon.heading}</h4>
                  <div className="mt-2">
                    {addon.blocks
                      .filter((b) => b.kind === "p")
                      .map((b, j) => (
                        <Prose key={j} html={b.html} />
                      ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      )}

      {/* Engagement style */}
      {engagement && (
        <div className="mt-20 border-t border-[#232228] pt-12">
          <Reveal>
            <p className="timecode mb-4 text-[10px] text-[#817f95]">ENGAGEMENT · HOW THE RELATIONSHIP RUNS</p>
            <h3 className="text-2xl font-medium tracking-[-0.015em] text-[#f2f1f5]">
              Retainer-based, because consistency is the product.
            </h3>
          </Reveal>
          {engagement.blocks
            .filter((b) => b.kind === "p")
            .map((b, i) => (
              <Reveal key={i}>
                <Prose html={b.html} />
              </Reveal>
            ))}
        </div>
      )}
    </section>
  );
}
