/** Small pieces used by VendorRow. */
import { BadgeCheckIcon } from "@/components/ui/icons";

export function initials(name: string) {
  return name
    .replace(/[^A-Za-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

/** Gradient tile with the vendor's initials (stand-in for a logo). */
export function VendorMonogram({ name }: { name: string }) {
  return (
    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[linear-gradient(135deg,rgb(167_139_250/0.4),rgb(240_171_252/0.22),rgb(103_232_249/0.3))] font-display text-lg text-white ring-1 ring-white/15">
      {initials(name)}
    </span>
  );
}

export function VerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300/30 font-sans bg-emerald-400/10 px-2 py-0.5 text-[11px] font-medium whitespace-nowrap text-emerald-300">
      <BadgeCheckIcon className="size-3.5" /> Verified
    </span>
  );
}

/** Colour + wording for the "reported issues" figure. */
function reportTone(count: number) {
  if (count === 0) return { color: "text-emerald-300", dot: "bg-emerald-400", note: "No reports" };
  if (count <= 3) return { color: "text-amber-300", dot: "bg-amber-400", note: "Few reports" };
  return { color: "text-rose-300", dot: "bg-rose-400", note: "Multiple reports" };
}

/** Bad-feedback reports in the past 6 months. */
export function ReportStat({ count }: { count: number }) {
  const tone = reportTone(count);
  return (
    <div>
      <p className="flex items-center gap-1.5 text-[13px] font-semibold whitespace-nowrap text-white">
        <span className={`size-2 shrink-0 rounded-full ${tone.dot}`} /> {tone.note}
      </p>
      <p className="mt-1.5 flex items-baseline gap-1.5">
        <span className={`font-display text-3xl leading-none ${tone.color}`}>{count}</span>
        <span className="text-xs text-mist-400">in 6 months</span>
      </p>
    </div>
  );
}
