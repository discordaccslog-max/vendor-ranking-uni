/** Small form building blocks used by the report form. */

export const inputClass =
  "w-full rounded-xl border border-sand-200 bg-white px-4 text-[15px] text-ink-950 shadow-[0_1px_2px_rgb(10_10_11/0.04)] outline-none transition-all duration-300 placeholder:text-stone-500/60 hover:ring-1 hover:ring-gold-300/60 focus:border-gold-400 focus:ring-4 focus:ring-gold-200/50";

type FieldProps = {
  id: string;
  label: string;
  optional?: boolean;
  hint?: string;
  children: React.ReactNode;
};

export function Field({ id, label, optional, hint, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between gap-4 text-sm font-medium text-ink-950">
        {label}
        {optional && <span className="text-xs font-normal text-stone-500">Optional</span>}
      </label>
      <div className="mt-2">{children}</div>
      {hint && <p className="mt-2 text-sm text-stone-500">{hint}</p>}
    </div>
  );
}
