import Image from "next/image";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#proof", label: "Before / after" },
  { href: "#hooks", label: "Hook styles" },
  { href: "#service", label: "Service" },
  { href: "#pricing", label: "Pricing" },
  { href: "#about", label: "About" },
  { href: "#faq", label: "FAQ" },
];

export function Footer() {
  return (
    <footer className="border-t border-[#232228] bg-[#0e0e12]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr_0.8fr] md:gap-16">
          <div>
            <Image
              src="/logos/brandmark.png"
              alt="Miicxel Studios wordmark"
              width={240}
              height={240}
              className="h-12 w-auto"
            />
            <p className="mt-5 max-w-[44ch] text-[14px] leading-relaxed text-[#8e8c99]">
              Short-form repurposing for coaches, consultants, course creators,
              and personal brands. One editor handles every clip.
              Your content looks bigger without adding headcount.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="timecode mb-5 text-[10px] text-[#817f95]">TIMELINE</p>
            <ul className="space-y-3">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[13.5px] text-[#8e8c99] transition-colors duration-200 ease-out hover:text-[#f2f1f5] focus-visible:text-[#f2f1f5]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="timecode mb-5 text-[10px] text-[#817f95]">NEXT SCENE</p>
            <p className="text-[15px] leading-relaxed text-[#c9c7d1]">
              Your long-form content is already the raw material.
              A first batch is one conversation away.
            </p>
            <a
              href="#start"
              className="mt-5 inline-block rounded-md bg-[#7c3aed] px-5 py-2.5 text-[13.5px] font-semibold text-[#f2f1f5] transition-colors duration-200 ease-out hover:bg-[#9061f9] focus-visible:ring-2 focus-visible:ring-[#9061f9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e0e12]"
            >
              Get your first batch
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-[#232228] pt-6">
          <p className="timecode text-[9px] text-[#817f95]">
            © {new Date().getFullYear()} MIIXCEL STUDIOS
          </p>
          <p className="timecode flex items-center gap-2 text-[9px] text-[#817f95]">
            <span className="inline-block h-[5px] w-[5px] bg-[#7c3aed]" />
            END OF REEL · THANKS FOR WATCHING
          </p>
        </div>
      </div>
    </footer>
  );
}
