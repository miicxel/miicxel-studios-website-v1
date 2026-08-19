const BARS = [
  0.45, 0.8, 0.3, 0.95, 0.6, 0.75, 0.28, 0.9, 0.55, 0.7, 0.4, 0.85, 0.65, 0.5,
  0.8, 0.35, 0.95, 0.6, 0.75, 0.3, 0.85, 0.5, 0.7, 0.9,
];

/**
 * A thin waveform strip — the NLE's audio track. Bars stand at low height and
 * rise together when the parent group is hovered.
 */
export function Waveform({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`flex h-6 items-end justify-between gap-[2px] ${className}`}
    >
      {BARS.map((h, i) => (
        <span
          key={i}
          className="w-[2px] origin-bottom scale-y-[0.3] bg-[#4a4961] transition-transform duration-500 ease-out group-hover:scale-y-100 group-hover:bg-[#7c3aed]"
          style={{
            height: `${h * 100}%`,
            transitionDelay: `${i * 12}ms`,
          }}
        />
      ))}
    </div>
  );
}
