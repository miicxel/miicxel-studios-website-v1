---
name: Miicxel Studios — The Page as a Reel
description: Dark-only, NLE-timeline portfolio — tinted near-black, one flat violet accent, hairline dividers, mono measurement.
colors:
  near-black: "#0b0b0e"
  video-well: "#0e0e12"
  elevated: "#16161b"
  featured-surface: "#1a1a21"
  warm-white: "#f2f1f5"
  muted-lavender: "#8e8c99"
  dim-lavender: "#817f95"
  pale-lavender: "#c9c7d1"
  violet: "#7c3aed"
  violet-lift: "#9061f9"
  hairline: "#232228"
  alert-red: "#e5484d"
typography:
  display:
    fontFamily: "Space Grotesk"
    fontSize: "2.5rem / 3.2rem / 3.6rem (base / sm / md steps)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Space Grotesk"
    fontSize: "1.875rem / 2.6rem (base / md)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Space Grotesk"
    fontSize: "1.5rem / 1.9rem (base / md)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Space Grotesk"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "IBM Plex Mono"
    fontSize: "10px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.22em"
    fontFeature: "tabular-nums"
rounded:
  xs: "2px"
  sm: "6.4px"
  md: "8px"
  lg: "11.2px"
spacing:
  xxs: "6px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "20px"
  xl: "24px"
  2xl: "32px"
  3xl: "40px"
  4xl: "48px"
  5xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.violet}"
    textColor: "{colors.warm-white}"
    rounded: "{rounded.sm}"
    padding: "20px 24px"
  button-primary-hover:
    backgroundColor: "{colors.violet-lift}"
  button-secondary:
    backgroundColor: "{colors.elevated}"
    textColor: "{colors.warm-white}"
    rounded: "{rounded.sm}"
    padding: "20px 24px"
  chip-burned:
    backgroundColor: "rgba(11, 11, 14, 0.78)"
    textColor: "{colors.muted-lavender}"
    rounded: "{rounded.xs}"
    padding: "6px 8px"
  input-field:
    backgroundColor: "{colors.near-black}"
    textColor: "{colors.warm-white}"
    rounded: "{rounded.sm}"
    height: "44px"
  nav-bar:
    backgroundColor: "{colors.elevated}"
    height: "56px"
  panel:
    backgroundColor: "{colors.elevated}"
    rounded: "{rounded.md}"
    padding: "28px"
  panel-featured:
    backgroundColor: "{colors.featured-surface}"
  video-monitor:
    backgroundColor: "{colors.video-well}"
---

# Design System: Miicxel Studios — The Page as a Reel

## Overview

**Creative North Star: "The Page as a Reel"**

The site is built to *be* an NLE timeline, not to look like one. A fixed scroll-progress scrubber runs across the very top of the viewport, styled as a timeline scrub bar: a hairline track, a violet fill that advances linearly with scroll position, and a lighter-violet playhead. Scroll position is literally a timecode — the page maps itself to a 114-second reel, and the nav's transport readout ticks `00:00 / 01:54` as you move through it. Sections are labeled with burned-in timecode chips (00:07, 00:22, 01:41), process steps advance by timecode, and footage behaves like footage in an editor: portfolio clips play on hover and scrub back to frame zero on leave, while paired before/after clips run together behind a draggable reveal. Filenames, durations, and state labels read out in mono.

The personality is a single craftsperson's shop, not an agency: quiet, premium, operational. Density is balanced — enough whitespace to feel expensive, tight enough that the work stays the point. The page carries exactly one accent color, used on functional elements only, and separates everything with 1px hairlines rather than nested boxes. Drama comes from one specific, functional element — the scrubber and the source monitor — never from ambient glow. There are no stock photos, no testimonial carousels, no gradient washes, no icon tiles above headings, and no springs: every motion is a controlled ease-out or linear fill, and the whole system honors `prefers-reduced-motion` down to a global CSS kill-switch.

**Key Characteristics:**
- The page is a timeline: scrubber playhead, timecode section labels, transport readout, source-monitor previews, and a synchronized comparison reveal.
- Dark-only, tinted near-black; a single flat violet accent used sparingly and functionally.
- Hairline `#232228` separators; flat elevated panels; zero shadows; zero nested cards.
- Space Grotesk display/body + IBM Plex Mono doing real measurement work (timecodes, filenames, durations, labels).
- Controlled motion only — linear scrubber fill, short ease-out strokes, no overshoot; `prefers-reduced-motion` respected.

## Colors

A near-black base tinted toward blue-violet, a warm off-white foreground, and a single flat violet accent that appears only where it does work.

### Primary
- **Flat Violet** (#7c3aed): the one accent. Used on the scrubber fill, playheads, record dots, primary CTAs, active nav/links, list markers, the featured tier's top rule, and selection highlight. It fills nothing, never large background areas, never blends into a gradient.
- **Lifted Violet** (#9061f9): hover and focus states of everything violet — button hover, link color, playhead in the scrubber, focus rings, the running timecode readout.

### Neutral
- **Tinted Near-Black** (#0b0b0e): page background, input surfaces. Never pure `#000`.
- **Video Well** (#0e0e12): the stage behind footage — monitor frames, preview wells, modal video area, footer. One step lighter than the page, one step darker than surfaces.
- **Elevated Surface** (#16161b): flat panels — nav bar, monitor headers and transports, pricing panel, section timecode chip context, input focus offsets.
- **Featured Surface** (#1a1a21): the featured pricing tier only — the single raised surface in the system.
- **Warm White** (#f2f1f5): primary text. Never pure `#fff`.
- **Muted Lavender** (#8e8c99): body copy, secondary text, section names, nav links at rest, panel labels.
- **Dim Lavender** (#817f95): the dimmest allowed text — micro-meta labels, hints, durations, caption footers, error-adjacent notes. Replaced an earlier #5c5b68 because it fell below 3:1 contrast on the near-black background.
- **Pale Lavender** (#c9c7d1): slightly-brightened body text inside pricing tiers and footer prose — a middle step between muted and warm white.
- **Hairline** (#232228): every border and divider, tinted toward the background hue. Never pure gray.
- **Alert Red** (#e5484d): validation errors and error focus rings only — nothing else in the system uses red.

### Named Rules
**The Flat Violet Rule.** The accent is one flat violet, and it is earned: scrubber fill, playhead, CTAs, record dots, active states, links. Never as a gradient, never as an ambient glow, never filling a surface.

**The Readability Floor Rule.** No text falls below 3:1 contrast against the near-black background — #817f95 is the dimmest text allowed. Foreground is #f2f1f5, never pure white; dark values are tinted, never pure black.

## Typography

**Display Font:** Space Grotesk (latin, `display: swap`)
**Body Font:** Space Grotesk
**Label/Mono Font:** IBM Plex Mono, weights 400/500/600 — timecodes, filenames, durations, and uppercase labels

**Character:** A clean geometric sans paired with a monospace that does real measurement work. The mono is not decoration: it renders the timecodes, clip names, durations, and metadata that the timeline vocabulary depends on, always with tabular numerals so columns of numbers line up.

### Hierarchy
- **Display** (600, 2.5rem → 3.2rem → 3.6rem at sm/md, 1.05, -0.025em): the hero offer headline only — tight, large, near-locked line height.
- **Headline** (600, 1.875rem → 2.6rem at md, 1.08, -0.02em): section headings, one clear step down from the hero.
- **Title** (500, 1.5rem → 1.9rem at md, 1.15, -0.015em): sub-headings inside sections — process intros, about pull-quotes, pricing callouts.
- **Body** (400, 15px, 1.75): paragraphs and prose; 14px at 1.6–1.75 for dense meta copy; max line length 56–68ch.
- **Label** (mono 500, 9–11px, 0.22em, uppercase, tabular-nums): timecode chips, section names, clip filenames, durations, hints, footer headers — always uppercase with wide tracking, styled like text burned into footage. A tighter 0.18em mono variant is used for nav wordmarks and inline readouts.
- **Measure** (mono 400/500, 10–11px, tabular-nums): pure numeric readouts — the transport timecode `00:00 / 00:08`, page-reel position, clip counts.

### Named Rules
**The Measurement Rule.** IBM Plex Mono renders measurement and metadata only — timecodes, filenames, durations, uppercase labels, numerals — always with tabular numerals. If mono text isn't measuring something, it doesn't belong.

**The Two-Face Rule.** Exactly two typefaces: Space Grotesk and IBM Plex Mono. Never Inter, never a third face, never a system fallback as a primary.

## Layout

A single container at `max-w-6xl` (1152px) with `px-4` padding expanding to `px-6` at sm. Vertical rhythm is `py-20` per section, expanding to `py-28` at md; section headers sit `mb-12` below a full-width hairline rule. Anchored sections carry `scroll-mt-24` to clear the fixed chrome.

Fixed chrome stacks at the top: the 3px scroll scrubber (`z-70`) and the 56px nav bar (`z-60`, `top-[3px]`, elevated surface with a hairline bottom border). The first viewport is a two-column grid (`1.15fr / 0.85fr` at md): left column carries the brandmark, the display headline, body copy, the two actions, and an audience line in mono; right column is the 9:16 source monitor (max ~300–320px wide).

The portfolio grid is 1 → 2 → 3 columns at sm/lg. Its previews are column-width constrained (`w-full`) with a true 9:16 aspect ratio and no competing max-height. The before/after section is a full-width list of hairline-separated rows; at md each row becomes a `minmax(0, 380px) / 1fr` grid with a 9:16 comparison slider capped at 340px and the proof copy alongside it. Hook styles are a horizontally-scrolling strip of 9:16 previews grouped under mono headers. The pricing panel is a flat elevated surface whose tiers are separated by vertical hairlines (`divide-x` at lg) instead of card borders. Source monitors retain a viewport-aware height cap (`max-h-[68vh]`), and modal video is width-capped at 340px.

Scroll-triggered reveals fade in with a slight upward translate (18px), fire once, and trigger 72px before the element enters the viewport (`viewport margin: -72px`).

### Named Rules
**The Timeline Rule.** The page is a reel. Scroll progress is a playhead, sections are timecoded clips, and labels read as footage metadata. Label sections and true sequences with timecodes, never `01 / 02 / 03`; zero-padded mono numerals are reserved for literal enumerated lists (FAQ Q01, add-on rows, problem items).

## Elevation & Depth

The system is flat by construction: no shadows exist anywhere. Depth is conveyed exclusively through tonal layering and hairlines — the page background (#0b0b0e) steps up to the video well (#0e0e12) behind footage, up to elevated surfaces (#16161b) for nav, monitor chrome, and panels, and up once more to the featured surface (#1a1a21) for a single featured tier. Every boundary is a 1px #232228 hairline.

### Named Rules
**The Hairline Rule.** Separate with hairlines, spacing, and flat tonal steps — never with shadows and never with cards nested inside cards. One flat elevated background (#16161b) with a hairline border replaces the shadowed card everywhere.

## Shapes

A squared, instrument-like form language: corners stay small and the only recurring "geometry" comes from the NLE vocabulary. Timecode chips and tags are near-square (2px radius); burned chips sit at 2–3px. Buttons and inputs use a slight rounding (6.4px); flat panels round to 8px; the modal rounds to 11.2px — the largest radius in the system. The scrubber is a 3px bar, source-monitor playheads are 2px-wide rules, the comparison divider is a 3px flat-violet rule, and hairlines are 1px. Recurring silhouettes: 5–7px square violet markers (list bullets, status squares, count dots), one 6px round "record" dot in the monitor header, opposing chevrons on the comparison grabber, and 2px waveform bars that stand at 30% height and rise on hover. The play indicator is a pure-CSS triangle; the FAQ affordance is a text "+" that rotates 45° when open. No circular buttons, no rounded icon tiles, no gradients, no corner flourishes.

## Components

### Buttons
- **Shape:** gently rounded rectangles (6.4px), full-width optional in pricing.
- **Primary:** flat violet (#7c3aed) background, warm-white text, 20px × 10px padding. Used once per viewport region — the quote CTA in nav, hero, and footer.
- **Hover / Focus:** background lifts flat to #9061f9 on hover; focus shows a 2px #9061f9 ring offset 2px from the surface; color transitions run 200ms ease-out. No scale, no lift, no glow.
- **Secondary:** elevated-surface background with a hairline border and warm-white text; on hover the border turns violet and the text lifts to #9061f9.

### Chips
- **Timecode chip:** near-black glass (rgba(11, 11, 14, 0.78)) over footage, 1px hairline border, 2–3px radius, mono 9–11px uppercase, muted or dim-lavender text, with a violet square "status" dot for section labels. Burned directly onto footage in the source monitor (BEFORE / AFTER, LOADING CLIP, durations).
- **Tag chip:** hairline border, 2px radius, mono 9px, muted text — portfolio metadata only.

### Cards / Containers
- **Corner Style:** 8px for flat panels (pricing, form), 11.2px for the clip modal; everything else separates with hairlines instead of boxes.
- **Background:** elevated (#16161b); the single featured tier uses #1a1a21 with a 2px violet top rule.
- **Shadow Strategy:** none — see The Hairline Rule.
- **Border:** 1px #232228.
- **Internal Padding:** 28px scale (tiers `p-7`, form `p-6 sm:p-10`).

### Inputs / Fields
- **Style:** near-black fill (#0b0b0e), hairline border, 6.4px radius, 44px height (3-row textareas for long answers), 14px warm-white text, dim-lavender placeholders.
- **Focus:** 2px #9061f9 ring, border replaced by the ring.
- **Error / Disabled:** border and ring turn #e5484d; inline mono error line in the same red.

### Navigation
- Fixed 56px bar on the elevated surface with a hairline bottom border, sitting directly under the 3px scrubber. Left: submark logo + uppercase mono wordmark ("MIIXCEL STUDIOS", 12px, 0.22em). Center (md+): section links in muted lavender, hovering and focusing to warm white — color transitions only, no underline or scale. Right: the live transport timecode readout and the primary quote button. The scrubber itself is `role="slider"` — click, drag, or arrow-key/Home/End to seek the page.

### Signature Component — Scroll Scrubber
A fixed 3px bar across the top: #232228 track, violet fill that scales linearly with scroll progress (no easing — it is a measurement, not a flourish), and a 2px #9061f9 playhead riding the fill edge. Seekable via pointer and keyboard; under reduced motion it still seeks but never animates.

### Signature Component — Source Monitor
A hairline-bordered window that reads as an NLE source monitor: a mono header strip on the elevated surface carrying the clip filename (muted) and a violet record dot + duration (dim), a 9:16 video well (#0e0e12), and a transport row with a hairline scrubbing track, a 2px violet playhead that advances at 150ms ease-out, and a live `00:00 / 00:08`-style mono readout. The play affordance is a burned glass chip with a CSS play triangle; it scales to 1.05 on hover at 300ms ease-out.

### Signature Component — Compare Slider
The proof section uses a true two-layer 9:16 comparison rather than a static split monitor: the after clip is the base and the before clip is clipped to the left of a draggable 3px flat-violet divider. BEFORE and AFTER burned chips stay pinned to their respective edges; the divider carries a compact elevated-surface grabber with opposing inline-SVG chevrons. The slider supports click and pointer-captured drag, plus Left/Right keyboard steps of 5%, and exposes `role="slider"` with min, max, current, and human-readable before/after values. Both video layers are hidden from assistive technology because the slider carries the comparison semantics.

Both layers wait behind the shared loading veil until ready and fail to `CLIP UNAVAILABLE` together. They begin muted, synchronized playback only within a 200px IntersectionObserver margin, pause offscreen, and correct drift only when it exceeds about 0.1 seconds. Under `prefers-reduced-motion`, autoplay and drift correction stop while pointer and keyboard comparison remain available. Implementation context: content supplies paired `before_video` / `after_video` fields; the web layer uses duration-matched, audio-free 720×1280 H.264 faststart proxies (20MB total instead of the 478MB source set), while original source assets remain intact.

### Signature Component — Video Preview + Waveform
Hover-to-play, muted, looped previews that stand in for thumbnails: they start on `mouseenter`/`focusin`, pause and rewind to frame zero on leave. Until the clip loads, a dim-lavender "LOADING CLIP" (or "CLIP UNAVAILABLE" on error) mono label sits centered in the well; a burned timecode chip labels the bottom-left corner. Below each portfolio preview, a 24-bar waveform strip (2px bars, violet at rest #4a4961) rises from 30% to full height with 12ms per-bar stagger (500ms ease-out) and turns violet on group hover — hover is announced by the waveform, not by scaling the video.

## Do's and Don'ts

### Do:
- **Do** label sections and sequences with burned timecode chips (`00:07`, `00:22`, `01:41`) — never `01 / 02 / 03` section markers.
- **Do** use the accent only where it functions: scrubber fill, playheads, CTAs, record dots, active states, links, list markers.
- **Do** separate content with 1px #232228 hairlines and flat tonal steps (#0b0b0e → #0e0e12 → #16161b → #1a1a21) instead of shadows or nested cards.
- **Do** keep all video surfaces 9:16, let general portfolio previews take their grid column's full width without a competing height cap, and set all measurement in IBM Plex Mono with tabular numerals.
- **Do** use violet square markers (5–7px) for bullets and status; a 6px round violet dot is the only circle.
- **Do** respect `prefers-reduced-motion`: scrubber seeking stays functional but jumps; reveals and transitions collapse to near-instant.
- **Do** give every interactive element a visible 2px #9061f9 focus ring.

### Don't:
- **Don't** use gradients, ambient glows, or blurred color blobs anywhere.
- **Don't** use pure black (#000) backgrounds or pure white (#fff) text — every value is tinted; #817f95 is the dimmest text allowed.
- **Don't** nest cards inside cards, or reach for shadows where a hairline and a flat elevated surface will do.
- **Don't** use spring, bounce, elastic, or overshoot easing — controlled ease-out or linear only.
- **Don't** set text in Inter or add a third typeface.
- **Don't** put rounded icon tiles above headings; the system's only "icons" are the text "+", the CSS play triangle, and the violet dots.
- **Don't** use stock photos, avatars, or placeholder imagery — real footage previews are the visual content.
