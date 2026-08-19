"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Source monitor — the hero / before-after frame. A hairline-bordered window
 * with a mono header (source clip name + timecode), the 9:16 footage, and a
 * transport row with a waveform and playhead, like the NLE's source monitor.
 * `split` renders the BEFORE / AFTER comparison overlay used in the proof
 * section.
 */
export function VideoMonitor({
  src,
  filename,
  duration,
  className = "",
  split = false,
  autoPlay = false,
  ariaLabel,
}: {
  src: string;
  filename: string;
  duration: string;
  className?: string;
  split?: boolean;
  autoPlay?: boolean;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [tc, setTc] = useState(0);
  const [length, setLength] = useState<number | null>(null);

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const r = Math.floor(s % 60);
    return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
  };
  const current = fmt(tc);
  const total = length ? fmt(length) : duration;

  // Autoplay is driven from an effect, not the attribute: useReducedMotion
  // is unknown at first render (hydration), and removing the attribute later
  // never pauses a video that already started.
  useEffect(() => {
    if (!autoPlay || reduceMotion) return;
    const video = ref.current;
    if (!video) return;
    const start = () => video.play().catch(() => {});
    if (video.readyState >= 1) start();
    else video.addEventListener("loadeddata", start, { once: true });
    return () => video.removeEventListener("loadeddata", start);
  }, [autoPlay, reduceMotion]);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <div className={`group overflow-hidden border border-[#232228] bg-[#0e0e12] ${className}`}>
      <div className="flex items-center justify-between border-b border-[#232228] bg-[#16161b] px-3 py-1.5">
        <span className="timecode text-[10px] text-[#8e8c99]">{filename}</span>
        <span className="timecode flex items-center gap-1.5 text-[10px] text-[#817f95]">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#7c3aed]" />
          {duration}
        </span>
      </div>

      <div className="relative mx-auto aspect-[9/16] max-h-[68vh]">
        <video
          ref={ref}
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={ariaLabel ?? `${filename} preview`}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onLoadedData={(e) => {
            setReady(true);
            setLength(e.currentTarget.duration);
          }}
          onTimeUpdate={(e) => setTc(e.currentTarget.currentTime)}
          className="h-full w-full object-cover"
        />

        {split && (
          <>
            <div
              aria-hidden
              className="absolute inset-y-0 left-1/2 z-10 w-px -translate-x-1/2 bg-[#7c3aed]"
            />
            <span className="timecode burned absolute top-2 left-2 z-10 rounded-[2px] px-1.5 py-0.5 text-[9px]">
              BEFORE
            </span>
            <span className="timecode burned absolute top-2 right-2 z-10 rounded-[2px] px-1.5 py-0.5 text-[9px]">
              AFTER
            </span>
          </>
        )}

        {!playing && (
          <button
            type="button"
            onClick={toggle}
            aria-label={split ? "Play before and after comparison" : "Play preview"}
            className="absolute inset-0 z-20 flex items-center justify-center bg-transparent focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#9061f9]"
          >
            <span className="timecode burned flex items-center gap-2 rounded px-2.5 py-1.5 text-[10px] transition-transform duration-300 ease-out group-hover:scale-105">
              <span className="inline-block h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-[#9061f9]" />
              {!ready ? "LOADING CLIP" : reduceMotion ? "PLAY" : "PREVIEW"}
            </span>
          </button>
        )}
      </div>

      <div className="flex items-center gap-3 border-t border-[#232228] bg-[#16161b] px-3 py-2">
        <div aria-hidden className="relative flex-1">
          <div className="h-px w-full bg-[#232228]" />
          <div
            className="absolute top-1/2 h-[9px] w-[2px] -translate-y-1/2 bg-[#7c3aed] transition-[left] duration-150 ease-out"
            style={{
              left: `${length ? Math.min(100, (tc / length) * 100) : 38}%`,
            }}
          />
        </div>
        <span className="timecode text-[9px] text-[#817f95]">
          {current} / {total}
        </span>
      </div>
    </div>
  );
}
