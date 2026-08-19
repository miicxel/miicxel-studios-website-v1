import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqEntry } from "@/lib/content";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";

export function FaqSection({ entries }: { entries: FaqEntry[] }) {
  return (
    <section id="faq" className="mx-auto max-w-4xl scroll-mt-24 px-4 py-20 sm:px-6 md:py-28">
      <Reveal>
        <SectionHeader
          tc="01:30"
          name="FAQ"
          heading="Questions before the first batch."
        />
      </Reveal>

      <Reveal>
        <Accordion type="single" collapsible className="border-t border-[#232228]">
          {entries.map((entry, i) => (
            <AccordionItem
              key={entry.question}
              value={`q-${i}`}
              className="border-b border-[#232228]"
            >
              <AccordionTrigger className="group flex w-full items-center justify-between gap-6 py-5 text-left">
                <span className="flex items-baseline gap-4">
                  <span className="measure hidden text-[10px] tracking-[0.18em] text-[#817f95] sm:inline">
                    Q{String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] leading-snug font-medium text-[#f2f1f5] transition-colors duration-200 ease-out group-hover:text-[#9061f9] md:text-base">
                    {entry.question}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="measure shrink-0 text-[15px] text-[#7c3aed] transition-transform duration-300 ease-out group-data-[state=open]:rotate-45"
                >
                  +
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <p
                  className="max-w-[62ch] text-[14px] leading-relaxed text-[#8e8c99]"
                  dangerouslySetInnerHTML={{ __html: entry.answer }}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}
