/**
 * Direction contract — emitted as a real HTML comment so it survives the
 * production build and can be grepped in the output. See new-work.md §5.
 */
export function DirectionContract() {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `<!--
THESIS: the page IS a timeline — a scroll-progress playhead scrubber runs
across the top, section labels are burned-in timecodes, and every clip
previews like footage in a source monitor. It refuses the templated SaaS
portfolio: no gradient blobs, no icon tiles, no nested cards, no springs.
OWN-WORLD: tinted near-black #0B0B0E, single flat violet #7C3AED accent,
hairline #232228 dividers, Space Grotesk display with IBM Plex Mono doing
real measurement work (timecodes, filenames, durations).
STORY: a first-time visitor sees proof of craft in motion within seconds,
understands the one offer (long-form in, platform-ready clips out), and
leaves a qualifying message at the end of the reel.
FIRST VIEWPORT: fixed scrubber + nav at the top; left column carries the
brandmark lockup, the offer headline, and two actions (see the work /
get a quote); right column is a 9:16 source monitor playing the hero clip.
FORM: brief-pinned world — NLE timeline vocabulary per branding/style.md;
no concept roll needed (direction pinned by the client's own style guide).
FINISH: unreviewed and undocumented is unfinished; this build ends with
the finish review, the verdict, and DESIGN.md.
-->`,
      }}
    />
  );
}
