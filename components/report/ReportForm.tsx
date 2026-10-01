"use client";

import { useState } from "react";
import { Field, inputClass } from "@/components/report/fields";
import { ReportSuccess } from "@/components/report/ReportSuccess";
import { ChevronDownIcon } from "@/components/ui/icons";
import { categories } from "@/data/categories";
import { REPORT_REASONS } from "@/lib/reports/schema";

/**
 * Vendor report form. Front-end only: submitting shows a thank-you message
 * and nothing is sent or saved.
 */
export function ReportForm({ defaultVendor = "" }: { defaultVendor?: string }) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) return <ReportSuccess />;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="space-y-8"
    >
      <fieldset className="space-y-6">
        <legend className="text-xs font-medium tracking-[0.2em] text-violet-300 uppercase">1 · The vendor</legend>

        <Field id="vendorName" label="Vendor name">
          <input
            id="vendorName"
            name="vendorName"
            type="text"
            required
            maxLength={120}
            defaultValue={defaultVendor}
            placeholder="e.g. Northwind Supply Co."
            className={`${inputClass} h-12`}
          />
        </Field>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field id="vendorWebsite" label="Website or listing link" optional>
            <input
              id="vendorWebsite"
              name="vendorWebsite"
              type="text"
              inputMode="url"
              placeholder="example.com"
              className={`${inputClass} h-12`}
            />
          </Field>

          <Field id="category" label="Category" optional>
            <div className="relative">
              <select id="category" name="category" defaultValue="" className={`${inputClass} h-12 appearance-none pr-11`}>
                <option value="">Select a category</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
                <option value="other">Other / not sure</option>
              </select>
              <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-mist-500" />
            </div>
          </Field>
        </div>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="text-xs font-medium tracking-[0.2em] text-violet-300 uppercase">2 · What happened</legend>

        <div role="radiogroup" aria-labelledby="reason-label">
          <p id="reason-label" className="text-sm font-medium text-mist-100">
            What is the issue about?
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {REPORT_REASONS.map((reason) => (
              <label
                key={reason.value}
                className="group relative flex cursor-pointer gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:border-white/25 has-checked:border-violet-300/60 has-checked:bg-white/[0.07] has-checked:shadow-[0_10px_40px_-15px_rgb(167_139_250/0.6)] has-focus-visible:ring-4 has-focus-visible:ring-violet-400/30"
              >
                <input type="radio" name="reason" value={reason.value} required className="peer sr-only" />
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-white/20 transition-colors peer-checked:border-transparent peer-checked:bg-[linear-gradient(135deg,#a78bfa,#f0abfc)]">
                  <span className="size-1.5 rounded-full bg-night-950 opacity-0 transition-opacity group-has-checked:opacity-100" />
                </span>
                <span>
                  <span className="block text-sm font-medium text-mist-100">{reason.label}</span>
                  <span className="mt-1 block text-sm leading-snug text-mist-500">{reason.description}</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        <Field
          id="details"
          label="Describe what happened"
          hint="Include dates, order numbers, and what you expected vs. what happened."
        >
          <textarea
            id="details"
            name="details"
            required
            rows={6}
            maxLength={2000}
            placeholder="Tell us what happened…"
            className={`${inputClass} resize-y py-3 leading-relaxed`}
          />
        </Field>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="text-xs font-medium tracking-[0.2em] text-violet-300 uppercase">3 · Follow-up</legend>

        <Field id="contactEmail" label="Your email" optional>
          <input
            id="contactEmail"
            name="contactEmail"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            className={`${inputClass} h-12`}
          />
        </Field>

        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-mist-300">
          <input
            type="checkbox"
            name="confirm"
            required
            className="mt-0.5 size-5 shrink-0 cursor-pointer rounded accent-violet-400"
          />
          The information I&apos;ve provided is accurate to the best of my knowledge.
        </label>
      </fieldset>

      <div className="flex justify-end border-t border-white/10 pt-8">
        <button
          type="submit"
          className="inline-flex h-13 items-center justify-center rounded-full bg-[linear-gradient(110deg,#a78bfa,#f0abfc_45%,#67e8f9)] px-8 text-[15px] font-medium text-night-950 shadow-[0_10px_40px_-10px_rgb(192_132_252/0.7)] transition-all duration-500 ease-luxe hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300"
        >
          Submit report
        </button>
      </div>
    </form>
  );
}
