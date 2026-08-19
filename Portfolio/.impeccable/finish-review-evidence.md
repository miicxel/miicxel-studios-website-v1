# Finish review evidence packet — Miicxel Studios portfolio build

Supplement to the screenshots. The build thread's model cannot read images,
so this packet carries the measurable facts a reviewer needs. The screenshots
listed below exist and were captured from the production build at
http://localhost:3333 (Next.js 16 static prerender, Chromium headless).

## Screenshots
- /tmp/miicxel-shots/desktop-full.png (1440x900 viewport, full page)
- /tmp/miicxel-shots/desktop-hero.png, desktop-work.png, desktop-proof.png,
  desktop-hooks.png, desktop-service.png, desktop-pricing.png,
  desktop-about.png, desktop-faq.png, desktop-start.png
- /tmp/miicxel-shots/mobile-full.png, mobile-hero.png, mobile-work.png,
  mobile-service.png, mobile-pricing.png, mobile-start.png (390x844 viewport)

## Automated audit (Playwright, 23/23 pass)
sections present in order; no horizontal overflow at 1440 and 390;
scrubber fill scaleX follows scroll (0 -> 0.196 after 3000px); hero video
autoplays muted (1080x1920, t advances) but does NOT autoplay under
prefers-reduced-motion; portfolio hover-to-play advances playback; waveform
bars scale to 1 on hover; modal opens with playing video on click, Escape
closes; 4 before/after monitor rows with BEFORE/AFTER split overlay; 5 hook
style videos in 3 groups; pricing: 3 tiers + FEATURED badge + $499/$749/$999
and $79-$149 single clip all rendered; FAQ accordion: 10 questions, opens;
form: empty submit shows "Enter your name."/"Enter your email.", bad email
shows format error, valid submit shows success state; Tab produces visible
focus ring; footer brandmark present; mobile hero renders.

## Detector (impeccable detect.mjs on served HTML)
1 finding, advisory: "Em-dash overuse" — 65 em-dashes. This is the client's
own copy verbatim from content/services.md, content/about.md, content/faq.md
(marked as source of truth; rewriting it would violate the brief). Kept as-is.

## Contrast (WCAG ratios, computed)
#F2F1F5 on #0B0B0E 17.48:1; #8E8C99 on #0B0B0E 5.95:1; #8E8C99 on #16161B
5.46:1; #F2F1F5 on #7C3AED 5.07:1; #C9C7D1 on #0B0B0E 11.77:1; tertiary
#817F95 on #0B0B0E 5.06:1, on #16161B 4.64:1; #9061F9 on #0B0B0E 4.93:1.
All text >= 4.5:1.

## Palette compliance (vs branding/style.md)
- Background #0B0B0E, elevated #16161B, text #F2F1F5, muted #8E8C99,
  accent #7C3AED, accent hover #9061F9, border #232228 — exactly the pinned
  values, no pure black, no pure gray, no gradients anywhere.
- Type: Space Grotesk (display/body) + IBM Plex Mono (timecodes, metadata,
  filenames, durations) via next/font, self-hosted. Inter/Geist/Arial absent.
- Signature element: fixed top scrubber (3px track #232228, violet #7C3AED
  fill, #9061F9 playhead tick) + nav timecode readout (current/total reel
  time) + section labels as burned-in timecode chips (00:07, 00:22, 00:38,
  00:49, 01:05, 01:19, 01:30, 01:41) + process steps labeled with timecodes
  instead of 01/02/03.
- No nested cards: portfolio grid uses hairline dividers; pricing tiers live
  in one flat panel with vertical hairlines; no icon tiles above headings.
- Motion: controlled cubic-bezier [0.22,1,0.36,1] reveals; no springs;
  MotionConfig reducedMotion="user"; CSS media query kills all transitions
  under prefers-reduced-motion.

## Data integrity
- All video paths in content/portfolio.json verified to resolve (200s).
- Placeholders: portfolio.json ships "REPLACE" strings; per confirmed user
  answer, rendered as neutral fallbacks ("Client clip", "Transformation
  clip", niche labels) with REPLACE strings omitted; README documents how to
  fill them in.
- No photos/headshots/avatars anywhere (none exist in assets).
- No testimonials section (intentionally omitted per brief).
- All prose on the page is verbatim from content/*.md — nothing invented.

## Direction contract (in build, greppable: THESIS/FINISH found in served HTML)
THESIS: the page IS a timeline. OWN-WORLD: tinted near-black, flat violet,
hairline dividers, Space Grotesk + IBM Plex Mono. STORY: proof of craft in
motion, one offer understood, qualifying message at the end of the reel.
FIRST VIEWPORT: scrubber + nav top; brandmark lockup, offer headline, two
actions left; 9:16 source monitor playing hero clip right. FORM:
brief-pinned world — NLE timeline vocabulary per branding/style.md; no
concept roll (direction pinned by the client's own style guide, so no seed
key was printed; the contract names this).
