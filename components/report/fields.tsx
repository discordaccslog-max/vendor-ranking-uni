/** Small form building blocks used by the report and feedback forms. */

export const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-[15px] text-mist-100 outline-none transition-all duration-300 placeholder:text-mist-500 hover:border-white/20 focus:border-violet-300/60 focus:bg-white/[0.06] focus:ring-4 focus:ring-violet-400/20 [&>option]:bg-night-900";

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
      <label htmlFor={id} className="flex items-baseline justify-between gap-4 text-sm font-medium text-mist-100">
        {label}
        {optional && <span className="text-xs font-normal text-mist-500">Optional</span>}
      </label>
      <div className="mt-2">{children}</div>
      {hint && <p className="mt-2 text-sm text-mist-500">{hint}</p>}
    </div>
  );
}
