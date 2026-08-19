# Miicxel Studios — Copy Rules

Binding rules for any text on this site, the same way branding/style.md
binds the visual system. Read this before touching copy in any
component or content file.

---

## The Core Problem to Fix

Long paragraph blocks read as generic AI copy even when the underlying
information is accurate. The fix isn't "sound more human" — it's
**scannability**. Assume every visitor reads only headlines and the
first 4-5 words of each line before deciding whether to keep reading.
Write for that reader, not the one who reads every word.

## Hard Rules

- **No sentence over ~14 words** unless splitting it would be more
  awkward than keeping it.
- **No paragraph over 3 lines** at normal viewport width. If it runs
  longer, it should be a list instead.
- **One idea per line.** If a sentence has two ideas, it's two
  sentences.
- **Lead with the concrete noun or number, not a warm-up clause.**
  Cut phrases like "In today's fast-paced world," "It's important to
  note that," "At the end of the day." They add no information.
- **Every heading must survive alone.** Cover everything below it and
  ask: does this heading alone tell someone what they'll get? If not,
  rewrite it.
- **Active voice, concrete verbs.** "We turn long-form into clips" not
  "Long-form content is transformed into clips."
- **No em dashes as a crutch for every third sentence.** Use a period.
  Reserve the dash for when it's actually doing something a period
  can't.
- **Numbers over adjectives where possible.** "3-day turnaround" beats
  "fast turnaround."

## Voice Check

Before finalizing any line, ask: would a real solo editor actually say
this out loud to a client on a call? If it sounds like a slide deck or
a press release, rewrite it. The brand voice is premium and quiet, not
loud — but quiet doesn't mean padded. Quiet means confident enough to
say less.

## Structure Priority (what gets read, in order)

1. H1 / hero headline — the single highest-leverage line on the site.
   Must communicate the entire value prop alone.
2. Section headlines (H2s) — each must work as a standalone scan path
   if someone reads only these top to bottom.
3. Subheads / one-line section descriptions — one sentence, no more.
4. Body copy — shortest version that's still accurate. If in doubt,
   cut, don't pad.
5. Microcopy (buttons, labels, form hints) — verbs, not nouns. "Send
   the reel" not "Submission."

## On-Page SEO Basics (not optional, low-effort, do these)

- One H1 per page — currently the hero headline should be the only H1;
  every other heading is H2/H3 in strict order, no skipped levels.
- The `<title>` and meta description in layout.tsx should include the
  actual service + niche keywords a coach or consultant would search:
  "short-form video editing," "content repurposing," "for coaches and
  consultants" — not just the brand name.
- Every img/video that needs one gets a real aria-label or alt text
  describing what it shows, not "video1" or empty.
- Section IDs (already in place: #work, #proof, #hooks, #service,
  #pricing, #about, #faq, #start) should stay as real words, not
  generic anchors — they already are, keep this pattern.

## Self-Check Before Committing Any Copy Change

For every block of text you're about to write or edit, answer:
- Could someone get the point from just the first 5 words?
- Is there a shorter way to say this that loses no real information?
- Would this survive being read upside down in 2 seconds?

If any answer is no, revise before committing.
