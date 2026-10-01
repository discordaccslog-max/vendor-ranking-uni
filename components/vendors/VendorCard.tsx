"use client";

import Link from "next/link";
import { useState } from "react";
import type { Vendor } from "@/lib/types";
import { TrustpilotRating } from "@/components/reviews/TrustpilotRating";
import { FeedbackModal } from "@/components/vendors/FeedbackModal";
import { ArrowUpRightIcon, BadgeCheckIcon, FlagIcon, MessageIcon } from "@/components/ui/icons";

function initials(name: string) {
  return name
    .replace(/[^A-Za-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

/** Colour + wording for the "reported issues" figure. */
function reportTone(count: number) {
  if (count === 0) return { color: "text-emerald-300", dot: "bg-emerald-400", note: "No reports" };
  if (count <= 3) return { color: "text-amber-300", dot: "bg-amber-400", note: "Few reports" };
  return { color: "text-rose-300", dot: "bg-rose-400", note: "Multiple reports" };
}

export function VendorCard({ vendor, position }: { vendor: Vendor; position: number }) {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const tone = reportTone(vendor.recentReports);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <article
      onMouseMove={onMouseMove}
      className="group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl transition-all duration-700 ease-luxe hover:-translate-y-1 hover:border-violet-300/30 hover:shadow-[0_30px_80px_-40px_rgb(139_92_246/0.6)] sm:p-7"
    >
      {/* Cursor spotlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: "radial-gradient(380px circle at var(--x, 50%) var(--y, 0%), rgb(167 139 250 / 0.13), transparent 60%)" }}
      />

      <div className="relative flex items-start gap-4">
        <span className="grid size-13 shrink-0 place-items-center rounded-2xl bg-[linear-gradient(135deg,rgb(167_139_250/0.35),rgb(240_171_252/0.2),rgb(103_232_249/0.25))] font-display text-xl text-white ring-1 ring-white/15">
          {initials(vendor.name)}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg leading-snug font-medium tracking-[-0.01em] text-mist-100">{vendor.name}</h3>
          <span className="mt-1.5 inline-flex items-center gap-1 rounded-full border border-emerald-300/30 bg-emerald-400/10 px-2 py-0.5 text-[11px] font-medium text-emerald-300">
            <BadgeCheckIcon className="size-3.5" /> Verified vendor
          </span>
        </div>
        <span className="font-display text-2xl text-mist-500">{String(position).padStart(2, "0")}</span>
      </div>

      <p className="relative mt-5 leading-relaxed text-mist-400">{vendor.description}</p>
      <ul className="relative mt-4 flex flex-wrap gap-2">
        {vendor.tags.map((tag) => (
          <li key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-mist-300">
            {tag}
          </li>
        ))}
      </ul>

      {/* Ratings + reports */}
      <div className="relative mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-white/10 bg-night-950/40 p-4">
          <TrustpilotRating rating={vendor.trustpilotRating} reviews={vendor.trustpilotReviews} url={vendor.trustpilotUrl} />
        </div>
        <div className="rounded-2xl border border-white/10 bg-night-950/40 p-4">
          <p className="flex items-center gap-1.5 text-[13px] font-semibold text-white">
            <span className={`size-2 rounded-full ${tone.dot}`} /> {tone.note}
          </p>
          <p className={`mt-1.5 font-display text-3xl leading-none ${tone.color}`}>{vendor.recentReports}</p>
          <p className="mt-1.5 text-xs leading-snug text-mist-400">bad-feedback reports in the past 6 months</p>
        </div>
      </div>

      {/* Actions */}
      <div className="relative mt-6 flex flex-wrap items-center gap-2 border-t border-white/10 pt-5">
        <button
          type="button"
          onClick={() => setFeedbackOpen(true)}
          className="inline-flex h-10 items-center gap-2 rounded-full bg-mist-100 px-4 text-sm font-medium text-night-950 transition-colors hover:bg-white"
        >
          <MessageIcon className="size-4" /> Leave feedback
        </button>
        <Link
          href={`/report?vendor=${encodeURIComponent(vendor.name)}`}
          className="inline-flex h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-sm text-mist-300 transition-colors hover:border-rose-300/50 hover:text-rose-200"
        >
          <FlagIcon className="size-4" /> Report
        </Link>
        {vendor.website && (
          <a
            href={vendor.website}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex h-10 items-center gap-1.5 px-2 text-sm text-mist-300 transition-colors hover:text-white"
          >
            Website <ArrowUpRightIcon className="size-4" />
          </a>
        )}
      </div>

      <FeedbackModal vendorName={vendor.name} open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </article>
  );
}
