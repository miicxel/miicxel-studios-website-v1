# Miicxel Studios — Site

Production portfolio and lead-generation site for **Miicxel Studios**, a
short-form video repurposing service for coaches, consultants, course
creators, and personal brands.

**Stack:** Next.js (App Router) · Tailwind CSS · shadcn/ui (Radix) ·
Framer Motion · `marked` for Markdown parsing

---

## The big idea

The page behaves like an editing timeline (see `branding/style.md`):

- A **scroll-progress scrubber** sits fixed at the top of the viewport —
  the signature element. It fills as you scroll, carries a live timecode
  readout in the nav, and is **seekable**: click or drag it to jump the
  page to that point (keyboard: `←` `→` `Home` `End`).
- **Section labels are timecodes** (`00:07`, `00:22`, `01:41`…), burned-in
  mono chips — never `01 / 02 / 03` numbering.
- Portfolio items preview like footage in a **source monitor**: hover to
  play, waveform strip rising under each clip, click to open playback in a
  modal.

Design constraints that are enforced, not optional: dark-only; tinted
near-black `#0B0B0E` (never pure black); a single flat violet `#7C3AED`
accent (never gradients, never glows); no Inter/system fonts; no nested
cards; no icon tiles above headings; controlled non-overshoot easing;
`prefers-reduced-motion` respected (all motion disabled, hero video does
not autoplay).

---

## Folder structure

```
.
├── assets/                  # Source files (not served directly)
│   ├── logos/               # brandmark_full + submark_icon
│   └── videos/              # All footage (hero, edits, before/after, hooks)
├── branding/style.md        # Visual direction — the binding style guide
├── content/                 # ← ALL site content lives here (see below)
│   ├── services.md          # Services copy (core offer, process, add-ons)
│   ├── about.md             # Studio / editor copy
│   ├── faq.md               # FAQ entries
│   ├── pricing.json         # Single-clip rate + monthly tiers
│   └── portfolio.json       # Hero, clips, before/after, hook styles
├── public/
│   ├── logos/               # Optimized copies of the logos (web-ready)
│   └── videos → ../assets/videos   # Symlink; do not copy videos here
├── src/
│   ├── app/                 # layout.tsx, page.tsx, globals.css, icon.png
│   ├── components/          # Section + UI components
│   │   └── ui/              # shadcn/ui primitives (accordion, dialog, …)
│   └── lib/
│       ├── content.ts       # Server-side loaders (reads content/*)
│       └── display.ts       # Client-safe helpers (timecodes, fallbacks)
└── PRODUCT.md               # Product truth record (impeccable)
```

`public/videos` is a **symlink** to `assets/videos` — videos live in one
place only. If your host can't serve symlinks (e.g. some static hosts),
replace the symlink with a real copy: `cp -R assets/videos public/videos`.

---

## How to update content

Never touch React components to change content. Everything the page
renders comes from `content/` — edit the files, rebuild, ship.

### Add / edit portfolio clips — `content/portfolio.json`

- `general_clips` — the main portfolio grid. Add an object with an `id`,
  `video` (URL path starting `/videos/…`), `title`, `client_label`,
  `niche` (`coach` | `consultant` | `course_creator` | `personal_brand`),
  `hook`, `description`, `tags[]`, and `featured`.
- `before_after.items` — comparison rows. Each entry has matched
  `before_video` and `after_video` paths; both files must use the same
  dimensions and duration so playback stays synchronized.
- `hook_styles.items` — hook openings; `style_label` is `Simple`,
  `Advanced`, or `Podcast` (any new label becomes a new group).
- `hero.primary` / `hero.alt` — hero clip candidates.

**Placeholders:** items currently ship with `"REPLACE"` strings. The site
omits any field whose value starts with `REPLACE` and falls back to a
neutral label (`Client clip`, `Transformation clip`, niche names). Fill
them in with real copy and they replace the fallbacks automatically.

New video files go in `assets/videos/` (any subfolder). To add a duration
timecode label, add an entry to the `DURATIONS` map in
`src/lib/display.ts` (keyed by the `/videos/...` path).

Before/after masters live in `assets/videos/before-after/`. The site uses
duration-matched, audio-free 720×1280 H.264 derivatives from
`assets/videos/compare-proxies/`; `content/portfolio.json` points to those
web proxies while the masters remain untouched. Regenerate each side with
the same `<shared-seconds>` value when replacing a pair:

```bash
ffmpeg -i source.mp4 -t <shared-seconds> -an \
  -vf "scale=720:1280:flags=lanczos" \
  -c:v libx264 -preset veryfast -crf 25 -pix_fmt yuv420p \
  -movflags +faststart assets/videos/compare-proxies/output.mp4
```

### Pricing — `content/pricing.json`

Edit `single_clips` or add/remove entries in `monthly_packages`. The
`featured` flag controls which tier gets the violet border + badge. The
two notes under `notes` render at the bottom of the pricing section.

### FAQ — `content/faq.md`

Add a `### Question` line followed by the answer paragraph. The top
authoring note (`[ADJUST]`) is excluded from rendering automatically.

### Services & About — `content/services.md`, `content/about.md`

Sections are parsed by `##` headings and rendered in a fixed layout
(core offer, problem, process with timecode steps, fit, add-ons,
engagement). Keep the headings — edit the prose.

### Video files

Drop footage into `assets/videos/`, reference it from `portfolio.json`
as `/videos/<path>`. Thumbnails and photos don't exist yet; the build
uses muted hover-to-play previews instead, and intentionally renders
**no photos or headshots** (see `content/portfolio.json` →
`assets_pending`).

---

## Before launch checklist

- [ ] Fill every `"REPLACE"` value in `content/portfolio.json` (the page
      currently shows neutral fallback labels).
- [ ] Resolve the `[ADJUST]` numbers noted in `content/faq.md`
      (turnaround, revisions, minimum commitment) — the file's own note
      says to confirm these before going live.
- [ ] Wire the lead form: submission currently logs to the browser
      console only. Point the `onSubmit` in
      `src/components/lead-form.tsx` at your form provider or API route.
- [ ] Replace the placeholder rates note in `content/pricing.json`
      (`notes`) once real pricing is confirmed.

---

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # type-check + production build
npm run lint
npm start          # serve the production build
```
