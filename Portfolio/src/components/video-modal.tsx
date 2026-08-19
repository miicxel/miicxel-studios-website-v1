"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export type ModalMeta = { mono: string; label: string };

export function VideoModal({
  open,
  onOpenChange,
  title,
  description,
  src,
  meta,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  src: string;
  meta?: ModalMeta[];
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-sm gap-0 overflow-hidden rounded-xl border border-[#232228] bg-[#0b0b0e] p-0 sm:max-w-md"
        aria-describedby={description ? undefined : undefined}
      >
        <div className="flex items-center justify-between border-b border-[#232228] bg-[#16161b] px-4 py-2.5">
          <span className="timecode text-[10px] text-[#8e8c99]">PROGRAM · CLIP PLAYBACK</span>
        </div>
        <div className="mx-auto aspect-[9/16] w-full max-w-[340px] bg-[#0e0e12]">
          <video
            src={src}
            controls
            autoPlay
            loop
            playsInline
            preload="metadata"
            aria-label={title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="border-t border-[#232228] px-5 py-4">
          <DialogHeader className="gap-1.5">
            <DialogTitle className="font-sans text-[15px] leading-snug font-medium text-[#f2f1f5]">
              {title}
            </DialogTitle>
            {description && (
              <DialogDescription className="text-[13px] leading-relaxed text-[#8e8c99]">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
          {meta && meta.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t border-[#232228] pt-3">
              {meta.map((m) => (
                <span key={m.mono} className="timecode text-[10px] text-[#817f95]">
                  {m.label} <span className="text-[#8e8c99]">{m.mono}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
