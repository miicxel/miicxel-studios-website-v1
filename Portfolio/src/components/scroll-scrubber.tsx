"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";
import { useReducedMotion } from "framer-motion";

const REEL_TOTAL = 114; // seconds — the page maps scroll progress to a reel's runtime

function formatTc(seconds: number): string {
  const s = Math.max(0, Math.min(REEL_TOTAL, seconds));
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}

/**
 * Signature element — the page behaves like a timeline. A fixed scrub bar
 * fills with scroll progress; the playhead tracks it and the nav readout
 * shows the current reel timecode. Like a real timeline, it is seekable:
 * click or drag anywhere on the bar to jump the page to that position.
 */
export function ScrollScrubber() {
  const { scrollYProgress } = useScroll();
  const fill = useTransform(scrollYProgress, (v) => v);
  const barRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const dragging = useRef(false);

  const seekTo = (clientX: number) => {
    const bar = barRef.current;
    if (!bar) return;
    const rect = bar.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const top = (document.documentElement.scrollHeight - window.innerHeight) * p;
    window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
  };

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (barRef.current) {
      barRef.current.setAttribute("aria-valuenow", String(Math.round(v * REEL_TOTAL)));
    }
  });

  return (
    <div
      ref={barRef}
      role="slider"
      aria-label="Page position. Click or drag to seek."
      aria-valuemin={0}
      aria-valuemax={REEL_TOTAL}
      aria-valuenow={0}
      tabIndex={0}
      className="fixed inset-x-0 top-0 z-[70] h-[3px] cursor-pointer bg-[#232228] focus-visible:ring-2 focus-visible:ring-[#9061f9] focus-visible:ring-offset-0"
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        seekTo(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging.current) seekTo(e.clientX);
      }}
      onPointerUp={() => (dragging.current = false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
          e.preventDefault();
          const step = e.key === "ArrowLeft" ? -0.02 : 0.02;
          const top = (document.documentElement.scrollHeight - window.innerHeight) * step;
          window.scrollBy({ top, behavior: reduceMotion ? "auto" : "smooth" });
        } else if (e.key === "Home") {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
        } else if (e.key === "End") {
          e.preventDefault();
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: reduceMotion ? "auto" : "smooth",
          });
        }
      }}
    >
      <motion.div
        className="absolute inset-y-0 left-0 w-full origin-left bg-[#7c3aed]"
        style={{ scaleX: fill }}
      />
      <motion.div
        className="absolute inset-y-[-2px] w-[2px] bg-[#9061f9]"
        style={{ left: useTransform(scrollYProgress, (v) => `${v * 100}%`), x: "-50%" }}
      />
    </div>
  );
}

/** Live timecode of the page reel — rendered inside the nav transport. */
export function TimecodeReadout() {
  const { scrollYProgress } = useScroll();
  const current = useTransform(scrollYProgress, (v) => formatTc(v * REEL_TOTAL));
  const total = `${String(Math.floor(REEL_TOTAL / 60)).padStart(2, "0")}:${String(REEL_TOTAL % 60).padStart(2, "0")}`;

  return (
    <span className="measure hidden items-baseline gap-1 text-[11px] tracking-[0.18em] text-[#8e8c99] md:flex">
      <motion.span className="text-[#9061f9]">{current}</motion.span>
      <span aria-hidden>/ {total}</span>
      <span className="sr-only">
        Page position as reel timecode, current over total
      </span>
    </span>
  );
}
