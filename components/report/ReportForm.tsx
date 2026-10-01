"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitReport, type ReportFormState } from "@/app/report/actions";
import { Field, describedBy, inputClass } from "@/components/report/fields";
import { ChevronDownIcon } from "@/components/ui/icons";
import { categories } from "@/data/categories";
import { EMPTY_VALUES, LIMITS, REPORT_REASONS, type ReportFieldErrors } from "@/lib/reports/schema";
import { ReportSuccess } from "@/components/report/ReportSuccess";

type ReportFormProps = {
  /** Pre-fills the vendor name, e.g. from /report?vendor=Acme */
  defaultVendor?: string;
  onReset: () => void;
};

export function ReportForm({ defaultVendor = "", onReset }: ReportFormProps) {
  const initialState: ReportFormState = {
    status: "idle",
    values: { ...EMPTY_VALUES, vendorName: defaultVendor },
    attempt: 0,
  };
  const [state, formAction, pending] = useActionState(submitReport, initialState);
  const alertRef = useRef<HTMLDivElement>(null);
  const [edited, setEdited] = useState<string[]>([]);

  // Move focus to the error summary after a failed submit.
  const attempt = state.status === "success" ? -1 : state.attempt;
  useEffect(() => {
    setEdited([]);
    if (state.status === "error") alertRef.current?.focus();
  }, [state.status, attempt]);

  if (state.status === "success") return <ReportSuccess reportId={state.reportId} onReset={onReset} />;

  const { values } = state;
  // Hide a field's error as soon as the visitor edits that field.
  const errors = Object.fromEntries(
    Object.entries(state.status === "error" ? state.errors : {}).filter(([name]) => !edited.includes(name)),
  ) as ReportFieldErrors;

  return (
    // Re-mount after each attempt so fields refill with what the visitor typed.
    <form
      key={attempt}
      action={formAction}
      noValidate
      onChange={(e) => {
        const name = (e.target as unknown as HTMLInputElement).name;
        if (name && !edited.includes(name)) setEdited([...edited, name]);
      }}
      className="space-y-8"
    >
      {state.status === "error" && (
        <div
          ref={alertRef}
          tabIndex={-1}
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-800 outline-none"
        >
          {state.message}
        </div>
      )}

      {/* Honeypot for bots — hidden from people and screen readers. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="company_website">Company website</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <fieldset className="space-y-6">
        <legend className="text-xs font-medium tracking-[0.2em] text-gold-600 uppercase">1 · The vendor</legend>

        <Field id="vendorName" label="Vendor name" error={errors.vendorName}>
          <input
            id="vendorName"
            name="vendorName"
            type="text"
            required
            maxLength={LIMITS.vendorName.max}
            defaultValue={values.vendorName}
            placeholder="e.g. Northwind Supply Co."
            autoComplete="organization"
            className={`${inputClass(!!errors.vendorName)} h-12`}
            {...describedBy("vendorName", errors.vendorName)}
          />
        </Field>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field id="vendorWebsite" label="Website or listing link" optional error={errors.vendorWebsite}>
            <input
              id="vendorWebsite"
              name="vendorWebsite"
              type="text"
              inputMode="url"
              maxLength={LIMITS.vendorWebsite.max}
              defaultValue={values.vendorWebsite}
              placeholder="example.com"
              className={`${inputClass(!!errors.vendorWebsite)} h-12`}
              {...describedBy("vendorWebsite", errors.vendorWebsite)}
            />
          </Field>

          <Field id="category" label="Category" optional error={errors.category}>
            <div className="relative">
              <select
                id="category"
                name="category"
                defaultValue={values.category}
                className={`${inputClass(!!errors.category)} h-12 appearance-none pr-11`}
                {...describedBy("category", errors.category)}
              >
                <option value="">Select a category</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
                <option value="other">Other / not sure</option>
              </select>
              <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-stone-500" />
            </div>
          </Field>
        </div>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="text-xs font-medium tracking-[0.2em] text-gold-600 uppercase">2 · What happened</legend>

        <div role="radiogroup" aria-labelledby="reason-label" aria-describedby={errors.reason ? "reason-error" : undefined}>
          <p id="reason-label" className="text-sm font-medium text-ink-950">
            What is the issue about?
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {REPORT_REASONS.map((reason) => (
              <label
                key={reason.value}
                className={`group relative flex cursor-pointer gap-3 rounded-2xl border bg-white p-4 transition-all duration-300 hover:border-gold-300 has-checked:border-ink-950 has-checked:shadow-[0_10px_30px_-15px_rgb(10_10_11/0.35)] has-focus-visible:ring-4 has-focus-visible:ring-gold-200/60 ${
                  errors.reason ? "border-red-300" : "border-sand-200"
                }`}
              >
                <input
                  type="radio"
                  name="reason"
                  value={reason.value}
                  required
                  defaultChecked={values.reason === reason.value}
                  className="peer sr-only"
                />
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-sand-200 transition-colors peer-checked:border-ink-950 peer-checked:bg-ink-950">
                  <span className="size-1.5 rounded-full bg-gold-300 opacity-0 transition-opacity group-has-checked:opacity-100" />
                </span>
                <span>
                  <span className="block text-sm font-medium text-ink-950">{reason.label}</span>
                  <span className="mt-1 block text-sm leading-snug text-stone-500">{reason.description}</span>
                </span>
              </label>
            ))}
          </div>
          {errors.reason && (
            <p id="reason-error" className="mt-2 text-sm text-red-700">
              {errors.reason}
            </p>
          )}
        </div>

        <DetailsField defaultValue={values.details} error={errors.details} />
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="text-xs font-medium tracking-[0.2em] text-gold-600 uppercase">3 · Follow-up</legend>

        <Field
          id="contactEmail"
          label="Your email"
          optional
          hint="Only used if our team needs to follow up on this report."
          error={errors.contactEmail}
        >
          <input
            id="contactEmail"
            name="contactEmail"
            type="email"
            maxLength={LIMITS.email.max}
            defaultValue={values.contactEmail}
            placeholder="you@company.com"
            autoComplete="email"
            className={`${inputClass(!!errors.contactEmail)} h-12`}
            {...describedBy("contactEmail", errors.contactEmail, "Only used if our team needs to follow up on this report.")}
          />
        </Field>

        <div>
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-stone-600">
            <input
              type="checkbox"
              name="confirm"
              required
              defaultChecked={values.confirm}
              aria-invalid={errors.confirm ? true : undefined}
              aria-describedby={errors.confirm ? "confirm-error" : undefined}
              className="mt-0.5 size-5 shrink-0 cursor-pointer rounded accent-ink-950"
            />
            The information I&apos;ve provided is accurate to the best of my knowledge.
          </label>
          {errors.confirm && (
            <p id="confirm-error" className="mt-2 pl-8 text-sm text-red-700">
              {errors.confirm}
            </p>
          )}
        </div>
      </fieldset>

      <div className="flex flex-col gap-4 border-t border-sand-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-stone-500">Every report is reviewed by our team.</p>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-13 items-center justify-center gap-2.5 rounded-full bg-ink-950 px-8 text-[15px] font-medium text-bone transition-all duration-500 ease-luxe hover:bg-ink-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-400 disabled:cursor-wait disabled:opacity-70"
        >
          {pending && <span className="size-4 animate-spin rounded-full border-2 border-bone/30 border-t-bone" />}
          {pending ? "Sending report…" : "Submit report"}
        </button>
      </div>
    </form>
  );
}

/** Textarea with a live character counter. */
function DetailsField({ defaultValue, error }: { defaultValue: string; error?: string }) {
  const [length, setLength] = useState(defaultValue.length);
  const { min, max } = LIMITS.details;
  const hint = "Include dates, order numbers, and what you expected vs. what happened. Please don't share passwords or payment details.";

  return (
    <Field id="details" label="Describe what happened" hint={hint} error={error}>
      <textarea
        id="details"
        name="details"
        required
        rows={6}
        minLength={min}
        maxLength={max}
        defaultValue={defaultValue}
        onChange={(e) => setLength(e.target.value.length)}
        placeholder="Tell us what happened…"
        className={`${inputClass(!!error)} resize-y py-3 leading-relaxed`}
        {...describedBy("details", error, hint)}
      />
      <p className={`mt-1.5 text-right text-xs tabular-nums ${length > 0 && length < min ? "text-gold-600" : "text-stone-500"}`}>
        {length < min && length > 0 ? `${min - length} more characters needed · ` : ""}
        {length}/{max}
      </p>
    </Field>
  );
}
