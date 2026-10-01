import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";

type Variant = "aurora" | "glass" | "light";

const variants: Record<Variant, string> = {
  // Glowing violet → pink → cyan gradient
  aurora:
    "bg-[linear-gradient(110deg,#a78bfa,#f0abfc_45%,#67e8f9)] text-night-950 shadow-[0_10px_40px_-10px_rgb(192_132_252/0.7)] hover:shadow-[0_14px_50px_-8px_rgb(192_132_252/0.9)] hover:brightness-110",
  glass: "border border-white/15 bg-white/[0.05] text-mist-100 backdrop-blur-md hover:border-white/30 hover:bg-white/[0.1]",
  light: "bg-mist-100 text-night-950 hover:bg-white",
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
export function Button({ href, children, variant = "glass", size = "md", arrow = false, className = "" }: ButtonProps) {
  const classes = `group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-[-0.01em] transition-all duration-500 ease-luxe focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300 ${
    size === "lg" ? "h-13 px-7 text-[15px]" : "h-11 px-5 text-sm"
  } ${variants[variant]} ${className}`;

  const content = (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-full w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 ease-luxe group-hover:translate-x-[400%]"
      />
      <span className="relative">{children}</span>
      {arrow && (
        <ArrowRightIcon className="relative size-4 transition-transform duration-500 ease-luxe group-hover:translate-x-1" />
      )}
    </>
  );

  if (/^(https?:|mailto:|tel:)/.test(href)) {
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
