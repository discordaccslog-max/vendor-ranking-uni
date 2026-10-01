import { Reveal } from "@/components/ui/Reveal";

type SectionHeaderProps = {
  /** Small label above the title. */
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
};

/** Consistent eyebrow + serif title + intro used by every homepage section. */
export function SectionHeader({ eyebrow, title, description, align = "left" }: SectionHeaderProps) {
  const center = align === "center";
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <Reveal>
        <p
          className={`flex items-center gap-3 text-xs font-medium tracking-[0.22em] text-violet-300 uppercase ${
            center ? "justify-center" : ""
          }`}
        >
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-violet-300/70" />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="mt-6 font-display text-[2.6rem] leading-[1.02] tracking-[-0.02em] text-balance text-mist-100 sm:text-6xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={160}>
          <p className="mt-6 text-lg leading-relaxed text-pretty text-mist-400">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
