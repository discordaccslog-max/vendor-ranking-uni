/** Small form building blocks shared by the report form (and future forms). */

export const inputClass = (invalid: boolean) =>
  `w-full rounded-xl border bg-white px-4 text-[15px] text-ink-950 shadow-[0_1px_2px_rgb(10_10_11/0.04)] outline-none transition-all duration-300 placeholder:text-stone-500/60 focus:ring-4 ${
    invalid
      ? "border-red-400 focus:border-red-500 focus:ring-red-200/50"
      : "border-sand-200 hover:border-sand-200/0 hover:ring-1 hover:ring-gold-300/60 focus:border-gold-400 focus:ring-gold-200/50"
  }`;

type FieldProps = {
  id: string;
  label: string;
  optional?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
};

export function Field({ id, label, optional, hint, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between gap-4 text-sm font-medium text-ink-950">
        {label}
        {optional && <span className="text-xs font-normal text-stone-500">Optional</span>}
      </label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-700">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="mt-2 text-sm text-stone-500">
            {hint}
          </p>
        )
      )}
    </div>
  );
}

/** aria props for an input inside <Field>. */
export function describedBy(id: string, error?: string, hint?: string) {
  return {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : hint ? `${id}-hint` : undefined,
  } as const;
}
