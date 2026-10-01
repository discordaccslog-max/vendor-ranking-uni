/** Circular rank number. Rank 1 is highlighted. */
export function RankBadge({ rank, size = "md" }: { rank: number; size?: "md" | "lg" }) {
  const top = rank === 1;
  const dims = size === "lg" ? "size-14 text-2xl" : "size-11 text-lg";
  return (
    <span
      aria-label={`Rank ${rank}`}
      className={`grid shrink-0 place-items-center rounded-full font-extrabold ${dims} ${
        top ? "bg-brand-500 text-white shadow-md shadow-brand-500/30" : "bg-ink-100 text-ink-700 ring-1 ring-ink-200"
      }`}
    >
      {rank}
    </span>
  );
}
