"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/icons";

const NEXT_STEPS = [
  "Our team reviews your report and the vendor's listing.",
  "If you left an email, we may contact you for more details.",
  "Where appropriate, we update, flag or remove the listing.",
];

export function ReportSuccess({ reportId, onReset }: { reportId: string; onReset: () => void }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(reportId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — the ID is still visible */
    }
  };

  return (
    <div role="status" className="animate-rise text-center sm:py-6">
      <span className="mx-auto grid size-16 place-items-center rounded-full bg-ink-950 text-gold-300 shadow-[0_0_0_10px_var(--color-gold-100)]">
        <CheckIcon className="size-7" />
      </span>
      <h2 className="mt-8 font-display text-4xl tracking-[-0.01em] text-ink-950 sm:text-5xl">Report received.</h2>
      <p className="mx-auto mt-4 max-w-md leading-relaxed text-stone-600">
        Thank you for helping keep the directory reliable. Keep your reference number in case you need to follow up.
      </p>

      <div className="mx-auto mt-8 inline-flex items-center gap-3 rounded-full border border-sand-200 bg-bone py-1.5 pr-1.5 pl-5">
        <span className="text-xs tracking-[0.18em] text-stone-500 uppercase">Reference</span>
        <span className="font-mono text-sm font-medium text-ink-950">{reportId}</span>
        <button
          type="button"
          onClick={copy}
          className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-ink-950 ring-1 ring-sand-200 transition-colors hover:bg-sand-50"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <ol className="mx-auto mt-10 max-w-md space-y-3 text-left">
        {NEXT_STEPS.map((step, i) => (
          <li key={step} className="flex gap-4 rounded-2xl border border-sand-200 bg-white/70 p-4 text-sm text-stone-600">
            <span className="font-display text-xl leading-none text-gold-500">{String(i + 1).padStart(2, "0")}</span>
            {step}
          </li>
        ))}
      </ol>

      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button href="/" variant="dark" arrow>
          Back to homepage
        </Button>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex h-11 items-center rounded-full border border-ink-950/15 px-5 text-sm font-medium text-ink-950 transition-colors hover:border-ink-950/35"
        >
          Report another vendor
        </button>
      </div>
    </div>
  );
}
