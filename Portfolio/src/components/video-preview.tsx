"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Muted, hover-to-play video preview — the portfolio's substitute for
 * thumbnails. Previews scrub back to the first frame on leave, like footage
 * in a timeline. Click handling (modal open) lives on the parent.
 */
export function VideoPreview({
  src,
  className = "",
  hoverPlay = true,
  label,
}: {
  src: string;
  className?: string;
  hoverPlay?: boolean;
  label?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video || !hoverPlay || reduceMotion) return;
    const play = () => video.play().catch(() => {});
    const pause = () => {
      video.pause();
      if (video.currentTime > 0.1) video.currentTime = 0;
    };
    const el = video.closest(".group") ?? video.parentElement;
    el?.addEventListener("mouseenter", play);
    el?.addEventListener("mouseleave", pause);
    el?.addEventListener("focusin", play);
    el?.addEventListener("focusout", pause);
    return () => {
      el?.removeEventListener("mouseenter", play);
      el?.removeEventListener("mouseleave", pause);
      el?.removeEventListener("focusin", play);
      el?.removeEventListener("focusout", pause);
    };
  }, [hoverPlay, reduceMotion]);

  return (
    <div className={`relative overflow-hidden bg-[#0e0e12] ${className}`}>
      <video
        ref={ref}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        aria-hidden
        onLoadedData={() => setReady(true)}
        onError={() => setFailed(true)}
        className="h-full w-full object-cover"
      />
      {(!ready || failed) && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0e0e12]">
          <span className="timecode text-[10px] text-[#817f95]">
            {failed ? "CLIP UNAVAILABLE" : "LOADING CLIP"}
          </span>
        </div>
      )}
      {label && (
        <span className="timecode burned absolute bottom-2 left-2 z-10 rounded-[2px] px-1.5 py-0.5 text-[10px]">
          {label}
        </span>
      )}
    </div>
  );
}
