# Miicxel Studios — Brand & Visual Style Guide

This file is the source of truth for how the site should look and feel.
Follow it precisely. This is a deliberate, specific design direction —
not a generic SaaS template. If any instruction below is ambiguous,
resolve it toward the subject: this is a site for a video editor, built
by editors, for people who live inside editing timelines. Let that
vocabulary show up in the actual interface, not just the copy.

---

## Explicit Anti-Patterns — Do Not Do These

These are known AI-generated design tells. Actively avoid all of them:

- **No Inter, Arial, or system-default fonts.** These are the most
  overused typefaces in AI-generated interfaces and instantly read as
  templated. Use the typefaces specified below instead.
- **No purple-to-blue gradients.** Even though violet is our accent,
  do not fade it into blue, indigo, or a rainbow wash. The accent is a
  flat, deliberate color — not a gradient.
- **No diffuse ambient glows** behind hero text or "floating" blurred
  color blobs in the background. This is one of the most recognizable
  AI-slop signatures. If we want a moment of drama in the hero, it comes
  from a *specific, functional element* (see Signature Element below),
  not a soft glow for atmosphere.
- **No pure black (`#000000`) and no pure gray text.** Every dark and
  neutral value must be tinted (see palette below) — flat pure black/gray
  reads as unfinished or AI-default.
- **No cards nested inside cards.** Use dividers, spacing, and borders
  to separate content — not boxes stacked inside other boxes.
- **No rounded-square icon tile sitting above every section heading.**
  This is a templated SaaS pattern. If an icon is needed, it earns its
  place contextually, not as decoration above a headline.
- **No bounce, elastic, or spring-overshoot easing.** All motion uses
  controlled, deliberate easing curves (see Motion section). Nothing
  should jiggle, wobble, or overshoot its target.
- **No numbered `01 / 02 / 03` markers unless the content is a true,
  literal sequence.** If we label the process steps, use timecodes
  instead (see below) — it's more specific to the subject and avoids
  the generic numbered-list look entirely.

---

## Ground It in the Subject: This Is an Editing Timeline

The signature idea for this site: **the page itself behaves like a
timeline.** Video editors live inside timelines, scrubbers, waveforms,
and timecodes all day — that vocabulary should show up structurally,
not just as a metaphor in the copy.

Concrete ways this shows up:

- **A persistent scroll-progress element styled as a playhead/scrubber**
  — a thin horizontal line (or vertical, if it fits the layout better)
  that fills as the user scrolls down the page, styled exactly like a
  timeline scrub bar in an NLE (Premiere/DaVinci), accented in violet.
  This is the signature element — the one thing that makes this page
  unmistakably *this* site.
- **Section labels use timecodes, not numbers.** Instead of "01 / 02 /
  03" for process steps, use actual timecode formatting: `00:00`,
  `00:14`, `00:31` — small, monospace, muted color, positioned like a
  timestamp burned into footage.
- **Portfolio hover states can reference waveform or scrubbing
  behavior** — e.g. a thin waveform-style line under a video thumbnail
  that animates on hover, rather than a generic scale-up-on-hover card
  effect.
- Use this vocabulary with restraint. It should feel like an intentional
  through-line, not a gimmick repeated on every single element.

---

## Color Mode

**Dark mode only.**

## Color Palette

Bold contrast: a tinted near-black base + a single vivid accent color,
used sparingly and deliberately.

| Role                  | Color                          | Notes |
|------------------------|---------------------------------|-------|
| Background (primary)   | `#0B0B0E`                       | Tinted near-black (slight blue-violet undertone) — never pure `#000` |
| Background (elevated)  | `#16161B`                       | Nav bar, elevated panels, hover surfaces |
| Text (primary)         | `#F2F1F5`                       | Warm off-white, not pure white |
| Text (secondary/muted) | `#8E8C99`                       | Tinted toward the background hue — never flat/pure gray |
| Accent (primary)       | `#7C3AED`                       | Violet — CTAs, links, the scrubber/playhead element, active states |
| Accent (hover)         | `#9061F9`                       | Slightly lighter violet for hover states, used flat — no gradient |
| Border/divider         | `#232228`                       | Hairline separators, 1px borders, tinted to match background |

The accent color is used sparingly: the scrubber/playhead, CTA buttons,
active nav state, and links. It should never fill large background
areas and never blend into a gradient.

---

## Typography

Pair a display face with a monospace face — the monospace does real
work here (timecodes, metadata, labels), not just decoration.

**Display / body face:** Space Grotesk or Geist Sans — clean, geometric,
but with enough character to avoid reading as a default system font.
Use this for headlines and body copy.

**Monospace face:** Geist Mono, JetBrains Mono, or IBM Plex Mono — used
specifically for timecodes, metadata labels, captions, and any small
UI text that references the "editing timeline" motif. This pairing
(geometric sans + mono) is what makes the type system feel like an
editing tool rather than a marketing site.

Do not use Inter. Do not use a third typeface beyond these two roles.

**Type scale guidance:**
- Hero headline: large, bold/semi-bold, tight letter-spacing, tight
  line-height
- Section headers: clear step down from hero, same display face
- Body copy: regular weight, generous line-height for dark-background
  readability
- Timecodes/labels: monospace, small, muted color, slightly wider
  letter-spacing — styled to look like they're burned into footage

---

## Layout & Spacing

**Balanced density** — enough whitespace to feel premium without going
so sparse the portfolio work feels buried.

- Consistent max-width container
- Clear, consistent vertical rhythm between sections
- Grid-based portfolio layout, separated by hairline dividers rather
  than boxed cards
- Where a container is needed, use a single flat elevated background
  (`#16161B`) with a hairline border — not a shadow-heavy card floating
  on the page

---

## Motion & Animation

**Heavy — cinematic, scroll-driven** — but controlled, not decorative.
Use Framer Motion throughout, and let every animation come from the
timeline/scrubber concept where possible.

- The scroll-progress scrubber (signature element) is the anchor for
  motion on the page — other reveals can sync to or reference its
  position
- Scroll-triggered reveals: fade + slight upward translate as the
  baseline; the hero and portfolio sections can carry more elaborate,
  purposeful reveals tied to the timeline concept (e.g. content
  "scrubbing" into place)
- Hover states: smooth, flat color/opacity transitions — no scale-bounce,
  no overshoot
- Portfolio previews: hover-to-play with a clean fade/scale transition
  into a modal, not an instant cut
- All easing should be controlled cubic-bezier curves — `ease-out` or
  custom curves that decelerate smoothly. Never spring physics with
  overshoot, never bounce.
- Motion should never come at the cost of performance — prefer
  transform/opacity animations over layout-triggering properties, and
  respect `prefers-reduced-motion`

---

## Imagery & Video

- No stock photography anywhere
- Real portfolio video is the primary visual content
- If icons are used, keep them thin-line, minimal, and used only where
  they clarify something functional — never as decorative tiles above
  headlines

---

## One-Line Summary for the AI Agent

> Dark, tinted-near-black background (`#0B0B0E`), never pure black. One
> flat violet accent (`#7C3AED`) used sparingly — no gradients, no
> ambient glows. Type pairing: Space Grotesk/Geist Sans for display and
> body, a monospace face for timecodes and metadata — never Inter. The
> page behaves like an editing timeline: a scroll-progress scrubber is
> the signature element, section labels use timecodes instead of
> numbers. Balanced whitespace, hairline dividers instead of nested
> cards. Heavy but controlled scroll-driven motion via Framer Motion —
> no bounce/spring easing, no rounded-icon-tile decoration.
