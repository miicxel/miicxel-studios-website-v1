"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Drag-to-reveal before/after comparison. after_video is the base layer,
 * before_video the top, clipped so the handle position marks the split:
 * before on the left, after on the right — matching the pinned BEFORE /
 * AFTER label positions. Both clips play muted and in sync near the viewport
 * (autoplay and drift-correction are skipped under prefers-reduced-motion;
 * dragging and keyboard still work — they're discrete user actions, not
 * decorative motion).
 */
export function CompareSlider({
  before,
  after,
  className = "",
}: {
  before: string;
  after: string;
  className?: string;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const afterRef = useRef<HTMLVideoElement>(null);
  const beforeRef = useRef<HTMLVideoElement>(null);
  const dragging = useRef(false);
  const reduceMotion = useReducedMotion();
  const [pos, setPos] = useState(50);
  const [beforeReady, setBeforeReady] = useState(false);
  const [afterReady, setAfterReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [inView, setInView] = useState(false);

  const updatePosFromClientX = (clientX: number) => {
    const box = boxRef.current;
    if (!box) return;
    const rect = box.getBoundingClientRect();
    const p = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setPos(p);
  };

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px 0px", threshold: 0.01 }
    );
    observer.observe(box);
    return () => observer.disconnect();
  }, []);

  // Start both layers together shortly before the comparison enters view and
  // pause them offscreen. Driven from an effect, not autoplay attributes:
  // prefers-reduced-motion is unknown before hydration.
  useEffect(() => {
    const after = afterRef.current;
    const before = beforeRef.current;
    if (!after || !before) return;

    const pause = () => {
      after.pause();
      before.pause();
    };
    if (reduceMotion || !inView) {
      pause();
      return;
    }

    const startIfReady = () => {
      if (after.readyState < 1 || before.readyState < 1) return;
      after.play().catch(() => {});
      before.play().catch(() => {});
    };
    startIfReady();
    after.addEventListener("loadedmetadata", startIfReady);
    before.addEventListener("loadedmetadata", startIfReady);
    return () => {
      after.removeEventListener("loadedmetadata", startIfReady);
      before.removeEventListener("loadedmetadata", startIfReady);
      pause();
    };
  }, [inView, reduceMotion]);

  // Drift correction — the after layer is the leader; pull the follower back
  // when it drifts more than ~0.1s. Correcting by less than that each frame
  // only fights the browser's own sync. Skipped under reduced motion.
  const onLeaderTime = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    if (reduceMotion || !inView) return;
    const leader = e.currentTarget;
    const follower = beforeRef.current;
    if (!follower) return;
    if (Math.abs(follower.currentTime - leader.currentTime) > 0.1) {
      follower.currentTime = leader.currentTime;
    }
  };

  return (
    <div
      ref={boxRef}
      className={`relative aspect-[9/16] cursor-col-resize touch-none select-none overflow-hidden border border-[#232228] bg-[#0e0e12] ${className}`}
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        updatePosFromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging.current) updatePosFromClientX(e.clientX);
      }}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
      onLostPointerCapture={() => (dragging.current = false)}
    >
      {/* Base layer — after (visible right of the handle) */}
      <video
        ref={afterRef}
        src={after}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
        onLoadedData={() => setAfterReady(true)}
        onError={() => setFailed(true)}
        onTimeUpdate={onLeaderTime}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Top layer — before (clipped back to the left of the handle).
          inset(top right bottom left); clipping from the right keeps the
          left portion, i.e. before shows exactly up to the handle. */}
      <video
        ref={beforeRef}
        src={before}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
        onLoadedData={() => setBeforeReady(true)}
        onError={() => setFailed(true)}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />

      {/* BEFORE / AFTER — burned-in chips pinned to the edges, not the handle */}
      <span className="timecode burned absolute top-2 left-2 z-10 rounded-[2px] px-1.5 py-0.5 text-[9px]">
        BEFORE
      </span>
      <span className="timecode burned absolute top-2 right-2 z-10 rounded-[2px] px-1.5 py-0.5 text-[9px]">
        AFTER
      </span>

      {/* Handle — a draggable violet divider with opposing chevrons. */}
      <div
        role="slider"
        tabIndex={0}
        aria-label="Drag to compare before and after"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        aria-valuetext={`${Math.round(pos)}% before, ${100 - Math.round(pos)}% after`}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            e.preventDefault();
            setPos((p) =>
              Math.min(100, Math.max(0, p + (e.key === "ArrowLeft" ? -5 : 5)))
            );
          }
        }}
        className="absolute inset-y-0 z-10 w-[3px] -translate-x-1/2 bg-[#7c3aed] outline-none focus-visible:ring-2 focus-visible:ring-[#9061f9]"
        style={{ left: `${pos}%` }}
      >
        <span
          aria-hidden
          className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-[2px] rounded-[2px] border border-[#232228] bg-[#16161b] px-[3px] py-[1px]"
        >
          <svg width="5" height="9" viewBox="0 0 5 9" fill="none" aria-hidden>
            <path d="M4.5 1 1.5 4.5 4.5 8" stroke="#7c3aed" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <svg width="5" height="9" viewBox="0 0 5 9" fill="none" aria-hidden>
            <path d="M.5 1l3 3.5L.5 8" stroke="#7c3aed" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </span>
      </div>

      {/* Loading veil until both layers interrogate */}
      {(failed || !beforeReady || !afterReady) && (
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-[#0e0e12]/60">
          <span className="timecode text-[10px] text-[#817f95]">
            {failed ? "CLIP UNAVAILABLE" : "LOADING CLIP"}
          </span>
        </div>
      )}
    </div>
  );
}
