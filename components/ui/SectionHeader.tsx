import { Reveal } from "@/components/ui/Reveal";

type SectionHeaderProps = {
  /** Small label above the title, e.g. "Categories". */
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Use on dark backgrounds. */
  inverse?: boolean;
  align?: "left" | "center";
};

/** Consistent eyebrow + serif title + intro used by every homepage section. */
export function SectionHeader({ eyebrow, title, description, inverse = false, align = "left" }: SectionHeaderProps) {
  const center = align === "center";
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <Reveal>
        <p
          className={`flex items-center gap-3 text-xs font-medium tracking-[0.22em] uppercase ${
            center ? "justify-center" : ""
          } ${inverse ? "text-gold-300" : "text-gold-600"}`}
        >
          <span className={`h-px w-8 ${inverse ? "bg-gold-300/60" : "bg-gold-500/60"}`} />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={80}>
        <h2
          className={`mt-6 font-display text-[2.6rem] leading-[1.02] tracking-[-0.02em] text-balance sm:text-6xl ${
            inverse ? "text-bone" : "text-ink-950"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={160}>
          <p className={`mt-6 text-lg leading-relaxed text-pretty ${inverse ? "text-white/60" : "text-stone-600"}`}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
