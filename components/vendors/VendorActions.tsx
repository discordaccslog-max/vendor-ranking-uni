"use client";

import Link from "next/link";
import { useState } from "react";
import { FeedbackModal } from "@/components/vendors/FeedbackModal";
import { ArrowUpRightIcon, FlagIcon, MessageIcon } from "@/components/ui/icons";

/** "View site" (primary) plus "Leave feedback" and "Report". */
export function VendorActions({
  name,
  website,
  size = "md",
  className = "",
}: {
  name: string;
  website: string;
  size?: "md" | "lg";
  className?: string;
}) {
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <a
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        className={`group/site relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[linear-gradient(110deg,#a78bfa,#f0abfc_45%,#67e8f9)] font-semibold text-night-950 shadow-[0_10px_34px_-10px_rgb(192_132_252/0.8)] transition-all duration-500 ease-luxe hover:shadow-[0_14px_44px_-8px_rgb(192_132_252/1)] hover:brightness-110 ${
          size === "lg" ? "h-13 px-8 text-[15px]" : "h-11 px-6 text-sm"
        }`}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-full w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-1000 ease-luxe group-hover/site:translate-x-[400%]"
        />
        <span className="relative">View site</span>
        <ArrowUpRightIcon className="relative size-4 transition-transform duration-500 ease-luxe group-hover/site:translate-x-0.5 group-hover/site:-translate-y-0.5" />
      </a>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setFeedbackOpen(true)}
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 text-xs whitespace-nowrap text-mist-300 transition-colors hover:border-white/25 hover:text-white"
        >
          <MessageIcon className="size-3.5 shrink-0" /> Feedback
        </button>
        <Link
          href={`/report?vendor=${encodeURIComponent(name)}`}
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 text-xs whitespace-nowrap text-mist-300 transition-colors hover:border-rose-300/50 hover:text-rose-200"
        >
          <FlagIcon className="size-3.5 shrink-0" /> Report
        </Link>
      </div>
      <FeedbackModal vendorName={name} open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </div>
  );
}
