"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { TimecodeReadout } from "@/components/scroll-scrubber";

const EASE = [0.22, 1, 0.36, 1] as const;

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#service", label: "Service" },
  { href: "#pricing", label: "Pricing" },
  { href: "#about", label: "About" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const openMenu = () => {
    setOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeMenu = () => {
    setOpen(false);
    document.body.style.overflow = "";
  };

  // The header's own links (logo, "Get a quote") and every link inside the
  // mobile drawer are handled manually instead of through the browser's
  // native anchor-scroll, and deliberately close the menu *after* the scroll
  // settles rather than in the same handler. Both parts matter, confirmed by
  // isolated testing: calling `setOpen(false)` — which unmounts the drawer
  // via AnimatePresence — in the same synchronous handler as
  // `scrollIntoView()` reproducibly drops the scroll entirely (no movement
  // at all, not even instant/behavior:"auto" ones), even when the state
  // update is deferred a tick with setTimeout(0). It isn't a timing nicety;
  // the two simply can't be triggered from the same call stack. Waiting for
  // the browser's own `scrollend` event avoids the whole class of race.
  const navigateTo = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    document.querySelector(hash)?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
    window.history.pushState(null, "", hash);

    if (reduceMotion) {
      closeMenu();
      return;
    }
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      window.removeEventListener("scrollend", finish);
      closeMenu();
    };
    window.addEventListener("scrollend", finish, { once: true });
    setTimeout(finish, 1200); // safety net if scrollend never fires
  };

  // Escape closes the menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Close automatically if the viewport grows back to desktop width.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => closeMenu();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Safety net: if this component ever unmounts while the menu is open,
  // don't leave the rest of the site permanently unscrollable.
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-[3px] z-[60] border-b border-[#232228] bg-[#16161B]">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a
          href="#top"
          onClick={(e) => navigateTo(e, "#top")}
          className="group flex items-center gap-2.5"
        >
          <Image
            src="/logos/submark.png"
            alt="Miicxel Studios submark"
            width={28}
            height={28}
            className="h-7 w-7"
          />
          <span className="measure text-[12px] font-medium tracking-[0.22em] text-[#F2F1F5] uppercase">
            Miicxel<span className="text-[#8e8c99]"> Studios</span>
          </span>
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-6 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium text-[#8e8c99] transition-colors duration-200 ease-out hover:text-[#f2f1f5] focus-visible:text-[#f2f1f5]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:gap-5">
          <TimecodeReadout />
          <a
            href="#start"
            onClick={(e) => navigateTo(e, "#start")}
            className="rounded-md bg-[#7c3aed] px-4 py-2 text-[13px] font-semibold text-[#f2f1f5] transition-colors duration-200 ease-out hover:bg-[#9061f9] focus-visible:ring-2 focus-visible:ring-[#9061f9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#16161B]"
          >
            Get a quote
          </a>
          <button
            type="button"
            onClick={() => (open ? closeMenu() : openMenu())}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#232228] text-[#f2f1f5] transition-colors duration-200 ease-out hover:border-[#7c3aed] hover:text-[#9061f9] focus-visible:ring-2 focus-visible:ring-[#9061f9] md:hidden"
          >
            {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25, ease: EASE }}
            className="overflow-hidden border-t border-[#232228] bg-[#16161B] md:hidden"
          >
            <nav aria-label="Sections" className="flex flex-col px-4 py-2 sm:px-6">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => navigateTo(e, link.href)}
                  className="border-b border-[#232228] py-3.5 text-[14px] font-medium text-[#8e8c99] transition-colors duration-200 ease-out last:border-b-0 hover:text-[#f2f1f5]"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
