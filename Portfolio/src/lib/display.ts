// Client-safe helpers — no node:fs, safe to import from "use client" modules.
// Server-only loaders live in lib/content.ts.

// ---------------------------------------------------------------------------
// Video metadata (duration timecodes). Static map keyed by URL path so the
// grid can show burned-in duration labels without loading every clip.
// ---------------------------------------------------------------------------

const DURATIONS: Record<string, string> = {
  "/videos/edit-01.mp4": "00:29",
  "/videos/edit-02.mp4": "00:32",
  "/videos/edit-03.mp4": "01:08",
  "/videos/compare-proxies/before-after-01-after.mp4": "00:06",
  "/videos/compare-proxies/before-after-02-after.mp4": "00:29",
  "/videos/compare-proxies/before-after-03-after.mp4": "00:15",
  "/videos/compare-proxies/before-after-04-after.mp4": "00:21",
  "/videos/hook-intro-styles/Hook-Style-Simple-01.mp4": "00:03",
  "/videos/hook-intro-styles/Hook-Style-Advanced-01.mp4": "00:06",
  "/videos/hook-intro-styles/Hook-Style-Podcast-01.mp4": "00:03",
};

export function videoTimecode(src: string): string {
  return DURATIONS[src] ?? "00:00";
}

export function fileName(src: string): string {
  return src.split("/").pop() ?? src;
}

// ---------------------------------------------------------------------------
// Placeholder handling — portfolio.json ships with "REPLACE" strings pending
// real labels. Neutral fallbacks keep the grid honest until they're filled in.
// ---------------------------------------------------------------------------

const NICHE_LABELS: Record<string, string> = {
  coach: "Coach",
  consultant: "Consultant",
  course_creator: "Course creator",
  personal_brand: "Personal brand",
};

export function isPlaceholder(value: string | undefined): boolean {
  return !value || value.trim().startsWith("REPLACE");
}

export function nicheLabel(niche: string | undefined): string {
  if (niche && NICHE_LABELS[niche]) return NICHE_LABELS[niche];
  return "Client work";
}
