import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";

type Variant = "gold" | "light" | "dark" | "outline-light" | "outline-dark";

const variants: Record<Variant, string> = {
  // Champagne button for dark backgrounds
  gold: "bg-gradient-to-b from-gold-200 to-gold-400 text-ink-950 shadow-[0_8px_30px_-10px] shadow-gold-400/60 hover:shadow-gold-300/70 hover:brightness-105",
  light: "bg-bone text-ink-950 hover:bg-white",
  dark: "bg-ink-950 text-bone hover:bg-ink-800",
  "outline-light": "border border-white/15 bg-white/[0.03] text-bone backdrop-blur-sm hover:border-white/30 hover:bg-white/[0.07]",
  "outline-dark": "border border-ink-950/15 text-ink-950 hover:border-ink-950/35 hover:bg-ink-950/[0.03]",
};

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: "md" | "lg";
  arrow?: boolean;
  className?: string;
};

/**
 * Link styled as a button. Internal paths and #anchors use Next's <Link>;
 * mailto: and external URLs use a plain <a>.
 */
export function Button({ href, children, variant = "dark", size = "md", arrow = false, className = "" }: ButtonProps) {
  const classes = `group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-[-0.01em] transition-all duration-500 ease-luxe focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-400 ${
    size === "lg" ? "h-13 px-7 text-[15px]" : "h-11 px-5 text-sm"
  } ${variants[variant]} ${className}`;

  const content = (
    <>
      {/* Light sweep on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-full w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-1000 ease-luxe group-hover:translate-x-[400%]"
      />
      <span className="relative">{children}</span>
      {arrow && (
        <ArrowRightIcon className="relative size-4 transition-transform duration-500 ease-luxe group-hover:translate-x-1" />
      )}
    </>
  );

  const isExternal = /^(https?:|mailto:|tel:)/.test(href);
  if (isExternal) {
    return (
      <a href={href} className={classes} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
